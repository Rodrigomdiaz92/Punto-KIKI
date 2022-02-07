//ejecucion del programa
$(document).ready(getProductosjson());
productos.addEventListener("click", sumarAlCarrito);
filtrado.addEventListener("click", sumarAlCarrito);
sumaTotal.addEventListener("click", eliminarCarrito);
sumaTotal.addEventListener("click", confirmacionCompra);
$("#borrarfiltros").click(eliminarFiltro);
$("#deco").click(filtroDeco);
$("#accesorios").click(filtroAccesorios);
$("#muñecos").click(filtroMuñecos);
$("#toggle").click(mostrarCarrito);
$("#volver-tienda").click(volverATienda);
$("#volver-tienda-final").click(volverATienda);
$("#confirmar-compra").click(confirmarCompra);
