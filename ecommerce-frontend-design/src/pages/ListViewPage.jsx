import React from "react";
import "./ListViewPage.css";

// Dummy images (replace with actual imports)
import img1 from "../assets/item1.png";
import img2 from "../assets/item2.png";
import img3 from "../assets/item3.png";
import img4 from "../assets/item4.png";
import img5 from "../assets/item5.png";
import img6 from "../assets/item6.png";

const products = [
  {
    id: 1,
    title: "Canon Camera EOS 2000, Black 10x zoom",
    price: "$998.00",
    oldPrice: "$1289.00",
    img: img1,
    rating: 7.5,
    orders: 154,
    shipping: "Free Shipping",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    verified: true
  },
  {
    id: 2,
    title: "GoPro HERO6 4K Action Camera - Black",
    price: "$998.00",
    img: img2,
    rating: 7.5,
    orders: 154,
    shipping: "Free Shipping",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
    verified: true
  },
  {
    id: 3,
    title: "GoPro HERO6 4K Action Camera - Black",
    price: "$998.00",
    img: img3,
    rating: 7.5,
    orders: 154,
    shipping: "Free Shipping",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
    verified: true
  },
  {
    id: 4,
    title: "GoPro HERO6 4K Action Camera - Black",
    price: "$998.00",
    img: img4,
    rating: 7.5,
    orders: 154,
    shipping: "Free Shipping",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
    verified: true
  },
  {
    id: 5,
    title: "GoPro HERO6 4K Action Camera - Black",
    price: "$998.00",
    img: img5,
    rating: 7.5,
    orders: 154,
    shipping: "Free Shipping",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
    verified: true
  },
  {
    id: 6,
    title: "GoPro HERO6 4K Action Camera - Black",
    price: "$998.00",
    img: img6,
    rating: 7.5,
    orders: 154,
    shipping: "Free Shipping",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
    verified: true
  }
];

export default function ListViewPage() {
  return (
    <div className="listview-wrapper">
      <div className="listview-breadcrumb">
        Home &gt; Clothing &gt; Men's wear &gt; Summer clothing
      </div>
      <div className="listview-main">
        {/* Sidebar Filters */}
        <aside className="listview-sidebar">
          <div className="listview-filter-section">
            <div className="listview-filter-title">Category</div>
            <ul>
              <li className="active">Mobile accessory</li>
              <li>Electronics</li>
              <li>Smartphones</li>
              <li>Modern tech</li>
              <li className="seeall">See all</li>
            </ul>
          </div>
          <div className="listview-filter-section">
            <div className="listview-filter-title">Brands</div>
            <ul>
              <li><input type="checkbox" /> Samsung</li>
              <li><input type="checkbox" /> Apple</li>
              <li><input type="checkbox" /> Huawei</li>
              <li><input type="checkbox" /> Poco</li>
              <li><input type="checkbox" /> Lenovo</li>
              <li className="seeall">See all</li>
            </ul>
          </div>
          <div className="listview-filter-section">
            <div className="listview-filter-title">Features</div>
            <ul>
              <li><input type="checkbox" /> Metallic</li>
              <li><input type="checkbox" /> Plastic cover</li>
              <li><input type="checkbox" /> 8GB Ram</li>
              <li><input type="checkbox" /> Super power</li>
              <li><input type="checkbox" /> Long range</li>
              <li className="seeall">See all</li>
            </ul>
          </div>
          <div className="listview-filter-section">
            <div className="listview-filter-title">Price range</div>
            <div className="price-range">
              <input type="range" min="0" max="999999" />
              <div className="price-inputs">
                <input type="number" placeholder="Min" />
                <span>-</span>
                <input type="number" placeholder="Max" />
              </div>
              <button className="price-apply">Apply</button>
            </div>
          </div>
          <div className="listview-filter-section">
            <div className="listview-filter-title">Condition</div>
            <ul>
              <li><input type="radio" name="condition" defaultChecked /> Any</li>
              <li><input type="radio" name="condition" /> Refurbished</li>
              <li><input type="radio" name="condition" /> Brand new</li>
              <li><input type="radio" name="condition" /> Old items</li>
            </ul>
          </div>
          <div className="listview-filter-section">
            <div className="listview-filter-title">Ratings</div>
            <ul>
              <li>
                <span className="star-list">★★★★★</span> <input type="checkbox" />
              </li>
              <li>
                <span className="star-list">★★★★☆</span> <input type="checkbox" />
              </li>
              <li>
                <span className="star-list">★★★☆☆</span> <input type="checkbox" />
              </li>
              <li>
                <span className="star-list">★★☆☆☆</span> <input type="checkbox" />
              </li>
              <li>
                <span className="star-list">★☆☆☆☆</span> <input type="checkbox" />
              </li>
            </ul>
          </div>
        </aside>

        {/* Main List */}
        <main className="listview-main-content">
          <div className="listview-topbar">
            <span>
              <b>12,911 items in <span className="topbar-category">Mobile accessory</span></b>
            </span>
            <label>
              <input type="checkbox" />
              Verified only
            </label>
            <select className="topbar-sort">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
            <span className="topbar-view">
              <button className="view-btn active"><i className="icon-listview" /></button>
              <button className="view-btn"><i className="icon-gridview" /></button>
            </span>
          </div>
          <div className="listview-product-list">
            {products.map(prod => (
              <div key={prod.id} className="listview-product-card">
                <div className="product-img-wrap">
                  <img src={prod.img} alt={prod.title} />
                </div>
                <div className="product-details">
                  <div className="product-title">{prod.title}</div>
                  <div className="product-price-row">
                    <span className="product-price">{prod.price}</span>
                    {prod.oldPrice && <span className="product-oldprice">{prod.oldPrice}</span>}
                  </div>
                  <div className="product-info-row">
                    <span className="product-rating">★ {prod.rating}</span>
                    <span className="product-orders">{prod.orders} orders</span>
                    <span className="product-shipping">{prod.shipping}</span>
                  </div>
                  <div className="product-desc">{prod.desc}</div>
                  <a href="#" className="product-details-link">View details</a>
                </div>
                <div className="product-fav">
                  <button className="fav-btn"><i className="icon-heart" /></button>
                </div>
              </div>
            ))}
          </div>
          <div className="listview-pagination-row">
            <label>
              Show
              <select className="pagination-select">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </label>
            <span className="pagination-controls">
              <button>{"<"}</button>
              <button className="active">1</button>
              <button>2</button>
              <button>3</button>
              <button>{">"}</button>
            </span>
          </div>
        </main>
      </div>
    </div>
  );
}