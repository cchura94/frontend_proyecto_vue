<template>
    <div class="card">
        <DataTable :value="sucursales" tableStyle="min-width: 50rem">
            <Column field="id" header="ID"></Column>
            <Column field="nombre" header="NOmbre"></Column>
            <Column field="direccion" header="Direccion"></Column>
            <Column field="ciudad" header="Ciudad"></Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import * as sucursalService from "./../../../services/sucursal.service"


const sucursales = ref([]);

onMounted(() => {
    getSucursales();
})

const getSucursales = async () => {
    const {data} = await sucursalService.listar();
    sucursales.value = data;
}
</script>