import api from "./api";

export async function listar(page: number=1, limit:number = 10, search:string='', sortBy:string='id',order:'ASC'|'DESC'='DESC', almacen:number=1, activo:boolean=true){
    return await api.get(`/producto?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&order=${order}&almacen=${almacen}&activo=${activo}`);
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