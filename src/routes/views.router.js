import { Router } from 'express';
import { getProducts } from '../services/product.service.js';
import { getCartById } from '../services/cart.service.js';
import { ProductModel } from '../models/Product.model.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const products = await ProductModel.find().lean();
        res.render('realTimeProducts', { products });
    } catch (error) {
        console.error('Error al renderizar /:', error.message);
        res.status(500).send('Error: ' + error.message);
    }
});

router.get('/products', async (req, res) => {
    try {
        const { limit, page, sort, query } = req.query;
        const result = await getProducts({ limit, page, sort, query });
        res.render('products', {
        products: result.docs,
        pagination: {
            totalPages: result.totalPages,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage
        }
        });
    } catch (error) {
        res.status(500).send('Error al cargar los productos');
    }
});

router.get('/carts/:cid', async (req, res) => {
    try {
        const cart = await getCartById(req.params.cid);
        if (!cart) return res.status(404).send('Carrito no encontrado');
        res.render('carts', { cart, cartId: req.params.cid });
    } catch (error) {
        res.status(500).send('Error al cargar el carrito');
    }
});

export default router;