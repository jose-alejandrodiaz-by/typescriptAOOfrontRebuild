//Going to receive a Project object like this:
/*completed
: 
false
created_by
: 
8
created_by_name
: 
"jdiaz"
created_on
: 
"2025-01-25T20:00:22.0046114"
environments
: 
(2) [{…}, {…}]
id
: 
191
modules
: 
[{…}]
platform_id
: 
1
project_code
: 
"nwotest2"
project_name
: 
"nwotest2"
project_type_id
: 
1
region_id
: 
2
we need a banner type component that has the project name, the project type id, the project code, created by name and  created on
*/
import React from 'react';
import { Project } from '../../../models/Project';
import './../Projects.css';

interface ProjectSummaryProps {
    project: Project;
}

const ProjectSummaryComponent: React.FC<ProjectSummaryProps> = ({ project }) => {
    return (
        <div className="project-summary-banner">
            <h4 className='item'>{project.project_name}</h4>
            <p className='item'>{project.project_type_id}</p>
            <p className='item'>{project.project_code}</p>
            <p className='item'>{project.created_by_name}</p>
            <p className='item'>{project.created_on ? new Date(project.created_on).toLocaleDateString() : 'N/A'}</p>
        </div>
    );
};

export default ProjectSummaryComponent;