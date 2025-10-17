<template>
    <h1>Gestión Clientes</h1>
    {{ clientes }}
    <DataTable :value="clientes" tableStyle="min-width: 50rem">
        <Column field="id" header="Code"></Column>
        <Column field="tipo" header="Tipo Cliente"></Column>
        <Column field="razon_social" header="RAZON Social"></Column>
        <Column field="ci_nit_ruc_rut" header="NIT/CI/RUT"></Column>
        <Column field="direccion" header="DIRECCION"></Column>
</DataTable>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import clienteService from "./../../../services/cliente.service";

    const clientes = ref([]);

    onMounted(() => {
        getClientes();
    })

    async function getClientes(){
        const {data} = await clienteService.listar();
        clientes.value = data;
    }
</script>