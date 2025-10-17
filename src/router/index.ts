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
import Notas from "../views/admin/notas/Notas.vue";
import Cliente from "../views/admin/notas/Cliente.vue";
import NuevaNota from "../views/admin/notas/NuevaNota.vue";

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
                name: 'Login',
                meta: {redirectIfAuth: true}
            },
        ]
    },
    {
        path: '/admin',
        component: AppLayout,
        meta: { requireAuth: true },
        children: [
            {
                path: 'perfil',
                component: Perfil,
                meta: { requireAuth: true },
            },
            {
                path: 'usuario',
                component: Usuario,
                name: 'Usuario',
                meta: { requireAuth: true },
            },
            {
                path: 'inventario',
                component: Inventario,
                meta: { requireAuth: true },
                children: [
                    { path: 'categoria', component: Categoria, meta: { requireAuth: true }, },
                    { path: 'producto', component: Producto, meta: { requireAuth: true }, },
                    { path: 'sucursal', component: Sucursal, meta: { requireAuth: true }, },
                    { path: 'almacen', component: Almacen, meta: { requireAuth: true }, },
                ]
            },
            {
                path: 'cliente',
                component: Cliente
            },
            {
                path: 'notas',
                component: Notas
            },
            {
                path: 'nota/nuevo',
                component: NuevaNota
            }
        ]
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});

// Guards

router.beforeEach((to, from, next) => {

    const token = localStorage.getItem("access_token");

    if(to.meta.requireAuth){
        if(!token){
            return next({name: 'Login'})
        }
        return next();
    }

    if(to.meta.redirectIfAuth && token){
        return next({name: 'Usuario'})
    }

    return next();
});
