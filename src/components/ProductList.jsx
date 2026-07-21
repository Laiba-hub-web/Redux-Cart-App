import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/productsSlice";
import ProductCard from "./ProductCard";

function ProductList() {
  const dispatch = useDispatch();
  const { items: products, status, error } = useSelector(
    (state) => state.products
  );

  // Runs once when ProductList first mounts.
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <p className="status-msg">Loading products…</p>;
  }

  if (status === "failed") {
    return <p className="status-msg error">Failed to load products: {error}</p>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
