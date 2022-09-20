// Almaceno la categoria seleccionada en el localstorage
categorias.addEventListener("click", (e) => {

    // verifica que el usuario no seleccione una opcion vacia
    if (e.target.parentNode.id != ""){
        if ( e.target.id != "") {
            localStorage.setItem('categoria', e.target.id)
        } else {
            localStorage.setItem('categoria', e.target.parentNode.id)
        }
        location.href="pages/productos.html"
    }
})