import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Building2, CheckCircle, X, Upload } from 'lucide-react';
import WebsiteNavbar from '../../components/website/WebsiteNavbar';
import WebsiteFooter from '../../components/website/WebsiteFooter';
import { API_URL } from '../../services/api';

interface FormData {
  name: string;
  property_name: string;
  tenants_managed: string;
  city: string;
  country: string;
  contact_name: string;
  additional_message: string;
}

export default function ListPropertyPage() {
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    property_name: '',
    tenants_managed: '',
    city: '',
    country: '',
    contact_name: '',
    additional_message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_URL}/api/locations/cities`);
        if (res.ok) {
          const data = await res.json();
          const cities = (data.data || data || []).map((c: any) => c.name).filter(Boolean);
          if (cities.length > 0) { setCityOptions(cities); return; }
        }
      } catch {}
      setCityOptions(['Kota', 'Indore', 'Jaipur', 'Delhi', 'Pune', 'Mumbai', 'Bhopal']);
    };
    load();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);

    const { name, property_name, city, country, contact_name } = formData;
    if (!name.trim() || !property_name.trim() || !city.trim() || !country.trim() || !contact_name.trim()) {
      setSubmitStatus({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    const enquiryData = {
      property_type: 'pg',
      property_name: formData.property_name,
      city: formData.city,
      locality: formData.country,
      address: '',
      pincode: '',
      description: [
        `Tenants Managed: ${formData.tenants_managed || 0}`,
        `Contact Name: ${formData.contact_name}`,
        formData.additional_message ? `Additional Message: ${formData.additional_message}` : '',
      ].filter(Boolean).join('\n'),
      amenities: [],
      gender_suitability: '',
      rent: 0,
      deposit: '',
      owner_name: formData.name,
      owner_email: '',
      owner_phone: 'NA',
      contact_name: formData.contact_name,
      tenants_managed: parseInt(formData.tenants_managed || '0', 10),
      country: formData.country,
      additional_message: formData.additional_message,
    };

    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/website-enquiry/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiryData),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Submission failed');
      setSubmitStatus({
        type: 'success',
        text: 'Your property has been submitted successfully! Our team will review and contact you shortly.',
      });
      setFormData({ name: '', property_name: '', tenants_managed: '', city: '', country: '', contact_name: '', additional_message: '' });
    } catch (err: any) {
      setSubmitStatus({ type: 'error', text: err.message || 'Failed to submit. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <WebsiteNavbar />

      {/* Hero */}
      <div className="relative h-56 bg-gradient-to-br from-blue-700 via-indigo-600 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <img
          src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop"
          alt="Property"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center text-white">
          <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors w-fit">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-2">List Your Property</h1>
          <p className="text-white/80">Reach thousands of verified students — completely free</p>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { icon: '🆓', label: 'Free Listing', sub: 'No charges ever' },
              { icon: '👥', label: '50,000+ Students', sub: 'Active on platform' },
              { icon: '⚡', label: 'Fast Review', sub: 'Live within 24hrs' },
            ].map((b) => (
              <div key={b.label} className="p-3">
                <div className="text-2xl mb-1">{b.icon}</div>
                <p className="font-semibold text-gray-900 text-sm">{b.label}</p>
                <p className="text-xs text-gray-500">{b.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {submitStatus && (
          <div className={`mb-6 rounded-2xl p-5 flex items-start gap-4 border ${
            submitStatus.type === 'success'
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}>
            {submitStatus.type === 'success' ? (
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className={`font-semibold ${submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                {submitStatus.type === 'success' ? 'Submitted Successfully!' : 'Submission Failed'}
              </p>
              <p className={`text-sm mt-1 ${submitStatus.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                {submitStatus.text}
              </p>
            </div>
            <button onClick={() => setSubmitStatus(null)}>
              <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 pb-4 border-b border-gray-100">Property Details</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name *</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Name *</label>
              <input
                name="property_name"
                value={formData.property_name}
                onChange={handleChange}
                placeholder="e.g. Sunrise PG"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select city</option>
                {cityOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State / Country *</label>
              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="e.g. Rajasthan, India"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name *</label>
              <input
                name="contact_name"
                value={formData.contact_name}
                onChange={handleChange}
                placeholder="Contact person name"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tenants Currently Managed</label>
              <input
                name="tenants_managed"
                type="number"
                value={formData.tenants_managed}
                onChange={handleChange}
                placeholder="e.g. 20"
                min="0"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Message</label>
            <textarea
              name="additional_message"
              value={formData.additional_message}
              onChange={handleChange}
              placeholder="Tell us more about your property, amenities, pricing, etc..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-xl font-bold text-base transition-colors shadow-md"
          >
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                List My Property Free
              </>
            )}
          </button>

          <p className="text-xs text-center text-gray-400">
            By submitting, you agree to our terms. No hidden fees, ever.
          </p>
        </form>
      </div>

      <WebsiteFooter />
    </div>
  );
}
