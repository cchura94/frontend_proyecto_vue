import api from "./api";

export async function listar(){
    return await api.get(`/producto?page=1&limit=10&search=&sortBy=id&order=DESC&almacen=1&activo=true`);
}

export async function guardar(datos: any){
    return await api.post(`/producto`, datos);
}

export async function mostrar(id: number){
    return await api.get(`/producto/${id}`);
}

export async function modificar(id: number, datos: any){
    return await api.patch(`/producto/${id}`, datos);
}

export async function eliminar(id: number){
    return await api.delete(`/producto/${id}`);
}