import axios, { AxiosInstance } from 'axios';
import {getToken} from '../utils/loginUtils';

// import { ApiURL } from '../common_tools/ApiURL';

let instance: AxiosInstance | null = null;

export const UpdateToken = (endpoint:string): void => {
  instance = axios.create({
    // baseURL: "https://localhost:7041/api/",
    baseURL: `/api/${endpoint}/`,
    timeout: 100000,
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};
export const getInstance = (): AxiosInstance | null => instance;
export default instance;
