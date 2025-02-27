import { UpdateToken,getInstance } from './UpdateToken';

UpdateToken("Tasks")
const instance = getInstance()

interface TaskData {
    // Define the structure of your project data here
    [key: string]: any;
}

const postTask = async (data: TaskData): Promise<any> => {
    return await instance!.post('', data, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Expose-Headers': '*'
        }
    });
};

const getAllTasks = async (page: number): Promise<any> => {
    return await instance!.get('', {
        params: {
            page: page
        }
    });
};

export {
    postTask, UpdateToken, getAllTasks
};
