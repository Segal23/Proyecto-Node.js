# 🛒 Ecommerce API - Primera Entrega

Proyecto desarrollado con **Node.js + Express** para gestionar productos y carritos de compra utilizando persistencia con archivos JSON.

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- File System (fs)
- JavaScript ESModules

## 📁 Estructura del Proyecto

```
ecommerce-api/
├── index.js                 # Entrada principal del servidor
├── src/
│   ├── app.js              # Configuración de Express
│   ├── data/               # Persistencia en archivos JSON
│   │   ├── products.json
│   │   └── carts.json
│   ├── managers/           # Lógica para leer/escribir los JSON
│   │   ├── ProductManager.js
│   │   └── CartManager.js
│   └── routes/             # Rutas con Express.Router
│       ├── products.router.js
│       └── carts.router.js
```


## 🧠 Funcionalidades

### 📦 Productos (`/api/products`)
- `GET /` – Obtener todos los productos
- `GET /:pid` – Obtener producto por ID
- `POST /` – Crear producto (ID autogenerado)
- `PUT /:pid` – Actualizar producto (excepto ID)
- `DELETE /:pid` – Eliminar producto

### 🛒 Carritos (`/api/carts`)
- `POST /` – Crear carrito vacío
- `GET /:cid` – Ver productos de un carrito
- `POST /:cid/product/:pid` – Agregar producto (o aumentar cantidad) al carrito


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

### 2. Obtener producto por ID
- **GET** `http://localhost:8080/api/products/:pid`

### 3. Crear producto
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

### 4. Actualizar producto
- **PUT** `http://localhost:8080/api/products/:pid`
- **Headers**: `Content-Type: application/json`
- **Body** (raw, JSON):
  ```json
  {
    "price": 120,
    "stock": 15
  }
  ```

### 5. Eliminar producto
- **DELETE** `http://localhost:8080/api/products/:pid`

### 6. Crear carrito
- **POST** `http://localhost:8080/api/carts`
- **Headers**: `Content-Type: application/json`
- **Body opcional** (raw, JSON):
  ```json
  {
    "products": [
      { "product": "1", "quantity": 2 }
    ]
  }
  ```

### 7. Obtener carrito por ID
- **GET** `http://localhost:8080/api/carts/:cid`

### 8. Agregar producto a carrito
- **POST** `http://localhost:8080/api/carts/:cid/product/:pid`
```


## 💾 Persistencia

- Los datos se almacenan en:
  - `src/data/products.json`
  - `src/data/carts.json`
- La lógica de lectura y escritura está encapsulada en los archivos:
  - `ProductManager.js`
  - `CartManager.js`


## 📌 Notas

- El ID se genera es secuencial y autogenerado para evitar duplicados.
- No se usa base de datos: todo se guarda en archivos locales `.json`.
- El proyecto es modular y escalable para futuras integraciones.
