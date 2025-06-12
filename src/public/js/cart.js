document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.delete-product-btn').forEach(button => {
        button.addEventListener('click', async () => {
            const cartId = button.dataset.cartId;
            const productId = button.dataset.productId;

            try {
            const res = await fetch(`/api/carts/${cartId}/products/${productId}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                button.closest('tr').remove();
            } else {
                alert('Error al eliminar el producto');
            }
            } catch (error) {
            console.error('Error al eliminar producto:', error);
            }
        });
    });
}); 