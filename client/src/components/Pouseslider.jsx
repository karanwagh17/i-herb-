import React, { useState, useEffect, useRef } from "react";
import "../css/Pouse_slider.css";
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from "react-icons/fa";
import axios from "axios";

const ProductSlider = () => {
  const [products, setProduct] = useState([]);
  const productData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/product/getproducts/?category=iherb_live`
      );
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    productData();
  }, []);

  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [visibleCards, setVisibleCards] = useState(4);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  // Modified next function for infinite loop
  const next = () => {
    setIndex((prev) => (prev + 1) % products.length);
  };

  // Modified prev function for infinite loop
  const prev = () => {
    setIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  // Get the visible products with wrap-around
  const getVisibleProducts = () => {
    if (products.length === 0) return [];
    
    const visible = [];
    for (let i = 0; i < visibleCards; i++) {
      visible.push(products[(index + i) % products.length]);
    }
    return visible;
  };

  useEffect(() => {
    const updateVisibleCards = () => {
      if (sliderRef.current) {
        const width = sliderRef.current.offsetWidth;
        const cardWidth = 160; // Adjust this based on your card width
        const count = Math.min(Math.floor(width / cardWidth), products.length);
        setVisibleCards(Math.max(count, 1)); // Ensure at least 1 card is visible
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, [products.length]);

  useEffect(() => {
    if (isPlaying && products.length > 0) {
      intervalRef.current = setInterval(next, 3000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, products.length]);

  return (
    <div className="slider-wrapper-pouse">
      <div className="slider-header">
        <h3>iHerb</h3>
        <span className="live-tag">LIVE</span>
        <button
          className="play-pause-btn"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>

      <div className="main">
        <button className="arrow left" onClick={prev}>
          <FaChevronLeft />
        </button>

        <div className="slider" ref={sliderRef}>
          {getVisibleProducts().map((product, i) => (
            <div className="product-card" key={`${product._id}-${i}`}>
              <img
                src={product.image[0]}
                alt={product.name}
                style={{ backgroundColor: "white" }}
              />
              <p className="name">{product.title}</p>
              <p className="price"> ₹{product.price}</p>
              <p className="country">{product.category}</p>
              <p className="rating">⭐⭐⭐⭐ {product.reviews}</p>
            </div>
          ))}
        </div>

        <button className="arrow right" onClick={next}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ProductSlider;
