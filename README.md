# Desafio Entregable: Websockets + Handlebars
Servidor basado express que trabaje con Handlebars y websocket.

## Pasos a seguir para correr la aplicacion:
- Se instalarán las dependencias a partir del comando "npm install"
- Se echará a andar el servidor con el comando: "node app.js" o bien "nodemon app.js" ("app.js" se encuentra dentro de la carpeta src).
- Los archivos "productos.json" y "carrito.json" ya estan incluidos y "productos.json" ya cuenta con almenos 10 productos.
- Se corroborará que el servidor esté corriendo en el puerto 8080.

## Testing de la aplicacion:
- Se abrirá la ruta raíz desde el navegador a la url http://localhost:8080
- Debe visualizarse el contenido de la vista index.handlebars, el cual debe mostrar los 10 productos iniciales.
- Se buscará en la url del navegador la ruta http://localhost:8080/realtimeproducts
- Se corroborará que el servidor haya conectado con el cliente, en la consola del servidor deberá mostrarse un mensaje de “Nuevo cliente conectado”.
- Se debe mostrar la lista de productos y se corroborará que se esté enviando desde websocket.
- Se podra eliminar un producto al introducir el ID del producto y dar click en "Delete", el resultado se vera reflejado inmediatamente en la vista.
- Se podra agregar un producto al introducir los campos del producto y dar click en "Add", el resultado se vera reflejado inmediatamente en la vista.
