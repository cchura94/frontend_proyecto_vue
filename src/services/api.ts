import axios from 'axios'

export const BASE_URL = "http://127.0.0.1:3000"; // "https://laravue2.blumbit.net/back/public/api";
export const BASE_URL_API = `${BASE_URL}`;

const intance = axios.create({
    baseURL: BASE_URL_API
});

// interceptores ... (CLIENTE - header (TOKENS))
intance.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

// interceptores ... (SERVIDOR - errores)
intance.interceptors.response.use(
    (respuesta) => {
        return respuesta;
    },
    (error) => {
        if(error.response?.status === 401){
            localStorage.removeItem("access_token");
            location.href = "/auth/login";
        }
        return Promise.reject(error);
    }
)


export default intance;