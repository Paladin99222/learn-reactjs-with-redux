import { useState } from "react";
import styles from "./AuthModal.module.css";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../slices/authSlice";
import type { AppDispatch } from "../store";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      console.log(`username: ${username}, password: ${password}`);

      dispatch(loginUser({ username, password })).then((res) => {
        if (res.type === "auth/loginUser/rejected") {
          alert("Invalid username or password");
        } else {
          onClose();
        }
      });
    } else {
      dispatch(registerUser({ id: 0, username, password })).then((res) => {
        if (res.type === "auth/registerUser/fulfilled") {
          alert("Registration successful! Please log in.");
          setIsLogin(true);
        }
      });
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          &times;
        </button>
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLogin && (
            <input type="password" placeholder="Confirm Password" required />
          )}
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>
        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className={styles.toggleLink}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
