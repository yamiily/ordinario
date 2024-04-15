document.addEventListener('DOMContentLoaded', () => {
    const categorias = {
        aretes: [
            { id: 1, nombre: 'Aretes de Diamantes', precio: 200, imagen: 'aretes1.jpg' },
            { id: 2, nombre: 'Aretes de Perlas', precio: 150, imagen: 'aretes2.jpg' },
            { id: 3, nombre: 'Aretes de Oro', precio: 180, imagen: 'aretes3.jpg' },
            { id: 4, nombre: 'Aretes de Plata', precio: 100, imagen: 'aretes4.jpg' },
            { id: 5, nombre: 'Aretes de Cristal', precio: 120, imagen: 'aretes5.jpg' }
        ],
        collares: [
            { id: 6, nombre: 'Collar de Diamantes', precio: 300, imagen: 'collares1.jpg' },
            { id: 7, nombre: 'Collar de Perlas', precio: 250, imagen: 'collares2.jpg' },
            { id: 8, nombre: 'Collar de Oro', precio: 280, imagen: 'collares3.jpg' },
            { id: 9, nombre: 'Collar de Plata', precio: 200, imagen: 'collares4.jpg' },
            { id: 10, nombre: 'Collar de Corazón', precio: 220, imagen: 'collares5.jpg' }
        ],
        anillos: [
            { id: 11, nombre: 'Anillo de Diamantes', precio: 400, imagen: 'anillos1.jpg' },
            { id: 12, nombre: 'Anillo de Perlas', precio: 350, imagen: 'anillos2.jpg' },
            { id: 13, nombre: 'Anillo de Oro', precio: 380, imagen: 'anillos3.jpg' },
            { id: 14, nombre: 'Anillo de Plata', precio: 250, imagen: 'anillos4.jpg' },
            { id: 15, nombre: 'Anillo de Zafiro', precio: 280, imagen: 'anillos5.jpg' }
        ],
        pulseras: [
            { id: 16, nombre: 'Pulsera de Diamantes', precio: 350, imagen: 'pulseras1.jpg' },
            { id: 17, nombre: 'Pulsera de Perlas', precio: 300, imagen: 'pulseras2.jpg' },
            { id: 18, nombre: 'Pulsera de Oro', precio: 320, imagen: 'pulseras3.jpg' },
            { id: 19, nombre: 'Pulsera de Plata', precio: 220, imagen: 'pulseras4.jpg' },
            { id: 20, nombre: 'Pulsera de Corazón', precio: 240, imagen: 'pulseras5.jpg' }
        ]
    };

    const categoriasDOM = document.getElementById('categorias');
    const productosDOM = document.getElementById('productos');
    const carritoDOM = document.getElementById('lista-carrito');
    const totalDOM = document.getElementById('total');
    const comprarBtn = document.getElementById('comprar-btn');
    let carrito = [];

    // Función para mostrar productos de una categoría
    function mostrarProductos(categoria) {
        productosDOM.innerHTML = '';
        categorias[categoria].forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('producto');
            div.innerHTML = `
                <img src="imagenes/${producto.imagen}" alt="${producto.nombre}">
                <p>${producto.nombre}</p>
                <p>$${producto.precio}</p>
                <button class="agregar-carrito" data-id="${producto.id}">Agregar al Carrito</button>
            `;
            productosDOM.appendChild(div);
        });
    }

    // Función para agregar producto al carrito
    function agregarAlCarrito(id) {
        const categoriaSeleccionada = Object.keys(categorias).find(categoria =>
            categorias[categoria].some(producto => producto.id === id)
        );
        const productoSeleccionado = categorias[categoriaSeleccionada].find(producto => producto.id === id);
        carrito.push(productoSeleccionado);
        mostrarCarrito();
        calcularTotal();
    }

    // Función para mostrar productos en el carrito
    function mostrarCarrito() {
        carritoDOM.innerHTML = '';
        carrito.forEach(producto => {
            const li = document.createElement('li');
            li.textContent = producto.nombre;
            carritoDOM.appendChild(li);
        });
    }

    // Función para calcular el total del carrito
    function calcularTotal() {
        const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
        totalDOM.textContent = `Total: $${total}`;
    }

    // Event listener para botones de categoría
    categoriasDOM.addEventListener('click', e => {
        if (e.target.classList.contains('categoria-btn')) {
            const categoria = e.target.dataset.categoria;
            mostrarProductos(categoria);
        }
    });

    // Event listener para botones de agregar al carrito
    productosDOM.addEventListener('click', e => {
        if (e.target.classList.contains('agregar-carrito')) {
            const id = parseInt(e.target.dataset.id);
            agregarAlCarrito(id);
        }
    });

    // Event listener para el botón de finalizar compra
    comprarBtn.addEventListener('click', () => {
        alert(`Compra finalizada\nTotal: $${totalDOM.textContent.split('$')[1]}\nProductos: ${carrito.map(producto => producto.nombre).join(', ')}`);
        carrito = [];
        mostrarCarrito();
        calcularTotal();
    });
});
