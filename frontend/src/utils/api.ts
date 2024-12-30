import axios from "axios";

const serverURI = import.meta.env.VITE_BASE_URL || "http://localhost:3001"
const api = axios.create({
    baseURL: serverURI,
});

export {api, serverURI};