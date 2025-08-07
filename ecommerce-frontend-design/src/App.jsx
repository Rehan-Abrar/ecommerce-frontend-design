import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Common layout components
import Header from './components/header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// Main page content
import MainContent from './components/MainContent';
import ProductSection from './components/ProductSection';
import RequestBanner from './components/RequestBanner';
import RecommendedSection from './components/RecommendedSection';
// Other pages
import ListViewPage from './pages/ListViewPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage, { CartProvider } from "./pages/CartPage";

function HomePage() {
  // Your old main page grouped as a component
  return (
    <>
      <MainContent />
      <ProductSection />
      <RequestBanner />
      <RecommendedSection />
    </>
  );
}

function App() {
  return (
      <CartProvider>
        <Router>
          <Header />
          <Navbar />
              <div className="app-wrapper">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/listview" element={<ListViewPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            {/* Add more routes here as needed */}
          </Routes>
          </div>
          <Footer />
        </Router>
      </CartProvider>
    
  );
}

export default App;