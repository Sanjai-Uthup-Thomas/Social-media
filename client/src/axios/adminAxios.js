import axios from "axios";
// const baseURL = "http://localhost:4000/api/admin"
const baseURL = "https://sanjaiuthupthomas.in/api/admin/"


const defaultOptions = {
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
};


const instance = axios.create(defaultOptions);

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("admin-auth-token");
    config.headers = { "x-auth-admin": token }
    return config;
});

export default instance