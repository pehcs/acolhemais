import axios from "axios";

const serverURI = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

const api = axios.create({
    baseURL: serverURI,
    withCredentials: true,
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export {api, serverURI};
