import axiosClient from "./AxiosClient.js";

export const authApi =
    {
        login: (username, password) => axiosClient.post('/users/auth', {username, password}),
        register: (username, password) => axiosClient.post('/users/register', {username, password}),
    }