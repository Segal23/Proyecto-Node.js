import { Router } from 'express';
import {
    createCart,
    getCartById,
    addProductToCart
    } from '../services/cart.service.js';

const router = Router();

router.post('/', async (req, res) => {
    try {
        const newCart = await createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el carrito' });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const cart = await getCartById(req.params.cid);
        if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el carrito' });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const updatedCart = await addProductToCart(req.params.cid, req.params.pid);
        if (!updatedCart) {
        return res.status(404).json({ message: 'Carrito no encontrado o producto inválido' });
        }
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el producto al carrito' });
    }
});

export default router;
