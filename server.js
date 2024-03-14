const express = require('express');
const app = express();
const port = 3000; // Porta do servidor

// Arquivo HTML a ser servido
const indexFile = './index.html';

// Configure o servidor para servir arquivos estáticos
app.use(express.static(__dirname));

// Rota para servir o index.html
app.get('/', (req, res) => {
    res.sendFile(indexFile);
});

// Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor em execução na porta ${port}`);
});
