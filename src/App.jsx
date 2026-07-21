import { useState } from "react";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";
import "./App.css";

function App() {
  // Tracks which view is showing: products, cart, checkout, or the
  // post-order confirmation. This is local UI state, not app data, so it
  // belongs in useState, not Redux.
  const [view, setView] = useState("products");

  // The most recently placed order, captured right before Checkout clears
  // the cart -- OrderConfirmation reads from this, not from Redux, since
  // by the time it renders the cart itself is already empty.
  const [lastOrder, setLastOrder] = useState(null);

  const handleOrderPlaced = (order) => {
    setLastOrder(order);
    setView("confirmation");
  };

  const handleContinueShopping = () => {
    setLastOrder(null);
    setView("products");
  };

  return (
    <div className="app">
      <Navbar onCartClick={() => setView("cart")} />
      <main>
        {view === "products" && (
          <>
            <h2>Products</h2>
            <ProductList />
          </>
        )}

        {view === "cart" && (
          <>
            <div className="cart-header">
              <h2>Your Cart</h2>
              <button className="back-btn" onClick={() => setView("products")}>
                ← Back to Products
              </button>
            </div>
            <Cart onCheckout={() => setView("checkout")} />
          </>
        )}

        {view === "checkout" && (
          <>
            <div className="cart-header">
              <h2>Checkout</h2>
              <button className="back-btn" onClick={() => setView("products")}>
                ← Back to Products
              </button>
            </div>
            <Checkout
              onOrderPlaced={handleOrderPlaced}
              onBackToCart={() => setView("cart")}
            />
          </>
        )}

        {view === "confirmation" && lastOrder && (
          <OrderConfirmation
            order={lastOrder}
            onContinueShopping={handleContinueShopping}
          />
        )}
      </main>
    </div>
  );
}

export default App;
