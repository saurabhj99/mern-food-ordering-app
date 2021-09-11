const User = require("../models/user")

const ALLOWED_USER_TYPES = ["Partner", "Customer"]

const loginController = async (req, res) => {
  const userType = req.url.split("/")[1]
  const role = userType === "partner" ? "Partner" : "Customer"
  const { email, password } = req.body
  const FoundUser = await User.findOne({ email: email, role })
  if (FoundUser) {
    const passwordMatch = await FoundUser.checkPassword(password)
    if (passwordMatch) {
      const token = await FoundUser.generateAuthToken()
      res.cookie("jwt", token, { maxAge: new Date(Date.now() + 30000) })
      res.status(200).json({ message: "Logged In successfully" })
    } else {
      res.status(422).json({ message: "Incorrect username or password" })
    }
  } else {
    res.status(422).json({ message: "User Doesn't Exist please register" })
  }
}

module.exports = loginController
