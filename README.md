# Ejercicio final de modulo Backend

## API REST de Mi Tienda Online

¡Bienvenido a la API REST de Mi Tienda Online!

Esta API te permite acceder y gestionar productos de nuestra tienda a través de solicitudes HTTP. Es construida con **Node.js**, **Express** , utiliza **CORS** para permitir conexiones desde varios dominios y la libreria **zod** para hacer verificaciones de datos.

## Características Principales

- **Obtener Productos:** Consulta todos los productos de nuestra tienda
- **Filtrar Productos:** Filtra productos por categoria
- **Agregar Productos:** Agrega nuevos productos a nuestra tienda.
- **Editar Productos:** Modifica la información de productos existentes.
- **Eliminar Productos:** Elimina productos de la tienda.

## Uso

Para comenzar a utilizar la API, sigue estos pasos:

1. **Instalación:**

   - Asegúrate de tener Node.js instalado en tu sistema.
   - Clona este repositorio o descarga los archivos de la API.

2. **Instalación de Dependencias:**

   - Abre una terminal (ya sea externo o en el de VScode) en la carpeta raíz del proyecto.
   - Ejecuta `npm install` para instalar las dependencias necesarias.

3. **Configuración de Variables de Entorno:**

   - Crea un archivo `.env` en la raíz del proyecto para configurar las variables de entorno necesarias, como el puerto y las credenciales de acceso si es necesario.
   - Como recomendacion , puedes duplicar nuestro `.env-example` para tomar de referencia las variables necesarias en tu `.env`

4. **Ejecución:**

   - Ejecuta la aplicación con: `npm run s`
   - Interactua con la aplicación a tiempo real con: `npm run d` (esto activa el modo desarrollador)

5. **Interactúa con la API:**
   - Utiliza herramientas como Postman , cURL o ThunderClient para realizar solicitudes HTTP a la API.
   - Consulta la sección "Endpoints Disponibles" a continuación para obtener detalles sobre las rutas y las solicitudes admitidas.

## Endpoints Disponibles

- **GET /productos:** Obtiene todos los productos disponibles o filtra por categoría.
- **GET /productos/:id:** Obtiene un producto existente por su ID
- **POST /productos:** Agrega un nuevo producto a la tienda.
- **PATCH /productos/:id:** Actualiza parcialmente un producto existente por su ID.
- **DELETE /productos/:id:** Elimina un producto por su ID.
