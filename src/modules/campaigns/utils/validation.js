export const validateCampaignForm = (formData, currentStep) => {
  const errors = {};
  
  switch (currentStep) {
    case 0: // Channel
      if (!formData.channel) {
        errors.channel = 'Please select a channel';
      }
      break;
      
    case 1: // Template
      if (!formData.templateId) {
        errors.templateId = 'Please select a template';
      }
      break;
      
    case 2: // Details & Variables
      if (!formData.name?.trim()) {
        errors.name = 'Campaign name is required';
      }
      if (formData.name?.length > 100) {
        errors.name = 'Campaign name must be less than 100 characters';
      }
      break;
      
    case 3: // Recipients
      const hasRecipients = formData.selectedContacts.length > 0 || 
                           formData.selectedGroups.length > 0 || 
                           formData.selectAllContacts || 
                           formData.selectAllGroups;
      
      if (!hasRecipients) {
        errors.recipients = 'Please select at least one recipient';
      }
      break;
      
    case 4: // Schedule
      if (!formData.scheduleTime) {
        errors.scheduleTime = 'Schedule time is required';
      }
      if (!formData.lapseTime) {
        errors.lapseTime = 'Lapse time is required';
      }
      break;
  }
  
  return errors;
};
