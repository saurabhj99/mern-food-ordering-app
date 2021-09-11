import React, { useState } from "react"
import axios from "axios"
import "./styles/login-form-component.css"

export default function ForgotPassword() {
  const [currentValue, setValue] = useState({
    email: "",
    password: "",
    errors: {},
  })
  const [message, setMessage] = useState({ text: "", type: "" })
  const [status, setStatus] = useState("notfound")
  const { email, password, errors } = currentValue
  const handleInput = (event) =>
    setValue({ ...currentValue, [event.target.name]: event.target.value })

  const handleSubmit = async (event) => {
    event.preventDefault()

    const url = event.target.dataset.action
    if (email || password) {
      await request(url)
    } else {
      setMessage({
        text: "Please fill in the fields",
        type: "error",
      })
    }
  }
  const request = (url) => {
    const user = url === "/account" ? { email } : { email, password }
    axios
      .post(url, user)
      .then(async (res) => {
        if (url === "/account") {
          if (res.status === 200) {
            // console.log("found")
            setStatus("userfound")
          }
        }
        if (url === "/account/rstpswd") {
          if (res.status === 200) {
            // console.log(res)
            setMessage({
              text: "Password changed Successfully... Please Login",
              type: "success",
            })
          } else {
            setStatus("failure")
            setMessage({
              text: "There might be some error please try again",
              type: "error",
            })
          }
        }
      })
      .catch((err) => {
        setMessage({
          text: "User not found please register",
          type: "error",
        })
      })
  }
  return (
    <div>
      <div className={`flash-message ${message.type}`}>{message.text}</div>
      <div className="form-container">
        {status === "notfound" && (
          <form
            onSubmit={handleSubmit}
            className="Login-form fgtpswd"
            data-action="/account"
          >
            <div>
              <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
                Enter your email
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
              <button type="submit">Proceed</button>
            </div>
          </form>
        )}
        {status === "userfound" && (
          <form
            onSubmit={handleSubmit}
            className="Login-form fgtpswd"
            data-action="/account/rstpswd"
          >
            <div>
              <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
                Reset Password
              </h1>
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleInput}
                placeholder="Enter New Password"
              />
              <div className="error">{errors["password"]}</div>
            </div>
            <div>
              <button type="submit">Change Password</button>
            </div>
          </form>
        )}
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
    </div>
  )
}
