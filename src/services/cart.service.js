import CartManager from '../managers/CartManager.js';
const cartManager = new CartManager('src/data/carts.json');

export const createCart = async () => {
    return await cartManager.createCart();
};

export const getCartById = async (id) => {
    return await cartManager.getCartById(id);
};

export const addProductToCart = async (cid, pid) => {
    return await cartManager.addProductToCart(cid, pid);
};
