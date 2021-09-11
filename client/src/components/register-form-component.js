import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import Validate from "../utils/validate"
import "./styles/login-form-component.css"

export default function PartnerSignupForm() {
  //Creating object of validate class
  const Valid = new Validate()
  const history = useHistory()
  //Changes the state on user input
  const [currentValue, setValue] = useState({
    email: "",
    password: "",
    errors: {},
  })
  const { email, password, errors } = currentValue

  //Handles the input
  const handleInput = (event) =>
    setValue({ ...currentValue, [event.target.name]: event.target.value })

  // Handles the form submit
  const handleSubmit = async (event) => {
    event.preventDefault()
    //if credentials entered are valid
    if (Valid.validationStatus(currentValue, setValue)) {
      await request()
    }
  }

  const request = () => {
    const user = { email: email, password: password }
    axios
      .post("/register", user)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("isLoggedIn", true)
          localStorage.setItem("userRole", 'Customer')
          history.push("/food")
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          history.push("/register")
        }
      })
  }
  return (
    <div>
      <div className="form-container ">
        <form onSubmit={handleSubmit} className="Login-form ">
          <div>
            <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
              Signup
            </h1>
          </div>

          <div>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleInput}
              placeholder="Email address"
            />
            <div className="error">{errors["email"]}</div>
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInput}
              placeholder="Password"
            />
            <div className="error">{errors["password"]}</div>
          </div>

          <div>
            <button type="submit">Signup</button>
          </div>
          <a href="/login">Already Signed Up ? Please Login Here</a>
        </form>
      </div>

      <div className="custom-shape-divider-bottom-1612440409">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </div>
  )
}
