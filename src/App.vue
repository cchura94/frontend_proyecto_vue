<script setup lang="ts">
import { ref } from 'vue';
import Prueba from './views/Prueba.vue';

  const titulo = ref<string>('Proyecto de VUE con Typescript');

</script>

<template>
  <h1>{{ titulo }}</h1>
  <Prueba></Prueba>

</template>

<style scoped>
  h1{
    color: #0000FF;
  }
</style>
