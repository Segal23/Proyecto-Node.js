import { ProductModel } from '../models/Product.model.js';

export const getProducts = async ({ limit = 10, page = 1, sort, query }) => {
    try {
    const filter = query ? { $or: [
        { category: { $regex: query, $options: 'i' } },
        { status: query === 'true' ? true : query === 'false' ? false : undefined }
    ]} : {};

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined,
        lean: true
    };

    const result = await ProductModel.paginate(filter, options);
        return result;
    } catch (error) {
        throw new Error('Error al obtener productos: ' + error.message);
    }
};

export const getProductById = async (id) => {
    try {
        return await ProductModel.findById(id);
    } catch (error) {
        throw new Error('Error al obtener producto: ' + error.message);
    }
};

export const createProduct = async (data) => {
    try {
        const product = new ProductModel(data);
        return await product.save();
    } catch (error) {
        throw new Error('Error al crear producto: ' + error.message);
    }
};

export const deleteProduct = async (id) => {
    try {
        return await ProductModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error('Error al eliminar producto: ' + error.message);
    }
};

export const updateProduct = async (id, data) => {
    try {
        const updated = await ProductModel.findByIdAndUpdate(id, data, { new: true });
        return updated;
    } catch (error) {
        throw new Error('Error al actualizar producto: ' + error.message);
    }
};