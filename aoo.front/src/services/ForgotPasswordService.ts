import { AxiosResponse } from 'axios';
import { UpdateToken,getInstance } from './UpdateToken';

interface ForgotPasswordEmailData {
    email: string;
}

interface ResetPasswordData {
    email: string;
    token: string;
    password: string;
}

UpdateToken("Users")
const instance = getInstance()

const forgotPasswordEmail = async (data: ForgotPasswordEmailData): Promise<AxiosResponse> => {
    try {
        if (instance){
        const response = await instance.post('/ForgotPasswordEmail', data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Expose-Headers': '*'
            }
        });
        return response;
        }
            else   {
            throw new Error("Conection instance was null")
            }
        
    } catch (error) {
        console.log("An error has occurred");
        throw error;
    }
};

const resetPassword = async (data: ResetPasswordData): Promise<AxiosResponse> => {
    try {
        if (instance){
        const response = await instance.patch('/ResetPassword', data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Expose-Headers': '*'
            }
        });
        return response;}
        else {
            throw new Error ("Conection instance was null")
        }
    } catch (error) {
        console.log("Something went wrong while trying to reset password");
        throw error;
    }
};

export {
    forgotPasswordEmail,
    resetPassword
};
