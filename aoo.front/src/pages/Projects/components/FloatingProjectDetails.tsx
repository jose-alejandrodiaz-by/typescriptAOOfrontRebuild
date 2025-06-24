import React from 'react';
import { Project } from '../../../models/Project';
import { BasicData } from '../../../models/BasicData';
import '../Projects.css';

interface FloatingProjectDetailsProps {
    project: Project;
    basicData: BasicData | null;
    onClose: () => void;
    onShowCloseProject: () => void; // Add this prop
}

const FloatingProjectDetails: React.FC<FloatingProjectDetailsProps> = ({ project, basicData, onClose, onShowCloseProject }) => {
    const getPlatformName = (id: number) => {
        if (!basicData) return 'N/A';
        const platform = basicData.platforms.find(p => p.id === id);
        return platform ? platform.platform_name : 'N/A';
    };

    const getProjectTypeName = (id: number) => {
        if (!basicData) return 'N/A';
        const projectType = basicData.projectTypes.find(pt => pt.id === id);
        return projectType ? projectType.type_name : 'N/A';
    };

    const getRegionName = (id: number) => {
        const region = regions.find(r => r.id === id);
        return region ? region.name : 'N/A';
    };

    const regions = [
        { id: 1, name: 'AMER' },
        { id: 2, name: 'APAC' },
        { id: 3, name: 'EMEA' }
    ];

    return (
        <div className="floating-container">
            <div className="floating-content">
                <button className="close-button" onClick={onClose}>X</button>
                <div className="form">
                    <div className="inner_form">
                        <div className='grid'>
                            <div>
                                <h4>Project Details</h4>
                                <input type="text" value={project.project_name} readOnly />
                                <br />
                                <h4>Project Code</h4>
                                <input type="text" value={project.project_code} readOnly />
                                <div>
                                    <h4>Project Type</h4>
                                    <input type="text" value={getProjectTypeName(project.project_type_id)} readOnly />
                                </div>
                                <h4>Platform</h4>
                                <input type="text" value={getPlatformName(project.platform_id)} readOnly />
                                <div>
                                    <h4>Region</h4>
                                    <input type="text" value={getRegionName(project.region_id)} readOnly />
                                </div>
                            </div>
                            <div className="grid">
                                <div className="col-span-1">
                                    <h3>Modules</h3>
                                    {project.modules.map((module, index) => (
                                        <div key={index}>
                                            <input type="text" value={module.module_name} readOnly />
                                            <br />
                                        </div>
                                    ))}
                                </div>
                                <div className="col-span-1">
                                    <div>
                                        <h3>Environments</h3>
                                    </div>
                                    {project.environments.map((environment, index) => (
                                        <div key={index}>
                                            <input type="text" value={environment.environment_name} readOnly />
                                            <br />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button onClick={onShowCloseProject}>Close Project</button> {/* Add this button */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FloatingProjectDetails;