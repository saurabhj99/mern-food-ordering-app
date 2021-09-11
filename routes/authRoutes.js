const express = require("express")
const router = express.Router()
const { doesUserExists, findRegisteredUser } = require("../middleware")
const { loginController, signUpController } = require("../controllers")

//===========================CUSTOMER ROUTES======================================//

router.post("/register", doesUserExists, signUpController)

router.post("/login", loginController)

//===========================PARTNER ROUTES======================================//

router.post("/partner/register", doesUserExists, signUpController)

router.post("/partner/login", loginController)

router.post("/account", findRegisteredUser, async (req, res) => {
  res.status(200).json({ message: "User Found" })
})

router.post("/account/rstpswd", findRegisteredUser, async (req, res) => {
  try {
    if (req.body.password) {
      const newPassword = await req.foundUser.resetPassword(req.body.password)
      console.log(newPassword)
      res
        .status(200)
        .json({ message: "Password Changed Successfully...Please Login" })
    }
  } catch {
    res.status(500).json({ message: "Internal Server Error" })
  }
})

router.get("/logout", (req, res) => {
  res.clearCookie("jwt")
  res.json({ message: "Logged out Successfully" })
})

module.exports = router
