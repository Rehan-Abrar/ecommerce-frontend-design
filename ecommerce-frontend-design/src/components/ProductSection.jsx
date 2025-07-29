import React, { useEffect, useState } from 'react';
import './ProductSection.css';

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

// Static images for category backgrounds
const HOME_IMG = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80";
const ELECTRONICS_IMG = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80";

// Product images (replace with your assets for 100% accuracy)
const homeCategory = {
  title: "Home and outdoor",
  button: "Source now",
  image: HOME_IMG,
  bgClass: "home",
  products: [
    { title: "Soft chairs", price: 19, image: "https://cdn.jsdelivr.net/gh/rehan-abrar/images@main/soft-chair.png" },
    { title: "Sofa & chair", price: 19, image: "https://cdn.jsdelivr.net/gh/rehan-abrar/images@main/sofa-chair.png" },
    { title: "Kitchen dishes", price: 19, image: "https://cdn.jsdelivr.net/gh/rehan-abrar/images@main/kitchen-dish.png" },
    { title: "Smart watches", price: 19, image: "https://cdn.jsdelivr.net/gh/rehan-abrar/images@main/smart-watch.png" },
    { title: "Kitchen mixer", price: 100, image: "https://cdn.jsdelivr.net/gh/rehan-abrar/images@main/kitchen-mixer.png" },
    { title: "Blenders", price: 39, image: "https://cdn.jsdelivr.net/gh/rehan-abrar/images@main/blender.png" },
    { title: "Home appliance", price: 19, image: "https://cdn.jsdelivr.net/gh/rehan-abrar/images@main/home-appliance.png" },
    { title: "Coffee maker", price: 10, image: "https://cdn.jsdelivr.net/gh/rehan-abrar/images@main/coffee-maker.png" },
  ]
};

const electronicsCategory = {
  title: "Consumer electronics and gadgets",
  button: "Source now",
  image: ELECTRONICS_IMG,
  bgClass: "gadgets",
  products: [
    { title: "Smart watches", price: 19, image: "https://cdn.jsdelivr.net/gh/rehan-abrar/images@main/smart-watch.png" },
    { title: "Cameras", price: 89, image: "https://cdn.jsdelivr.net/gh/rehan-abrar/images@main/deal-camera.png" },
    { title: "Headphones", price: 90, image: "https://cdn.jsdelivr.net/gh/rehan-abrar/images@main/deal-headphone.png" },
    { title: "Smart watches", price: 19, image: "https://cdn.jsdelivr.net/gh/rehan-abrar/images@main/smart-watch.png" },
    { title: "Gaming set", price: 35, image: "https://cdn.jsdelivr.net/gh/rehan-abrar/images@main/gaming-set.png" },
    { title: "Laptops & PC", price: 340, image: "https://cdn.jsdelivr.net/gh/rehan-abrar/images@main/deal-laptop.png" },
    { title: "Smartphones", price: 90, image: "https://cdn.jsdelivr.net/gh/rehan-abrar/images@main/smartphone.png" },
    { title: "Electric kettle", price: 240, image: "https://cdn.jsdelivr.net/gh/rehan-abrar/images@main/electric-kettle.png" },
  ]
};

// Deals for deals bar
const deals = [
  { title: "Smart watches", image: "https://cdn.jsdelivr.net/gh/rehan-abrar/images@main/deal-watch.png", discount: "-25%" },
  { title: "Laptops", image: "https://cdn.jsdelivr.net/gh/rehan-abrar/images@main/deal-laptop.png", discount: "-15%" },
  { title: "GoPro cameras", image: "https://cdn.jsdelivr.net/gh/rehan-abrar/images@main/deal-camera.png", discount: "-40%" },
  { title: "Headphones", image: "https://cdn.jsdelivr.net/gh/rehan-abrar/images@main/deal-headphone.png", discount: "-25%" },
  { title: "Canon cameras", image: "https://cdn.jsdelivr.net/gh/rehan-abrar/images@main/deal-canon-camera.png", discount: "-25%" },
];

function CategoryCard({ title, button, image, bgClass }) {
  return (
    <div className={`category-card ${bgClass}`}>
      <img src={image} alt={title} className="category-bg-img" />
      <span className="category-title">{title}</span>
      <button className="category-btn">{button}</button>
    </div>
  );
}

function ProductGrid({ products }) {
  return (
    <div className="category-products">
      {products.map((p, i) => (
        <div className="category-product" key={i}>
          <img src={p.image} alt={p.title} />
          <div className="category-product-title">{p.title}</div>
          <div className="category-product-price">From USD {p.price}</div>
        </div>
      ))}
    </div>
  );
}

export default function ProductSection() {
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

      {/* Home and Outdoor row */}
      <div className="category-row">
        <CategoryCard
          title={homeCategory.title}
          button={homeCategory.button}
          image={homeCategory.image}
          bgClass={homeCategory.bgClass}
        />
        <ProductGrid products={homeCategory.products} />
      </div>

      {/* Electronics & Gadgets row */}
      <div className="category-row">
        <CategoryCard
          title={electronicsCategory.title}
          button={electronicsCategory.button}
          image={electronicsCategory.image}
          bgClass={electronicsCategory.bgClass}
        />
        <ProductGrid products={electronicsCategory.products} />
      </div>
    </div>
  );
}