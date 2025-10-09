import { createRouter, createWebHistory } from "vue-router";
import Inicio from "../views/web/Inicio.vue";
import Nosotros from "../views/web/Nosotros.vue";
import Servicios from "../views/web/Servicios.vue";
import Login from "../views/auth/Login.vue";
import AppLayout from "../layout/AppLayout.vue";
import Perfil from "../views/admin/perfil/Perfil.vue";
import Usuario from "../views/admin/user/Usuario.vue";
import SitioLayout from "../layout/SitioLayout.vue";
import Inventario from "../views/admin/inventario/Inventario.vue";
import Categoria from "../views/admin/inventario/Categoria.vue";
import Producto from "../views/admin/inventario/Producto.vue";
import Sucursal from "../views/admin/inventario/Sucursal.vue";
import Almacen from "../views/admin/inventario/Almacen.vue";

const routes = [
    {
        path: '/',
        component: SitioLayout,
        children: [
            { path: '/', component: Inicio },
            { path: '/nosotros', component: Nosotros },
            { path: '/servicios', component: Servicios },
            {
                path: "/auth/login",
                component: Login,
                name: 'Login'
            },
        ]
    },
    {
        path: '/admin',
        component: AppLayout,
        children: [
            {
                path: 'perfil',
                component: Perfil
            },
            {
                path: 'usuario',
                component: Usuario
            },
            {
                path: 'inventario',
                component: Inventario,
                children: [
                    { path: 'categoria', component: Categoria },
                    { path: 'producto', component: Producto },
                    { path: 'sucursal', component: Sucursal },
                    { path: 'almacen', component: Almacen },
                ]
            }
        ]
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});