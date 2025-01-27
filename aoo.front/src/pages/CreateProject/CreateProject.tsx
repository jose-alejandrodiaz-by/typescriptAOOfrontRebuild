import React, { Suspense, useContext, useState, useEffect } from 'react';
import { usePostProject } from "../../hooks/ProjectHooks";
import { ToastContainer, toast } from 'react-toastify';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { BasicContext } from "../../context/BasicContext";
import { Project } from '../../models/Project';
import 'react-toastify/dist/ReactToastify.css';
import './CreateProject.css';
import { AuthProvider } from '../../context/AuthContext';
import ProtectedRoute from '../../global_components/ProtectedRoute';

interface Region {
    id: number;
    name: string;
}

interface ProjectType {
    id: number;
    type_name: string;
}

interface PlatformType {
    id: number;
    platform_name: string;
}

interface Module {
    id: number;
    module_name: string;
}

interface Environment {
    id: number;
    environment_name: string;
}

const regions: Region[] = [
    { id: 1, name: 'AMER' },
    { id: 2, name: 'APAC' },
    { id: 3, name: 'EMEA' }
];

export default function CreateProject() {
    const basicContext = useContext(BasicContext);
    const getBasicData = basicContext?.getBasicData;
    const [data, setData] = useState<{
        projectTypes?: ProjectType[],
        platforms?: PlatformType[],
        modules?: Module[],
        environments?: Environment[]
    }>({});

    useEffect(() => {
        if (getBasicData) {
            const basicData = getBasicData();
            if (basicData) {
                setData(basicData);
            }
        }
    }, [getBasicData]);

    const { register, handleSubmit, control, formState: { errors, isSubmitted }, reset, watch } = useForm<Project>({
        defaultValues: {
            project_name: '',
            project_code: '',
            project_type_id: 0,
            platform_id: 0,
            region_id: 0,
            modules: [],
            environments: []
        }
    });

    const projectData = watch(["modules", "environments"]);
    const [totalEffort, setTotalEffort] = useState<number>(0);

    const getTotalEffort = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log(projectData);
        setTotalEffort(totalEffort + 1);
    };
    const postProject = usePostProject();
    const onSubmit: SubmitHandler<Project> = (data) => {;
        if (Object.keys(errors).length !== 0 && isSubmitted) {
            Object.keys(errors).forEach((key) => {
                const message = errors[key as keyof Project]?.message || "This field is required";
                toast.error(`${key}: ${message}`, {
                    position: 'top-right',
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
        } else {
            const dataToPost: Project = {
                project_name: data.project_name,
                project_code: data.project_code,
                project_type_id: data.project_type_id,
                platform_id: data.platform_id,
                region_id: data.region_id,
                modules: data.modules ? data.modules.map(id => ({ id })) : [],
                environments: data.environments ? data.environments.map(id => ({ id })) : [],
            };
            
            postProject(dataToPost).then(() => {
                reset();
            });
        }
    };

    return (
        <AuthProvider>
            <ProtectedRoute>
        <div className='App-center-container'>
            <div className="form">
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="inner_form">
                        <div className='grid'>
                            <div>
                        <input type="text" placeholder="Project Name"
                            {...register("project_name", {
                                required: "Project name is required",
                                maxLength: { value: 100, message: "Project name cannot exceed 100 characters" }
                            })} />
                        <br />
                        <input type="text" placeholder="Project Code"
                            {...register("project_code", {
                                required: "Project code is required",
                                maxLength: { value: 10, message: "Project code cannot exceed 10 characters" },
                                pattern: {
                                    value: /^[a-zA-Z0-9_]+$/,
                                    message: "Project code can only contain letters and underscores without spaces"
                                }
                            })} />
                        <div>
                            {!data.projectTypes ? (
                                <input name="..." />
                            ) : (
                                <select {...register("project_type_id", { required: "Project type is required" })}>
                                    <option key={0} value="">Select a Project Type</option>
                                    {data.projectTypes.map((projectType: ProjectType) => (
                                        <option key={projectType.id} value={projectType.id}>{projectType.type_name}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                        {!data.platforms ? (
                            <input name="..." />
                        ) : (
                            <select {...register("platform_id", { required: "Platform is required" })}>
                                <option key={0} value="">Select a Platform Type</option>
                                {data.platforms.map((platformType: PlatformType) => (
                                    <option key={platformType.id} value={platformType.id}>{platformType.platform_name}</option>
                                ))}
                            </select>
                        )}
                        <div>
                            <select {...register("region_id", { required: "Region is required" })}>
                                <option key={0} value="">Select a Region</option>
                                {regions.map(region => (
                                    <option key={region.id} value={region.id}>{region.name}</option>
                                ))}
                            </select>
                        </div>
                        </div>
                        <div className="grid">
                            <div className="col-span-1">
                                <h3>Modules</h3>
                                {!data.modules ? (
                                    <input name="..." />
                                ) : (
                                    data.modules.map((option: Module) => (
                                        <div key={option.id}>
                                            <label key={option.id}>
                                                <Controller name="modules" control={control}
                                                    rules={{
                                                        validate: (value) => (value ? value.length > 0 : false) || "Select at least one module"
                                                    }}
                                                    render={({ field }) => (
                                                        <input
                                                            type="checkbox"
                                                            value={option.id}
                                                            checked={field.value ? field.value.includes(option.id) : false}
                                                            onChange={() => {
                                                                if (field.value && field.value.includes(option.id)) {
                                                                    field.onChange(
                                                                        field.value.filter((v: number) => v !== option.id)
                                                                    );
                                                                } else {
                                                                    field.onChange(field.value ? [...field.value, option.id] : [option.id]);
                                                                }
                                                            }} />
                                                    )} />
                                                {option.module_name}
                                            </label>
                                            <br />
                                        </div>
                                    )))}
                            </div>
                            <div className="col-span-1">
                                <div>
                                    <h3>Environments</h3>
                                </div>
                                {!data.environments ? (
                                    <input name="..." />
                                ) : (
                                    data.environments.map((option: Environment) => (
                                        <div key={option.id}>
                                            <label key={option.id}>
                                                <Controller name="environments" control={control}
                                                    rules={{
                                                        validate: (value) => (value ? value.length > 0 : false) || "Select at least one environment"
                                                    }}
                                                    render={({ field }) => (
                                                        <input
                                                            type="checkbox"
                                                            value={option.id}
                                                            checked={field.value ? field.value.includes(option.id) : false}
                                                            onChange={() => {
                                                                if (field.value && field.value.includes(option.id)) {
                                                                    field.onChange(
                                                                        field.value.filter((v) => v !== option.id)
                                                                    );
                                                                } else {
                                                                    field.onChange(field.value ? [...field.value, option.id] : [option.id]);
                                                                }
                                                            }} />
                                                    )}
                                                />
                                                {option.environment_name}
                                            </label>
                                            <br />
                                        </div>
                                    )))}
                            </div>
                        </div>
                        </div>
                        <div className="grid">
                            <div className="col-span-1">
                                <button onClick={getTotalEffort} type="button" className='actionBtn'>Show Total Effort</button>
                            </div>
                            <div className="col-span-1">
                                <Suspense fallback={<>Loading...</>}>
                                    {totalEffort === 0 || totalEffort === undefined ? null : totalEffort} to complete project.
                                </Suspense>
                            </div>
                        </div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
        </ProtectedRoute>
        </AuthProvider>
    );
}
