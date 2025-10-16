<template>
    <div class="card">
        <h1>Gestión Almacenes</h1>

        {{ almacenes }}
        <DataTable :value="almacenes" tableStyle="min-width: 50rem">
            <Column field="id" header="ID"></Column>
            <Column field="nombre" header="NOMBRE"></Column>
            <Column field="codigo" header="CODIGO"></Column>
            <Column field="sucursal.nombre" header="SUCURSAL"></Column>
        </DataTable>


    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as almacenService from "./../../../services/almacen.service"

const almacenes = ref([]);

onMounted(() => {
    getAlmacenes()
})

const getAlmacenes = async () => {
    try {
        const {data} = await almacenService.listar();
        almacenes.value = data;
        
    } catch (error) {
        
    }
}
</script>