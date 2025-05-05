const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const swaggerUI = require("swagger-ui-express");
const swaggerConfig = require("./swagger.json");

require("dotenv").config();

const server = express();

async function getDBConnection() {
  const connection = await mysql.createConnection({
    host: "films-evaluacion-4-adalab-api-films.e.aivencloud.com",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "defaultdb",
    port: 21783,
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
  let connection;

  try {
    connection = await getDBConnection();

    const sqlQuery =
      "SELECT films.id, films.title, films.year, films.rating, directors.name AS director FROM films, directors WHERE films.fkDirector = directors.id";
    const [result] = await connection.query(sqlQuery);

    res.status(200).json({
      success: true,
      message: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal error. Try again later",
    });
  } finally {
    if (connection) {
      connection.end();
    }
  }
});

// GET - Leer 1 entrada
server.get("/api/film/:id", async (req, res) => {
  let connection;

  try {
    connection = await getDBConnection();

    const { id } = req.params;

    const sqlQuery =
      "SELECT films.id, films.title, films.year, films.rating, directors.name AS director FROM films, directors WHERE films.fkDirector = directors.id AND films.id = ?";
    const [result] = await connection.query(sqlQuery, [id]);

    if (result.length === 0) {
      res.status(404).json({
        success: false,
        message: "Error. We couldn't find your film",
      });
    } else {
      res.status(200).json({
        success: true,
        message: result,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal error. Try again later",
    });
  } finally {
    if (connection) {
      connection.end();
    }
  }
});

// POST - Insertar entrada
server.post("/api/film", async (req, res) => {
  let connection;

  try {
    connection = await getDBConnection();

    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).json({
        success: false,
        message: "Provide the params",
      });
    } else {
      const { title, year, rating, director } = req.body;

      if (!title || !year || !rating || !director) {
        res.status(400).json({
          success: false,
          message: "Bad params. Provide: 'title', 'year', 'rating', 'director'",
        });
      } else {
        const sqlQuery =
          "INSERT INTO films (title, year, rating, fkDirector) VALUES (?, ?, ?, ?)";
        const [result] = await connection.query(sqlQuery, [
          title,
          year,
          rating,
          director,
        ]);
        res.status(201).json({
          success: true,
          message: `Film added. ID: ${result.insertId}`,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal error. Try again later",
    });
  } finally {
    if (connection) {
      connection.end();
    }
  }
});

// PUT - Actualizar entrada
server.put("/api/film/update/:id", async (req, res) => {
  let connection;

  try {
    connection = await getDBConnection();

    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).json({
        success: false,
        message: "Provide the params",
      });
    } else {
      const { id } = req.params;
      const { title, year, rating, director } = req.body;

      if (!title || !year || !rating || !director) {
        res.status(400).json({
          success: false,
          message: "Bad params. Provide: 'title', 'year', 'rating', 'director'",
        });
      } else {
        const sqlQuery =
          "UPDATE films SET title = ?, year = ?, rating = ?, fkDirector = ? WHERE id = ?";
        const [result] = await connection.query(sqlQuery, [
          title,
          year,
          rating,
          director,
          id,
        ]);

        if (result.affectedRows === 0) {
          res.status(404).json({
            success: false,
            message: "Error. We couldn't find the film you want to update",
          });
        } else {
          res.status(200).json({
            success: true,
            message: `Film updated. ID: ${id}`,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal error. Try again later",
    });
  } finally {
    if (connection) {
      connection.end();
    }
  }
});

// DELETE - Eliminar entrada
server.delete("/api/film/delete/:id", async (req, res) => {
  let connection;

  try {
    connection = await getDBConnection();

    const { id } = req.params;

    const sqlQuery = "DELETE FROM films WHERE id = ?";
    const [result] = await connection.query(sqlQuery, [id]);

    if (result.affectedRows === 0) {
      res.status(404).json({
        success: false,
        message: "Error. We couldn't find the film you want to delete",
      });
    } else {
      res.status(200).json({
        success: true,
        message: `Film deleted. ID: ${id}`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal error. Try again later",
    });
  } finally {
    if (connection) {
      connection.end();
    }
  }
});
