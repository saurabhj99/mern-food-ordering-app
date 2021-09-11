import React, { useState, useEffect } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import "./styles/address-form-component.css"
import getLocalStorage from "../utils/getData"
export default function CheckoutForm({ setCartItems }) {
  const [inputValue, setInputValue] = useState({
    fullname: "",
    ad1: "",
    ad2: "",
    zip: "",
    region: "",
    pno: "",
  })
  const [message, setMessage] = useState({ text: "", type: "" })
  const history = useHistory()
  const { fullname, ad1, ad2, zip, region, pno } = inputValue
  const changeHandler = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    getLocalStorage(setCartItems)
  }, [])

  const submitHandler = (e) => {
    e.preventDefault()
    if (fullname && ad1 && ad2 && zip && region && pno) {
      axios
        .post("/account/address", inputValue)
        .then((res) => {
          if (res.status === 204) {
            history.push("/address")
          }
        })
        .catch((err) => {
          // console.log(err)
        })
    } else {
      setMessage({
        text: "Please Fill in the fields",
        type: "error",
      })
    }
  }
  return (
    <>
      <div className={`flash-message ${message.type}`}>{message.text}</div>
      <form className="cstm-frm1" onSubmit={submitHandler}>
        <h1 className="centered">ADD NEW ADDRESS</h1>
        <label htmlFor="name"> Full Name</label>
        <input
          id="name"
          value={fullname}
          onChange={changeHandler}
          type="text"
          name="fullname"
          placeholder="Full Name"
        />

        <label htmlFor="ad1">Address Line 1</label>
        <input
          id="ad1"
          value={ad1}
          onChange={changeHandler}
          type="text"
          name="ad1"
          placeholder="House/Street, P.O. Box Number"
        />

        <label htmlFor="ad2">Address Line 2</label>
        <input
          id="ad2"
          value={ad2}
          onChange={changeHandler}
          type="text"
          name="ad2"
          placeholder="Apartment,Building,Floor etc."
        />

        <label htmlFor="region">State / Province / Region</label>
        <input
          id="region"
          value={region}
          onChange={changeHandler}
          type="text"
          name="region"
          placeholder="State,Region,Province"
        />

        <label htmlFor="zip">Zip code</label>
        <input
          id="zip"
          value={zip}
          onChange={changeHandler}
          type="text"
          name="zip"
          placeholder="Your Zip Code"
        />

        <label htmlFor="pno">Phone Number</label>
        <input
          id="pno"
          value={pno}
          onChange={changeHandler}
          type="tel"
          name="pno"
          placeholder="Your Phone Number"
          pattern="^[0-9]{10}$"
        />

        <input type="submit" className="cstm-button1 btn-sm" value="Save" />
      </form>
    </>
  )
}
