import { promises as fs } from 'fs';
import path from 'path';

class CartManager {
    constructor(filePath) {
        this.path = path.resolve(filePath);
    }

    async readFile() {
        try {
        const data = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(data);
        } catch {
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

    async createCart() {
        const carts = await this.readFile();
        const maxId = carts.reduce((max, c) => {
        const idNum = parseInt(c.id, 10);
        return isNaN(idNum) ? max : Math.max(max, idNum);
        }, 0);
        const newId = (maxId + 1).toString();

        const newCart = { id: newId, products: [] };
        carts.push(newCart);
        await this.writeFile(carts);
        return newCart;
    }

    async getCartById(id) {
        const carts = await this.readFile();
        return carts.find(c => c.id === id);
    }

    async addProductToCart(cartId, productId) {
        const carts = await this.readFile();
        const cart = carts.find(c => c.id === cartId);
        if (!cart) return null;

    const existingProduct = cart.products.find(p => p.product === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
        } else {
        cart.products.push({ product: productId, quantity: 1 });
        }

        await this.writeFile(carts);
        return cart;
    }
}

export default CartManager;
