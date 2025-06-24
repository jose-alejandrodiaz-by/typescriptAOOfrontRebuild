import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import ProtectedRoute from "../../global_components/ProtectedRoute";
import SummaryComponent from "../../global_components/SummaryComponent";
import { SummaryHeaders } from "../../global_components/SummaryComponent";
import { useGetAllProjects, useProjectItems } from "../../hooks/ProjectHooks";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import FloatingProjectDetails from './components/FloatingProjectDetails';
import { BasicContext } from "../../context/BasicContext";
import { Project } from "../../models/Project";
import FloatingCloseProjectUpdateParentJira from './components/FloatingCloseProjectUpdateParentJira';

export default function Projects() {
    const [page, setPage] = useState(1);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [showCloseProject, setShowCloseProject] = useState(false);
    const [filter, setFilter] = useState(""); // <-- Add this line
    const { projects, loading, error, totalItems } = useGetAllProjects(page);
    const navigate = useNavigate();
    const projectItems = useProjectItems(projects);
    const headers = ['Project Name', 'Type', 'Code', 'Created by', 'Created On'];
    const basicContext = useContext(BasicContext);
    const getBasicData = basicContext?.getBasicData;
    const basicData = getBasicData ? getBasicData() : { platforms: [], modules: [], environments: [], projectTypes: [], issues: [] };

    const handleNextPage = () => {
        if (page * 10 < totalItems) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
    };

    const handleClose = () => {
        setSelectedProject(null);
        setShowCloseProject(false);
    };

    const handleShowCloseProject = () => {
        setShowCloseProject(true);
    };

    // Smart filter logic
    const filteredProjectItems = projectItems.filter(({ project }) => {
        if (!filter.trim()) return true;
        // Remove spaces and compare lowercased, partial match
        const normalize = (str: string) => str.replace(/\s+/g, '').toLowerCase();
        return normalize(project.project_name).includes(normalize(filter));
    });

    return (
        <AuthProvider>
            <ProtectedRoute>
                <div className="App-basic-header">
                    <h1 className='item'>Projects</h1>
                    <button className='item' onClick={() => navigate('/create-project')}>Create Project</button>
                </div>

                <div className="App-center-container">
                    {loading ? (
                        <h1 className="Loading">Loading...</h1>
                    ) : error.errorMessage ? (
                        <h1 className="Error">Error: {error.errorMessage}</h1>
                    ) : (
                        <div>
                    {/* Filter input */}
                    <div className="util-objects-center-container">
                        <input
                            type="text"
                            placeholder="Filter by project name..."
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                            style={{ padding: 8, width: 300 }}
                        />
                    </div>
                            <SummaryHeaders headers={headers} />
                            {filteredProjectItems.map(({ project, items }) => (
                                <div key={project.project_code} onClick={() => handleProjectClick(project)}>
                                    <SummaryComponent 
                                        items={items} 
                                    />
                                </div>
                            ))}
                            <div className="pagination-buttons">
                                <button onClick={handlePreviousPage} disabled={page === 1}>
                                    <FaArrowLeft className="icon" /> 
                                </button>
                                <button onClick={handleNextPage} disabled={page * 10 >= totalItems}>
                                    <FaArrowRight className="icon" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                {selectedProject && (
                    <div>
                        <FloatingProjectDetails 
                            project={selectedProject} 
                            basicData={basicData} 
                            onClose={handleClose} 
                            onShowCloseProject={handleShowCloseProject}
                        />
                    </div>
                )}
                {showCloseProject && selectedProject && (
                    <FloatingCloseProjectUpdateParentJira 
                        project={selectedProject} 
                        onClose={handleClose} 
                    />
                )}
            </ProtectedRoute>
        </AuthProvider>
    );
}
