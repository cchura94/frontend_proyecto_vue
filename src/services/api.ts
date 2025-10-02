import axios from 'axios'

export const BASE_URL = "http://127.0.0.1:3000"; // "https://laravue2.blumbit.net/back/public/api";
export const BASE_URL_API = `${BASE_URL}`;

const intance = axios.create({
    baseURL: BASE_URL_API
});

// interceptores ... (CLIENTE - header (TOKENS))

// interceptores ... (SERVIDOR - errores)

export default intance;