<template>
    <div class="card">
        <nav>
            <RouterLink to="/admin/inventario/categoria">Categoria</RouterLink> /
            <RouterLink to="/admin/inventario/producto">Producto</RouterLink> /
            <RouterLink to="/admin/inventario/almacen">Almacen</RouterLink> /
            <RouterLink to="/admin/inventario/sucursal">Sucursal</RouterLink> 
        </nav>
    
        <router-view></router-view>

    </div>
</template>