import * as cartService from '../services/cart.service.js';

export const createCart = async (req, res) => {
    try {
        const cart = await cartService.createCart();
        res.status(201).json({
        status: 'success',
        cartId: cart._id,
        message: 'Carrito creado exitosamente'
        });
    } catch (error) {
        console.error('Error en createCart:', error.message);
        res.status(500).json({
        status: 'error',
        message: 'Error al crear el carrito'
        });
    }
};

export const getCartById = async (req, res) => {
    try {
        const cart = await cartService.getCartById(req.params.cid);
        if (!cart) {
        return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }
        res.json({ status: 'success', cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const addProductToCart = async (req, res) => {
    try {
        const updatedCart = await cartService.addProductToCart(req.params.cid, req.params.pid);
        if (!updatedCart) {
        return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }
        res.json({ status: 'success', cart: updatedCart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const removeProductFromCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartService.removeProductFromCart(cid, pid); // <- corregido
        if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        res.status(200).json({ status: 'success', cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const updateCart = async (req, res) => {
    try {
        const updatedCart = await cartService.updateCart(req.params.cid, req.body.products);
        res.json({ status: 'success', cart: updatedCart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const updateProductQuantity = async (req, res) => {
    try {
        const { quantity } = req.body;
        const result = await cartService.updateProductQuantity(req.params.cid, req.params.pid, quantity);
        res.json({ status: 'success', cart: result });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const clearCart = async (req, res) => {
    try {
        const result = await cartService.clearCart(req.params.cid);
        res.json({ status: 'success', cart: result });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
