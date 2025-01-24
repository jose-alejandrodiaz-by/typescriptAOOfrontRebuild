import axios, { AxiosInstance } from 'axios';
import {getToken} from '../utils/loginUtils';
// import { ApiURL } from '../common_tools/ApiURL';

let instance: AxiosInstance | null = null;

export const UpdateToken = (): void => {
  instance = axios.create({
    // baseURL: "https://localhost:7041/api/",
    baseURL: `/api/Projects`,
    timeout: 100000,
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

export default instance;
