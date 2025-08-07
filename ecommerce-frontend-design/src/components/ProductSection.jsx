import React, { useEffect, useState } from 'react';
import './ProductSection.css';

// Import your images from assets folder
import Home from '../assets/Home.png';
import Consumer from '../assets/Consumer.png';

// Helper for timer
function getTimeRemaining(deadline) {
  const total = Date.parse(deadline) - Date.now();
  const seconds = Math.max(0, Math.floor((total / 1000) % 60));
  const minutes = Math.max(0, Math.floor((total / 1000 / 60) % 60));
  const hours = Math.max(0, Math.floor((total / (1000 * 60 * 60)) % 24));
  const days = Math.max(0, Math.floor(total / (1000 * 60 * 60 * 24)));
  return { total, days, hours, minutes, seconds };
}

function DealTimer() {
  const initialDeadline = new Date(Date.now() + 4 * 86400000 + 13 * 3600000 + 34 * 60000 + 56 * 1000);
  const [deadline] = useState(initialDeadline);
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(deadline));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(deadline));
    }, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  return (
    <div className="timer">
      <div>{String(timeLeft.days).padStart(2, "0")} <span>Days</span></div>
      <div>{String(timeLeft.hours).padStart(2, "0")} <span>Hour</span></div>
      <div>{String(timeLeft.minutes).padStart(2, "0")} <span>Min</span></div>
      <div>{String(timeLeft.seconds).padStart(2, "0")} <span>Sec</span></div>
    </div>
  );
}

const API_URL = 'https://fakestoreapi.com/products';

function CategoryCard({ title, button, image, bgClass }) {
  return (
    <div className={`category-card ${bgClass}`}>
      <div className="category-bg-img" style={{ backgroundImage: `url(${image})` }}>
        <div className="category-content-overlay">
          <span className="category-title">{title}</span>
          <button className="category-btn">{button}</button>
        </div>
      </div>
    </div>
  );
}

function ProductGrid({ products, categoryName }) {
  // Define category labels for each product type
  const getCategoryLabel = (product, index) => {
    if (categoryName === 'home') {
      const homeLabels = ['Soft chairs', 'Sofa & chair', 'Kitchen dishes', 'Smart watches', 'Kitchen mixer', 'Blenders', 'Home appliance', 'Coffee maker'];
      return homeLabels[index] || 'Home item';
    } else {
      const electronicLabels = ['Smart watches', 'Cameras', 'Headphones', 'Smart watches', 'Gaming set', 'Laptops & PC', 'Smartphones', 'Electric kettle'];
      return electronicLabels[index] || 'Electronic item';
    }
  };

  return (
    <div className="category-products">
      {products.map((p, i) => (
        <div className="category-product" key={i}>
          <a href={`/product/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={p.image} alt={p.title} />
            <div className="category-label">{getCategoryLabel(p, i)}</div>
            <div className="category-product-title">{p.title}</div>
            <div className="category-product-price">USD {p.price}</div>
          </a>
        </div>
      ))}
    </div>
  );
}

export default function ProductSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("API fetch error:", err));
  }, []);

  // Extract first 5 as deals, next 8 for home, next 8 for electronics
  const deals = products.slice(0, 5).map(p => ({
    title: p.title,
    image: p.image,
    discount: "-20%", // Static discount label for mock
  }));
  const homeProducts = products.slice(5, 13);
  const electronicsProducts = products.slice(13, 21);

  return (
    <div className="product-section">
      {/* Deals Bar */}
      <div className="deal-bar">
        <div className="deal-timer">
          <span className="deal-title">Deals and offers</span>
          <span className="deal-subtitle">Hygiene equipments</span>
          <DealTimer />
        </div>
        <div className="deal-products">
          {deals.map((product, i) => (
            <div className="deal-product" key={i}>
              <img src={product.image} alt={product.title} />
              <div className="product-title">{product.title}</div>
              <div className="product-discount">{product.discount}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Home and Outdoor section - WRAPPED IN category-block */}
      <div className="category-block">
        <div className="category-row">
          <CategoryCard
            title="Home and outdoor"
            button="Source now"
            image={Home}
            bgClass="home"
          />
          <ProductGrid products={homeProducts} categoryName="home" />
        </div>
      </div>

      {/* Electronics & Gadgets section - WRAPPED IN category-block */}
      <div className="category-block">
        <div className="category-row">
          <CategoryCard
            title="Consumer electronics and gadgets"
            button="Source now"
            image={Consumer}
            bgClass="gadgets"
          />
          <ProductGrid products={electronicsProducts} categoryName="electronics" />
        </div>
      </div>
    </div>
  );
}