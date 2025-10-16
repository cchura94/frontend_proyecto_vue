import api from "./api";

export async function listar(){
    return await api.get(`/sucursal`);
}

export async function guardar(datos: any){
    return await api.post(`/sucursal`, datos);
}

export async function mostrar(id: number){
    return await api.get(`/sucursal/${id}`);
}

export async function modificar(id: number, datos: any){
    return await api.patch(`/sucursal/${id}`, datos);
}

export async function eliminar(id: number){
    return await api.delete(`/sucursal/${id}`);
}