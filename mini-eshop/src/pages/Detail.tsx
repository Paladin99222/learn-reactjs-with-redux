import type { CartState, Product } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Detail.module.css";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { addToCart } from "../slices/cartSlice";

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: { cart: CartState }) => state.cart);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/products/${Number(id)}`)
        .then((res) => res.json())
        .then((data: Product) => setProduct(data))
        .catch((err) => console.error("Failed to fetch product:", err));
    }
  }, [id]);
  const isInCart = cart.items.some((item) => item.productId === Number(id));

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className={styles["detail-page"]}>
      <div className={styles["left"]}>
        <img
          src={product.thumbnail}
          alt={product.title}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/default.png";
          }}
        />

        <table className={styles["spec-table"]}>
          <thead>
            <tr>
              <th>Specifications</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {typeof product.specs === "object" && product.specs !== null
              ? Object.entries(product.specs).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{String(value)}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
      <div className={styles["right"]}>
        <button className={styles.goBackButton} onClick={() => navigate(-1)}>
          ← Go back to the list
        </button>

        <h1 className={styles["product-title"]}>{product.title}</h1>
        <h2 className={styles["brand"]}>by {product.brand}</h2>
        <p className={styles["price"]}>${product.price}</p>
        <ul className={styles["spec-list"]}>
          {Array.isArray(product.specs) ? (
            product.specs.map((spec, index) => (
              <li key={index} className={styles["spec-item"]}>
                {spec}
              </li>
            ))
          ) : product.specs ? (
            typeof product.specs === "object" ? (
              Object.entries(product.specs).map(([key, value], idx) => (
                <li key={idx} className={styles["spec-item"]}>
                  <strong>{key}:</strong> {value}
                </li>
              ))
            ) : (
              <li className={styles["spec-item"]}>{product.specs}</li>
            )
          ) : null}
        </ul>
        <p className={styles["description"]}>{product.description}</p>
        <button
          className={styles["add-to-cart-button"]}
          disabled={isInCart}
          onClick={() => {
            dispatch(addToCart({ productId: Number(id) }));
          }}
        >
          {isInCart ? "Already In Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default DetailPage;
