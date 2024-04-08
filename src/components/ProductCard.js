import React, { useState } from "react";
import "./ProductCard.css";

// Image
import Product1 from "../assets/jaketBaseball.jpg";
import Product2 from "../assets/iphone13.jpg";
import Product3 from "../assets/sepatuBoots.jpg";
import Product4 from "../assets/samsungS24.jpg";
import Product5 from "../assets/sepatuNike.jpg";
import Product6 from "../assets/appleWatch9.jpg";
import Product7 from "../assets/TWSSoundpeatCapsule3Pro.jpg";
import Product8 from "../assets/bajuShimmer.jpg";
import Product9 from "../assets/macbookAirM2.jpg";
import Product10 from "../assets/parfumeDior.jpg";
import { Cart } from "./Cart";
import { formatPriceToIDR } from "../utils/formatIDR";

// Icons
const SuccessCheckIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2rem"
      height="2rem"
      viewBox="0 0 1024 1024"
      {...props}>
      <path
        fill="#68ae5c"
        d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.27 38.27 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"></path>
    </svg>
  );
};
const FailedCancelIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2rem"
      height="2rem"
      viewBox="0 0 24 24"
      {...props}>
      <path
        fill="#ac000a"
        d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m4.3 14.3a.996.996 0 0 1-1.41 0L12 13.41L9.11 16.3a.996.996 0 1 1-1.41-1.41L10.59 12L7.7 9.11A.996.996 0 1 1 9.11 7.7L12 10.59l2.89-2.89a.996.996 0 1 1 1.41 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41"></path>
    </svg>
  );
};

// Sample JSON data for products
const products = [
  {
    id: 1,
    image: Product1,
    title: "Richard Jacket Bomber Olive MA-1 'tebal bahan anti air'",
    price: 299000,
  },
  {
    id: 2,
    image: Product2,
    title: "Apple iPhone 13 128GB, Midnight",
    price: 9999000,
  },
  {
    id: 3,
    image: Product3,
    title: "Sepatu Boots Pria Portee Goods Original Derby Boots",
    price: 364000,
  },
  {
    id: 4,
    image: Product4,
    title: "Samsung Galaxy S24 Ultra 5G AI Smartphone Online Exclusive",
    price: 23999000,
  },
  {
    id: 5,
    image: Product5,
    title: "Sepatu Sneakers Nike Dunk Retro Low Black White Panda",
    price: 1178000,
  },
  {
    id: 6,
    image: Product6,
    title: "Apple Watch Series 9 45mm GPS, Midnight",
    price: 8499000,
  },
  {
    id: 7,
    image: Product7,
    title: "SoundPEATS Capsule3 Pro Ultra Long Lasting Hybrid ANC Earbuds",
    price: 789000,
  },
  {
    id: 8,
    image: Product8,
    title: "Anabell Dress Shimmer Silk mix Tile Squin TerBaru",
    price: 140000,
  },
  {
    id: 9,
    image: Product9,
    title: "Macbook Air M2 Chip 2022 13 inch 256GB/512GB CPO",
    price: 16000000,
  },
  {
    id: 10,
    image: Product10,
    title: "Christian Dior Sauvage Elixir Man - 60 ML",
    price: 3148000,
  },
];

// ProductCard component
const ProductCard = ({ id, image, title, price, addToCart }) => {
  const [buttonText, setTextButton] = useState("Add to Cart");

  const handleAddToCart = () => {
    addToCart({ id, image, title, price });

    setTextButton("Adding...");

    setTimeout(() => {
      setTextButton("Add to Cart");
    }, 1000);
  };

  return (
    <article className="product-card">
      <img className="product-image" alt="product" src={image} />
      <div className="product-details">
        <h1 className="product-title">{title}</h1>
        <footer>
          <h3 className="product-price">{formatPriceToIDR(price)}</h3>
          <button className="product-button" onClick={handleAddToCart}>
            {buttonText}
          </button>
        </footer>
      </div>
    </article>
  );
};

// Alert component
const Alert = ({ message, duplicate }) => {
  return (
    <div className="alert">
      {duplicate ? <FailedCancelIcon /> : <SuccessCheckIcon />}

      <p>{message}</p>
    </div>
  );
};

// Main component rendering the product cards
export default function ProductCardsContainer() {
  const [cart, setCart] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [duplicate, setDuplicate] = useState(false);

  // Function to handle adding product to cart
  const addToCart = (product) => {
    // Check if the product is already in the cart
    const isProductInCart = cart.some((item) => item.id === product.id);

    // If the product is not in the cart, add it
    if (!isProductInCart) {
      setCart([...cart, product]);
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
    } else {
      setShowAlert(true);
      setDuplicate(true);

      setTimeout(() => {
        setShowAlert(false);
        setDuplicate(false);
      }, 1000);
    }
  };

  return (
    <div className="product-cards-container">
      {showAlert && (
        <Alert
          duplicate={duplicate}
          message={
            duplicate
              ? "Produk sudah ada di keranjang"
              : "Produk telah ditambahkan ke keranjang belanja"
          }
        />
      )}
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          image={product.image}
          title={product.title}
          price={product.price}
          addToCart={addToCart}
        />
      ))}
      <Cart cartItems={cart} setCartItems={setCart} />
    </div>
  );
}
