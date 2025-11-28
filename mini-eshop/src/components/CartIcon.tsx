import { useSelector } from "react-redux";
import styles from "./CartIcon.module.css";
import type { CartState } from "../types";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const CartIcon = () => {
  const cart = useSelector((state: { cart: CartState }) => state.cart);
  return (
    <div className={styles.cartIcon}>
      <Link to="/cart">
        <FiShoppingCart size={20} color="#111" />
      </Link>
      <span className={styles.badge}>
        {cart.items.reduce((total, item) => total + item.quantity, 0)}
      </span>
    </div>
  );
};

export default CartIcon;
