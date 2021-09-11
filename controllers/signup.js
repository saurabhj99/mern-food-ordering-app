const User = require("../models/user")

const signUpController = (req, res) => {
  const userType = req.url.split("/")[1]
  const role = userType === "partner" ? "Partner" : "Customer"
  const { email, password, name } = req.body
  const inputCheck = {
    Customer: email && password,
    Partner: email && password && name,
  }

  if (inputCheck[role]) {
    User.create({ email, password, role, name }, async (err, newUser) => {
      if (err) {
        res.status(500).json({ message: "error" })
      } else {
        await newUser.hashPassword(req.body.password)
        const token = await newUser.generateAuthToken()
        res.cookie("jwt", token, { maxAge: new Date(Date.now() + 30000) })
        res.status(200).json({ message: "User registered successfully" })
      }
    })
  }
}

module.exports = signUpController
