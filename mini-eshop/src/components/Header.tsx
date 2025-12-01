import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import CartIcon from "./CartIcon";
import { useState } from "react";
import AuthModal from "./AuthModal";
import type { AuthState } from "../types";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";

const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const auth = useSelector((state: { auth: AuthState }) => state.auth);
  const dispatch = useDispatch();
  return (
    <header className={styles.header}>
      <div className={styles["left"]}>
        <Link to="/" className={styles.logo}>
          Mini E-Shop
        </Link>
      </div>
      <div className={styles["right"]}>
        <button
          onClick={() => {
            if (!auth.isLoggedIn) setShowAuthModal(true);
            else {
              dispatch(logout());
            }
          }}
        >
          {auth.isLoggedIn ? `Welcome, ${auth.user?.username}` : "Login"}
        </button>
        {auth.isLoggedIn && <CartIcon />}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </div>
    </header>
  );
};

export default Header;
