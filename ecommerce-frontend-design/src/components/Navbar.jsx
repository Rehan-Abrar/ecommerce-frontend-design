import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li>All category</li>
        <li>Hot offers</li>
        <li>Gift boxes</li>
        <li>Projects</li>
        <li>Menu item</li>
        <li>Help</li>
      </ul>

      <div className="navbar__right">
        <select>
          <option>English, USD</option>
        </select>
        <select>
          <option>Ship to</option>
        </select>
      </div>
    </nav>
  );
}
