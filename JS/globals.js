//Variables

let total = 0; // Se suma en esta variable todos los valores totales de las compras realizadas

const URLGET = "./productos.json";

let listaProductos; //lista de productos disponibles la cual se va a llenar con los datos obtenidos de productos.json

const detalleDeCompra = []; //Muestra el detalle de todos los productos comprados

let productos = document.getElementById("productos");
let carritoCompra = document.getElementById("carrito");
let sumaTotal = document.getElementById("total");
let compraFinal = document.getElementById("final-compra");
let totalFinal = document.getElementById("total-compra");
let notificacion = document.getElementById("notificacionCarrito");
