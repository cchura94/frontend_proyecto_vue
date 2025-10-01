<script setup lang="ts">

</script>

<template>
    <h1>App.vue</h1>

    <nav>
      <RouterLink to="/">INICIO</RouterLink> |
      <RouterLink to="/nosotros">Acerca de Nosotros</RouterLink> |
      <RouterLink to="/servicios">Nuestros Servicios</RouterLink>
    </nav>

    <RouterView />

</template>

