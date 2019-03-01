require("dotenv").config();

const axios = require("axios");
const bcrypt = require("bcryptjs");
const users = require("../database/dbConfig");
const jwt = require("jsonwebtoken");

const { authenticate } = require("../auth/authenticate");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

const getToken = user => {
  const payload = {
    username: user.username
  };

  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: "6h",
    jwtid: "0000001"
  };

  return jwt.sign(payload, secret, options);
};

function register(req, res) {
  // implement user registration
  let user = req.body;
  user.password = bcrypt.hashSync(user.password, 8)
  console.log(user)
  users('users')
    .insert(user)
    .then(ids => {
     res.json({id: ids[0]})
       })
    .catch((err) => {
     res
      .status(500)
      .json(error)
     })
}

function login(req, res) {
  // implement user login
  const user = req.body
  users('users')
  .where('username', user.username).first()
  .then((users) => {
   if (users.length && bcrypt.compareSync(user.password, users[0].password)) {
    const token = getToken(user)
    res.json({message: `Welcome ${user.username}!, Here's a *token* of my gratitude for loggin in lol`, token})
     }
     else {
      res.status(401)
         .json({message: "either your username or passwprd is invalid"})
     }
    })
    .catch((error) => {
     res
      .status(400)
      .json(error)
    })
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
