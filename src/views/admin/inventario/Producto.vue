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
                lazy
                :loading="cargando"
                :totalRecords="totalRecords"
                dataKey="id"
                :paginator="true"
                :rows="5"
                @page="onPage($event)"
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
                            <InputText placeholder="Buscar..." v-model="buscar" @keyup.enter="getProductos()" />
                        </IconField>
                    </div>
                </template>

                <Column field="id" header="ID" sortable style="min-width: 2rem"></Column>
                <Column field="nombre" header="NOMBRE" sortable style="min-width: 8rem"></Column>
                <Column header="Imagen">
                    <template #body="slotProps">
                        <Image v-if="slotProps.data.imagen" :src="`http://127.0.0.1:3000/${slotProps.data.imagen}`" :alt="slotProps.data.imagen" width="70" preview />
                       <!--
                        <img v-if="slotProps.data.imagen" :src="`http://127.0.0.1:3000/${slotProps.data.imagen}`" :alt="slotProps.data.imagen" class="rounded" style="width: 64px" />
                    -->
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
                        <Button icon="pi pi-image" class="mr-2" @click="editDialogProductoImagen(slotProps.data)" />
                        <Button icon="pi pi-pencil" variant="outlined" rounded class="mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" variant="outlined" rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>


            <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Detalle de Producto" :modal="true">
                <div class="flex flex-col gap-6">
                    <pre>{{ product }}</pre>
                    <div>
                        <label for="name" class="block font-bold mb-3">Nombre</label>
                        <InputText id="name" v-model.trim="product.nombre" required="true" autofocus :invalid="submitted && !product.nombre" fluid />
                        <small v-if="submitted && !product.nombre" class="text-red-500">Nombre es Obligatorio.</small>
                    </div>
                    <div>
                        <label for="description" class="block font-bold mb-3">Descripción</label>
                        <Textarea id="description" v-model="product.descripcion" required="false" rows="3" cols="20" fluid />
                    </div>

                    <div>
                        <span class="block font-bold mb-4">Categoria</span>
                        <div class="grid grid-cols-12 gap-4">
                           
                            <div class="flex items-center gap-2 col-span-6" v-for="cat in categorias">
                               
                                <RadioButton :id="`category${cat.id}`" v-model="product.categoria" name="category" :value="cat['id']" />
                                <label :for="`category${cat.id}`">{{cat['nombre']}}</label>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-12 gap-4">
                        <div class="col-span-6">
                            <label for="price" class="block font-bold mb-3">Precio Venta Actual</label>
                            <InputText id="price" v-model="product.precio_venta_actual" mode="currency" currency="USD" locale="en-US" fluid />
                        </div>
                        <div class="col-span-6">
                            <label for="marca" class="block font-bold mb-3">Marca</label>
                            <InputText id="marca" v-model="product.marca" integeronly fluid />
                        </div>
                    </div>
                </div>

                <template #footer>
                    <Button label="Cancel" icon="pi pi-times" text @click="hideDialog()" />
                    <Button label="Save" icon="pi pi-check" @click="guardarProducto()" />
                </template>
            </Dialog>

            <Dialog v-model:visible="productDialogImagen" :style="{ width: '450px' }" header="Actualizar Imagen" :modal="true">
                <div class="flex flex-col gap-6">
                    <div>
                        <FileUpload customUpload name="demo[]" @uploader="subirImagenProducto" :multiple="false" accept="image/*" :maxFileSize="1000000">
                            <template #empty>
                                <span>Arrastrar y soltar para actualizar la imagen.</span>
                            </template>
                        </FileUpload>

                    </div>
                </div>

                <template #footer>
                    <Button label="Cancel" icon="pi pi-times" text @click="productDialogImagen=false" />
                </template>
            </Dialog>

        
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as productoService from "./../../../services/producto.service"
import * as categoriaService from "./../../../services/categoria.service"
import type CategoriaInterface from '../../../interfaces/CategoriaInterface';
import { InputText } from 'primevue';


    const dt = ref();
    const productos = ref([]);
    const product = ref({id: 0, nombre: '', descripcion: '', precio_venta_actual: "0", marca: '', unidad_medida: 'UNIDAD', estado: true, categoria: 0});
    const productDialog = ref(false);
    const deleteProductDialog = ref(false);
    const cargando = ref(false);
    const totalRecords = ref(0);
    const lazyParams = ref({page: 0, rows: 5})
    const buscar = ref("");
    const almacen = ref(0);
    const productDialogImagen = ref(false)

    const categorias = ref<CategoriaInterface[]>([]);


    const submitted = ref(true)

    onMounted(() => {
        getProductos();
        getCategorias();
    })

    const onPage = (event: any) => {
        console.log(event);

        lazyParams.value = event;
        getProductos();
    }

    const getProductos = async () => {
        cargando.value = true;

        const {data} = await productoService.listar(lazyParams.value.page + 1, lazyParams.value.rows, buscar.value, 'id', 'DESC', almacen.value);
        productos.value = data.data
        totalRecords.value = data.total;

        cargando.value = false;
    }

    const getCategorias =  async () => {
        const {data} = await categoriaService.listar();
        categorias.value = data  
    }

    const exportCSV = () => {
        dt.value.exportCSV();
    };

    const openNew = () => {
        productDialog.value = true
    }

    const editDialogProductoImagen = (prod: any) => {
        productDialogImagen.value = true;
        product.value = prod;
    }

    const subirImagenProducto = async (event: any) => {
        let formData = new FormData();
        formData.append("imagen", event.files[0]);

        await productoService.actualizarImagen(product.value.id, formData);

        getProductos();

        productDialogImagen.value = false;

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

    const hideDialog = () => {

    }

    const guardarProducto = async () => {
        try {
            product.value.precio_venta_actual = product.value.precio_venta_actual + "";
            const {id, ...resto_datos} = product.value;
            const {data} = await productoService.guardar(resto_datos);
            console.log(data);
            getProductos();
            productDialog.value = false;
    
            product.value = {id: 0, nombre: '', descripcion: '', precio_venta_actual: "0", marca: '', unidad_medida: 'UNIDAD', estado: true, categoria:0 }
        } catch (error) {
            console.log("ERROR: ", error);
        }
    }


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