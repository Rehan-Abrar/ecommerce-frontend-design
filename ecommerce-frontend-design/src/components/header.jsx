import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header__left">
        <h1 className="header__logo">Exclusive</h1>
      </div>

      <div className="header__search">
        <select className="header__dropdown">
          <option>All Categories</option>
        </select>
        <input type="text" placeholder="Search Products..." />
        <button className="header__search-btn">🔍</button>
      </div>

      <div className="header__right">
        <div className="header__icon">👤</div>
        <div className="header__icon">💬</div>
        <div className="header__icon">📦</div>
        <div className="header__icon">🛒</div>
      </div>
    </header>
  );
}
