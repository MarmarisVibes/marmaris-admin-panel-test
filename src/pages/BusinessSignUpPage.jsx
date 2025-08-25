import { useState } from 'react';
import axios from 'axios';

const BusinessSignUpPage = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    businessType: '',
    venueTypes: [],
    proposedActivities: []
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.businessName) newErrors.businessName = 'Business name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.contactPerson) newErrors.contactPerson = 'Contact person is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      await axios.post('https://marmaris-admin-panel.onrender.com/api/signups', {
        ...formData,
        status: 'pending',
        submissionDate: new Date().toISOString().split('T')[0],
        documents: []
      });
      setSuccess(true);
      setFormData({
        businessName: '',
        contactPerson: '',
        email: '',
        phone: '',
        businessType: '',
        venueTypes: [],
        proposedActivities: []
      });
    } catch (err) {
      alert('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-green-600">Thank You!</h2>
        <p>Your application has been submitted. We'll review it and contact you soon.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Business Sign-Up</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label>Business Name *</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {errors.businessName && <p className="text-red-500">{errors.businessName}</p>}
        </div>

        <div>
          <label>Contact Person *</label>
          <input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {errors.contactPerson && <p className="text-red-500">{errors.contactPerson}</p>}
        </div>

        <div>
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label>Phone *</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}
        </div>

        <div>
          <label>Business Type</label>
          <select
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">Select Type</option>
            <option value="hotel">Hotel</option>
            <option value="restaurant">Restaurant</option>
            <option value="activity">Activity</option>
            <option value="shop">Shop</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default BusinessSignUpPage;