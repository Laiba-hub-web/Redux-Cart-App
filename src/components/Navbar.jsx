import { useSelector } from "react-redux";

// Navbar takes an onCartClick callback from App, so clicking the cart
// icon can switch which view App renders -- Navbar itself holds no view state.
function Navbar({ onCartClick }) {
  const cartItems = useSelector((state) => state.cart.items);

  // Total item count = sum of every item's quantity (not just items.length,
  // since 3 units of one product should count as 3, not 1).
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <h1 className="logo">🛒 ReduxCart</h1>
      <div className="cart-icon" onClick={onCartClick}>
        Cart (<span className="cart-count">{totalCount}</span>)
      </div>
    </nav>
  );
}

export default Navbar;
