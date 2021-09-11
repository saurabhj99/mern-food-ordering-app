import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./App.css"
import LoginForm from "./components/login-form-component"
import RegisterForm from "./components/register-form-component"
import FoodItemPage from "./components/fooditems-page-component"
import AddFoodItem from "./components/addfooditems-component"
import UpdateFoodItem from "./components/updatefooditems-component"
import Homepage from "./components/home-page-component"
import AddressForm from "./components/address-form-component"
import Cart from "./components/cart-component"
import Navbar from "./components/navbar-component"
import Address from "./components/address-component"
import Payment from "./components/payment-page-component"
import PartnerLogin from "./components/partner-login-component"
import PartnerRegister from "./components/partner-signup-component"
import Orders from "./components/orders-component"
import ForgotPassword from "./components/forgot-password-component"
import { useEffect, useState } from "react"
import ProductList from "./components/product-list-component"
import UpdateAddress from "./components/update-address-component"
const PartnerRoutes = (props) => {
  const { isLoggedIn, setLoginStatus } = props
  useEffect(() => {
    setLoginStatus(localStorage.getItem("isLoggedIn"))
  }, [props])
  return isLoggedIn ? (
    <>
      <Route path="/product/add" exact component={AddFoodItem}></Route>
      <Route
        path="/product/edit/:id"
        exact
        render={(props) => <UpdateFoodItem {...props} />}
      ></Route>
      <Route path="/product/list" exact component={ProductList}></Route>
    </>
  ) : (
    false
  )
}

const CustomerRoutes = (props) => {
  const { isLoggedIn, setLoginStatus } = props
  useEffect(() => {
    setLoginStatus(localStorage.getItem("isLoggedIn"))
  }, [props])
  return isLoggedIn ? (
    <>
      <Route path="/food" exact render={() => <FoodItemPage {...props} />} />
      <Route path="/address" exact render={() => <Address {...props} />} />
      <Route
        path="/address/edit/:id"
        exact
        render={(props) => (
          <UpdateAddress {...props} setCartItems={props.setCartItems} />
        )}
      />

      <Route path="/payment" exact render={() => <Payment {...props} />} />

      <Route
        path="/address/add"
        exact
        render={() => <AddressForm {...props} />}
      />
      <Route path="/cart" exact render={() => <Cart {...props} />} />
      <Route path="/orders" exact render={() => <Orders {...props} />} />
    </>
  ) : (
    false
  )
}

function CurrentUserRoutes(props) {
  const { userRole, setLoginStatus, isLoggedIn } = props
  return (
    <>
      {userRole === "Partner" && (
        <PartnerRoutes
          userRole={userRole}
          isLoggedIn={isLoggedIn}
          setLoginStatus={setLoginStatus}
        />
      )}
      {userRole === "Customer" && <CustomerRoutes {...props} />}
    </>
  )
}

function App(props) {
  const [cartItems, setCartItems] = useState([])
  const userRole = localStorage.getItem("userRole")
  const [isLoggedIn, setLoginStatus] = useState(
    localStorage.getItem("isLoggedIn")
  )
  const [itemCount, setItemCount] = useState(0)
  const values = {
    cartItems,
    setCartItems,
    userRole,
    isLoggedIn,
    setLoginStatus,
    itemCount,
    setItemCount,
  }
  useEffect(() => {
    setItemCount(cartItems.length)
  }, [cartItems])
  return (
    <Router>
      <Navbar
        itemCount={itemCount}
        userRole={userRole}
        isLoggedIn={isLoggedIn}
        setLoginStatus={setLoginStatus}
      />
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <Homepage isLoggedIn={isLoggedIn} setCartItems={setCartItems} />
          )}
        />
        {!isLoggedIn && (
          <>
            <Route path="/login" exact component={LoginForm} />
            <Route path="/register" exact component={RegisterForm} />
            <Route path="/partner/login" exact component={PartnerLogin} />
            <Route path="/account/fgtpswd" exact component={ForgotPassword} />
            <Route path="/partner/register" exact component={PartnerRegister} />
          </>
        )}
        <CurrentUserRoutes {...values} />
        <Route path="*" render={() => <h1>This page doesn't exist </h1>} />
      </Switch>
    </Router>
  )
}

export default App
