//arrays
const productos = []
let carrito = []

const contenedorDeProductos = document.getElementById ("contenedor-productos")
contenedorDeProductos.innerHTML= ""

const contenedorDeCarrito = document.getElementById("contenedor-carrito")


// local storage

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("carro")) {
        carrito = JSON.parse(localStorage.getItem("carro"))
        verCarrito()
        
    }
})


fetch('../data/productos.json')
    .then(res => res.json())
    .then(productos => {
        productos.forEach( producto => {
            const divProducto = document.createElement("div")
            divProducto.classList.add("divProducto")
            divProducto.innerHTML=`
            <img src= "${producto.imagen}" alt = "${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <h3> Precio : ${producto.precio} </h3>
            <button id= "agregar${producto.id}" class="botonAgregar">Agregar</button>
            `
        
           
            contenedorDeProductos.appendChild(divProducto)
            //funciones sobre carrito
            const agregarAlCarrito = (prodId) => {
                const item = productos.find((prod) => prod.id === prodId)
                carrito.push(item)
                verCarrito()
            }

            //BOTON AGREGAR
            const boton = document.getElementById(`agregar${producto.id}`)
            boton.classList.add("botonAgregar")
            boton.addEventListener("click", () => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Producto agregado',
                    showConfirmButton: false,
                    timer: 1500
                })
                agregarAlCarrito(producto.id)
            })

        })

       
        
    })

    const verCarrito =  () => {
        contenedorDeCarrito.innerHTML= ""
        carrito.forEach(producto => {
            const divCarrito = document.createElement("div")
            divCarrito.classList.add("divCarrito")
            divCarrito.innerHTML=`
            <img src= "${producto.imagen}" alt = "${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <h3> Precio : <spam id="precio"> ${producto.precio} </spam> </h3>
            `
            
            contenedorDeCarrito.appendChild(divCarrito)
            localStorage.setItem("carro", JSON.stringify(carrito))
    
        })
        const pTotal = document.getElementById("precio-total")
        pTotal.innerText = carrito.reduce((contador, producto) => contador + producto.precio, 0)
    // contador de productos
        const contador = document.getElementById("contador-carrito")
        contador.innerText = carrito.length

    }


    //Vaciar carrito 
const borrarCarrito = document.getElementById("boton-vaciar")
borrarCarrito.addEventListener("click", () => {
            carrito.length = 0
            verCarrito()
            localStorage.removeItem("carro")
        }
)



