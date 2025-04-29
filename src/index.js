const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

require("dotenv").config();

const server = express();

async function getDBConnection() {
  const connection = await mysql.createConnection({
    host: "172.20.32.1",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "films_db",
  });
  connection.connect();
  return connection;
}

server.use(cors());
server.use(express.json());

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// ENDPOINTS

// GET - Leer entradas
server.get("/api/films", async (req, res) => {
  const connection = await getDBConnection();

  const sqlQuery =
    "SELECT films.id, films.title, films.year, films.rating, directors.name AS director FROM films, directors WHERE films.fkDirector = directors.id";

  const [result] = await connection.query(sqlQuery);

  connection.end();

  res.status(200).json({
    success: true,
    message: result,
  });
});

// POST - Insertar entrada

// PUT - Actualizar entrada

// DELETE - Eliminar entrada
