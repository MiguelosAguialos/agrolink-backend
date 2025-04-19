const fs = require('fs')
const AuthException = require('../exceptions/AuthException')

function checkUserConsumidor(formatedUser) {
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
    return jsonData
}

function checkUserVoluntario(formatedUser) {
    const fileData = fs.readFileSync('src/storage/voluntarios.json')
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
    return jsonData
}

function getUser(user) {
    const voluntariosData = fs.readFileSync('src/storage/voluntarios.json')
    const consumidoresData = fs.readFileSync('src/storage/consumidores.json')
    let jsonData = []
    convertJson(voluntariosData, jsonData)
    convertJson(consumidoresData, jsonData)
    for (item of jsonData) {
        if (user['email'] == item['email']) {
            if (user['password'] == item['password']) {
                return user;
            }
            throw new AuthException('Credenciais inválidas', 'Verifique se as credenciais estão corretas', 400)
        }
    }
    throw new AuthException('Credenciais inválidas', 'Verifique se as credenciais estão corretas', 400)
}

function convertJson(data, fullData) {
    try {
        jsonData = JSON.parse(data)
        for (item of jsonData) {
            fullData.push(item)
        }
    } catch (err) {
        return
    }
}

function login(user) {
    try {
        return getUser(user)
    } catch (err) {
        return { title: err.title, message: err.message, code: err.code }
    }
}

module.exports = {
    checkUserConsumidor,
    checkUserVoluntario,
    login
}

