import app from './src/app.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import ProductManager from './src/managers/ProductManager.js'; // ¡IMPORTANTE!

const httpServer = createServer(app);
const io = new Server(httpServer);

app.setSocket(io);

const productManager = new ProductManager('src/data/products.json');


io.on('connection', (socket) => {
    console.log('Cliente conectado');


    socket.on('new-product', async (product) => {
        await productManager.addProduct(product);
        const updatedProducts = await productManager.getAllProducts();
        io.emit('update-products', updatedProducts);
    });

    socket.on('delete-product', async (id) => {
        await productManager.deleteProduct(id);
        const updatedProducts = await productManager.getAllProducts();
        io.emit('update-products', updatedProducts);
    });
});

const PORT = 8080;
httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
