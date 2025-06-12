# 🛒 Ecommerce API - Proyecto Final

Este proyecto es una aplicación de backend para un ecommerce desarrollada con Node.js, Express, MongoDB Atlas, WebSockets, y Handlebars como motor de vistas.



## 🚀 Tecnologías utilizadas

- Node.js
- Express
- MongoDB Atlas (con mongoose)
- Handlebars
- WebSockets (socket.io)
- JavaScript ESModules
- Bootstrap (para estilos en vistas)



## 📁 Estructura del Proyecto

```
├── index.js                # Inicio del servidor y socket
├── .env                    # Variables de entorno
├── src/
│   ├── app.js              # Configuración de Express
│   ├── db/db.js            # Conexión a MongoDB Atlas
│   ├── routes/             # Rutas Express
│   │   ├── products.router.js
│   │   ├── carts.router.js
│   │   └── views.router.js
│   ├── controllers/        # Lógica de controladores
│   ├── services/           # Servicios de productos y carritos
│   ├── models/             # Modelos mongoose
│   ├── public/             # Archivos JS y estilos públicos
│   └── views/              # Vistas handlebars
```



## 🧠 Funcionalidades

### 📦 Productos (`/api/products`)

- `GET /` – Listar productos con soporte para:
  - `?limit=5`
  - `?page=2`
  - `?sort=asc|desc` (por precio)
  - `?query=categoria|true|false` (filtrado por categoría o disponibilidad)
- `GET /:pid` – Obtener producto por ID
- `POST /` – Crear un producto
- `PUT /:pid` – Actualizar un producto
- `DELETE /:pid` – Eliminar un producto

### 🛒 Carritos (`/api/carts`)

- `POST /` – Crear carrito vacío
- `GET /:cid` – Obtener carrito (con productos populados)
- `POST /:cid/product/:pid` – Agregar producto al carrito (o aumentar cantidad)
- `DELETE /:cid/products/:pid` – Eliminar producto específico del carrito
- `PUT /:cid` – Reemplazar productos del carrito
- `PUT /:cid/products/:pid` – Actualizar cantidad de un producto específico
- `DELETE /:cid` – Vaciar el carrito



## 🧪 Cómo probar

Usá Postman o similar para hacer peticiones a:

```
http://localhost:8080/api/products
http://localhost:8080/api/carts
```



## 🔧 Peticiones de Postman

A continuación, ejemplos de cómo configurar cada request en Postman:

### 1. Listar productos
- **GET** `http://localhost:8080/api/products`

### 2. Listar productos con filtros
- **GET** `http://localhost:8080/api/products?limit=5&page=2&sort=asc&query=notebook`

### 3. Obtener producto por ID
- **GET** `http://localhost:8080/api/products/PRODUCT_ID`

### 4. Crear producto
- **POST** `http://localhost:8080/api/products`
- **Headers**: `Content-Type: application/json`
- **Body** (raw, JSON):
  ```json
  {
    "title": "Producto Ejemplo",
    "description": "Descripción",
    "code": "COD123",
    "price": 100,
    "status": true,
    "stock": 10,
    "category": "categoria",
    "thumbnails": ["https://example.com/img.jpg"]
  }
  ```

### 5. Actualizar producto
- **PUT** `http://localhost:8080/api/products/PRODUCT_ID`
- **Headers**: `Content-Type: application/json`
- **Body** (raw, JSON):
  ```json
  {
    "price": 150
  }
  ```

### 6. Eliminar producto
- **DELETE** `http://localhost:8080/api/products/PRODUCT_ID`

### 7. Crear carrito
- **POST** `http://localhost:8080/api/carts`

### 8. Obtener carrito
- **GET** `http://localhost:8080/api/carts/CART_ID`

### 9. Agregar producto al carrito
- **POST** `http://localhost:8080/api/carts/CART_ID/product/PRODUCT_ID`

### 10. Eliminar producto del carrito
- **DELETE** `http://localhost:8080/api/carts/CART_ID/products/PRODUCT_ID`

### 11. Actualizar todo el carrito
- **PUT** `http://localhost:8080/api/carts/CART_ID`
- **Headers**: `Content-Type: application/json`
- **Body** (raw, JSON):
  ```json
  {
    "products": [
      { "product": "PRODUCT_ID", "quantity": 3 }
    ]
  }
  ```

### 12. Actualizar cantidad específica
- **PUT** `http://localhost:8080/api/carts/CART_ID/products/PRODUCT_ID`
- **Headers**: `Content-Type: application/json`
- **Body** (raw, JSON):
  ```json
  {
    "quantity": 2
  }
  ```

### 13. Vaciar carrito
- **DELETE** `http://localhost:8080/api/carts/CART_ID`



## 👀 Vistas disponibles

- `/products` - Vista de productos con paginación y botones para agregar o quitar del carrito.
- `/carts/:cid` - Vista del carrito de compras mostrando los productos agregados.
- `/ (RealTimeProducts)` - Vista para agregar/eliminar productos en tiempo real usando WebSockets.



## 📌 Notas técnicas

- Conexión a MongoDB Atlas desde archivo .env:

  MONGO_URI=mongodb+srv://usuario:clave@cluster.mongodb.net/ecommerce
  
- Productos y carritos persistidos en MongoDB con modelos mongoose.
- WebSockets integrados con socket.io para vista en tiempo real.
- Validación de campos obligatorios y control de errores con try/catch.



## ✅ Estado del proyecto

✔️ API REST completa con productos y carritos
✔️ Websockets en vista realtime
✔️ Filtros, ordenamiento y paginación en API
✔️ MongoDB Atlas como sistema de persistencia principal