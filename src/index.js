const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const swaggerUI = require("swagger-ui-express");
const swaggerConfig = require("./swagger.json");

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

server.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerConfig));

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

// GET - Leer 1 entrada
server.get("/api/film/:id", async (req, res) => {
  const connection = await getDBConnection();

  const { id } = req.params;

  const sqlQuery =
    "SELECT films.id, films.title, films.year, films.rating, directors.name AS director FROM films, directors WHERE films.fkDirector = directors.id AND films.id = ?";
  const [result] = await connection.query(sqlQuery, [id]);

  connection.end();

  res.status(200).json({
    success: true,
    message: result,
  });
});

// POST - Insertar entrada
server.post("/api/film", async (req, res) => {
  const connection = await getDBConnection();

  const { title, year, rating, director } = req.body;

  const sqlQuery =
    "INSERT INTO films (title, year, rating, fkDirector) VALUES (?, ?, ?, ?)";
  const [result] = await connection.query(sqlQuery, [
    title,
    year,
    rating,
    director,
  ]);

  connection.end();

  res.status(201).json({
    success: true,
    message: `Film added. ID: ${result.insertId}`,
  });
});

// PUT - Actualizar entrada
server.put("/api/film/update/:id", async (req, res) => {
  const connection = await getDBConnection();

  const { id } = req.params;
  const { title, year, rating, director } = req.body;

  const sqlQuery =
    "UPDATE films SET title = ?, year = ?, rating = ?, fkDirector = ? WHERE id = ?";
  const [result] = await connection.query(sqlQuery, [
    title,
    year,
    rating,
    director,
    id,
  ]);

  connection.end();

  res.status(200).json({
    success: true,
    message: `Film updated. ID: ${id}`,
  });
});

// DELETE - Eliminar entrada
server.delete("/api/film/delete/:id", async (req, res) => {
  const connection = await getDBConnection();

  const { id } = req.params;

  const sqlQuery = "DELETE FROM films WHERE id = ?";
  const [result] = await connection.query(sqlQuery, [id]);

  connection.end();

  res.status(200).json({
    success: true,
    message: `Film deleted. ID: ${id}`,
  });
});
