import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import PGPage from './pages/website/PGPage';
import HostelPage from './pages/website/HostelPage';
import CoLivingPage from './pages/website/CoLivingPage';
import ApartmentPage from './pages/website/ApartmentPage';
import AboutPage from './pages/website/AboutPage';
import ContactPage from './pages/website/ContactPage';
import OurPropertyPage from './pages/website/OurPropertyPage';
import FAQPage from './pages/website/FAQPage';
import FastBiddingPage from './pages/website/FastBiddingPage';
import ListPropertyPage from './pages/website/ListPropertyPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/website/index" element={<HomePage />} />

        {/* Property type pages */}
        <Route path="/pg" element={<PGPage />} />
        <Route path="/hostel" element={<HostelPage />} />
        <Route path="/coliving" element={<CoLivingPage />} />
        <Route path="/apartment" element={<ApartmentPage />} />

        {/* Website pages */}
        <Route path="/website/about" element={<AboutPage />} />
        <Route path="/website/contact" element={<ContactPage />} />
        <Route path="/website/ourproperty" element={<OurPropertyPage />} />
        <Route path="/website/faq" element={<FAQPage />} />

        {/* New pages */}
        <Route path="/website/fast-bidding" element={<FastBiddingPage />} />
        <Route path="/website/list-property" element={<ListPropertyPage />} />
      </Routes>
    </Router>
  );
}
