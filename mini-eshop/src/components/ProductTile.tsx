import type { AuthState, CartState, LikeState, Product } from "../types";
import styles from "./ProductTile.module.css";
import { FiShoppingCart } from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store";
import { addToCart } from "../slices/cartSlice";
import { toggleLikeAsync, toggleLikeLocal } from "../slices/likeSlice";

interface ProductTileProps {
  product: Product;
  onClick?: () => void;
}

const ProductTile: React.FC<ProductTileProps> = ({ product, onClick }) => {
  const cart = useSelector((state: { cart: CartState }) => state.cart);
  const auth = useSelector((state: { auth: AuthState }) => state.auth);
  const like = useSelector((state: { like: LikeState }) => state.like);

  const dispatch = useDispatch<AppDispatch>();

  const isInCart = cart.items.some(
    (item) => item.productId === Number(product.id)
  );
  const isLiked = like.likedProductIds.includes(Number(product.id));

  const handleToggleLike = () => {
    if (!auth.isLoggedIn || !auth.user) return;

    const productId = Number(product.id);
    const isLiked = like.likedProductIds.includes(productId);

    // 1️⃣ Optimistic update
    dispatch(toggleLikeLocal(productId));

    // 2️⃣ Pass intended final state to backend
    const newLikes = isLiked
      ? like.likedProductIds.filter((id) => id !== productId)
      : [...like.likedProductIds, productId];

    dispatch(toggleLikeAsync({ userId: auth.user.id, productId, newLikes }));
  };

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
          disabled={isInCart || !auth.isLoggedIn}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addToCart({ productId: Number(product.id) }));
          }}
        >
          <FiShoppingCart size={20} color="#111" />
        </button>
        <button
          title="Like"
          disabled={!auth.isLoggedIn}
          onClick={(e) => {
            e.stopPropagation();
            handleToggleLike();
          }}
        >
          {isLiked ? (
            <FaHeart size={20} color="#ef4444" />
          ) : (
            <FaRegHeart size={20} color="#9ca3af" />
          )}
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
