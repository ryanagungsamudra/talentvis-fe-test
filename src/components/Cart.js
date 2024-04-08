import React, { useState } from "react";
import "./Cart.css";
import { formatPriceToIDR } from "../utils/formatIDR";

const CartIcon = ({ itemCount }) => {
  return (
    <div className="cart-icon-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2rem"
        height="2rem"
        viewBox="0 0 24 24"
        className="cart-icon">
        <path
          fill="#EE4D2D"
          d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"></path>
      </svg>
      {itemCount > 0 && <div className="cart-badge">{itemCount}</div>}
    </div>
  );
};

// Cart component
export const Cart = ({ cartItems, setCartItems }) => {
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="cart-container">
      <button className="cart-icon" onClick={toggleCart}>
        <CartIcon itemCount={cartItems.length} />
      </button>
      {showCart && (
        <div className="cart-dropdown">
          <h2>Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{formatPriceToIDR(item.price)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {cartItems.length > 0 && (
            <button className="clear-cart-button" onClick={clearCart}>
              Clear Cart
            </button>
          )}
        </div>
      )}
    </div>
  );
};
