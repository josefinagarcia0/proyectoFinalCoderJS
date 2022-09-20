// Obtengo elementos del html
const divProductos = document.getElementById("productos")
const precioTotal = document.getElementById("total")
const boton = document.getElementById("confirmar")

const productosCarrito = JSON.parse(localStorage.getItem("carrito"))

// Consulto si esta vacio el carrito
const estaVacio = () => {
    if (productosCarrito == null || productosCarrito.length == 0) {
        divProductos.innerHTML = `<div class="vacio" id="vacio"><p>No hay productos en el carrito</p></div>`
    }
}

// Llamo a la funcion
estaVacio()

// Detalle del carrito
class Pedido {
    constructor (detalles) {
        this.detalles = detalles;
}
    total() {
        let total = 0;
        this.detalles.forEach(detalle => {
            total += detalle.subtotal
        });

        return total
    }
}

// Por cada item genero una card
productosCarrito.forEach((item) => {
    divProductos.innerHTML += `
        <div class="producto" id=${item.producto.id}>
            <div class="producto_img">
                <img src= ${item.producto.imagen} alt= ${item.producto.nombre}>
            </div>
            <div class="producto_text">
                <h2 class="producto_name"> ${item.producto.nombre}</h2>
                <p class="producto_price">x${item.cantidad}   $  ${item.subtotal}</p>
            </div>
            <div class="producto_icono eliminar" id="producto_eliminar">
                <i class="fa fa-trash-can fa-1x" id="eliminar_icon"></i>
            </div>
        </div>`
})

// Nuevo pedido
const pedido = new Pedido(productosCarrito)
let total = pedido.total() 

precioTotal.innerHTML = `$ ${total}`


// Funcion eliminar un item pedido
const eliminar = (array, id) => {
    array.forEach((item, indice) => {
        if (item.producto.id == id ) {
            // posicion = array.indexOf(item)
            array.splice(indice, 1) // elimino del array
            localStorage.setItem("carrito", JSON.stringify(array)) // elimino del local storage
        }
    })
}

// Evento click tachito
let productoId
divProductos.addEventListener("click", (e)=> {
    
    // Condicion para que el usuario pueda hacer click en cualquier lugar del boton borrar (tachito y caja)
    if (e.target.id == "producto_eliminar") {
        productoId = e.target.parentNode.id
        eliminar(productosCarrito, productoId)

        // Acuatualizo el total
        let total = pedido.total()
        precioTotal.innerHTML = `$ ${total}`

        // Consulto si esta vacio
        estaVacio()

    } else if (e.target.id == "eliminar_icon") {
        productoId = e.target.parentNode.parentNode.id
        eliminar(productosCarrito, productoId)
        divProductos.removeChild(e.target.parentNode.parentNode)

        // Acuatualizo el total
        let total = pedido.total()
        precioTotal.innerHTML = `$ ${total}`

        // Consulto si esta vacio
        estaVacio()
    }
})