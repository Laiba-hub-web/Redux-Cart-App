import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../features/cartSlice";

function Cart({ onCheckout }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleIncrease = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecrease = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  // Running total = sum of (price * quantity) across every cart item.
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return <p className="empty-cart">Your cart is empty.</p>;
  }

  return (
    <div className="cart">
      {cartItems.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.name} />
          <div className="cart-item-info">
            <h3>{item.name}</h3>
            <p>${item.price.toFixed(2)} each</p>

            <div className="quantity-controls">
              <button
                className="qty-btn"
                onClick={() => handleDecrease(item.id)}
              >
                −
              </button>
              <span className="qty-value">{item.quantity}</span>
              <button
                className="qty-btn"
                onClick={() => handleIncrease(item.id)}
              >
                +
              </button>
            </div>

            <p className="subtotal">
              Subtotal: ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
          <button className="remove-btn" onClick={() => handleRemove(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <div className="cart-total">
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <button className="checkout-btn" onClick={onCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
