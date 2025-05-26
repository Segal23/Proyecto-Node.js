import ProductManager from '../managers/ProductManager.js';
const productManager = new ProductManager('src/data/products.json');

export const getAllProducts = async () => {
    return await productManager.getAllProducts();
};

export const getProductById = async (id) => {
    return await productManager.getProductById(id);
};

export const addProduct = async (product) => {
    const { title, description, code, price, status, stock, category, thumbnails } = product;

    if (!title || !description || !code || typeof price !== 'number' || typeof stock !== 'number' || !category) {
        throw new Error('Campos inválidos');
    }

    return await productManager.addProduct(product);
};

export const updateProduct = async (id, updates) => {
    return await productManager.updateProduct(id, updates);
};

export const deleteProduct = async (id) => {
    return await productManager.deleteProduct(id);
};
