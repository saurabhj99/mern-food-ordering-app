import "./styles/address-component.css"
import { Link, useHistory } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import getLocalStorage from "../utils/getData"
import Loading from "./loading-component"

export default function Address({ setCartItems }) {
  const history = useHistory()
  const [addresses, setAddresses] = useState([])
  const [status, setStatus] = useState("inactive")
  const [addressId, setAddressId] = useState("")
  const [fetchStatus, setFetchStatus] = useState("loading")
  useEffect(() => {
    getLocalStorage(setCartItems)
    axios
      .get("/account/address")
      .then(async (res) => {
        const address = await JSON.parse(JSON.stringify(res.data))
        setAddresses(address)
        setFetchStatus("success")
      })
      .catch((err) => {
        setFetchStatus("failure")
      })
  }, [])

  const clickHandler = (e) => {
    setAddressId(e.target.value)
    setStatus("active")
  }
  const buttonClickHandler = (e, id, action) => {
    switch (action) {
      case "edit":
        history.push(`/address/edit/${id}`)
        break
      case "delete":
        axios
          .delete(`/address/${id}`)
          .then((res) => {
            if (res.status === 200) {
              window.location.reload()
            } else {
              alert("Error")
            }
          })
          .catch((err) => {
            alert("Error")
          })
        break
      default:
        break
    }
  }

  const onButtonClick = () => {
    axios
      .post(`/account/${addressId}/setaddress`)
      .then((res) => {
        if (res.status === 202) {
          history.push("/payment")
        } else {
          history.push("/address")
        }
      })
      .catch((err) => {
        history.push("/address")
      })
  }

  return fetchStatus === "loading" ? (
    <Loading />
  ) : (
    <div className="address-container">
      <h1>Your Addresses</h1>
      {addresses.length && fetchStatus === "success" ? (
        <form>
          {addresses.map((address) => (
            <div key={address._id} className="address">
              <input
                className="centered"
                type="radio"
                value={address._id}
                name="address"
                onClick={clickHandler}
              />
              <label htmlFor="add">
                <h3>{address.full_name}</h3>
                <div>+91-{address.contact_num}</div>
                <div>{`${address.address}-${address.zip_code}`}</div>
              </label>
              <div className="btn-container">
                <button
                  type="button"
                  onClick={(e) => buttonClickHandler(e, address._id, "edit")}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  type="button"
                  onClick={(e) => buttonClickHandler(e, address._id, "delete")}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          ))}
        </form>
      ) : (
        <h1 className="centered mt-4">You don't have any saved address</h1>
      )}

      <Link to="/address/add" className="add-address-btn centered">
        + ADD NEW ADDRESS
      </Link>
      <button
        onClick={onButtonClick}
        type="button"
        className={`green-btn add-address-btn centered ${status}`}
      >
        PROCEED
      </button>
    </div>
  )
}
