import app from './src/app.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { ProductModel } from './src/models/Product.model.js';
import { connectDB } from './src/db/db.js';

const httpServer = createServer(app);
const io = new Server(httpServer);

app.setSocket(io);

io.on('connection', (socket) => {
    console.log('Cliente conectado');

    socket.on('new-product', async (product) => {
        try {
            await ProductModel.create(product);
            const updatedProducts = await ProductModel.find().lean();
            io.emit('update-products', updatedProducts);
        } catch (error) {
            console.error('Error al agregar producto con socket:', error.message);
        }
    });

    socket.on('delete-product', async (id) => {
        try {
            await ProductModel.findByIdAndDelete(id);
            const updatedProducts = await ProductModel.find().lean();
            io.emit('update-products', updatedProducts);
        } catch (error) {
            console.error('Error al eliminar producto con socket:', error.message);
        }
    });
});

const PORT = 8080;

connectDB().then(() => {
    httpServer.listen(PORT, () => {
        console.log(`Servidor corriendo en puerto ${PORT}`);
    });
});
