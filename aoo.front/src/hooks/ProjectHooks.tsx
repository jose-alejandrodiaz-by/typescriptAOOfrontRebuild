import { useEffect, useState, useCallback } from "react";
import { getAllProjects, getProject, postProject } from "../services/ProjectServices";
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Project } from '../models/Project';

interface ErrorState {
    isError: boolean;
    errorMessage: string;
}

export function useGetAllProjects(page: number) {
    const [projects, setAllProjects] = useState<Project[]>([]);
    const [totalItems, setTotalPages] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<ErrorState>({
        isError: false,
        errorMessage: ""
    });

    useEffect(() => {
        getAllProjects(page)
            .then((res) => {
                setAllProjects(res.data);
                setLoading(false);
                if (res.headers['x-pagination']) {
                    const paginationHeaders = res.headers['x-pagination'].split(',')[0];
                    setTotalPages(Number(paginationHeaders.split(':')[1]));
                }
            })
            .catch((err) => {
                setLoading(false);
                setError({ isError: true, errorMessage: err.message });
            });
    }, [page, totalItems]);

    return { projects, loading, error, totalItems };
}

export function useGetProject(id: number) {
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<ErrorState>({
        isError: false,
        errorMessage: ""
    });

    useEffect(() => {
        getProject(id.toString())
            .then((res) => {
                setProject(res);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                setError({ isError: true, errorMessage: err.message });
            });
    }, [id]);

    return { project, loading, error };
}

export function usePostProject() {
    const { logout } = useAuth();
    const createProject = useCallback(async (data: Project) => {
        postProject(data)
            .then((res) => {
                if (res === undefined) {
                    throw new Error("Something went wrong");
                }
                toast.success("Project was created", {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch((error) => {
                console.error(error);
                let errorMessage = "Something went wrong";
                if (error.message) {
                    errorMessage = error.message;
                }
                toast.error(`${errorMessage}`, {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                if (error.message && error.message.includes("401")) {
                    logout();
                }
            });
    }, [logout]);

    return createProject;
}