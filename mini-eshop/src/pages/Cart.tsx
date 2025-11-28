import { useDispatch, useSelector } from "react-redux";
import type { CartState, ProductState } from "../types";
import styles from "./Cart.module.css";
import { useEffect } from "react";
import type { AppDispatch } from "../store";
import { fetchProducts } from "../slices/productSlice";
import { FaTrash } from "react-icons/fa6";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../slices/cartSlice";

const CartPage = () => {
  const cart = useSelector((state: { cart: CartState }) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(
    (state: { products: ProductState }) => state.products
  );

  useEffect(() => {
    if (products.items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [products.items.length, dispatch]);

  if (products.loading) {
    return <div>Loading products...</div>;
  }

  const productsInCart = cart.items.map((cartItem) => {
    const product = products.items.find(
      (p) => Number(p.id) === cartItem.productId
    );

    return product
      ? {
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          price: product.price,
          title: product.title,
          brand: product.brand,
          category: product.category,
        }
      : {
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          price: 0,
          title: "Unknown Product",
          brand: "Unknown Brand",
          category: "Unknown Category",
        };
  });

  const removeItemFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className={styles["cart-page"]}>
      <h1 className={styles["cart-title"]}>Your Shopping Cart</h1>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className={styles["cart-table"]}>
            <thead>
              <tr>
                <th>Category</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {productsInCart.map((item) => (
                <tr key={item.productId}>
                  <td>{item.category.toUpperCase()}</td>
                  <td>{item.title}</td>
                  <td>{item.brand}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.productId))}
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      onClick={() => dispatch(increaseQuantity(item.productId))}
                    >
                      +
                    </button>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td className={styles["cell-remove"]}>
                    <a
                      className={styles["remove-link"]}
                      onClick={() => {
                        removeItemFromCart(item.productId);
                      }}
                    >
                      <FaTrash size={16} color="#c00" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles["cart-footer"]}>
            <div className={styles["total-amount"]}>
              Total Amount: $
              {productsInCart
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </div>
            <div className={styles["checkout-button-wrapper"]}>
              <button className={styles["checkout-button"]}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default CartPage;
