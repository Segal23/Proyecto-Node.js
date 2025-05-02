import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager('src/data/products.json');


router.get('/', async (req, res) => {
    const products = await productManager.getAllProducts();
    products 
        ? res.json(products)
        : res.status(500).json({code: 500, message: "Internal server error"});
});


router.get('/:pid', async (req, res) => {
    const product = await productManager.getProductById(req.params.pid);
    product 
        ? res.json(product) 
        : res.status(404).json({ code: 404, error: 'Producto no encontrado' });
});


router.post('/', async (req, res) => {
    const newProduct = await productManager.addProduct(req.body);
    newProduct 
        ? res.status(201).json(newProduct) 
        : res.status(500).json({code: 500, message: "Internal server error"});
});


router.put('/:pid', async (req, res) => {
    const updated = await productManager.updateProduct(req.params.pid, req.body);
    updated 
        ? res.json(updated) 
        : res.status(404).json({code: 404, error: 'Producto no encontrado' });
});


router.delete('/:pid', async (req, res) => {
    const deleted = await productManager.deleteProduct(req.params.pid);
    
    deleted 
        ? res.status(200).json({code: 200, message: `El producto con Id: ${req.params.pid} ha sido eliminado`}) 
        : res.status(404).json({code: 404, error: 'Producto no encontrado' });
});


export default router;