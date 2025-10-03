<template>
    <h1>Usuarios</h1>
    <table>
        <thead>
            <tr>
                <th>NOMBRE</th>
                <th>CORREO ELECTRONICO</th>
                <th>ESTADO</th>
                <th>ACCIONES</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="us in usuarios">
                <td>{{ us['name'] }}</td>
                <td>{{ us['email'] }}</td>
                <td>{{ us['estado'] }}</td>
                <td>
                    <button>editar</button>
                    <button>eliminar</button>
                </td>
            </tr>
        </tbody>
    </table>
    <pre>{{ usuarios }}</pre>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import * as userService  from "./../../../services/user.service"
// import algo, { guardarApiUsuario } from "./../../../services/user.service";

const usuarios = ref([])

onMounted(() => {
    obtenerUsuarios();
})

async function obtenerUsuarios(){
    try {
        // const { data } = await userService.listarApiUsuario()
        // usuarios.value = data;
        const respuesta = await userService.listarApiUsuario()
        usuarios.value = respuesta.data
    } catch (error) {
        console.log(error);
    }
}
</script>