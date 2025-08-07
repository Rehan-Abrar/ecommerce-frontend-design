import './Header.css';
import { useCart } from '../pages/CartPage';
import { Link } from 'react-router-dom';

export default function Header() {
  const { cartItems } = useCart();
  
  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 className="header__logo">Exclusive</h1>
        </Link>
      </div>

      <div className="header__search">
        <select className="header__dropdown">
          <button>All Categories</button>
        </select>
        <input type="text" placeholder="Search Products..." />
        <button className="header__search-btn">🔍</button>
      </div>

      <div className="header__right">
        <div className="header__icon">👤</div>
        <div className="header__icon">💬</div>
        <div className="header__icon">📦</div>
        <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="header__icon header__cart-icon">
            🛒
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}
