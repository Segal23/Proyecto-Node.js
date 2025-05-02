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
            console.error('Error al escribir en el archivo:', error);
        }
    }


    async createCart() {
        try {
            const carts = await this.readFile();

            const maxId = carts.reduce((max, c) => {
                const idNum = parseInt(c.id, 10);
                return isNaN(idNum) ? max : Math.max(max, idNum);
            }, 0);
            const newId = (maxId + 1).toString();

            const newCart = {
                id: newId,
                products: []
            };

            carts.push(newCart);
            await this.writeFile(carts);
            return newCart;
        } catch (error) {
            console.error('Error creando carrito:', error);
            return null;
        }
    }


    async getCartById(id) {
        try {
            const carts = await this.readFile();
            return carts.find(c => c.id === id);
        } catch (error) {
            console.error('Error leyendo la información del carrito:', error);
            return null;
        }
    }


    async addProductToCart(cartId, productId) {
        try {
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
        } catch (error) {
            console.error('Error agregando el producto al carrito:', error);
            return null;
        }
    }
}

export default CartManager;
