
export default function FoodItem({ foodItems, cartItemHandler, addedItems }) {
  return (
    <div className="main-container">
      <div className="food-item-container">
        {foodItems.map((food, i) => (
          <div key={food._id} className="food-item">
            <div className="img-container">
              <img src={food.image} alt={`food-${i}`} />
            </div>
            <div>
              <p>{food.name}</p>
              <p>₹ {food.price}/per</p>
              <p>Delicious food made with absolute hygiene</p>
              <p className="rst-name">
                <strong> By {food.restaurant_name}</strong>
              </p>
            </div>
            <div>
              <button
                className="cart-button"
                onClick={cartItemHandler}
                data-id={food._id}
              >
                {addedItems.includes(food._id) ? "+ Added" : "Add"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
