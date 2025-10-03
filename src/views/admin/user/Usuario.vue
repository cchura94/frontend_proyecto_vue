<template>
    <h1>Usuarios</h1>
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