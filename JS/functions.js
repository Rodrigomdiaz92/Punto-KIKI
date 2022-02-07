//obtiene productos de Json y crea el carrito pendiente mediante localstorage

function getProductosjson() {
  $.get(URLGET, function (respuesta, estado) {
    if (estado === "success") {
      listaProductos = respuesta;
      crearProductos(listaProductos, productos);
      carritoPendiente();
    }
  });
  console.log(listaProductos);
}

//Crea en pantalla las cards de los productos en Stock

function crearProductos(productosExhibidos, ubicacion) {
  for (const producto of productosExhibidos) {
    $(ubicacion).append(`<div class="col d-flex justify-content-around"> 
                        <div class="card mb-3" style="max-width: 540px;">
                        <div class="row g-0">
                        <div class="col-md-4">
                        <img src="./img/${producto.nombre}/img1.png" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                        <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text text-dark">Precio $ ${producto.precio} Stock: ${producto.stock} unidades</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        <button id="${producto.id}" type="button" class="btn btn-success">Agregar al carrito</button>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>`);
  }
}

//Encuentra el producto seleccionado y empieza el circuito para sumarlo al carrito de compras

function sumarAlCarrito(e) {
  if (e.target.classList.contains("btn-success")) {
    const productoElegido = listaProductos.find(
      (producto) => producto.id == e.target.id
    );
    restarStock(productoElegido);
    calculoCompra(productoElegido);
    detalleDeCompra.push(productoElegido);
    agregarAlCarrito();
    console.log(listaProductos);
  }
}

//funciones de resta de stock y suma a la compra

function restarStock(producto) {
  if (producto.stock > 1) {
    producto.stock -= 1;
  } else {
    alert("No hay mas stock");
  }
}

function calculoCompra(producto) {
  total += producto.precio;
}

// genera la linea en el carrito en base a los productos seleccionados

function calculoTotal(monto) {
  totalFinal.innerHTML = `<h3>Total: $${monto}</h3>`;
  sumaTotal.innerHTML = ` <h3>Total a pagar $${monto} </h3> <button type="button" class="btn btn-danger">Eliminar Productos</button> <button type="button" class=" mt-2 btn btn-success btn-compra">Comprar</button>`;
}

//crea el carrito sin repetir productos y almacena en json
function agregarAlCarrito() {
  carritoCompra.innerHTML = "";
  compraFinal.innerHTML = "";
  notificacionCarrito();
  calculoTotal(total);
  const carritoSinduplicados = [...new Set(detalleDeCompra)];
  for (const producto of carritoSinduplicados) {
    const numeroUnidadesItem = detalleDeCompra.reduce((Total, itemId) => {
      return itemId === producto ? (Total += 1) : Total;
    }, 0);
    compraFinal.innerHTML += `<li class="list-group-item"><img src="./img/${producto.nombre}/img1sm.png" class="img-fluid" alt=""> ${producto.nombre} $${producto.precio} <h7 class= "fw-bolder">x ${numeroUnidadesItem}</h7></li>`;
    carritoCompra.innerHTML += `<li class="list-group-item"><img src="./img/${producto.nombre}/img1sm.png" class="img-fluid" alt=""> ${producto.nombre} $${producto.precio} <h7 class= "fw-bolder">x ${numeroUnidadesItem}</h7></li>`;
  }
  localStorage.setItem("Carrito Guardado", JSON.stringify(detalleDeCompra));
  localStorage.setItem("Total a Pagar", JSON.stringify(total));
}

//borra la memoria almacenada y el carrito actual
function eliminarCarrito(e) {
  if (e.target.classList.contains("btn-danger")) {
    vaciarMemoria();
  }
}

// funcion para boton del carrito , avanza a pantalla de confirmacion
function confirmacionCompra(e) {
  if (e.target.classList.contains("btn-compra")) {
    comprar();
    mostrarCarrito();
  }
}

// borra la memoria local y del carrito actual

function vaciarMemoria() {
  detalleDeCompra.length = 0;
  total = 0;
  localStorage.clear();
  agregarAlCarrito();
}

//indica al usuario que un producto se sumo al carrito de compras

function notificacionCarrito() {
  notificacion.innerHTML = "";
  if (detalleDeCompra.length > 0) {
    let cantidadDeProductos = detalleDeCompra.length;
    notificacion.innerHTML = `${cantidadDeProductos}`;
  }
}

//Crea el carrito pendiente mediante el local Storage
function carritoPendiente() {
  let productosPendientes = JSON.parse(
    localStorage.getItem("Carrito Guardado")
  );
  let TotalPendiente = JSON.parse(localStorage.getItem("Total a Pagar"));
  Array.prototype.push.apply(detalleDeCompra, productosPendientes);

  total += TotalPendiente;
  agregarAlCarrito();
}

// oculta productos y avanza a pantalla de confirmacion
function comprar() {
  $("#final").hide();
  $("#confirmacion").show();
  $("#productos").hide();
}

//vuelve al usuario a la tienda para seguir sumando productos a su carrito
function volverATienda() {
  $("#final").hide();
  $("#confirmacion").hide();
  $("#productos").show();
}

// finaliza el proceso de compra
function confirmarCompra() {
  $("#productos").hide();
  $("#confirmacion").hide();
  $("#final").show();
  vaciarMemoria();
}

//filtros para busqueda de productos

function filtroDeco() {
  $("#productos").hide();
  $("#final").hide();
  $("#confirmacion").hide();
  $("#filtrado").show();
  $("#filtrado").empty();
  const listafiltro = listaProductos.filter(
    (producto) => producto.categoria == "deco"
  );
  crearProductos(listafiltro, "#filtrado");
}
function filtroAccesorios() {
  $("#productos").hide();
  $("#filtrado").show();
  $("#final").hide();
  $("#confirmacion").hide();
  $("#filtrado").empty();
  const listafiltro = listaProductos.filter(
    (producto) => producto.categoria == "accesorios"
  );
  crearProductos(listafiltro, "#filtrado");
}
function filtroMuñecos() {
  $("#productos").hide();
  $("#final").hide();
  $("#confirmacion").hide();
  $("#filtrado").show();
  $("#filtrado").empty();
  const listafiltro = listaProductos.filter(
    (producto) => producto.categoria == "muñecos"
  );
  crearProductos(listafiltro, "#filtrado");
}

//elimina todos los filtros
function eliminarFiltro() {
  $("#filtrado").hide();
  $("#final").hide();
  $("#confirmacion").hide();
  $("#productos").show();
  $("#filtrado").empty();
}

//animacion del carrito de comprar para ocultar y mostrar
function mostrarCarrito() {
  $("#carritoCompras").slideToggle();
}
