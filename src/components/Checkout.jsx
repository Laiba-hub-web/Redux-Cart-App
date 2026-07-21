import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cartSlice";

function Checkout({ onOrderPlaced, onBackToCart }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState({});

  // Running total = sum of (price * quantity) across every cart item.
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!form.address.trim()) newErrors.address = "Address is required.";
    if (!form.city.trim()) newErrors.city = "City is required.";
    if (!form.postalCode.trim())
      newErrors.postalCode = "Postal code is required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Read the total and build an order number BEFORE clearing the cart --
    // once clearCart() dispatches, cartItems (and therefore totalPrice) is gone.
    const order = {
      orderNumber: `ORD-${Date.now().toString(36).toUpperCase()}`,
      name: form.name.trim(),
      total: totalPrice,
    };

    dispatch(clearCart());
    onOrderPlaced(order);
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <p>Your cart is empty -- add something before checking out.</p>
        <button className="back-btn" onClick={onBackToCart}>
          ← Back to Cart
        </button>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="checkout-summary">
        <h3>Order Summary</h3>
        {cartItems.map((item) => (
          <div className="summary-row" key={item.id}>
            <span>
              {item.name} &times; {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="summary-total">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit} noValidate>
        <h3>Shipping Details</h3>

        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className={errors.name ? "has-error" : ""}
          />
          {errors.name && <p className="field-error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? "has-error" : ""}
          />
          {errors.email && <p className="field-error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            value={form.address}
            onChange={handleChange}
            className={errors.address ? "has-error" : ""}
          />
          {errors.address && <p className="field-error">{errors.address}</p>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              id="city"
              name="city"
              type="text"
              value={form.city}
              onChange={handleChange}
              className={errors.city ? "has-error" : ""}
            />
            {errors.city && <p className="field-error">{errors.city}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              id="postalCode"
              name="postalCode"
              type="text"
              value={form.postalCode}
              onChange={handleChange}
              className={errors.postalCode ? "has-error" : ""}
            />
            {errors.postalCode && (
              <p className="field-error">{errors.postalCode}</p>
            )}
          </div>
        </div>

        <div className="checkout-actions">
          <button type="button" className="back-btn" onClick={onBackToCart}>
            ← Back to Cart
          </button>
          <button type="submit" className="place-order-btn">
            Place Order (${totalPrice.toFixed(2)})
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
