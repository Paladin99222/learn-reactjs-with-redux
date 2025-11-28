import type { CartState, Product } from "../types";
import styles from "./ProductTile.module.css";
import { FiShoppingCart } from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
interface ProductTileProps {
  product: Product;
  onClick?: () => void;
}

const ProductTile: React.FC<ProductTileProps> = ({ product, onClick }) => {
  const cart = useSelector((state: { cart: CartState }) => state.cart);
  const dispatch = useDispatch();

  const isInCart = cart.items.some(
    (item) => item.productId === Number(product.id)
  );
  return (
    <div className={styles["product-tile"]} onClick={onClick}>
      <div className={styles["image-wrapper"]}>
        <img
          className={styles.thumbnail}
          src={product.thumbnail}
          alt={product.title}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/default.png";
          }}
        />
      </div>

      {/* Overlay action buttons */}
      <div className={styles["overlay-buttons"]}>
        <button
          className={styles["add-to-cart-button"]}
          title="Add to cart"
          disabled={isInCart}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addToCart({ productId: Number(product.id) }));
          }}
        >
          <FiShoppingCart size={20} color="#111" />
        </button>
        <button
          title="Like"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <FaRegHeart size={20} color="#ef4444" />
        </button>
      </div>

      <div className={styles["product-info"]}>
        <h3 className={styles.title}>{product.title}</h3>
        <h4 className={styles.brand}>{product.brand}</h4>
        <p className={styles.price}>${product.price}</p>
      </div>
    </div>
  );
};

export default ProductTile;
