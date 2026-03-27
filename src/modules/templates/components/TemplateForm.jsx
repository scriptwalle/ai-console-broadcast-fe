import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { validateTemplate } from '../utils/validation.js';
import { 
  TEMPLATE_CHANNELS, 
  INITIAL_TEMPLATE_STATE,
  WHATSAPP_PROVIDERS,
  WHATSAPP_CATEGORIES 
} from '../utils/constants.js';

const FormInput = ({ name, label, value, onChange, error, placeholder, type = 'text' }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 ${error ? 'border-red-500' : 'border-slate-300'}`}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const FormSelect = ({ name, label, value, onChange, error, options }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 ${error ? 'border-red-500' : 'border-slate-300'}`}
    >
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const TemplateForm = ({ template = null, onSave, onCancel, loading = false }) => {
  const [formData, setFormData] = useState(template || INITIAL_TEMPLATE_STATE);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(template || INITIAL_TEMPLATE_STATE);
    setErrors({});
  }, [template]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateTemplate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) await onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto border border-slate-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">{template ? 'Edit Template' : 'Create New Template'}</h2>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput name="name" label="Template Name *" value={formData.name} onChange={handleInputChange} error={errors.name} placeholder="Welcome Message" />
            <FormSelect name="channel" label="Channel *" value={formData.channel} onChange={handleInputChange} error={errors.channel} options={[{value:TEMPLATE_CHANNELS.WHATSAPP,label:'WhatsApp'},{value:TEMPLATE_CHANNELS.SMS,label:'SMS'},{value:TEMPLATE_CHANNELS.EMAIL,label:'Email'}]} />
          </div>
          {formData.channel === TEMPLATE_CHANNELS.WHATSAPP && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelect name="provider" label="Provider *" value={formData.provider} onChange={handleInputChange} error={errors.provider} options={[{value:WHATSAPP_PROVIDERS.META,label:'Meta'},{value:WHATSAPP_PROVIDERS.COM,label:'CoM'},{value:WHATSAPP_PROVIDERS.NETCORE,label:'Netcore'}]} />
              <FormSelect name="category" label="Category *" value={formData.category} onChange={handleInputChange} error={errors.category} options={[{value:WHATSAPP_CATEGORIES.MARKETING,label:'Marketing'},{value:WHATSAPP_CATEGORIES.UTILITY,label:'Utility'},{value:WHATSAPP_CATEGORIES.AUTHENTICATION,label:'Authentication'}]} />
            </div>
          )}
          {formData.channel === TEMPLATE_CHANNELS.EMAIL && (
            <FormInput name="subject" label="Subject *" value={formData.subject} onChange={handleInputChange} error={errors.subject} placeholder="Welcome to our service" />
          )}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{formData.channel === TEMPLATE_CHANNELS.EMAIL ? 'Email Body' : 'Message Body'} *</label>
            <textarea name="content" value={formData.content} onChange={handleInputChange} rows={6} className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 ${errors.content ? 'border-red-500' : 'border-slate-300'}`} placeholder={formData.channel === TEMPLATE_CHANNELS.WHATSAPP ? 'Hello {{user_name}}, welcome!' : formData.channel === TEMPLATE_CHANNELS.SMS ? 'Hi {{user_name}}, your code is 123456.' : 'Dear {{user_name}},\n\nThank you!'} />
            {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
            <div className="mt-2 text-xs text-slate-500">Use placeholders: {'{{user_name}}'}, {'{{phone_number}}'}, {'{{email_id}}'}</div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onCancel} className="px-4 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-slate-700 text-white rounded-xl hover:bg-slate-800 disabled:opacity-50 flex items-center">
              {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
              {template ? 'Update' : 'Create'} Template
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TemplateForm;
