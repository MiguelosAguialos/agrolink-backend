const fs = require('fs')
const AuthException = require('../exceptions/AuthException')
const { checkUserVoluntario, checkUserConsumidor } = require('./common.service')

function formatUser(user, fields) {
    const formatedUser = {}
    for (field of fields) {
        formatedUser[field] = user[field]
    }
    return formatedUser
}

function createUserVoluntario(user) {
    try {
        const formatedUser = formatUser(user, [
            "nome", "email", "celular", "password", "endereco", "complemento", "CEP", "tipoAlimentos",
            "disponibilidade"
        ])
        checkUser(formatedUser)
        return { message: 'Usuário criado com sucesso!', code: 200 }
    } catch (err) {
        return { title: err.title, message: err.message, code: err.code }
    }
}

function checkUser(formatedUser) {
    try {
        jsonData = checkUserVoluntario(formatedUser)
        checkUserConsumidor(formatedUser)
        for (user of jsonData) {
            if (formatedUser['email'] == user['email']) {
                throw new AuthException('Erro ao cadastrar', 'Este email já está em uso.', 400)
            }
        }
        jsonData.push(formatedUser)
        fs.writeFile('src/storage/voluntarios.json', JSON.stringify(jsonData), err => {
            if (err) console.error(err)
            console.log('Arquivo atualizado com sucesso!')
        })
    } catch (err) {
        throw new AuthException(err.title, err.message, err.code)
    }
}

module.exports = {
    formatUser,
    createUserVoluntario
}