<template>
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <Button label="Nuevo Producto" icon="pi pi-plus" class="mr-2" @click="openNew" />
                </template>

                <template #end>
                    <Button label="Exportar" icon="pi pi-upload" severity="secondary" @click="exportCSV()" />
                </template>
            </Toolbar>

            <DataTable
                ref="dt"
                :value="productos"
                dataKey="id"
                :paginator="true"
                :rows="10"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Mostrando {first} al {last} de {totalRecords} productos"
            >
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">Gestión Productos</h4>
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText placeholder="Buscar..." />
                        </IconField>
                    </div>
                </template>

                <Column field="id" header="ID" sortable style="min-width: 2rem"></Column>
                <Column field="nombre" header="NOMBRE" sortable style="min-width: 8rem"></Column>
                <Column header="Imagen">
                    <template #body="slotProps">
                        <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.imagen}`" :alt="slotProps.data.imagen" class="rounded" style="width: 64px" />
                    </template>
                </Column>
                <Column field="precio_venta_actual" header="precio_venta_actual" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.precio_venta_actual) }}
                    </template>
                </Column>
                <Column field="activo" header="Estado" sortable style="min-width: 3rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.estado?'ACTIVO':'INACTIVO'" :severity="getStatusLabel(slotProps.data.estado)" />
                    </template>
                </Column>
                <Column :exportable="false" style="min-width: 12rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" variant="outlined" rounded class="mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" variant="outlined" rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as productoService from "./../../../services/producto.service"


    const dt = ref();
    const productos = ref([]);
    const product = ref({});
    const productDialog = ref(false);
    const deleteProductDialog = ref(false);

    onMounted(() => {
        getProductos()
    })

    const getProductos = async () => {
        const {data} = await productoService.listar();
        productos.value = data.data
    }

    const exportCSV = () => {
        dt.value.exportCSV();
    };

    const openNew = () => {

    }

    const formatCurrency = (value: any) => {
    if(value)
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    return;
    };

    const editProduct = (prod: any) => {
        product.value = {...prod};
        productDialog.value = true;
    };
    const confirmDeleteProduct = (prod: any) => {
        product.value = prod;
        deleteProductDialog.value = true;
    };

    const getStatusLabel = (status: any) => {
        switch (status) {
            case true:
                return 'success';

            case false:
                return 'warn';

            default:
                return 'danger';
        }
    };
</script>