import api from "./api";

export async function listar(){
    return await api.get(`/almacen`);
}

export async function guardar(datos: any){
    return await api.post(`/almacen`, datos);
}

export async function mostrar(id: number){
    return await api.get(`/almacen/${id}`);
}

export async function modificar(id: number, datos: any){
    return await api.patch(`/almacen/${id}`, datos);
}

export async function eliminar(id: number){
    return await api.delete(`/almacen/${id}`);
}