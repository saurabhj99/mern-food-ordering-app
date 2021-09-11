import { Link, NavLink, useHistory, useLocation } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react"
import "./styles/navbar-component.css"
const activeLinkStyle = { color: "red", fontSize: "19px", fontWeight: "700" }

export default function Navbar({
  isLoggedIn,
  itemCount,
  userRole,
  setLoginStatus,
}) {
  const isRoleCustomer = userRole === "Customer"
  const isRolePartner = userRole === "Partner"
  const history = useHistory()
  const location = useLocation()
  useEffect(() => {
    setLoginStatus(localStorage.getItem("isLoggedIn"))
  }, [location])

  //Handles the navbar links in small screen size
  const navbarHandler = () => {
    const link = document.getElementsByClassName("links")[0]
    setTimeout(() => link.classList.toggle("active"), 300)
  }

  const logOut = async () => {
    await axios.get("/logout")
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userRole")
    history.push("/")
  }

  return (
    <nav className="navbar">
      <div className="Logo">
        <h1>
          {" "}
          FoodieZone <i className="fas fa-utensils"></i>
        </h1>
      </div>
      <div className="hamburger-icon">
        <button onClick={navbarHandler}>
          <i className="fa fa-bars" aria-hidden="true"></i>
        </button>
      </div>
      <div className="links">
        <ul>
          <li className={isLoggedIn && isRolePartner ? "display" : "hidden"}>
            <NavLink exact to="/product/list" activeStyle={activeLinkStyle}>
              Products
            </NavLink>
          </li>
          <li className={isLoggedIn && isRolePartner ? "display" : "hidden"}>
            <NavLink exact to="/product/add" activeStyle={activeLinkStyle}>
              Publish
            </NavLink>
          </li>
          <li className={isLoggedIn ? "hidden" : "display"}>
            <Link to="/login">Login</Link>
          </li>
          <li className={isLoggedIn ? "hidden" : "display"}>
            <Link to="/register">Signup</Link>
          </li>
          <li className={isLoggedIn && isRoleCustomer ? "display" : "hidden"}>
            <NavLink exact to="/food" activeStyle={activeLinkStyle}>
              Food
            </NavLink>
          </li>
          <li className={isLoggedIn && isRoleCustomer ? "display" : "hidden"}>
            <NavLink exact to="/cart" activeStyle={activeLinkStyle}>
              <i className="fas fa-shopping-cart"></i> Cart{" "}
              <div className="cart-item-count">{itemCount && itemCount}</div>
            </NavLink>
          </li>
          <li className={isLoggedIn && isRoleCustomer ? "display" : "hidden"}>
            <NavLink exact to="/orders" activeStyle={activeLinkStyle}>
              Orders
            </NavLink>
          </li>
          <li className={isLoggedIn ? "display" : "hidden"}>
            <Link to="#" onClick={logOut}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
