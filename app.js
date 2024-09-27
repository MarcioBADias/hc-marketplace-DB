const express = require('express')
const mongoose = require('mongoose')
const bodyParse = require('body-parser')
const Usuario = require('./models/Usuario')

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

app.post('/usuarios', async (req, res) => {
    const { 
        apelido, 
        nomeCompleto, 
        dataNascimento, 
        cpf, 
        email, 
        endereco } = req.body
    
    if(
        !apelido|| 
        !nomeCompleto|| 
        !dataNascimento|| 
        !cpf|| 
        !email|| 
        !endereco 
    ){
        return res.status(400).json({
            message: 'Preencha todos os campos obrigatórios'
        })
    }

    try{
        const novoUsuario = new Usuario({
            apelido,
            nomeCompleto,
            dataNascimento,
            cpf,
            email,
            endereco
    })

    await novoUsuario.save()
    res.status(201).json({
        message: 'Usuário cadastrado com sucesso', usuario: novoUsuario
    })
    }catch (err) {res.status(500).json({
        message: 'erro ao cadastrar o usuário',
        erro: err
    })}
})

app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.find()
        res.status(200).json(usuarios)
    }catch (err) {
        res.status(500).json({
            message: 'Erro em buscar os usuários.',
            erro: err
        })
    }
})

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})

