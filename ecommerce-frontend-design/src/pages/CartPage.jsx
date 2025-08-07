import React, { useState, useEffect, createContext, useContext } from 'react';
import './CartPage.css';

// Create a CartContext for global state management
export const CartContext = createContext();

// CartProvider component to wrap the app and provide cart functionality
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Try to load cart from localStorage
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [
      {
        id: 1,
        name: "T-shirts with multiple colors, for men and lady",
        size: "medium",
        color: "blue",
        material: "Plastic",
        seller: "Artel Market",
        price: 78.99,
        quantity: 9,
        image: "/api/placeholder/60/60"
      },
      {
        id: 2,
        name: "T-shirts with multiple colors, for men and lady",
        size: "medium",
        color: "blue",
        material: "Plastic",
        seller: "Best factory LLC",
        price: 39.00,
        quantity: 3,
        image: "/api/placeholder/60/60"
      },
      {
        id: 3,
        name: "T-shirts with multiple colors, for men and lady",
        size: "medium",
        color: "blue",
        material: "Plastic",
        seller: "Artel Market",
        price: 170.50,
        quantity: 1,
        image: "/api/placeholder/60/60"
      }
    ];
  });
  
  const [savedItems, setSavedItems] = useState(() => {
    // Try to load saved items from localStorage
    const savedForLater = localStorage.getItem('savedItems');
    return savedForLater ? JSON.parse(savedForLater) : [
      {
        id: 1,
        name: "GoPro HERO6 4K Action Camera - Black",
        price: 99.50,
        image: "/api/placeholder/200/150"
      },
      {
        id: 2,
        name: "GoPro HERO6 4K Action Camera - Black",
        price: 99.50,
        image: "/api/placeholder/200/150"
      },
      {
        id: 3,
        name: "GoPro HERO6 4K Action Camera - Black",
        price: 99.50,
        image: "/api/placeholder/200/150"
      },
      {
        id: 4,
        name: "GoPro HERO6 4K Action Camera - Black",
        price: 99.50,
        image: "/api/placeholder/200/150"
      }
    ];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('savedItems', JSON.stringify(savedItems));
  }, [cartItems, savedItems]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      // Check if product already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if product already in cart
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        // Add new product to cart
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Update quantity of an item
  const updateQuantity = (id, newQuantity) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  // Remove all items from cart
  const removeAllItems = () => {
    setCartItems([]);
  };

  // Save item for later
  const saveForLater = (idOrProduct) => {
    // Check if we received an ID (from cart) or a product object (from product page)
    if (typeof idOrProduct === 'object') {
      // We received a product object directly
      const productToSave = idOrProduct;
      // Check if this product is already in saved items
      const alreadySaved = savedItems.some(item => item.id === productToSave.id);
      if (!alreadySaved) {
        setSavedItems(prev => [...prev, productToSave]);
      }
    } else {
      // We received an ID, so find the item in the cart
      const id = idOrProduct;
      const itemToSave = cartItems.find(item => item.id === id);
      if (itemToSave) {
        setSavedItems(prev => [...prev, itemToSave]);
        removeItem(id);
      }
    }
  };

  // Move item from saved to cart
  const moveToCart = (id) => {
    const itemToMove = savedItems.find(item => item.id === id);
    if (itemToMove) {
      addToCart(itemToMove);
      setSavedItems(items => items.filter(item => item.id !== id));
    }
  };

  // Calculate cart totals
  const calculateTotals = () => {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discount = 10.00; // This could be calculated based on coupons, etc.
    const tax = subtotal * 0.01; // 1% tax rate for example
    const total = subtotal - discount + tax;
    
    return {
      subtotal,
      discount,
      tax,
      total
    };
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      savedItems,
      addToCart,
      updateQuantity,
      removeItem,
      removeAllItems,
      saveForLater,
      moveToCart,
      calculateTotals
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const CartPage = () => {
  // Use the cart context
  const {
    cartItems,
    savedItems,
    updateQuantity,
    removeItem,
    removeAllItems,
    saveForLater,
    moveToCart,
    calculateTotals
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  
  // Calculate totals
  const { subtotal, discount, tax, total } = calculateTotals();

  // We don't need these functions anymore as they're provided by the context
  // But we'll keep them to maintain compatibility with existing code
  // The actual implementation is in the CartContext

  return (
    <div className="cart-container">
      <div className="cart-grid">
        {/* Left Side - Cart Items */}
        <div className="cart-items-section">
          <h1 className="cart-title">My cart ({cartItems.length})</h1>
          
          <div className="cart-items-list">
            {cartItems.map((item, index) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-content">
                  {/* Product Image */}
                  <div className="product-image">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                      />
                    ) : (
                      // Fallback to colored placeholders if no image is available
                      <>
                        {index % 3 === 0 && (
                          <div className="image-teal">
                            <div className="teal-shirt"></div>
                          </div>
                        )}
                        {index % 3 === 1 && (
                          <div className="image-blue">
                            <div className="blue-shirt"></div>
                          </div>
                        )}
                        {index % 3 === 2 && (
                          <div className="image-gray">
                            <div className="gray-shirt"></div>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="product-details">
                    <h3 className="product-name">{item.name}</h3>
                    <div className="product-specs">
                      <span>Size: {item.size}, </span>
                      <span>Color: {item.color}, </span>
                      <span>Material: {item.material}</span>
                    </div>
                    <div className="product-seller">
                      Seller: {item.seller}
                    </div>
                    
                    <div className="product-actions">
                      <button 
                        className="remove-btn"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                      <button 
                        className="save-later-btn"
                        onClick={() => saveForLater(item.id)}
                      >
                        Save for later
                      </button>
                    </div>
                  </div>

                  {/* Price and Quantity */}
                  <div className="product-pricing">
                    <div className="product-price">
                      ${item.price.toFixed(2)}
                    </div>
                    
                    <div className="quantity-selector">
                      <span className="qty-label">Qty:</span>
                      <select 
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="qty-select"
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Back to shop and Remove all */}
          <div className="cart-footer-actions">
            <button className="back-to-shop-btn" onClick={() => window.history.back()}>
              <span className="back-arrow">←</span>
              Back to shop
            </button>
            <button className="remove-all-btn" onClick={removeAllItems}>
              Remove all
            </button>
          </div>

          {/* Trust badges */}
          <div className="trust-badges">
            <div className="trust-badge">
              <div className="trust-icon">
                <span>🔒</span>
              </div>
              <div className="trust-content">
                <h4 className="trust-title">Secure payment</h4>
                <p className="trust-description">Have you ever finally just</p>
              </div>
            </div>
            <div className="trust-badge">
              <div className="trust-icon">
                <span>💬</span>
              </div>
              <div className="trust-content">
                <h4 className="trust-title">Customer support</h4>
                <p className="trust-description">Have you ever finally just</p>
              </div>
            </div>
            <div className="trust-badge">
              <div className="trust-icon">
                <span>🚚</span>
              </div>
              <div className="trust-content">
                <h4 className="trust-title">Free delivery</h4>
                <p className="trust-description">Have you ever finally just</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div className="order-summary-section">
          <div className="order-summary">
            {/* Coupon Section */}
            <div className="coupon-section">
              <h3 className="coupon-title">Have a coupon?</h3>
              <div className="coupon-input-group">
                <input
                  type="text"
                  placeholder="Add coupon"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="coupon-input"
                />
                <button 
                  className="apply-btn"
                  onClick={() => {
                    if (couponCode.trim() === 'DISCOUNT10') {
                      alert('Coupon applied: 10% discount');
                    } else if (couponCode.trim() === 'DISCOUNT20') {
                      alert('Coupon applied: 20% discount');
                    } else {
                      alert('Invalid coupon code');
                    }
                  }}
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="order-breakdown">
              <div className="breakdown-row">
                <span className="breakdown-label">Subtotal:</span>
                <span className="breakdown-value">${subtotal.toFixed(2)}</span>
              </div>
              <div className="breakdown-row">
                <span className="breakdown-label">Discount:</span>
                <span className="breakdown-value discount">- ${discount.toFixed(2)}</span>
              </div>
              <div className="breakdown-row">
                <span className="breakdown-label">Tax:</span>
                <span className="breakdown-value tax">+ ${tax.toFixed(2)}</span>
              </div>
              <hr className="breakdown-divider" />
              <div className="breakdown-row total-row">
                <span className="breakdown-label">Total:</span>
                <span className="breakdown-value total">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button className="checkout-btn" >
              Checkout
            </button>

            {/* Payment Methods */}
            <div className="payment-methods">
              <div className="payment-icon card-icon">
                <span>💳</span>
              </div>
              <div className="payment-icon mastercard-icon"></div>
              <div className="payment-icon paypal-icon">
                <span>P</span>
              </div>
              <div className="payment-icon visa-icon">
                <span>V</span>
              </div>
              <div className="payment-icon apple-pay-icon">
                <span>🍎</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Saved for Later Section */}
      <div className="saved-section">
        <h2 className="saved-title">Saved for later ({savedItems.length})</h2>
        <div className="saved-items-grid">
          {savedItems.map((item, index) => (
            <div key={item.id} className="saved-item">
              <div className="saved-item-image">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                  />
                ) : (
                  // Fallback to device placeholders if no image is available
                  <>
                    {index % 4 === 0 && (
                      <div className="saved-image-tablet">
                        <div className="tablet-screen"></div>
                      </div>
                    )}
                    {index % 4 === 1 && (
                      <div className="saved-image-phone">
                        <div className="phone-body"></div>
                        <div className="phone-notch"></div>
                      </div>
                    )}
                    {index % 4 === 2 && (
                      <div className="saved-image-watch">
                        <div className="watch-body">
                          <div className="watch-screen"></div>
                        </div>
                      </div>
                    )}
                    {index % 4 === 3 && (
                      <div className="saved-image-laptop">
                        <div className="laptop-screen"></div>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="saved-item-details">
                <div className="saved-item-price">
                  ${item.price.toFixed(2)}
                </div>
                <h3 className="saved-item-name">
                  {item.name}
                </h3>
                <button 
                  className="move-to-cart-btn"
                  onClick={() => moveToCart(item.id)}
                >
                  <span>🛒</span>
                  Move to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default CartPage;