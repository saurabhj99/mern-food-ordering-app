import { useEffect, useState } from "react"
import axios from "axios"
import "./styles/payment-page-component.css"
import getLocalStorage from "../utils/getData"
import Loading from "./loading-component"
import OrderSuccess from "./order-complete-component"

export default function Payment({ cartItems, setCartItems, setItemCount }) {
  useEffect(() => {
    getLocalStorage(setCartItems)
  }, [])

  const [input, setInput] = useState({ full_name: "", cnum: "", cvv: "" })
  const [orderDetails, setOrderDetails] = useState()
  const [paymentStatus, setPaymentStatus] = useState("pending")
  const [message, setMessage] = useState({ text: "", type: "" })

  const { full_name, cnum, cvv } = input

  const body = { full_name, cnum, cvv, items: cartItems }
  const onChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    if (cnum && full_name && cvv) {
      setPaymentStatus("processing")

      axios
        .post("/payment", body)
        .then(async (res) => {
          if (res.status === 200){
            localStorage.removeItem("cartitems")
            setCartItems([])
            setItemCount(0)
            setOrderDetails(res.data.order)
            setPaymentStatus("success")
          } else {
            console.log("payment failed")
          }
        })
        .catch((err) => {
          console.log("error payment failed")
        })
    } else {
      setMessage({
        text: "Please fill in the fields",
        type: "error",
      })
    }
  }

  return paymentStatus === "pending" ? (
    <>
      <div className={`flash-message ${message.type}`}>{message.text}</div>
      <div className="payment-pg-container">
        <h1 className="centered">Payment</h1>
        <h3 className="centered">Accepted Cards</h3>
        <div className="icon-container">
          <i
            className="fab fa-cc-visa"
            style={{ color: "navy", fontSize: "30px" }}
          ></i>
          <i
            className="fab fa-cc-amex"
            style={{ color: "blue", fontSize: "30px" }}
          ></i>
          <i
            className="fab fa-cc-mastercard"
            style={{ color: "red", fontSize: "30px" }}
          ></i>
          <i
            className="fab fa-cc-discover"
            style={{ color: "orange", fontSize: "30px" }}
          ></i>
        </div>
        <form className="payment-form" onSubmit={onSubmitHandler}>
          <div className="card-name">
            <label htmlFor="name">NAME ON CARD</label>
            <input
              id="name"
              name="full_name"
              type="text"
              value={full_name}
              onChange={onChangeHandler}
              placeholder="JOHN Doe 2"
            />
          </div>
          <div className="card-number">
            <label htmlFor="cnum">CARD NUMBER</label>
            <input
              id="cnum"
              name="cnum"
              type="password"
              value={cnum}
              onChange={onChangeHandler}
              maxLength="12"
              minLength="12"
              placeholder="1111-2222-3333-4444"
            />
          </div>
          <div className="card-cvv">
            <label htmlFor="cvv">CVV</label>
            <input
              id="cvv"
              name="cvv"
              type="password"
              placeholder="XXX"
              maxLength="3"
              minLength="3"
              value={cvv}
              onChange={onChangeHandler}
            />
          </div>
          <div className="card-save">
            <input id="savecard" type="checkbox" />
            <label htmlFor="savecard">Save card for future purchases</label>
          </div>
          <button type="submit">Pay</button>
        </form>
      </div>
    </>
  ) : paymentStatus === "processing" ? (
    <Loading message={"Processing transaction..."} />
  ) : (
    <OrderSuccess orderDetails={orderDetails} />
  )
}
