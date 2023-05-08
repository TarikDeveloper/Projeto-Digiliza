const express = require('express');
const app = express();
const userController = require('./controllers/userController');
const path = require('path');

app.use('/users', userController);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configurar a rota para a página inicial do seu frontend
app.use(express.static(path.join(__dirname, '../frontend')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Inicie o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
