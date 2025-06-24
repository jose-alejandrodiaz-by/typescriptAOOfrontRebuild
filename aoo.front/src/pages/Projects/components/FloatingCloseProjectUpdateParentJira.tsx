import React, { useState } from 'react';
import { Project } from '../../../models/Project';
import { ProjectDetails } from '../../../models/ProjectDetails';
import { useCompleteProject, usePostProjectDetails } from '../../../hooks/ProjectHooks';
import '../Projects.css';

interface FloatingCloseProjectUpdateParentJiraProps {
    project: Project;
    onClose: () => void;
}

const FloatingCloseProjectUpdateParentJira: React.FC<FloatingCloseProjectUpdateParentJiraProps> = ({ project, onClose }) => {
    const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
        project_id: project.id!,
        main_sme: '',
        backup_sme: '',
        regional_backup: '',
        pem: '',
        functional_ss_poc: '',
        technical_ss_poc: '',
        partner: '',
        t_shirt_size: '',
        start_date: '',
        go_live_date: '',
        sign_off_date: '',
        customer_id: 0,
    });
    const completeProject = useCompleteProject();
    const postProjectDetails = usePostProjectDetails();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProjectDetails(prevDetails => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const isFormValid = () => {
        return Object.values(projectDetails).every(value => value !== '');
    };

    const handleSubmit = async () => {
        if (isFormValid()) {
            await postProjectDetails(projectDetails);
            await completeProject(project.id!);
            onClose();
        }
    };

    return (
        <div className="floating-container">
            <div className="floating-content">
                <button className="close-button" onClick={onClose}>X</button>
                <div className="form">
                    <div className="inner_form">
                        <h4>Update Project Details and Close Project</h4>
                        <div className='grid-3cols'>
                            <div className="col-span-1-type2">
                                <h4>Main SME</h4>
                                <input type="text" name="main_sme" value={projectDetails.main_sme} onChange={handleInputChange} />
                                <h4>Backup SME</h4>
                                <input type="text" name="backup_sme" value={projectDetails.backup_sme} onChange={handleInputChange} />
                                <h4>Regional Backup</h4>
                                <input type="text" name="regional_backup" value={projectDetails.regional_backup} onChange={handleInputChange} />
                                <h4>PEM</h4>
                                <input type="text" name="pem" value={projectDetails.pem} onChange={handleInputChange} />
                               </div>
                               <div className="col-span-1-type2">
                               <h4>Functional SS POC</h4>
                                <input type="text" name="functional_ss_poc" value={projectDetails.functional_ss_poc} onChange={handleInputChange} />
                                <h4>Technical SS POC</h4>
                                <input type="text" name="technical_ss_poc" value={projectDetails.technical_ss_poc} onChange={handleInputChange} />
                                <h4>Partner</h4>
                                <input type="text" name="partner" value={projectDetails.partner} onChange={handleInputChange} />
                                <h4>T-Shirt Size</h4>
                                <input type="text" name="t_shirt_size" value={projectDetails.t_shirt_size} onChange={handleInputChange} />
                               </div>
                        <div className="col-span-1-type2">
                                <h4>Start Date</h4>
                                <input type="date" name="start_date" value={projectDetails.start_date} onChange={handleInputChange} />
                                <h4>Go Live Date</h4>
                                <input type="date" name="go_live_date" value={projectDetails.go_live_date} onChange={handleInputChange} />
                                <h4>Sign Off Date</h4>
                                <input type="date" name="sign_off_date" value={projectDetails.sign_off_date} onChange={handleInputChange} />
                                <h4>Customer ID</h4>
                                <input type="number" name="customer_id" value={projectDetails.customer_id} onChange={handleInputChange} />
                            
                        </div>
                        </div>
                        <button className="submit-button" onClick={handleSubmit} disabled={!isFormValid()}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FloatingCloseProjectUpdateParentJira;