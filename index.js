require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 3000;

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false,
    }
};

app.use(express.json());

app.use(cors());

app.post('/insertData', async (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const age = req.body.age;
  const connection = await mysql.createConnection(dbConfig);
  const sql = `INSERT INTO my_table (name, age) VALUES (?, ?)`;
  await connection.execute(sql, [name, age]);
  console.log("Data inserted");
  res.send({ success: true });
});

app.get('/getData', async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.query('SELECT * FROM my_table');
  console.log(rows);
  res.send(rows);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
