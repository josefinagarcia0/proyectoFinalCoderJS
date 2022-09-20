// Obtengo la categoria del localStorage
const categoria = localStorage.getItem('categoria')

// Obtengo elementos del html
const divProductos = document.getElementById("productos")
const titulo = document.getElementById("titulo")

// Asigno como titulo la categoria
titulo.textContent = categoria

// Simulacion de obtener los productos de una api
// Guardo los productos en una variable (para consultar solo una vez)
const traerProductos = async () => {
    const response = await fetch('../json/productos.json')
    const productos = await response.json()
    return productos
}

traerProductos().then(productos => {

    // Por cada producto genero una card
    productos.forEach((producto) => {
        if (producto.categoria == categoria){
            divProductos.innerHTML += `
        <div class="producto" id=${producto.id}>
            <div class="producto_img">
                <img src=${producto.img} alt= ${producto.nombre}>
            </div>
            <div class="producto_text">
                <h2 class="producto_name"> ${producto.nombre}</h2>
                <p class="producto_price">$  ${producto.precio}</p>
            </div>
            <div class="producto_icono">
                <i class="fa fa-circle-plus fa-2x"></i>
            </div>
        </div>
        `
        }
    })

})


// Almaceno el producto seleccionado en el localstorage
divProductos.addEventListener("click", (e)=> {

    let idProducto
    if (e.target.id != "productos"){
        idProducto = e.target.parentNode.parentNode.id

        // Consulto el array y busco el objeto con ese id para guardarlo en el ls
        traerProductos().then(productos => {
            let buscado = productos.filter( producto => producto.id == idProducto)

            localStorage.setItem('productoSeleccionado', JSON.stringify(buscado[0]))
            location.href="detalle.html"
        })
    }
})