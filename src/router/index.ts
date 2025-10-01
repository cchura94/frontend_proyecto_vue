import { createRouter, createWebHistory } from "vue-router";
import Inicio from "../views/web/Inicio.vue";
import Nosotros from "../views/web/Nosotros.vue";
import Servicios from "../views/web/Servicios.vue";

const routes = [
    { path: '/', component: Inicio },
    { path: '/nosotros', component: Nosotros },
    { path: '/servicios', component: Servicios },
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});