const express = require('express');
const router = express.Router();
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const usuarios = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/usuarios.json')));
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/', (req, res) => {
  const { username, password } = req.body;
  const usuario = usuarios.find(u => u.username === username);

  if (!usuario) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const passwordValida = bcrypt.compareSync(password, usuario.password);

  if (!passwordValida) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ id: usuario.id, username: usuario.username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
