import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const cartManager = new CartManager('src/data/carts.json');

router.post('/', async (req, res) => {
    const cart = await cartManager.createCart();
    cart 
        ? res.status(201).json(cart)
        : res.status(500).json({code: 500, message: "Internal server error"});
});

router.get('/:cid', async (req, res) => {
    const cart = await cartManager.getCartById(req.params.cid);
    cart 
        ? res.json(cart) 
        : res.status(404).json({code: 404, message: 'Carrito no encontrado' });
});

router.post('/:cid/product/:pid', async (req, res) => {
    const updatedCart = await cartManager.addProductToCart(req.params.cid, req.params.pid);
    updatedCart 
        ? res.json(updatedCart) 
        : res.status(404).json({code: 404, message: 'Carrito no encontrado' });
});

export default router;
