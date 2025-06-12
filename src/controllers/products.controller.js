import {
  getProducts as serviceGetProducts,
  createProduct as serviceCreateProduct,
  deleteProduct as serviceDeleteProduct,
  updateProduct as serviceUpdateProduct,
  getProductById as serviceGetProductById
} from '../services/product.service.js';

// GET /api/products
export const getAllProducts = async (req, res) => {
  try {
    const { limit, page, sort, query } = req.query;
    const result = await serviceGetProducts({ limit, page, sort, query });
    const { docs, totalPages, hasNextPage, hasPrevPage, nextPage, prevPage } = result;
    res.json({
      status: 'success',
      payload: docs,
      totalPages,
      prevPage,
      nextPage,
      page: parseInt(page) || 1,
      hasPrevPage,
      hasNextPage,
      prevLink: hasPrevPage ? `/api/products?page=${prevPage}` : null,
      nextLink: hasNextPage ? `/api/products?page=${nextPage}` : null
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// GET /api/products/:pid
export const getProductById = async (req, res) => {
  try {
    const product = await serviceGetProductById(req.params.pid);
    if (!product) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }
    res.json({ status: 'success', payload: product });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// POST /api/products
export const createProduct = async (req, res) => {
  try {
    const newProduct = await serviceCreateProduct(req.body);
    res.status(201).json({ status: 'success', payload: newProduct });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// DELETE /api/products/:pid
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await serviceDeleteProduct(req.params.pid);
    if (!deleted) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }
    res.json({ status: 'success', message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// PUT /api/products/:pid
export const updateProduct = async (req, res) => {
  try {
    const updated = await serviceUpdateProduct(req.params.pid, req.body);
    if (!updated) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }
    res.json({ status: 'success', payload: updated });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};