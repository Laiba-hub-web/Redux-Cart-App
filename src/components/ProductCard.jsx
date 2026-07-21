import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

function ProductCard({ product }) {
  // useDispatch gives us the store's dispatch function, so we can send actions to it.
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // addToCart(product) creates an action: { type: "cart/addToCart", payload: product }
    dispatch(addToCart(product));
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">${product.price.toFixed(2)}</p>
      <button className="add-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
