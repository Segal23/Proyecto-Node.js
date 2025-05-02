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

## 💾 Persistencia

- Los datos se almacenan en:
  - `src/data/products.json`
  - `src/data/carts.json`
- La lógica de lectura y escritura está encapsulada en los archivos:
  - `ProductManager.js`
  - `CartManager.js`

## 🧪 Cómo probar

Usá Postman o similar para hacer peticiones a:

```
http://localhost:8080/api/products
http://localhost:8080/api/carts
```

## 📌 Notas

- El ID se genera es secuencial y autogenerado para evitar duplicados.
- No se usa base de datos: todo se guarda en archivos locales `.json`.
- El proyecto es modular y escalable para futuras integraciones.
