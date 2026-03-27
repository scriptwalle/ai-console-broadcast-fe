import { useState, useEffect } from 'react';
import { INITIAL_CAMPAIGN_STATE } from '../utils/constants.js';
import { validateCampaignForm } from '../utils/validation.js';
import { extractPlaceholders } from '../utils/templateParser.js';

export const useCampaignForm = (campaign = null) => {
  const [formData, setFormData] = useState({
    ...INITIAL_CAMPAIGN_STATE,
    name: '',
    selectedContacts: [],
    selectedGroups: [],
    selectAllContacts: false,
    selectAllGroups: false,
    variables: {},
    scheduleTime: null,
    lapseTime: null,
    runNow: true
  });

  const [errors, setErrors] = useState({});
  const [dynamicPlaceholders, setDynamicPlaceholders] = useState([]);

  useEffect(() => {
    if (campaign) {
      setFormData(prev => ({ ...prev, ...campaign }));
    }
  }, [campaign]);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step) => {
    const newErrors = validateCampaignForm(formData, step);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateTemplate = (templateId, templateContent) => {
    updateFormData('templateId', templateId);
    
    // Extract dynamic placeholders from template
    const placeholders = extractPlaceholders(templateContent);
    setDynamicPlaceholders(placeholders);
    
    // Initialize variables for new placeholders
    const newVariables = {};
    placeholders.forEach(placeholder => {
      newVariables[placeholder] = formData.variables[placeholder] || '';
    });
    
    updateFormData('variables', newVariables);
  };

  const updateVariable = (placeholder, value) => {
    setFormData(prev => ({
      ...prev,
      variables: { ...prev.variables, [placeholder]: value }
    }));
  };

  const toggleContactSelection = (contact) => {
    setFormData(prev => ({
      ...prev,
      selectedContacts: prev.selectedContacts.some(c => c.id === contact.id)
        ? prev.selectedContacts.filter(c => c.id !== contact.id)
        : [...prev.selectedContacts, contact]
    }));
  };

  const toggleGroupSelection = (group) => {
    setFormData(prev => ({
      ...prev,
      selectedGroups: prev.selectedGroups.some(g => g.id === group.id)
        ? prev.selectedGroups.filter(g => g.id !== group.id)
        : [...prev.selectedGroups, group]
    }));
  };

  return {
    formData,
    errors,
    dynamicPlaceholders,
    updateFormData,
    validateStep,
    updateTemplate,
    updateVariable,
    toggleContactSelection,
    toggleGroupSelection,
    setErrors
  };
};
