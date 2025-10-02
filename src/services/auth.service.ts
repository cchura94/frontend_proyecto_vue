import api from './api';

export async function loginApiBackend(credenciales: any){
    const respuesta = await api.post('/auth/login', credenciales);
    return respuesta.data;
} 