import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Project } from "../../models/Project";
import { AuthProvider, useAuth } from "../../context/AuthContext";
import ProtectedRoute from "../../global_components/ProtectedRoute";
import { getAllProjects } from "../../services/ProjectServices";
import SummaryComponent from "../../global_components/SummaryComponent";
import { SummaryHeaders } from "../../global_components/SummaryComponent";

export default function Projects() {
    const [projects, setAllProjects] = useState<Project[]>([]);
    const navigate = useNavigate();
    const { user } = useAuth();
    //ProjectItems schema to be used in the generation of the SummaryComponents
    const [projectItems, setProjectItems] = useState<{ project: Project; items: { label: string; value: string | number | undefined; }[] }[]>([]);
    const headers = ['Project Name', 'Type', 'Code', 'Created by', 'Created On'];

    //Load projects by page
    useEffect(() => {
        if (user) {
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
    //Map project + items to be displayed
    useEffect(() => {
        setProjectItems(projects.map((project: Project) => {
            const items = [
                { label: 'Project Name', value: project.project_name || undefined },
                { label: 'Type', value: project.project_type_id || undefined },
                { label: 'Code', value: project.project_code || undefined },
                { label: 'Created by', value: project.created_by_name || undefined },
                { label: 'Created On', value: project.created_on ? new Date(project.created_on).toLocaleDateString() : undefined }
            ];
            return { project, items };
        }));
    }, [projects]);

    return (
        <AuthProvider>
            <ProtectedRoute>
                <div className="App-basic-header">
                    <h1 className='item'>PROJECTS</h1>
                    <button className='item' onClick={() => navigate('/create-project')}>Create Project</button>
                </div>

                <div className="App-center-container">
                    <div>
                        <SummaryHeaders headers={headers} />

                        {projectItems.map(({ project, items }) => (
                        <SummaryComponent 
                                key={project.project_code} 
                                items={items} 
                        />
                        ))}
                        
                    </div>
                </div>
            </ProtectedRoute>
        </AuthProvider>
    );
}
