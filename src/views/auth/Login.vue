<template>
  <div class="pt-24 flex justify-center items-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg w-lg text-black">
      <h1 class="text-2xl font-semibold text-center mb-6">Ingresar</h1>
      <pre>{{ respuesta }}</pre>
      <div>
        <label for="em" class="block text-sm font-medium text-gray-700"
          >Correo:</label
        >
        <input
          type="email"
          v-model="credenciales.email"
          class="w-full p-3 mt-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label for="pass" class="block text-sm font-medium text-gray-700"
          >Contraseña:</label
        >
        <input
          type="password"
          v-model="credenciales.password"
          class="w-full p-3 mt-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        type="button"
        @click="funLogin()"
        class="w-full py-3 mt-6 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Ingresar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { loginApiBackend } from "./../../services/auth.service";
import { useRouter } from "vue-router";

const credenciales = ref({ email: "", password: "" });
const respuesta = ref({});

const router = useRouter()

onMounted(() => {
  // funLogin();
});

async function funLogin() {

  try {
    const res = await loginApiBackend(credenciales.value);
    console.log(res);
    respuesta.value = res;
  
    router.push("/admin/usuario")
    
  } catch (error) {
    alert("Error al intentar iniciar sesion")
  }
}
</script>
