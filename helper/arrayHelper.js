const amount = (array) => {
  var totalAmount = 0
  array.forEach(({ price, quantity }) => {
    totalAmount = totalAmount + price * quantity
  })
  return totalAmount
}

module.exports = amount
