const express = require('express')
const mongoose = require('mongoose')
const bodyParse = require('body-parser')

const app = express()

app.use(bodyParse.json())

mongoose.connect('mongodb://localhost:27017/cadastroUsuarios', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conectado ao MongoDB");
}).catch((err) => {
    console.log("Erro ao conectar ao MongoDB: ", err);
})

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})