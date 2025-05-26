import { Router } from 'express';
import {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
    } from '../services/product.service.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const product = await getProductById(req.params.pid);
        if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
});

router.post('/', async (req, res) => {
    try {
        const newProduct = await addProduct(req.body);
        if (!newProduct) {
            return res.status(400).json({ message: 'Datos inválidos o incompletos' });
        }

        const allProducts = await getAllProducts();
        req.app.locals.io.emit('update-products', allProducts);

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto' });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const updated = await updateProduct(req.params.pid, req.body);
        if (!updated) {
        return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto' });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const deleted = await deleteProduct(req.params.pid);
        if (!deleted) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const allProducts = await getAllProducts();
        req.app.locals.io.emit('update-products', allProducts);

        res.json({ message: `Producto con ID ${req.params.pid} eliminado` });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
});

export default router;
