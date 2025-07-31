import React from "react";
import "./RequestBanner.css";
import warehouseBg from "../assets/Request.png"; // use your actual image path

export default function RequestBanner() {
  return (
    <div className="request-banner">
      <div
        className="request-banner-bg"
        style={{
          backgroundImage: `url(${warehouseBg})`
        }}
      >
        <div className="request-banner-gradient" />
        <div className="request-banner-content">
          <div className="request-banner-left">
            <h2>
              An easy way to send<br />
              requests to all suppliers
            </h2>
            <p>
              Easily send your requirements to multiple suppliers and get <br />
              quick responses for your business needs.
            </p>
          </div>
          <div className="request-banner-form-card">
            <div className="form-title">Send quote to suppliers</div>
            <form>
              <input
                type="text"
                className="form-input"
                placeholder="What item you need?"
              />
              <textarea
                className="form-textarea"
                placeholder="Type more details"
                rows={2}
              />
              <div className="form-row">
                <input
                  type="number"
                  className="form-input small"
                  placeholder="Quantity"
                  min={1}
                />
                <select className="form-select">
                  <option>Pcs</option>
                  <option>Kg</option>
                  <option>L</option>
                </select>
              </div>
              <button type="submit" className="form-btn">
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}