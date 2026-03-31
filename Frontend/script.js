const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Banco de dados
const db = new sqlite3.Database('./database.db');

// Criar tabela
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )
`);

// Rota de cadastro
app.post('/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Dados inválidos' });
  }

  const sql = `INSERT INTO users (email, password) VALUES (?, ?)`;

  db.run(sql, [email, password], function (err) {
    if (err) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    res.json({ message: 'Usuário cadastrado com sucesso' });
  });
});

// Servidor
app.listen(PORT, () => {
  console.log(`🔥 Backend rodando em http://localhost:${PORT}`);
});


sections.forEach(section => {
  if (section.getBoundingClientRect().top < window.innerHeight) {
    section.classList.add('visible');
  }
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);

    if (!target) return;

    const elementPosition = target.getBoundingClientRect().top + window.scrollY;
    const elementHeight = target.offsetHeight;
    const windowHeight = window.innerHeight;

    const scrollTo = elementPosition - (windowHeight / 2) + (elementHeight / 2);

    window.scrollTo({
      top: scrollTo,
      behavior: 'smooth'
    });
  });
});