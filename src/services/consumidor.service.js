const fs = require("fs");
const AuthException = require("../exceptions/AuthException");
const {
  checkUserVoluntario,
  checkUserConsumidor,
} = require("./common.service");

function formatUser(user, fields) {
  const formatedUser = {};
  for (field of fields) {
    formatedUser[field] = user[field];
  }
  return formatedUser;
}

function createUserConsumidor(user) {
  try {
    const formatedUser = formatUser(user, [
      "nome",
      "email",
      "celular",
      "password",
      "endereco",
      "complemento",
      "CEP",
      "qtdPessoas",
      "preferenciasAlimentares",
      "restricoesAlimentares",
    ]);
    checkUser(formatedUser);
    return { message: "Usuário criado com sucesso!", code: 200 };
  } catch (err) {
    return { title: err.title, message: err.message, code: err.code };
  }
}

function checkUser(formatedUser) {
  try {
    jsonData = checkUserConsumidor(formatedUser);
    checkUserVoluntario(formatedUser);
    for (user of jsonData) {
      if (formatedUser["email"] == user["email"]) {
        throw new AuthException(
          "Erro ao cadastrar",
          "Este email já está em uso.",
          400
        );
      }
    }
    jsonData.push(formatedUser);
    fs.writeFile(
      "src/storage/consumidores.json",
      JSON.stringify(jsonData),
      (err) => {
        if (err) console.error(err);
        console.log("Arquivo atualizado com sucesso!");
      }
    );
  } catch (err) {
    throw new AuthException(err.title, err.message, err.code);
  }
}

function getUserConsumidor(email) {
  try {
    const fileData = fs.readFileSync("src/storage/consumidores.json");
    let jsonData = [];
    try {
      jsonData = JSON.parse(fileData);
    } catch (err) {
      jsonData = [];
    }
    for (user of jsonData) {
      if (email == user["email"]) {
        console.log(user);
        return user;
      }
    }
  } catch (err) {
    throw new AuthException("Erro para usuário", "Erro ao editar usuário", 500);
  }
}

function updateConsumidor(mainUser) {
  console.log(mainUser);
  try {
    const fileData = fs.readFileSync("src/storage/consumidores.json");
    let jsonData = [];
    try {
      jsonData = JSON.parse(fileData);
    } catch (err) {
      jsonData = [];
    }
    jsonData.map((user, index) => {
      if (mainUser["email"] == user["email"]) {
        jsonData[index] = mainUser;
      }
    });
    fs.writeFile(
      "src/storage/consumidores.json",
      JSON.stringify(jsonData),
      (err) => {
        if (err) console.error(err);
        console.log("Arquivo atualizado com sucesso!");
      }
    );
  } catch (err) {
    throw new AuthException(
      "Erro para usuário",
      "Erro ao buscar usuário pelo email",
      404
    );
  }
}

module.exports = {
  formatUser,
  createUserConsumidor,
  getUserConsumidor,
  updateConsumidor,
};
