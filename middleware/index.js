const jwt = require("jsonwebtoken")
const User = require("../models/user")
const isAuthenticated = async (req, res, next) => {
  try {
    const clientToken = req.cookies.jwt
    const token = await jwt.verify(clientToken, process.env.SECRET_KEY)
    const foundUser = await User.findOne({
      _id: token._id,
      "tokens.token": clientToken,
    })
    if (foundUser) {
      req.currentUser = foundUser
    
      next()
    } else {
      console.log(err)
      res.status(422).json({ message: "There might be some error" })
    }
  } catch {
    res.status(422).json({ message: "There might be some error" })
  }
}

const doesUserExists = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email })
    if (!existingUser) {
      next()
    } else {
      res.status(401).json({ message: "user already exists" })
    }
  } catch {
    res.status(500).json({ message: "There might be some error" })
  }
}

const findRegisteredUser = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email })
    if (foundUser) {
      req.foundUser=foundUser
      next()
    } else {
      res.status(422).json({ message: "Invalid User", type: "error" })
    }
  } catch {
    res.status(422).json({ message: "Invalid User", type: "error" })
  }
}

module.exports = { isAuthenticated, doesUserExists, findRegisteredUser }
