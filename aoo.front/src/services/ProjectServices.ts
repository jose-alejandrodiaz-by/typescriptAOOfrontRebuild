import { UpdateToken,getInstance } from './UpdateToken';

UpdateToken("Projects")
const instance = getInstance()

interface ProjectData {
    // Define the structure of your project data here
    [key: string]: any;
}

const postProject = async (data: ProjectData): Promise<any> => {
    return await instance!.post('', data, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Expose-Headers': '*'
        }
    });
};

const patchProject = async (id: string): Promise<any> => {
    return await instance!.patch(`${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Expose-Headers': '*'
        }
    });
};

const getProject = async (id: string): Promise<any> => {
    const response = await instance!.get(`/${id}`);
    return response.data;
};

const getAllProjects = async (page: number): Promise<any> => {
    return await instance!.get('', {
        params: {
            page: page
        }
    });
};



export {
    getProject, getAllProjects, postProject, UpdateToken, patchProject
};
