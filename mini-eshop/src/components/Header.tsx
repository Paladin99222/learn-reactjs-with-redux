import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import CartIcon from "./CartIcon";
import { useState } from "react";
import AuthModal from "./AuthModal";
import type { AuthState } from "../types";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { FiUser, FiLogIn, FiLogOut } from "react-icons/fi";

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
          className={styles["auth-button"]}
          onClick={() => {
            if (!auth.isLoggedIn) setShowAuthModal(true);
            else dispatch(logout());
          }}
        >
          <span className={styles["icon"]}>
            {auth.isLoggedIn ? <FiUser /> : <FiLogIn />}
          </span>

          <span className={styles["username"]}>
            {auth.isLoggedIn ? auth.user?.username : "Login"}
          </span>

          {auth.isLoggedIn && (
            <span className={styles["logout-icon"]}>
              <FiLogOut />
            </span>
          )}
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
