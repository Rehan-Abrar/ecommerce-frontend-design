import React, { useEffect, useState } from "react";
import "./RecommendedSection.css";
// Service images (unchanged)
import industry from "../assets/Industry.png";
import customize from "../assets/Customize.png";
import shipping from "../assets/Shipping.png";
import monitoring from "../assets/Monitoring.png";
// Service data (unchanged)
const services = [
  {
    img: industry,
    title: "Source from Industry Hubs",
    icon: "search",
  },
  {
    img: customize,
    title: "Customize Your Products",
    icon: "settings",
  },
  {
    img: shipping,
    title: "Fast, reliable shipping by ocean or air",
    icon: "local_shipping",
  },
  {
    img: monitoring,
    title: "Product monitoring and inspection",
    icon: "visibility",
  },
];
export default function RecommendedSection() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // Fetch products from FakeStore API
    fetch("https://fakestoreapi.com/products?limit=10")
      .then((res) => res.json())
      .then((data) => {
        // Map API format to match your UI fields
        const formatted = data.map((item) => ({
          img: item.image,
          price: `$${item.price}`,
          title: item.title.length > 40 ? item.title.substring(0, 40) + "..." : item.title,
        }));
        setProducts(formatted);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);
  return (
    <div className="recommended-section">
      <h3 className="recommended-title">Recommended items</h3>
      <div className="recommended-products-grid">
        {products.map((p, i) => (
          <div className="product-card" key={i}>
            <div className="product-img-container">
              <img src={p.img} alt={p.title} className="product-img" />
            </div>
            <div className="product-price">{p.price}</div>
            <div className="product-desc">{p.title}</div>
          </div>
        ))}
      </div>
      <h3 className="services-title">Our extra services</h3>
      <div className="services-grid">
        {services.map((s, i) => (
          <div className="service-card" key={i}>
            <div className="service-img-container">
              <img src={s.img} alt={s.title} className="service-img" />
            </div>
            <div className="service-content">
              <div className="service-desc">{s.title}</div>
              <div className="service-icon">
                {s.icon === "search" && <span>🔍</span>}
                {s.icon === "settings" && <span>⚙️</span>}
                {s.icon === "local_shipping" && <span>✈️</span>}
                {s.icon === "visibility" && <span>👁️</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}