import React, { useState, useEffect } from 'react';
import { Save, User, Mail } from 'lucide-react';
import { validateContact } from '../utils/validation.js';
import { INITIAL_CONTACT_STATE } from '../utils/constants.js';
import PhoneInput from '../../../components/PhoneInput.jsx';
import { Modal, Input, Button } from '../../../components/common';

const ContactForm = ({ contact = null, onSave, onCancel, loading = false, serverErrors = {} }) => {
  // Helper function to parse phone number
  const parsePhoneNumber = (phone) => {
    if (!phone) return { countryCode: '+91', number: '' };

    // If it's already an object with countryCode and number
    if (typeof phone === 'object' && phone.countryCode && phone.number) {
      return phone;
    }

    // If it's a string starting with + (international format)
    if (typeof phone === 'string' && phone.startsWith('+')) {
      // Extract country code and number using regex
      const match = phone.match(/^(\+\d{1,3})(\d+)$/);
      if (match) {
        return {
          countryCode: match[1],
          number: match[2]
        };
      }
    }

    // If it's just a number, assume default country code
    if (typeof phone === 'string' && phone.match(/^\d+$/)) {
      return {
        countryCode: '+91',
        number: phone
      };
    }

    // Default fallback
    return { countryCode: '+91', number: '' };
  };

  // Map API fields to form fields
  const mapApiToForm = (apiContact) => {
    if (!apiContact) return INITIAL_CONTACT_STATE;

    // Combine first_name and last_name for full name display
    const fullName = [apiContact.first_name, apiContact.last_name]
      .filter(Boolean)
      .join(' ');

    // Parse phone numbers from various possible formats
    const phoneData = parsePhoneNumber(apiContact.phone || apiContact.phone_number);
    const whatsappData = parsePhoneNumber(apiContact.whatsapp_number || apiContact.whatsapp);

    return {
      name: fullName,
      email: apiContact.email || '',
      phone: {
        countryCode: apiContact.phone_country_code || phoneData.countryCode,
        number: apiContact.phone_number || phoneData.number
      },
      whatsapp: {
        countryCode: apiContact.whatsapp_country_code || whatsappData.countryCode,
        number: apiContact.whatsapp_number || whatsappData.number
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

  // Merge server errors with local validation errors
  const allErrors = { ...errors, ...serverErrors };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear both local and server errors for this field when user starts typing
    if (allErrors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
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

  const actions = (
    <>
      <Button
        variant="secondary"
        onClick={onCancel}
        disabled={loading}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        form="contact-form"
        variant="primary"
        loading={loading}
        disabled={loading}
        icon={Save}
      >
        {contact ? 'Update' : 'Save'}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title={contact ? 'Edit Contact' : 'Add New Contact'}
      size="md"
      actions={actions}
    >
      <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
        <Input
          icon={User}
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          error={allErrors.name}
          placeholder="John Doe"
          required
        />

        <Input
          icon={Mail}
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={allErrors.email}
          placeholder="john@example.com"
          required
        />

        <PhoneInput
          value={formData.phone}
          onChange={(value) => handleInputChange({ target: { name: 'phone', value } })}
          error={allErrors.phone ? (Array.isArray(allErrors.phone) ? allErrors.phone[0] : allErrors.phone) : ''}
          label="Phone *"
          placeholder="Enter phone number"
          disabled={loading}
          required={true}
        />

        <PhoneInput
          value={formData.whatsapp}
          onChange={(value) => handleInputChange({ target: { name: 'whatsapp', value } })}
          error={allErrors.whatsapp ? (Array.isArray(allErrors.whatsapp) ? allErrors.whatsapp[0] : allErrors.whatsapp) : ''}
          label="WhatsApp"
          placeholder="Enter WhatsApp number"
          disabled={loading}
          required={false}
        />
      </form>
    </Modal>
  );
};

export default ContactForm;
