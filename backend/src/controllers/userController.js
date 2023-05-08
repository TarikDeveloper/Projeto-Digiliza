const express = require('express');
const mysql = require('mysql2/promise');
const config = require('../utils/config');

const router = express.Router();

const pool = mysql.createPool(config.mysql);

router.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM user WHERE email = ? AND password = ?', [email, password]);
    connection.release();

    if (rows.length === 1) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ error: 'Usuário ou senha incorretos' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post('/register', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;

  if (password != confirm_password) {
    return res.status(400).send('As senhas não coincidem!');
  }

  try {
    const connection = await pool.getConnection();
    const [results] = await connection.execute('SELECT * FROM user WHERE email = ?', [email]);

    if (results.length > 0) {
      return res.status(400).send('Este e-mail já está sendo usado por outro usuário.');
    }

    const [insertResult] = await connection.execute('INSERT INTO user (name, email, password) VALUES (?, ?, ?)', [name, email, password]);

    console.log(`Novo usuário inserido com sucesso com o ID ${insertResult.insertId}.`);
    return res.status(200).send('Usuário registrado com sucesso.');

  } catch (error) {
    console.log(error);
    return res.status(500).send('Erro interno do servidor.');
  }
});

module.exports = router;
