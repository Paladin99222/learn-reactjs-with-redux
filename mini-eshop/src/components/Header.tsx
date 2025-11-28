import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import CartIcon from "./CartIcon";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles["left"]}>
        <Link to="/" className={styles.logo}>
          Mini E-Shop
        </Link>
      </div>
      <div className={styles["right"]}>
        {/* Future user/cart icons can go here */}
        <CartIcon />
      </div>
    </header>
  );
};

export default Header;
