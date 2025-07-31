import fbIcon from "../assets/Fb.png";
import ytIcon from "../assets/Yt.png";
import instaIcon from "../assets/Insta.png";
import twitterIcon from "../assets/Twitter.png";
import linkedinIcon from "../assets/In.png";
import React from "react";
import "./Footer.css";

import appStore from "../assets/appstore.png";
import googlePlay from "../assets/googleplay.png";
// Removed flagUs import!

export default function Footer() {
    return (
        <footer className="footer-main">
            <div className="footer-newsletter">
                <div className="newsletter-title">Subscribe on our newsletter</div>
                <div className="newsletter-desc">
                    Get daily news on upcoming offers from many suppliers all over the world
                </div>
                <form className="newsletter-form">
                    <input type="email" placeholder="Email" className="newsletter-input" />
                    <button type="submit" className="newsletter-btn">Subscribe</button>
                </form>
            </div>
            <div className="footer-content">
                <div className="footer-brand">
                    <div>
                        <div className="footer-brand-title">Brand</div>
                        <div className="footer-brand-desc">
                            Best information about the company<br />gies here but now lorem ipsum is
                        </div>
                        <div className="footer-social">
                            <a href="#"><img src={fbIcon} alt="Facebook" className="social-icon" /></a>
                            <a href="#"><img src={twitterIcon} alt="Twitter" className="social-icon" /></a>
                            <a href="#"><img src={linkedinIcon} alt="LinkedIn" className="social-icon" /></a>
                            <a href="#"><img src={ytIcon} alt="YouTube" className="social-icon" /></a>
                            <a href="#"><img src={instaIcon} alt="Instagram" className="social-icon" /></a>
                        </div>

                    </div>
                </div>
                <div className="footer-links">
                    <div className="footer-col">
                        <div className="footer-col-title">About</div>
                        <a href="#">About Us</a>
                        <a href="#">Find store</a>
                        <a href="#">Categories</a>
                        <a href="#">Blogs</a>
                    </div>
                    <div className="footer-col">
                        <div className="footer-col-title">Partnership</div>
                        <a href="#">About Us</a>
                        <a href="#">Find store</a>
                        <a href="#">Categories</a>
                        <a href="#">Blogs</a>
                    </div>
                    <div className="footer-col">
                        <div className="footer-col-title">Information</div>
                        <a href="#">Help Center</a>
                        <a href="#">Money Refund</a>
                        <a href="#">Shipping</a>
                        <a href="#">Contact us</a>
                    </div>
                    <div className="footer-col">
                        <div className="footer-col-title">For users</div>
                        <a href="#">Login</a>
                        <a href="#">Register</a>
                        <a href="#">Settings</a>
                        <a href="#">My Orders</a>
                    </div>
                    <div className="footer-col app-col">
                        <div className="footer-col-title">Get app</div>
                        <a href="#"><img src={appStore} className="footer-app-img" alt="App Store" /></a>
                        <a href="#"><img src={googlePlay} className="footer-app-img" alt="Google Play" /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <span className="footer-copyright">© 2023 Ecommerce.</span>
                <div className="footer-lang">
                    {/* Flag removed */}
                    <span>English</span>
                    <span className="footer-lang-arrow">▾</span>
                </div>
            </div>
        </footer>
    );
}