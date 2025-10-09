<script setup lang="ts">
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model: any = ref([
    {
        label: 'Administración',
        items: [{ label: 'Admin', icon: 'pi pi-fw pi-home', to: '/admin' }]
    },
    {
        label: 'Seguridad',
        items: [
            { label: 'Usuarios', icon: 'pi pi-fw pi-id-card', to: '/admin/usuario' },
            { label: 'Roles', icon: 'pi pi-fw pi-check-square', to: '/admin/roles' }
        ]
    },
    {
        label: 'Gestión Inventarios',
        items: [
            { label: 'Categorias', icon: 'pi pi-fw pi-check-square', to: '/admin/inventario/categoria' },
            { label: 'Productos', icon: 'pi pi-fw pi-table', to: '/admin/inventario/producto' },
            { label: 'Almacen', icon: 'pi pi-fw pi-list', to: '/admin/inventario/almacen' },
            { label: 'Sucursal', icon: 'pi pi-fw pi-share-alt', to: '/admin/inventario/sucursal' }
        ]
    },
    {
        label: 'Gestión Pedidos',
        icon: 'pi pi-fw pi-briefcase',
        to: '/pages',
        items: [
            {
                label: 'Compras',
                icon: 'pi pi-fw pi-globe',
                to: '/landing'
            },
            {
                label: 'Ventas',
                icon: 'pi pi-fw pi-pencil',
                to: '/pages/crud'
            }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
