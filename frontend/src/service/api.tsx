import axios from "axios";
import { useNavigate } from "react-router-dom";


const baseURL= "http://localhost:8080/api"
const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("accessToken");
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await axios.post(`${baseURL}/auth/refresh`, { refreshToken });

        const { accessToken } = res.data;
        localStorage.setItem("accessToken", accessToken);

        const roles = res.data.userRoles
          .map((role: { name: string }) => role.name)
          .join();
        localStorage.setItem("roles", roles);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        localStorage.clear();

        const navigate = useNavigate();
        navigate("/login");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
