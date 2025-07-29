import './MainContent.css';
import heroImage from '../assets/hero.png';

export default function MainContent() {
  return (
    <div className="main">
      <aside className="main__sidebar">
        <ul>
          <li className="active">Automobiles</li>
          <li>Clothes and wear</li>
          <li>Home interiors</li>
          <li>Computer and tech</li>
          <li>Tools, equipment</li>
          <li>Sports and outdoor</li>
          <li>Animal and pets</li>
          <li>Machinery tools</li>
          <li>More category</li>
        </ul>
      </aside>

      <section className="main__banner">
        <div className="banner__content">
          <p className="banner__subtitle">Latest trending</p>
          <h2 className="banner__title">Electronic items</h2>
          <button className="banner__button">Learn more</button>
        </div>
        <div className="banner__image-container">
          <img src={heroImage} alt="Electronic items" className="banner__image" />
        </div>
      </section>

      <aside className="main__right">
        <div className="card blue">
          <p>Hi, user let's get started</p>
          <button>Join now</button>
          <button>Log in</button>
        </div>
        <div className="card orange">
          <p>Get US $10 off with a new supplier</p>
        </div>
        <div className="card teal">
          <p>Send quotes with supplier preferences</p>
        </div>
      </aside>
    </div>
  );
}