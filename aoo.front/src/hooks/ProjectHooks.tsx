import { useEffect, useState, useCallback,useContext } from "react";
import { getAllProjects, getProject, postProject } from "../services/ProjectServices";
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Project } from '../models/Project';
import { BasicContext } from "../context/BasicContext";

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
    const {user} = useAuth();
    useEffect(() => {
        if(user?.token){
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
            });}
    }, [page, totalItems,user]);

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

interface ProjectItem {
    project: Project;
    items: { label: string; value: string | number | undefined; }[];
}

export function useProjectItems(projects: Project[]) {
    const basicContext = useContext(BasicContext);
    const [projectItems, setProjectItems] = useState<ProjectItem[]>([]);

    useEffect(() => {
        const basicData = basicContext?.getBasicData();
        if (basicData) {
            setProjectItems(projects.map((project: Project) => {
                //const platform = basicData.platforms.find(p => p.id === project.platform_id);
                const projectType = basicData.projectTypes.find(pt => pt.id === project.project_type_id);

                const items = [
                    { label: 'Project Name', value: project.project_name || undefined },
                    { label: 'Type', value: projectType ? projectType.type_name : undefined },
                    { label: 'Code', value: project.project_code || undefined },
                    { label: 'Created by', value: project.created_by_name || undefined },
                    { label: 'Created On', value: project.created_on ? new Date(project.created_on).toLocaleDateString() : undefined }                ];
                return { project, items };
            }));
        }
    }, [projects, basicContext]);

    return projectItems;
}