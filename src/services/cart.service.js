import { CartModel } from '../models/Cart.model.js';

export const createCart = async () => {
    try {
        const newCart = new CartModel({ products: [] });
        return await newCart.save();
    } catch (error) {
        throw new Error('Error al crear carrito: ' + error.message);
    }
};

export const getCartById = async (cid) => {
    try {
        return await CartModel.findById(cid).populate('products.product').lean();
    } catch (error) {
        throw new Error('Error al obtener carrito: ' + error.message);
    }
};

export const addProductToCart = async (cid, pid) => {
    try {
        const cart = await CartModel.findById(cid);
        if (!cart) return null;

        const existingProduct = cart.products.find(p => p.product.toString() === pid);
        if (existingProduct) {
        existingProduct.quantity += 1;
        } else {
        cart.products.push({ product: pid, quantity: 1 });
        }

        return await cart.save();
    } catch (error) {
        throw new Error('Error al agregar producto al carrito: ' + error.message);
    }
};

export const removeProductFromCart = async (cid, pid) => {
    try {
        const cart = await CartModel.findById(cid);
        if (!cart) return null;
        cart.products = cart.products.filter(p => p.product.toString() !== pid);
        return await cart.save();
    } catch (error) {
        throw new Error('Error al eliminar producto del carrito: ' + error.message);
    }
    };

    export const updateCart = async (cid, products) => {
    try {
        return await CartModel.findByIdAndUpdate(cid, { products }, { new: true });
    } catch (error) {
        throw new Error('Error al actualizar el carrito: ' + error.message);
    }
};

export const updateProductQuantity = async (cid, pid, quantity) => {
    try {
        const cart = await CartModel.findById(cid);
        if (!cart) return null;
        const product = cart.products.find(p => p.product.toString() === pid);
        if (product) {
        product.quantity = quantity;
        }
        return await cart.save();
    } catch (error) {
        throw new Error('Error al actualizar cantidad de producto: ' + error.message);
    }
};

export const clearCart = async (cid) => {
    try {
        const cart = await CartModel.findById(cid);
        if (!cart) return null;
        cart.products = [];
        return await cart.save();
    } catch (error) {
        throw new Error('Error al limpiar carrito: ' + error.message);
    }
};
