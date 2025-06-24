import { UpdateToken,getInstance } from './UpdateToken';

UpdateToken("ProjectDetails")
const instance = getInstance()

interface ProjectDetailData {
    // Define the structure of your project data here
    [key: string]: any;
}

const postProjectDetails = async (data: ProjectDetailData): Promise<any> => {
    return await instance!.post('', data, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Expose-Headers': '*'
        }
    });
};

export {
     UpdateToken,postProjectDetails
};