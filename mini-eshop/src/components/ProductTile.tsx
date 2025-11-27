import type { Product } from "../types";
import styles from "./ProductTile.module.css";
import { FiShoppingCart } from "react-icons/fi";

interface ProductTileProps {
  product: Product;
}

const ProductTile: React.FC<ProductTileProps> = ({ product }) => {
  return (
    <div className={styles["product-tile"]}>
      <img
        className={styles["thumbnail"]}
        src={product.thumbnail ?? "/images/default.png"}
        alt={product.title}
      />
      <h3 className={styles.title}>{product.title}</h3>
      <h4 className={styles.brand}>{product.brand}</h4>
      <p className={styles.price}>${product.price}</p>
      <div className={styles.actions}>
        <button title="Add to cart">
          <FiShoppingCart size={20} />
        </button>
        <button title="Like">♥</button>
      </div>
    </div>
  );
};

export default ProductTile;
