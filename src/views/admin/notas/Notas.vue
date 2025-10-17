<template>
    <div class="card">
        <h1>Gestión Notas</h1>

        <Button label="Compras" icon="pi pi-check" iconPos="right" @click="funCompras()"  />
        <Button label="Ventas" icon="pi pi-search" iconPos="right" @click="funVentas()"/>

        <input type="date" v-model="fecha_inicio">
        <input type="date" v-model="fecha_fin">
        
        <!--
        <DatePicker dateFormat="yy-mm-dd" v-model="fecha_inicio" />
        <DatePicker dateFormat="yy-mm-dd" v-model="fecha_fin" />
        -->

        <DataTable :value="notas" tableStyle="min-width: 50rem" >
            <Column field="fecha" header="FECHA"></Column>
            <Column field="tipo_nota" header="TIPO"></Column>
            <Column field="cliente.correo" header="CLIENTE"></Column>
            <Column field="user.email" header="ATENDIDO POR"></Column>
            <Column :exportable="false">
                <template #body="slotProps">

                    <Button label="Ver Detalle" @click="funMostrarDetalles(slotProps.data)" />

                </template>
            </Column>


        </DataTable>

        <Dialog v-model:visible="visibleMovimientos" modal header="Detalle Movimientos" :style="{ width: '50rem' }">
            <h6>Recibo # {{ detalle_nota.id }}</h6>
            <span class="text-surface-500 dark:text-surface-400 block mb-2">{{detalle_nota.cliente.tipo}}: {{detalle_nota.cliente.razon_social}} / {{ detalle_nota.cliente.correo }}</span>
            <span class="text-surface-500 dark:text-surface-400 block mb-2">Atendido Por: {{detalle_nota.user.email}}</span>

            <div>
                <DataTable :value="detalle_nota.movimientos">
                    <Column field="id" header="ID"></Column>
                    <Column field="tipo_movimiento" header="Tipo M"></Column>
                    <Column field="producto.nombre" header="PRODUCTO"></Column>
                    <Column field="almacen.nombre" header="ALMACEN"></Column>
                    <Column field="cantidad" header="CANTIDAD"></Column>
                    <Column field="precio_unitario_venta" header="P. Venta"></Column>
                    <Column field="precio_unitario_compra" header="P Compra"></Column>

                    
                </DataTable>
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cerrar" severity="secondary" @click="visibleMovimientos = false"></Button>
            </div>
        </Dialog>

    <!--{{ notas }} -->

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import notaService from '../../../services/nota.service';

const notas = ref([]);
const visibleMovimientos = ref(false)
const detalle_nota = ref({})
const fecha_inicio = ref(new Date('2025-01-10'));
const fecha_fin = ref(new Date('2025-10-10'))

onMounted(() => {
    getNotas()
})

async function getNotas(tipo_nota = 'venta'){
    try {
        const {data} = await notaService.listar(tipo_nota, fecha_inicio.value, fecha_fin.value);
        notas.value = data;
        
    } catch (error) {
        notas.value = [];
    }
}

async function funCompras(){
    getNotas('compra');
}

async function funVentas(){
    getNotas('venta');
}

function funMostrarDetalles(dn: any){
    detalle_nota.value = dn;
    visibleMovimientos.value = true;
}

</script>