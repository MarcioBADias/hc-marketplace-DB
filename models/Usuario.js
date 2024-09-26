const mongoose = require('mongoose')

const UsuarioSchema = new mongoose.Schema({
    apelido: { type: String, required: true },
    nomeCompleto: { type: String, required: true },
    dataNascimento: { type: Date, required: true },
    cpf: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    endereco: {
        rua: { type: String, required: true },
        numero: { type: String, required: true },
        complemento: { type: String },
        cidade: { type: String, required: true },
        uf: { type: String, required: true },
        cep: { type: String, required: true }
    }
})

const Usuario = mongoose.model('Usuario', UsuarioSchema)

module.exports = Usuario