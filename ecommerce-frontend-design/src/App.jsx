
import Header from './components/header';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import ProductSection from './components/ProductSection';
import RequestBanner from './components/RequestBanner';
import RecommendedSection from './components/RecommendedSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-wrapper">
    <>
      <Header />
      <Navbar />
      <MainContent />
      <ProductSection />
      <RequestBanner />
      <RecommendedSection />
      <Footer />
    </>
    </div>
  );
}

export default App;
