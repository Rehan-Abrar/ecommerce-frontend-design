import React, { useEffect, useState } from "react";
import "./ListViewPage.css";

export default function ListViewPage() {
  const [products, setProducts] = useState([]);
  const [viewType, setViewType] = useState("list"); // "list" or "grid"

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=12")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item, index) => ({
          id: item.id,
          title: item.title,
          price: `$${item.price}`,
          oldPrice: `$${(item.price * 1.25).toFixed(2)}`,
          img: item.image,
          rating: item.rating?.rate || 4.5,
          orders: item.rating?.count || 100,
          shipping: "Free Shipping",
          desc: item.description,
          verified: true,
        }));
        setProducts(formatted);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  // SVGs for list and grid view buttons (pixel-perfect, matching Image 5)
  const ListIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" style={{verticalAlign: 'middle'}}>
      <rect x="3" y="4.5" width="14" height="2" rx="1" fill="currentColor"/>
      <rect x="3" y="9" width="14" height="2" rx="1" fill="currentColor"/>
      <rect x="3" y="13.5" width="14" height="2" rx="1" fill="currentColor"/>
    </svg>
  );
  const GridIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" style={{verticalAlign: 'middle'}}>
      <rect x="3" y="4" width="5" height="5" rx="1" fill="currentColor"/>
      <rect x="12" y="4" width="5" height="5" rx="1" fill="currentColor"/>
      <rect x="3" y="12" width="5" height="5" rx="1" fill="currentColor"/>
      <rect x="12" y="12" width="5" height="5" rx="1" fill="currentColor"/>
    </svg>
  );

  return (
    <div className="listview-wrapper">
      <div className="listview-breadcrumb">
        Home &gt; Clothing &gt; Men's wear &gt; Summer clothing
      </div>
      <div className="listview-main">
        {/* Sidebar Filters */}
        <aside className="listview-sidebar">
          {/* ...sidebar unchanged... */}
          {/* Category */}
          <div className="filter-section">
            <div className="filter-heading">Category</div>
            <ul className="filter-list">
              <li className="filter-list-item active">Mobile accessory</li>
              <li className="filter-list-item">Electronics</li>
              <li className="filter-list-item">Smartphones</li>
              <li className="filter-list-item">Modern tech</li>
              <li className="filter-list-item seeall"><a href="#">See all</a></li>
            </ul>
          </div>
          {/* Brands */}
          <div className="filter-section">
            <div className="filter-heading bordered">Brands</div>
            <ul className="filter-list">
              <li className="filter-list-item"><input type="checkbox" id="samsung" /><label htmlFor="samsung"> Samsung</label></li>
              <li className="filter-list-item"><input type="checkbox" id="apple" /><label htmlFor="apple"> Apple</label></li>
              <li className="filter-list-item"><input type="checkbox" id="huawei" /><label htmlFor="huawei"> Huawei</label></li>
              <li className="filter-list-item"><input type="checkbox" id="poco" /><label htmlFor="poco"> Poco</label></li>
              <li className="filter-list-item"><input type="checkbox" id="lenovo" /><label htmlFor="lenovo"> Lenovo</label></li>
              <li className="filter-list-item seeall"><a href="#">See all</a></li>
            </ul>
          </div>
          {/* Features */}
          <div className="filter-section">
            <div className="filter-heading bordered">Features</div>
            <ul className="filter-list">
              <li className="filter-list-item"><input type="checkbox" id="metallic" /><label htmlFor="metallic"> Metallic</label></li>
              <li className="filter-list-item"><input type="checkbox" id="plasticcover" /><label htmlFor="plasticcover"> Plastic cover</label></li>
              <li className="filter-list-item"><input type="checkbox" id="8gbram" /><label htmlFor="8gbram"> 8GB Ram</label></li>
              <li className="filter-list-item"><input type="checkbox" id="superpower" /><label htmlFor="superpower"> Super power</label></li>
              <li className="filter-list-item"><input type="checkbox" id="largememory" /><label htmlFor="largememory"> Large Memory</label></li>
              <li className="filter-list-item seeall"><a href="#">See all</a></li>
            </ul>
          </div>
          {/* Price Range */}
          <div className="filter-section">
            <div className="filter-heading bordered">Price range</div>
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
          {/* Condition */}
          <div className="filter-section">
            <div className="filter-heading bordered">Condition</div>
            <ul className="filter-list condition-list">
              <li className="filter-list-item">
                <input type="radio" id="any" name="condition" defaultChecked />
                <label htmlFor="any"> Any</label>
              </li>
              <li className="filter-list-item">
                <input type="radio" id="refurbished" name="condition" />
                <label htmlFor="refurbished"> Refurbished</label>
              </li>
              <li className="filter-list-item">
                <input type="radio" id="brandnew" name="condition" />
                <label htmlFor="brandnew"> Brand new</label>
              </li>
              <li className="filter-list-item">
                <input type="radio" id="olditems" name="condition" />
                <label htmlFor="olditems"> Old items</label>
              </li>
            </ul>
          </div>
          {/* Ratings */}
          <div className="filter-section">
            <div className="filter-heading bordered">Ratings</div>
            <ul className="filter-list ratings-list">
              <li className="filter-list-item">
                <input type="checkbox" id="star5" />
                <label htmlFor="star5" className="star-label">
                  <span className="star orange">★</span>
                  <span className="star orange">★</span>
                  <span className="star orange">★</span>
                  <span className="star orange">★</span>
                  <span className="star orange">★</span>
                </label>
              </li>
              <li className="filter-list-item">
                <input type="checkbox" id="star4" />
                <label htmlFor="star4" className="star-label">
                  <span className="star orange">★</span>
                  <span className="star orange">★</span>
                  <span className="star orange">★</span>
                  <span className="star orange">★</span>
                  <span className="star gray">★</span>
                </label>
              </li>
              <li className="filter-list-item">
                <input type="checkbox" id="star3" />
                <label htmlFor="star3" className="star-label">
                  <span className="star orange">★</span>
                  <span className="star orange">★</span>
                  <span className="star orange">★</span>
                  <span className="star gray">★</span>
                  <span className="star gray">★</span>
                </label>
              </li>
              <li className="filter-list-item">
                <input type="checkbox" id="star2" />
                <label htmlFor="star2" className="star-label">
                  <span className="star orange">★</span>
                  <span className="star orange">★</span>
                  <span className="star gray">★</span>
                  <span className="star gray">★</span>
                  <span className="star gray">★</span>
                </label>
              </li>
              <li className="filter-list-item">
                <input type="checkbox" id="star1" />
                <label htmlFor="star1" className="star-label">
                  <span className="star orange">★</span>
                  <span className="star gray">★</span>
                  <span className="star gray">★</span>
                  <span className="star gray">★</span>
                  <span className="star gray">★</span>
                </label>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main List */}
        <main className="listview-main-content">
          <div className="listview-topbar">
            <span>
              <b>Products in <span className="topbar-category">Store</span></b>
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
            {/* View type buttons */}
            <span className="topbar-view">
              <button
                className={`view-btn${viewType === "list" ? " active" : ""}`}
                onClick={() => setViewType("list")}
                aria-label="List View"
                type="button"
              >
                {ListIcon}
              </button>
              <button
                className={`view-btn${viewType === "grid" ? " active" : ""}`}
                onClick={() => setViewType("grid")}
                aria-label="Grid View"
                type="button"
              >
                {GridIcon}
              </button>
            </span>
          </div>
          {/* View type: controls product layout */}
          <div className={viewType === "grid" ? "listview-product-grid" : "listview-product-list"}>
            {products.map(prod => (
              <div
                key={prod.id}
                className={viewType === "grid" ? "listview-product-card grid" : "listview-product-card"}
              >
                <div className="product-img-wrap">
                  <img src={prod.img} alt={prod.title} />
                </div>
                <div className="product-details">
                  <div className="product-title">{prod.title}</div>
                  <div className="product-price-row">
                    <span className="product-price">{prod.price}</span>
                    <span className="product-oldprice">{prod.oldPrice}</span>
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