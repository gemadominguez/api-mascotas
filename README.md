# API de Mascotas

Esta es una API REST creada con Node.js y Express para gestionar mascotas.  
Incluye validación de datos, autenticación con JWT, protección de rutas y persistencia en archivo JSON.

## Instalación

1. Clona el repositorio
2. Instala dependencias:
   npm install

3. Crea un archivo `.env` con este contenido:
   PORT=3000
   JWT_SECRET=claveSecreta123

4. Ejecuta el servidor:
   node index.js

## Estructura del proyecto

/data
data.json ← Mascotas almacenadas
usuarios.json ← Usuarios con contraseña cifrada

/routes
mascotas.routes.js ← Endpoints de mascotas
auth.routes.js ← Endpoint de login

/controllers
mascotas.controller.js

/middlewares
authMiddleware.js ← Protege rutas con token
errorHandler.js ← Centraliza errores
mascota.validator.js ← Valida datos de mascotas

.env
index.js
README.md

## Autenticación

1. POST /login

````json
{
  "username": "gema",
  "password": "1234"
}

2. Esto devuelve un token JWT.
3. Uso del token en las rutas protegidas: POST, PUT, DELETE.
Debes enviar el token en los headers.


## Endpoints

| Método | Ruta            | Descripción                      |
| ------ | --------------- | -------------------------------- |
| GET    | `/mascotas`     | Obtener todas las mascotas       |
| GET    | `/mascotas/:id` | Obtener una mascota por ID       |
| POST   | `/mascotas`     | Crear una nueva mascota          |
| PUT    | `/mascotas/:id` | Actualizar una mascota existente |
| DELETE | `/mascotas/:id` | Eliminar una mascota             |


### Ejemplo de creación (`POST /mascotas`)

```json
{
  "nombre": "Mia",
  "tipo": "gato",
  "raza": "Persa",
  "fechaNacimiento": "2022-02-01",
  "propietario": "Laura",
  "vacunado": true
}
````
