import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import PGPage from './pages/PGPage';
import HostelPage from './pages/HostelPage';
import CoLivingPage from './pages/CoLivingPage';
import ApartmentPage from './pages/ApartmentPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import OurPropertyPage from './pages/OurPropertyPage';
import FAQPage from './pages/FAQPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pg" element={<PGPage />} />
        <Route path="/hostel" element={<HostelPage />} />
        <Route path="/coliving" element={<CoLivingPage />} />
        <Route path="/apartment" element={<ApartmentPage />} />
        <Route path="/website/index" element={<HomePage />} />
        <Route path="/website/about" element={<AboutPage />} />
        <Route path="/website/contact" element={<ContactPage />} />
        <Route path="/website/ourproperty" element={<OurPropertyPage />} />
        <Route path="/website/faq" element={<FAQPage />} />
      </Routes>
    </Router>
  );
}
