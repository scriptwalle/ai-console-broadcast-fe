import React, { useState, useEffect } from 'react';
import { X, Save, User, Mail } from 'lucide-react';
import { validateContact } from '../utils/validation.js';
import { INITIAL_CONTACT_STATE } from '../utils/constants.js';
import PhoneInput from '../../../components/PhoneInput.jsx';

const FormField = ({ icon: Icon, label, name, type = 'text', value, onChange, error, maxLength, placeholder }) => (
  <div>
    <label className="flex items-center text-sm font-medium text-slate-700 mb-1"><Icon className="w-4 h-4 mr-1" />{label}</label>
    <input type={type} name={name} value={value} onChange={onChange} maxLength={maxLength} placeholder={placeholder} className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-slate-100 ${error ? 'border-red-500' : 'border-slate-300'}`} />
    {error && <p className="mt-1 text-sm text-red-600">{error[0]}</p>}
  </div>
);

const ContactForm = ({ contact = null, onSave, onCancel, loading = false }) => {
  // Map API fields to form fields
  const mapApiToForm = (apiContact) => {
    if (!apiContact) return INITIAL_CONTACT_STATE;
    
    // Combine first_name and last_name for full name display
    const fullName = [apiContact.first_name, apiContact.last_name]
      .filter(Boolean)
      .join(' ');
    
    return {
      name: fullName,
      email: apiContact.email || '',
      phone: {
        countryCode: apiContact.phone_country_code || '+91',
        number: apiContact.phone_number || ''
      },
      whatsapp: {
        countryCode: apiContact.whatsapp_country_code || '+91', 
        number: apiContact.whatsapp_number || ''
      },
      groups: apiContact.list || apiContact.groups || []
    };
  };

  // Map form fields back to API fields
  const mapFormToApi = (formData) => {
    // Split full name into first and last name
    const nameParts = formData.name.trim().split(' ');
    const first_name = nameParts[0] || '';
    const last_name = nameParts.slice(1).join(' ') || ' '; // Use space if no last name to avoid validation error
    
    // Combine phone fields into full international format
    const fullPhone = formData.phone && formData.phone.countryCode && formData.phone.number 
      ? `${formData.phone.countryCode}${formData.phone.number.replace(/\s/g, '')}` 
      : '';
    
    const fullWhatsApp = formData.whatsapp && formData.whatsapp.countryCode && formData.whatsapp.number 
      ? `${formData.whatsapp.countryCode}${formData.whatsapp.number.replace(/\s/g, '')}` 
      : '';
    
    return {
      first_name,
      last_name: last_name,
      email: formData.email,
      phone: fullPhone,
      whatsapp_number: fullWhatsApp,
      company_id: formData.company_id || localStorage.getItem('companyId') || '',
      group_id: formData.group_id || localStorage.getItem('groupId') || '',
      list: formData.groups || [] // Groups the contact belongs to (sent to API as list)
    };
  };

  const [formData, setFormData] = useState(mapApiToForm(contact));
  const [errors, setErrors] = useState({});

  useEffect(() => { 
    setFormData(mapApiToForm(contact)); 
    setErrors({}); 
  }, [contact]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateContact(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      const apiData = mapFormToApi(formData);
      if (contact && contact.id) {
        apiData.id = contact.id;
      }
      await onSave(apiData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-md mx-4 border border-slate-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold">{contact ? 'Edit Contact' : 'Add New Contact'}</h2>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <FormField icon={User} label="Full Name *" name="name" value={formData.name} onChange={handleInputChange} error={errors.name} placeholder="John Doe" />
          <FormField icon={Mail} label="Email *" name="email" type="email" value={formData.email} onChange={handleInputChange} error={errors.email} placeholder="john@example.com" />
          
          <PhoneInput
            value={formData.phone}
            onChange={(value) => handleInputChange({ target: { name: 'phone', value } })}
            error={errors.phone ? errors.phone[0] : ''}
            label="Phone *"
            placeholder="Enter phone number"
            disabled={loading}
            required={true}
          />
          
          <PhoneInput
            value={formData.whatsapp}
            onChange={(value) => handleInputChange({ target: { name: 'whatsapp', value } })}
            error={errors.whatsapp ? errors.whatsapp[0] : ''}
            label="WhatsApp"
            placeholder="Enter WhatsApp number"
            disabled={loading}
            required={false}
          />
          
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onCancel} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-xl">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-slate-700 text-white rounded-xl disabled:opacity-50 flex items-center">
              {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />}
              <Save className="w-4 h-4 mr-2" />{contact ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
