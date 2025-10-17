import api from "./api";

export default {

    async listar(tipo_nota='venta', fecha_inicio='', fecha_fin=''){
        return await api.get(`/nota?tipo_nota=${tipo_nota}&fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`);
    },
    
    async guardar(datos: any){
        return await api.post(`/nota`, datos);
    },
    
    async mostrar(id: number){
        return await api.get(`/nota/${id}`);
    },
    
     async modificar(id: number, datos: any){
        return await api.patch(`/nota/${id}`, datos);
    },
    
     async eliminar(id: number){
        return await api.delete(`/nota/${id}`);
    }
}
