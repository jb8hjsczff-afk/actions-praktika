const express = require('express');
const { Pool } = require('pg');
const pool = new Pool({
  host: process.env.DB_HOST, port: process.env.DB_PORT,
  database: process.env.DB_NAME, user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
const app = express();
app.get('/health', (_, res) => res.send('ok'));
app.get('/api/data', async (_, res) => res.json((await pool.query('SELECT * FROM items')).rows));
app.get('/api/items/count', async (_, res) => res.send((await pool.query('SELECT COUNT(*) FROM items')).rows[0].count));
app.listen(3000);
