import { useEffect, useState } from "react"
import axios from "axios"
import getLocalStorage from "../utils/getData"
import { formatDate } from "../utils/dateHelper"
import "./styles/orders-component.css"
import Loading from "./loading-component"
const Items = ({ items, orderedAt ,totalAmount }) => {
  return (
    <div className="order-container">
      <div className="orders">
        {items.map(({ id, image, name, price, quantity }) => (
          <div className="order">
            <div>
              <img alt={`food-${id}`} width="80px" height="70px" src={image} />
            </div>
            <div>
              <strong>{name}</strong>
            </div>
            <div>
              <strong>Rs </strong>
              {price} X {quantity}
            </div>
          </div>
        ))}
      </div>
      <div className="order-info">
        <div>
          <strong>Ordered On:</strong>
          <div>{formatDate(orderedAt)}</div>
        </div>
        <div>
          <strong>Delivery Charges:</strong>
          <div>
          ₹ <span style={{ color: "green" }}>FREE</span>
          </div>
        </div>
        <div>
          <strong>Amount Paid:</strong>
          <div>₹ {totalAmount}</div>
        </div>
      </div>
      <div className="delivery-info">
        <div className="green-dot"></div>
        <div>Delivered</div>
      </div>
    </div>
  )
}

export default function Order({ setCartItems }) {
  const [orders, setOrders] = useState([])
  const [fetchStatus, setFetchStatus] = useState("loading")

  useEffect(() => {
    getLocalStorage(setCartItems)
    axios
      .post("/orders")
      .then((res) => {
        if (res.status === 200) {
          if (res.data.orders.length) {
            setOrders(res.data.orders)
            setFetchStatus("success")
          }else{
            setFetchStatus("failure")
          }
        } else {
          // console.log("error")
          setFetchStatus("failure")
        }
      })
      .catch((err) => {
        // console.log(err)
      })
  }, [])
  return fetchStatus === "success" ? (
    <div className="order-details">
      <div className="order-details-header">
        <h1>Your Orders</h1>
        <hr />
      </div>
      {orders.map(({ items, transaction, orderedAt,totalAmount }) => (
        <Items items={items} transaction={transaction} orderedAt={orderedAt} totalAmount={totalAmount}/>
      ))}
    </div>
  ) : fetchStatus === "loading" ? (
    <Loading message="Your Orders are loading...." />
  ) : (
    <h1 className="centered">You have not ordered anything yet</h1>
  )
}
