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
            console.error('Error al leer el archivo:', error);
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


    async getAllProducts() {
        try {
            return this.readFile();
        } catch (error) {
            console.error('Error leyendo productos:', error);
            return null;
        }  
    }


    async getProductById(id) {
        try {
            const products = await this.readFile();
            return products.find(p => p.id === id);
        } catch (error) {
            console.error('Error leyendo producto:', error);
            return null;
        }
    }


    async addProduct(productData) {
        try {
            const products = await this.readFile();
            const maxId = products.reduce((max, p) => {
                const idNum = parseInt(p.id);
                return isNaN(idNum) ? max : Math.max(max, idNum);
            }, 0);
            const newId = (maxId + 1).toString();
            const newProduct = {
                id: newId,
                ...productData
            };
            products.push(newProduct);
            await this.writeFile(products);
            return newProduct;
        } catch (error) {
            console.error('Error agregando el producto:', error);
            return null   
        }
    }
    

    async updateProduct(id, updates) {
        try {
            const products = await this.readFile();
            const index = products.findIndex(p => p.id === id);
            
            if (index === -1) return null;
            products[index] = { ...products[index], ...updates, id: products[index].id };
            await this.writeFile(products);
            return products[index];
        } catch (error) {
            console.error('Error actualizando el producto:', error);
            return null;
        }
    }


    async deleteProduct(id) {
        try {
            const products = await this.readFile();
            const filtered = products.filter(p => p.id !== id);

            if (filtered.length === products.length) {
                return false;
            }

            await this.writeFile(filtered);
            return true;  
        } catch (error) {
            console.error('Error eliminando el producto:', error);
            return false;
        }
    }
}

export default ProductManager;