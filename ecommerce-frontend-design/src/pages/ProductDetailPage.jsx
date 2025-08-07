import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetailPage.css';
import { useCart } from './CartPage';
import Header from '../components/header';
import Footer from '../components/Footer';
import './ProductDetailPage.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, saveForLater } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedTab, setSelectedTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        const mapped = {
          id: data.id,
          title: data.title,
          rating: data.rating?.rate ?? 0,
          reviews: 32,
          sold: 154,
          price: {
            '50-100': (data.price + 10).toFixed(2),
            '100-700': data.price.toFixed(2),
            '700+': (data.price - 10).toFixed(2),
          },
          supplier: {
            name: 'Guanjio Trading LLC',
            location: 'Germany, Berlin',
            verified: true,
            shipping: 'Worldwide shipping'
          },
          images: [data.image, data.image, data.image, data.image, data.image, data.image],
          details: {
            type: 'Classic shoes',
            material: 'Plastic material',
            design: 'Modern nice',
            customization: 'Customized logo and design custom packages',
            protection: 'Refund Policy',
            warranty: '2 years full warranty'
          },
          description: data.description,
          specifications: {
            model: '#8786867',
            style: 'Classic style',
            certificate: 'ISO-898921212',
            size: '34mm x 450mm x 19mm',
            memory: '36GB RAM'
          },
          features: [
            'Some great feature name here',
            'Lorem ipsum dolor sit amet, consectetur',
            'Duis aute irure dolor in reprehenderit',
            'Some great feature name here'
          ]
        };
        setProduct(mapped);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(item => item.id !== Number(id));
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 6);
        setRelatedProducts(selected);
      });
  }, [id]);

  if (loading) return <div className="product-detail-page"><p>Loading…</p></div>;
  if (!product) return <div className="product-detail-page"><p>Product not found</p></div>;

  return (
    <>
      {showToast && (
        <div className={`toast-notification ${showToast ? 'show' : ''}`}>
          {toastMessage}
        </div>
      )}
      <div className="product-detail-page">
        <div className="breadcrumb">
          Home &gt; All categories &gt; Clothing &gt; Men's wear &gt; {product.title}
        </div>

        <div className="product-overview">
          {/* 1. Main Image with thumbnails at bottom */}
          <div className="product-images">
            <div className="main-image">
              <img src={product.images[selectedImage]} alt={product.title} />
            </div>
            <div className="image-thumbnails">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img src={img} alt={`view ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* 2. Product Details Section */}
          <div className="product-info">
            <div className="in-stock">In stock</div>
            <h1 className="product-title">{product.title}</h1>
            <div className="product-ratings">
              <div className="stars">
                {[...Array(5)].map((_, i) =>
                  <span key={i} className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}>★</span>
                )}
                <span className="rating-value">{product.rating.toFixed(1)}</span>
              </div>
              <div className="reviews">{product.reviews} reviews</div>
              <div className="sold">{product.sold} sold</div>
            </div>

            <div className="pricing-table">
              <div className="price-row header">
                {Object.values(product.price).map((p, i) => <div key={i} className="price-cell">${p}</div>)}
              </div>
              <div className="price-row">
                {Object.keys(product.price).map((r, i) => <div key={i} className="price-cell">{r} pcs</div>)}
              </div>
            </div>

            {/* Product Details Table */}
            <div className="product-details-table">
              <div className="detail-row">
                <div className="detail-label">Price:</div>
                <div className="detail-value">Negotiable</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Type:</div>
                <div className="detail-value">{product.details.type}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Material:</div>
                <div className="detail-value">{product.details.material}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Design:</div>
                <div className="detail-value">{product.details.design}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Customization:</div>
                <div className="detail-value">{product.details.customization}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Protection:</div>
                <div className="detail-value">{product.details.protection}</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Warranty:</div>
                <div className="detail-value">{product.details.warranty}</div>
              </div>
            </div>
          </div>

          {/* 3. Supplier Card */}
          <div className="supplier-info">
            <div className="supplier-header">
              <div className="supplier-logo">R</div>
              <div className="supplier-details">
                <div className="supplier-name">{product.supplier.name}</div>
                <div className="supplier-location">
                  <img src="/src/assets/flag-germany.png" alt="DE" className="country-flag" />
                  {product.supplier.location}
                </div>
                <div className="supplier-verified">
                  {product.supplier.verified ? 'Verified Seller' : 'Unverified'}
                </div>
                <div className="supplier-shipping">{product.supplier.shipping}</div>
              </div>
            </div>
            <button className="send-inquiry-btn">Send inquiry</button>
            <button className="seller-profile-btn">Seller's profile</button>
           
            <button 
              className="save-later-btn"
              onClick={() => {
                saveForLater({
                  id: product.id,
                  name: product.title,
                  size: "medium",
                  color: "blue",
                  material: product.details.material,
                  seller: product.supplier.name,
                  price: parseFloat(Object.values(product.price)[1]),
                  quantity: 1,
                  image: product.images[0]
                });
                setToastMessage('Product saved for later!');
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
              }}
            >
              Save for Later
            </button>
             <button 
              className="add-to-cart-btn" 
              onClick={() => {
                addToCart({
                  id: product.id,
                  name: product.title,
                  size: "medium",
                  color: "blue",
                  material: product.details.material,
                  seller: product.supplier.name,
                  price: parseFloat(Object.values(product.price)[1]),
                  quantity: 1,
                  image: product.images[0]
                });
                setToastMessage('Product added to cart successfully!');
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="product-tabs">
          <div className="tabs-header">
            {['description', 'reviews', 'shipping', 'about'].map(tab => (
              <button
                key={tab}
                className={`tab-btn ${selectedTab === tab ? 'active' : ''}`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="tab-content">
            {selectedTab === 'description' && (
              <div className="description-tab">
                <p className="description-text">{product.description}</p>
                <table className="specs-table">
                  <tbody>
                    {Object.entries(product.specifications).map(([k, v]) => (
                      <tr key={k}>
                        <td className="spec-label">{k.charAt(0).toUpperCase() + k.slice(1)}</td>
                        <td className="spec-value">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="features-list">
                  {product.features.map((f, i) => (
                    <div key={i} className="feature-item">
                      <span className="feature-check">✓</span>{f}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {selectedTab === 'reviews' && <div className="reviews-tab">Reviews content</div>}
            {selectedTab === 'shipping' && <div className="shipping-tab">Shipping info</div>}
            {selectedTab === 'about' && <div className="about-tab">Seller info</div>}
          </div>
        </div>

        {/* ✅ Related Products */}
        <div className="related-products">
          <h2 className="section-title">Related products</h2>
          <div className="related-products-grid">
            {relatedProducts.map(rp => (
              <div
                key={rp.id}
                className="related-product-card"
                onClick={() => navigate(`/product/${rp.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <img src={rp.image} alt={rp.title} className="related-product-img" />
                <div className="related-product-title">{rp.title}</div>
                <div className="related-product-price">${rp.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Discount Banner */}
        <div className="discount-banner">
          <div className="discount-text">
            <h3>Super discount on more than 100 USD</h3>
            <p>Have you ever finally just write dummy info</p>
          </div>
          <button className="shop-now-btn">Shop now</button>
        </div>
      </div>
    </>
  );
}
