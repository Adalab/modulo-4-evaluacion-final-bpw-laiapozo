# Evaluación final - Módulo 4: Node.js, Express y MySQL
Este proyecto es el resultado de la evaluación final del Módulo 4 del bootcamp de programación web de Adalab. Se trata de una API REST desarrollada con Node.js y Express, que se conecta a una base de datos MySQL para gestionar información sobre películas y sus directores.
👉 [https://modulo-4-evaluacion-final-bpw-laiapozo.onrender.com](https://modulo-4-evaluacion-final-bpw-laiapozo.onrender.com)

## 🚀 Cómo arrancar el proyecto en local
1. Clona este repositorio:
   ```bash
   git clone https://github.com/Adalab/modulo-4-evaluacion-final-bpw-laiapozo.git
   ```
2. Instala las dependencias:

   ```bash
   npm install
   ```
3. Configura las variables de entorno creando un archivo `.env` en la raíz del proyecto:
   ```env
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   PORT=3001
   ```
4. Arranca el servidor:

   ```bash
   npm run dev
   ```
5. La API estará disponible en `http://localhost:3001`.

## 📚 Documentación de la API
Puedes consultar la configuración de la API accediendo a la documentación generada con Swagger en:
👉 [https://modulo-4-evaluacion-final-bpw-laiapozo.onrender.com/api-doc/](https://modulo-4-evaluacion-final-bpw-laiapozo.onrender.com/api-doc/)

## 🔧 Tecnologías utilizadas

- **Node.js**
- **Express**
- **MySQL**
- **Swagger**
- **Postman**

## 🛠️ Funcionalidades
Este proyecto implementa una **API RESTful** para:

- **Crear**: Permite insertar nuevas películas en la base de datos.
- **Leer**: Obtiene una o todas las películas almacenadas.
- **Actualizar**: Modifica una película existente.
- **Eliminar**: Elimina una película específica.
