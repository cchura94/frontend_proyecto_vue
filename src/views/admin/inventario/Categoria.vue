<template>
  <h1>Gestión Categorias</h1>

  <Button label="Nueva Categoria" @click="visible = true" />

  <Dialog
    v-model:visible="visible"
    modal
    header="Edit Profile"
    :style="{ width: '25rem' }"
  >
    <span class="text-surface-500 dark:text-surface-400 block mb-8"
      >Datos de Categoria.</span
    >
    <div class="flex items-center gap-4 mb-4">
        
      <label for="nom" class="font-semibold w-24">Nombre</label>
      <InputText
        id="nom"
        class="flex-auto"
        autocomplete="off"
        v-model="categoria.nombre"
      />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="desc" class="font-semibold w-24">Descripción</label>
      <InputText
        id="desc"
        class="flex-auto"
        autocomplete="off"
        v-model="categoria.descripcion"
      />
    </div>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Cancelar"
        severity="secondary"
        @click="visible = false"
      ></Button>
      <Button type="button" label="Guardar" @click="funGuardar()"></Button>
    </div>
  </Dialog>

  <DataTable :value="categorias" tableStyle="min-width: 50rem">
    <Column field="id" header="ID"></Column>
    <Column field="nombre" header="NOMBRE"></Column>
    <Column field="descripcion" header="DESCRIPCIÓN"></Column>
    <Column :exportable="false" style="min-width: 12rem">
      <template #body="slotProps">
        <Button
          icon="pi pi-pencil"
          class="mr-2"
          @click="editarCategoria(slotProps.data)"
        />
        <Button
          icon="pi pi-trash"
          rounded
          severity="danger"
          @click="confirmarEliminacionCategoria(slotProps.data)"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as categoriaService from "./../../../services/categoria.service";

const categorias = ref([]);
const visible = ref(false);

const categoria = ref({ id: -1, nombre: "", descripcion: "" });

onMounted(() => {
  getCategorias();
});

async function getCategorias() {
  try {
    const { data } = await categoriaService.listar();
    categorias.value = data;
  } catch (error) {
    alert("Ocurrió un error al intentar listar la categoria");
  }
}

async function funGuardar() {
  try {

    const {id, ...resto_datos_categoria} = categoria.value; 
    if (categoria.value.id > 0) {
      // modificar
      await categoriaService.modificar(categoria.value.id, resto_datos_categoria);
      getCategorias();

      visible.value = false;
    } else {
      await categoriaService.guardar(resto_datos_categoria);
      getCategorias();

      visible.value = false;
    }
    categoria.value = { id: -1, nombre: "", descripcion: "" };
  } catch (error) {
    alert("Error al registrar la categoria");
  }
}

async function editarCategoria(cat: any) {
  categoria.value = cat;
  visible.value = true;
}
async function confirmarEliminacionCategoria(cat: any) {
  if (confirm("¿Está seguro de eliminar la categoria?")) {

    await categoriaService.eliminar(cat.id);
    getCategorias();
  }
}
</script>
