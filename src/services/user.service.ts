import api from "./api";

export async function listarApiUsuario(){
    return await api.get(`/users`);
}

export async function guardarApiUsuario(datos: any){
    return await api.post(`/users`, datos);
}

export async function mostrarApiUsuario(id: string){
    return await api.get(`/users/${id}`);
}

export async function modificarApiUsuario(id: string, datos: any){
    return await api.patch(`/users/${id}`, datos);
}

export async function eliminarApiUsuario(id: string){
    return await api.delete(`/users/${id}`);
}