const express = require("express");
const app = express();
var cors = require("cors");
const consumidorService = require("../services/consumidor.service");
const voluntarioService = require("../services/voluntario.service");
const commonService = require("../services/common.service");

const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/newConsumidor", (req, res) => {
  const user = req.body.user;
  res.send(consumidorService.createUserConsumidor(user));
});

app.post("/newVoluntario", (req, res) => {
  const user = req.body.user;
  res.send(voluntarioService.createUserVoluntario(user));
});

app.post("/login", (req, res) => {
  const user = req.body.user;
  res.send(commonService.login(user));
});

app.post("/getConsumidorUserInfo", (req, res) => {
  const email = req.body.email;
  res.send(consumidorService.getUserConsumidor(email));
});

app.post("/updateConsumidor", (req, res) => {
  const user = req.body.user;
  res.send(consumidorService.updateConsumidor(user));
});

app.listen(port, () => {
  console.log(`Application running on port: ${port}`);
});
