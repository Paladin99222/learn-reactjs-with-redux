import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { Product, ProductState } from "../types";
import { fetchProducts } from "../slices/productSlice";
import type { AppDispatch } from "../store";
import ProductTile from "../components/ProductTile";
import styles from "./List.module.css";

const ListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const products = useSelector(
    (state: { products: ProductState }) => state.products.items
  );
  const loading = useSelector(
    (state: { products: ProductState }) => state.products.loading
  );
  const error = useSelector(
    (state: { products: ProductState }) => state.products.error
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles["list-page"]}>
      <div className={styles["layout"]}>
        <aside className={styles["sidebar"]}>
          <h2>Filters</h2>
          {/* Future filter options can be added here */}
        </aside>
        <main className={styles["main-content"]}>
          {loading && (
            <div className={styles["loading"]}>Loading products...</div>
          )}

          {!loading && products.length === 0 && (
            <div>No products available.</div>
          )}

          {!loading && products.length > 0 && (
            <div className={styles["products-grid"]}>
              {products.map((product: Product) => (
                <ProductTile key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ListPage;
