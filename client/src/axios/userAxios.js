import axios from "axios";
const baseURL = "http://localhost:4000/api"

const defaultOptions = {
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
};


const instance = axios.create(defaultOptions);

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers = { "x-auth-token": token }
    return config;
});

export default instance


