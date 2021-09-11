const getLocalStorage = (setCartItems) => {
  const storedItems = localStorage.getItem("cartitems")
  if (storedItems !== null) {
    const cartitems = JSON.parse(storedItems)
    setCartItems(cartitems)
  }
}

export default getLocalStorage;