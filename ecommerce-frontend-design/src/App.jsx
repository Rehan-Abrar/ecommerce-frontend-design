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
import ListViewPage from './pages/ListViewPage'; // <-- Your new ListView page

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
    <div className="app-wrapper">
      <Router>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listview" element={<ListViewPage />} />
          {/* Add more routes here as needed */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;