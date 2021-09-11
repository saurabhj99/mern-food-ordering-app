const express = require("express")
const router = express.Router()
const Address = require("../models/address")
const { isAuthenticated } = require("../middleware")

router.get("/account/address", isAuthenticated, (req, res) => {
  Address.find({ user_id: req.currentUser._id }, (err, foundAddresses) => {
    if (err) {
      console.log(err)
      res.status(404).json({ message: "Page not found" })
    } else {
      res.status(200).json(foundAddresses)
    }
  })
})

router.post("/account/:id/setaddress", isAuthenticated, async (req, res) => {
  try {
    req.currentUser.active_address = req.params.id
    await req.currentUser.save()
    res.status(202).json({ message: "Success" })
  } catch {
    res.status(404).json({ message: "Error" })
  }
})
router.get("/address/:id", isAuthenticated, async (req, res) => {
  Address.findById(req.params.id, (err, foundAddress) => {
    if (err) {
      res.status(500)
    } else {
      res.status(200).json({ address: foundAddress })
    }
  })
})

router.put("/address/edit/:id", isAuthenticated, async (req, res) => {
  const { fullname, ad1, ad2, region, zip, pno } = req.body
  const newAddress = {
    full_name: fullname,
    address: `${ad1} , ${ad2}`,
    user_id: req.currentUser._id,
    contact_num: pno,
    region,
    zip_code: zip,
  }
  if (fullname && ad1 && ad2 && region && zip && pno) {
    Address.findByIdAndUpdate(req.params.id, newAddress, (err, success) => {
      if (err) {
        res.status(500)
      } else {
        res.status(204).json({ message: "Updated Successfully" })
      }
    })
  } else {
    res.status(422).json({ message: "Please fill in the fields" })
  }
})

router.delete("/address/:id", isAuthenticated, (req, res) => {
  Address.findOneAndDelete(req.params.id, (err, success) => {
    if (err) {
      res.status(500)
    } else {
      res.status(200).json({ message: "Deleted Successfully" })
    }
  })
})

router.post("/account/address", isAuthenticated, (req, res) => {
  if (req.body) {
    const { fullname, ad1, ad2, region, zip, pno } = req.body
    const newAddress = {
      full_name: fullname,
      address: `${ad1} , ${ad2}`,
      user_id: req.currentUser._id,
      contact_num: pno,
      region,
      zip_code: zip,
    }
    Address.create(newAddress, (err, success) => {
      if (err) {
        console.log(err)
        res.status(500).json({ message: "Page Not Found" })
      } else {
        res.status(204).json({ message: "Address successfully added" })
      }
    })
  }
})

module.exports = router
