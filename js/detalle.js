// Obtengo producto seleccionado del local storage
const productoLocal = JSON.parse(localStorage.getItem('productoSeleccionado'))

// Nuevo objeto de tipo producto
class Producto{
    constructor (objeto) {
        this.id = objeto.id
        this.categoria = objeto.categoria
        this.nombre = objeto.nombre
        this.precio = parseInt(objeto.precio)
        this.descripcion = objeto.descripcion
        this.imagen = objeto.img
    }
}

// Nuevo objeto detalle del producto
class DetalleProducto{
    constructor (producto, cantidad, subtotal) {
        this.producto = producto
        this.cantidad = cantidad
        this.subtotal = subtotal
    }

    aumentarSubtotal() {
        this.subtotal += producto.precio
    }
    aumentarSubtotalExistente(nro) {
        this.subtotal += nro
    }
    disminuirSubtotal() {
        if (this.subtotal > producto.precio){
            this.subtotal -= producto.precio
        }
    }

    aumentarCantidad() {
        this.cantidad += 1
    }
    aumentarCantidadExistente(nro) {
        this.cantidad += nro
    }

    disminuirCantidad() {
        if (this.cantidad > 1) {
            this.cantidad -= 1
        }
    }
    
}

// Genero los objetos producto (con el producto seleccionado) y detalle del producto
const producto = new Producto(productoLocal)
const detalleProducto = new DetalleProducto(producto, 1, producto.precio)

// Obtengo elementos del html
const titulo = document.getElementById("titulo")
const imagen = document.getElementById("detalle_img")
const descripcion = document.getElementById("detalle_desc")
const precio = document.getElementById("detalle_precio")
// (botones)
const menos = document.getElementById("menos")
const mas = document.getElementById("mas")
const cantidad = document.getElementById("detalle_cantidad")

const agregar = document.getElementById("detalle_agregar")

// Asigno valor correspondiente a cada elemento del html
titulo.textContent = producto.nombre
imagen.innerHTML = `<img src= ${producto.imagen} alt=${producto.nombre}>`
descripcion.textContent = producto.descripcion
precio.textContent = ` $ ${producto.precio}`
cantidad.textContent = 1

// Evento para disminuir precio y cantidad
menos.addEventListener("click", () => {
    detalleProducto.disminuirSubtotal()
    precio.textContent = `$ ${detalleProducto.subtotal}`

    detalleProducto.disminuirCantidad()
    cantidad.textContent = detalleProducto.cantidad
})

// Evento para aumentar precio y cantidad
mas.addEventListener("click", ()=>{
    detalleProducto.aumentarSubtotal()
    precio.textContent = `$ ${detalleProducto.subtotal}`

    detalleProducto.aumentarCantidad()
    cantidad.textContent = detalleProducto.cantidad
})


// Evento para enviar el producto al carrito de compras
agregar.addEventListener("click", () => {

    // Ya existe la key "carrito"
    if(localStorage.getItem("carrito")) {
        
        // obtengo los productos del carrito
        let productosCarrito = JSON.parse(localStorage.getItem("carrito"))
        let nuevoItem = []
        banIguales = false
        
        // Recorro el carrito
        productosCarrito.forEach(item => {

            // verifico si hay otro producto igual ya agregado al carrito
            if (item.producto.id == detalleProducto.producto.id){

                itemIgual = new DetalleProducto(item.producto, item.cantidad, item.subtotal)
                itemIgual.aumentarCantidadExistente(detalleProducto.cantidad)
                itemIgual.aumentarSubtotalExistente(detalleProducto.subtotal)

                nuevoItem.push(itemIgual)
                banIguales = true
            } 
            else{
                nuevoItem.push(new DetalleProducto(item.producto, item.cantidad, item.subtotal))
            }
        });

        // no existe otro producto igual en el carrito, por lo que solo lo agrego
        if (!banIguales){
            nuevoItem.push(detalleProducto)
        }

        // agrego el producto al carrito
        carritoDeCompras = JSON.stringify(nuevoItem)
        // genero la key "carrito"
        localStorage.setItem("carrito", carritoDeCompras)
        
    } 
    // No existe aun la key "carrito"
    else{
        
        let nuevoItem = []
        nuevoItem.push(detalleProducto)

        // agrego el producto al carrito
        carritoDeCompras = JSON.stringify(nuevoItem)
        // genero la key "carrito"
        localStorage.setItem("carrito", carritoDeCompras)
    }
})

// Alerta de producto añadido (toastify)
agregar.addEventListener("click", () => {
    Toastify({
        text: "Producto añadido!",
        duration: 1000,
        //destination: "https://github.com/apvarun/toastify-js",
        //newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#fcd484",
        },
        onClick: function(){} // Callback after click
    }).showToast();
})