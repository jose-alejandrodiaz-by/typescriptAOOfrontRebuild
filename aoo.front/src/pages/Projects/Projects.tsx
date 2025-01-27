import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Project } from "../../models/Project";
import { AuthProvider,useAuth } from "../../context/AuthContext";
import ProtectedRoute from "../../global_components/ProtectedRoute";
import { getAllProjects } from "../../services/ProjectServices";
import ProjectSummaryComponent from "./components/ProjectSummaryComponent";

export default function Projects() {
    const [projects, setAllProjects] = useState<Project[]>([]);
    const navigate = useNavigate();
    const { user} = useAuth();
    useEffect(() => {
        if (user){
            getAllProjects(1).then((data) => {
                if (Array.isArray(data.data)) {
                    setAllProjects(data.data);
                } else {
                    setAllProjects([]);
                    console.error("Expected an array but got:", data);
                }
            });
    }
    }, [user]);

    useEffect(() => {
        console.log(projects);
    }, [projects]);

    return (
        <AuthProvider>
            <ProtectedRoute>
                <div className="App-basic-header">
                    <h1 className='item'>PROJECTS</h1>
                    <button className='item' onClick={() => navigate('/create-project')}>Create Project</button>
                </div>
                <div className="App-center-container">
                <div >
                    <div className="project-summary-banner-headers">
                    <h4 className='item'>Project Name</h4>
                    <h4 className='item'>Type</h4>
                    <h5 className='item'>Code</h5>
                    <h4 className='item'>Created by</h4>
                    <h4 className='item'>Created On</h4>
                    </div>
                    {projects.map((project: Project) => (
                        <ProjectSummaryComponent key={project.project_code} project={project} />
                    ))}
                </div>
                </div>
            </ProtectedRoute>
        </AuthProvider>
    );
}