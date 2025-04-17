const fs = require('fs')
const AuthException = require('../exceptions/AuthException')

function formatUser(user, fields) {
    const formatedUser = {}
    for (field of fields) {
        formatedUser[field] = user[field]
    }
    return formatedUser
}

function createUserConsumidor(user) {
    try {
        const formatedUser = formatUser(user, [
            "nome", "email", "celular", "password", "endereco", "complemento", "CEP", "qtdPessoas",
            "preferenciasAlimentares", "restricoesAlimentares"
        ])
        checkUser(formatedUser)
        return { message: 'Usuário criado com sucesso!', code: 200 }
    } catch (err) {
        return { title: err.title, message: err.message, code: err.code }
    }
}

function checkUser(formatedUser) {
    const fileData = fs.readFileSync('src/storage/consumidores.json')
    let jsonData = []
    try {
        jsonData = JSON.parse(fileData)
    } catch (err) {
        jsonData = []
    }
    for (user of jsonData) {
        if (formatedUser['email'] == user['email']) {
            throw new AuthException('Erro ao cadastrar', 'Este email já está em uso.', 400)
        }
    }
    jsonData.push(formatedUser)
    fs.writeFile('src/storage/consumidores.json', JSON.stringify(jsonData), err => {
        if (err) console.error(err)
        console.log('Arquivo atualizado com sucesso!')
    })

}

module.exports = {
    formatUser,
    createUserConsumidor
}