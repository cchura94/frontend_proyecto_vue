import api from "./api";

export default {

    async listar(){
        return await api.get(`/cliente`);
    },
    
    async guardar(datos: any){
        return await api.post(`/cliente`, datos);
    },
    
    async mostrar(id: number){
        return await api.get(`/cliente/${id}`);
    },
    
     async modificar(id: number, datos: any){
        return await api.patch(`/cliente/${id}`, datos);
    },
    
     async eliminar(id: number){
        return await api.delete(`/cliente/${id}`);
    }
}
