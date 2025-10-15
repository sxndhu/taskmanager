import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/"

const api = axios.create({
    baseURL: API_URL,
});

// Request interceptor logic here: attach access token to every request
api.interceptors.request.use((config) => {
    const access = localStorage.getItem("access");
    if (access){
        config.headers["Authorization"] = `Bearer ${access}`;
    }
    return config;
});

// Response interceptor logic: refresh the access token if 401 received
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            const refresh = localStorage.getItem("refresh");

            try {
                const res = await axios.post(`${API_URL}auth/token/refresh/`, {refresh, });
                localStorage.setItem("access", res.data.access);
                originalRequest.headers["Authorization"] = `Bearer ${res.data.access}`;
                return api(originalRequest);

            } catch (refreshError) {
                console.error("Refresh token expired. Redirecting to login page.");
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error)
    }
);

export default api;