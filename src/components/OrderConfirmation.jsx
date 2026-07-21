// Shown once after Checkout clears the cart -- order details are passed
// down as props since the cart itself (the source of that data) is already gone.
function OrderConfirmation({ order, onContinueShopping }) {
  return (
    <div className="order-confirmation">
      <div className="confirmation-icon">✓</div>
      <h2>Thank you, {order.name}!</h2>
      <p>Your order has been placed successfully.</p>
      <p className="order-number">
        Order Number: <strong>{order.orderNumber}</strong>
      </p>
      <p className="order-total">Total Paid: ${order.total.toFixed(2)}</p>
      <button className="add-btn" onClick={onContinueShopping}>
        Continue Shopping
      </button>
    </div>
  );
}

export default OrderConfirmation;
