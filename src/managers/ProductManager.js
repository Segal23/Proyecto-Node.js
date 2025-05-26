import { promises as fs } from 'fs';
import path from 'path';

class ProductManager {
    constructor(filePath) {
        this.path = path.resolve(filePath);
    }

    async readFile() {
        try {
        const data = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(data);
        } catch (error) {
        return [];
        }
    }

    async writeFile(data) {
        try {
        await fs.writeFile(this.path, JSON.stringify(data, null, 2));
        } catch (error) {
        console.error('Error escribiendo archivo:', error);
        }
    }

    async getAllProducts() {
        return this.readFile();
    }

    async getProductById(id) {
        const products = await this.readFile();
        return products.find(p => p.id === id);
    }

    async addProduct(productData) {
        const requiredFields = ['title', 'description', 'code', 'price', 'stock', 'category'];
        const hasAllFields = requiredFields.every(f => productData[f] !== undefined);
        if (!hasAllFields) return null;

    const products = await this.readFile();
    const maxId = products.reduce((max, p) => {
        const idNum = parseInt(p.id, 10);
        return isNaN(idNum) ? max : Math.max(max, idNum);
    }, 0);
    const newId = (maxId + 1).toString();

    const newProduct = {
        id: newId,
        ...productData,
        status: productData.status ?? true,
        thumbnails: Array.isArray(productData.thumbnails) ? productData.thumbnails : []
        };

        products.push(newProduct);
        await this.writeFile(products);
        return newProduct;
    }

    async updateProduct(id, updates) {
        const products = await this.readFile();
        const index = products.findIndex(p => p.id === id);
        if (index === -1) return null;

    products[index] = {
        ...products[index],
        ...updates,
        id: products[index].id // aseguramos que el ID no cambie
        };

        await this.writeFile(products);
        return products[index];
    }

    async deleteProduct(id) {
        const products = await this.readFile();
        const filtered = products.filter(p => p.id !== id);
        if (filtered.length === products.length) return false;

        await this.writeFile(filtered);
        return true;
    }
}

export default ProductManager;