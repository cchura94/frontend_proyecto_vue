import api from "./api";

export async function listar(){
    return await api.get(`/categoria`);
}

export async function guardar(datos: any){
    return await api.post(`/categoria`, datos);
}

export async function mostrar(id: number){
    return await api.get(`/categoria/${id}`);
}

export async function modificar(id: number, datos: any){
    return await api.patch(`/categoria/${id}`, datos);
}

export async function eliminar(id: number){
    return await api.delete(`/categoria/${id}`);
}