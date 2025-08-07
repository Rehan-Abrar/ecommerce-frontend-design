import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li>
          <Link to="/listview">All category</Link>
        </li>
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