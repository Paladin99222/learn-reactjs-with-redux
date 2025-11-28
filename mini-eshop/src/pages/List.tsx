import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { Product, ProductState } from "../types";
import { fetchProducts } from "../slices/productSlice";
import type { AppDispatch } from "../store";
import ProductTile from "../components/ProductTile";
import styles from "./List.module.css";
import { useNavigate } from "react-router-dom";

const ListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const navigate = useNavigate();

  const categories = ["All", "PC", "Laptop", "Camera", "Accessories"];

  const [selectedCategory, setSelectedCategory] = useState("All");
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
          <h2 className={styles["sidebar-title"]}>Categories</h2>
          <ul className={styles["category-list"]}>
            {categories.map((category) => (
              <li
                key={category}
                className={`${styles["category-item"]} ${
                  selectedCategory === category ? styles.active : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
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
              {products
                .filter(
                  (product) =>
                    selectedCategory === "All" ||
                    product.category === selectedCategory.toLowerCase()
                )
                .map((product: Product) => (
                  <ProductTile
                    key={product.id}
                    product={product}
                    onClick={() => {
                      console.log(`Clicked on ${product.id}`);

                      navigate(`/product/${product.id}`);
                    }}
                  />
                ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ListPage;
