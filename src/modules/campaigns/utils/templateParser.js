import { PLACEHOLDERS } from '../../templates/utils/constants.js';

export const extractPlaceholders = (content) => {
  if (!content) return [];
  
  const regex = /\{\{([^}]+)\}\}/g;
  const matches = content.match(regex) || [];
  
  return matches
    .map(match => match.replace(/[{}]/g, '').trim())
    .filter(placeholder => 
      !Object.values(PLACEHOLDERS).includes(placeholder)
    );
};

export const replacePlaceholders = (content, variables = {}) => {
  if (!content) return '';
  
  let result = content;
  
  // Replace standard placeholders with mock values
  const mockValues = {
    [PLACEHOLDERS.USER_NAME]: 'John Doe',
    [PLACEHOLDERS.PHONE_NUMBER]: '+1234567890',
    [PLACEHOLDERS.EMAIL_ID]: 'john@example.com'
  };
  
  Object.entries(mockValues).forEach(([key, value]) => {
    result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
  });
  
  // Replace dynamic variables
  Object.entries(variables).forEach(([key, value]) => {
    result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
  });
  
  return result;
};
