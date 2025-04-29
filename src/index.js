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
