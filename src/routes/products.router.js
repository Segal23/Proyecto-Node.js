import { Router } from 'express';
import {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    getProductById
} from '../controllers/products.controller.js';

const router = Router();

router.get('/', getAllProducts);
router.get('/:pid', getProductById);
router.post('/', createProduct);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);

export default router;
