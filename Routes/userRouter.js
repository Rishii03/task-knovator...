const express = require("express")
const { Registration, login } = require("../Controller/userController")
const userRoutee = express.Router()
userRoutee.post("/register", Registration)
userRoutee.post("/login", login)

module.exports = {userRoutee}