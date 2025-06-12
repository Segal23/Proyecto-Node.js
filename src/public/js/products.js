async function getCartId() {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
        try {
        const res = await fetch('/api/carts', { method: 'POST' });
        const data = await res.json();
        if (res.ok && data.cartId) {
            cartId = data.cartId;
            localStorage.setItem('cartId', cartId);
        }
        } catch (err) {
        console.error('Error creando carrito:', err);
        }
    }
    return cartId;
}

document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
btn.addEventListener('click', async (e) => {
    const productId = e.target.dataset.id;
    const cartId = await getCartId();

    if (!cartId) return alert('No se pudo obtener el carrito');

    try {
    const res = await fetch(`/api/carts/${cartId}/product/${productId}`, { method: 'POST' });
    if (res.ok) {
        alert('Producto agregado');
        updateCartCount();
    } else {
        alert('Error al agregar producto');
    }
    } catch (err) {
    console.error('Error al agregar producto:', err);
    }
});
});

document.querySelectorAll('.remove-from-cart-btn').forEach(btn => {
btn.addEventListener('click', async (e) => {
    const productId = e.target.dataset.id;
    const cartId = localStorage.getItem('cartId');
    if (!cartId) return alert('No hay carrito activo');

    try {
    const res = await fetch(`/api/carts/${cartId}/products/${productId}`, { method: 'DELETE' });
    if (res.ok) {
        alert('Producto eliminado');
        updateCartCount();
    } else {
        alert('Error al eliminar producto');
    }
    } catch (err) {
    console.error('Error al eliminar producto:', err);
    }
});
});

async function updateCartCount() {
const cartId = localStorage.getItem('cartId');
if (!cartId) return;

try {
    const res = await fetch(`/api/carts/${cartId}`);
    const data = await res.json();
    const total = data.cart?.products?.reduce((acc, p) => acc + p.quantity, 0) || 0;
    document.getElementById('cart-count').innerText = total;
} catch (err) {
    console.error('Error actualizando contador:', err);
}
}

document.getElementById('cart-link')?.addEventListener('click', async (e) => {
e.preventDefault();
const cartId = await getCartId();
if (cartId) {
    window.location.href = `/carts/${cartId}`;
} else {
    alert('No se pudo obtener el carrito');
}
});

updateCartCount();
