const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

console.log("Servidor iniciando...");

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./db.sqlite', (err) => {
  if (err) {
    console.error("Erro ao abrir banco:", err);
  } else {
    console.log("Banco de dados conectado");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`, () => {
  console.log("Tabela users pronta");
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;

  db.run(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, password],
    err => {
      if (err) {
        return res.json({ message: 'Usuário já existe' });
      }
      res.json({ message: 'Conta criada com sucesso!' });
    }
  );
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
