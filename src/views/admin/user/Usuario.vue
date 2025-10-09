<template>
  <div class="card">
    <h1>Usuarios</h1>

    <button
      @click="crearNuevoUsuario"
      class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
    >
      Crear Usuario
    </button>

    <div
      v-if="openModal"
      class="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50"
    >
      <div
        class="bg-white w-96 p-6 rounded-lg shadow-xl border border-blue-500"
      >
        <h2 class="text-2xl font-semibold text-center mb-4">
          Registro de Usuario
        </h2>

        <!--{{ usuario }}-->
        <form @submit.prevent="guardarUsuario">
          <div class="mb-4">
            <label for="name">Ingrese Nombre</label>
            <input
              type="text"
              id="name"
              v-model="usuario.name"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div class="mb-4">
            <label for="email">Ingrese Correo</label>
            <input
              type="email"
              id="email"
              v-model="usuario.email"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div class="mb-4">
            <label for="pass">Ingrese Contraseña</label>
            <input
              type="password"
              id="pass"
              v-model="usuario.password"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div class="flex justify-between mt-6">
            <button
              @click="openModal = false"
              class="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-md text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>


    <DataTable :value="usuarios" tableStyle="min-width: 50rem" :paginator="true"  :rows="3"  :rowsPerPageOptions="[5, 10, 25]">
        <Column field="name" header="NOMBRE"></Column>
        <Column field="email" header="CORREO"></Column>
        <Column field="estado" header="ESTADO"></Column>
        <Column field="roles" header="ROLES">
            <template #body="slotProps">
                <Chip :label="rol.name" v-for="rol in slotProps.data.roles" :key="rol.id" />
            </template>
        </Column>
        <Column :exportable="false" style="min-width: 12rem">
            <template #body="slotProps">
                <Button icon="pi pi-pencil" rounded class="mr-2" @click="editarUsuario(slotProps.data)" />
                <Button icon="pi pi-trash" rounded severity="danger" @click="eliminarUsuario(slotProps.data)" />
            </template>
        </Column>
    </DataTable>

    <table class="min-w-full divide-y shadow-md rounded overflow-hidden">
      <thead class="bg-gray-100">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
          >
            NOMBRE
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
          >
            CORREO ELECTRONICO
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
          >
            ESTADO
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
          >
            ROLES
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
          >
            ACCIONES
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="us in usuarios">
          <td class="px-6 py-2 whitespace-nowrap text-sm">{{ us["name"] }}</td>
          <td class="px-6 py-2 whitespace-nowrap text-sm">{{ us["email"] }}</td>
          <td class="px-6 py-2 whitespace-nowrap text-sm">
            <span
              :class="
                us['estado'] === true
                  ? 'text-green-600 font-semibold'
                  : 'text-red-600 font-semibold'
              "
            >
              {{ us["estado"] ? "Activo" : "Inactivo" }}
            </span>
          </td>
          <td>
            <ul>
                <li v-for="rol in us['roles']" :key="rol['id']">{{ rol['name'] }}</li>
            </ul>
          </td>
          <td class="px-6 py-2 whitespace-nowrap text-sm">
            <button
              @click="editarUsuario(us)"
              class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            >
              editar
            </button>
            <button
              @click="eliminarUsuario(us)"
              class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <pre>{{ usuarios }}</pre>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import * as userService from "./../../../services/user.service";
// import algo, { guardarApiUsuario } from "./../../../services/user.service";

const usuarios = ref([]);
const openModal = ref(false);
const usuario = ref({
  id: "",
  estado: true,
  roles: [],
  email: "",
  name: "",
  password: "",
});

onMounted(() => {
  obtenerUsuarios();
});

async function obtenerUsuarios() {
  try {
    // const { data } = await userService.listarApiUsuario()
    // usuarios.value = data;
    const respuesta = await userService.listarApiUsuario();
    usuarios.value = respuesta.data;
  } catch (error) {
    console.log(error);
  }
}

function crearNuevoUsuario() {
  usuario.value = {
    id: "",
    email: "",
    name: "",
    password: "",
    estado: true,
    roles: [],
  };
  openModal.value = true;
}

async function guardarUsuario() {
  try {
    if (usuario.value.id) {
      const { id, estado, roles, ...rest } = usuario.value;
      const { data } = await userService.modificarApiUsuario(id, rest);
      console.log(data);
      obtenerUsuarios();
      openModal.value = false;
      usuario.value = {
        id: "",
        email: "",
        name: "",
        password: "",
        estado: true,
        roles: [],
      };
    } else {
      const { id, ...rest } = usuario.value;

      const { data } = await userService.guardarApiUsuario(rest);
      console.log(data);
      obtenerUsuarios();
      openModal.value = false;
      usuario.value = {
        id: "",
        email: "",
        name: "",
        password: "",
        estado: true,
        roles: [],
      };
    }
  } catch (error) {
    alert("Error al registrar el usuario");
  }
}

function editarUsuario(us: any) {
  console.log(us);
  const { password, roles, estado, ...resto } = us;
  usuario.value = resto;
  openModal.value = true;
}

async function eliminarUsuario(us: any) {
  if (confirm("Está seguro de elminar al usuario?")) {
    await userService.eliminarApiUsuario(us.id);
    obtenerUsuarios();
  }
}
</script>
