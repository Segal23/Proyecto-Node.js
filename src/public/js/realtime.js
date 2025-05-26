const socket = io();

const container = document.getElementById('container-products');
const form = document.getElementById('product-form');
const errorMessage = document.getElementById('error-message')


document.getElementById('product-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const product = {
        title: document.getElementById('title').value.trim(),
        description: document.getElementById('description').value.trim(),
        code: document.getElementById('code').value.trim(),
        price: parseFloat(document.getElementById('price').value),
        status: document.getElementById('status').checked,
        stock: parseInt(document.getElementById('stock').value),
        category: document.getElementById('category').value.trim(),
        thumbnails: document.getElementById('thumbnails').value
            .split(',')
            .map(url => url.trim())
            .filter(Boolean)
    };

    if (
        !product.title ||
        !product.description ||
        !product.code ||
        isNaN(product.price) ||
        isNaN(product.stock) ||
        !product.category
        ) {
            errorMessage.textContent = 'Por favor completá todos los campos obligatorios (*)!!'
            setTimeout(() => {errorMessage.textContent = ''}, 2000);
            return;
        }

    try {
        socket.emit('new-product', product);
        e.target.reset(); 
    } catch (error) {
        console.error('Error al agregar el producto.', error);
    }

});

socket.on('update-products', (products) => {
    container.innerHTML = `
    <div class="row header-row">
        <div class="col col-md-1">
            Eliminar
        </div>
        <div class="col col-md-3">
            Título
        </div>
        <div class="col col-md-5">
            Descripción
        </div>
        <div class="col col-md-2">
            Precio
        </div>
        <div class="col col-md-1">
            Stock
        </div>
    </div>`;
    products.forEach(p => {
        const row = document.createElement('div');
        row.className="row item-row";
        row.innerHTML = `
        <div class="col col-md-1">
                <button onclick="deleteProduct('${p.id}')">❌</button>
            </div>
            <div class="col col-md-3">
                ${p.title}
            </div>
            <div class="col col-md-5">
                ${p.description}
            </div>
            <div class="col col-md-2">
                $${p.price}
            </div>
            <div class="col col-md-1">
                ${p.stock}
            </div>`;
        container.appendChild(row);
    });
});

function deleteProduct(id) {
    socket.emit('delete-product', id);
}
