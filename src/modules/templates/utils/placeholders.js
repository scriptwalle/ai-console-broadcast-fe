import { 
  PLACEHOLDERS, 
  MOCK_PLACEHOLDER_DATA, 
  WHATSAPP_PLACEHOLDER_MAPPING,
  TEMPLATE_CHANNELS 
} from './constants.js';

export const renderPreview = (content, mockData = MOCK_PLACEHOLDER_DATA) => {
  if (!content) return '';
  
  return content.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return mockData[key] || match;
  });
};

export const convertWhatsAppPlaceholders = (content) => {
  if (!content) return '';
  
  return content.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const mappedKey = WHATSAPP_PLACEHOLDER_MAPPING[key];
    return mappedKey ? `{{${mappedKey}}}` : match;
  });
};

export const revertWhatsAppPlaceholders = (content) => {
  if (!content) return '';
  
  // Reverse mapping from {{1}} back to {{user_name}}
  const reverseMapping = Object.entries(WHATSAPP_PLACEHOLDER_MAPPING).reduce(
    (acc, [key, value]) => {
      acc[value] = key;
      return acc;
    },
    {}
  );

  return content.replace(/\{\{(\d+)\}\}/g, (match, key) => {
    const originalKey = reverseMapping[key];
    return originalKey ? `{{${originalKey}}}` : match;
  });
};

export const getPlaceholdersFromContent = (content) => {
  const placeholderRegex = /\{\{(\w+)\}\}/g;
  const placeholders = [];
  let match;

  while ((match = placeholderRegex.exec(content)) !== null) {
    const placeholder = match[1];
    if (!placeholders.includes(placeholder)) {
      placeholders.push(placeholder);
    }
  }

  return placeholders;
};

export const validatePlaceholders = (content) => {
  const placeholders = getPlaceholdersFromContent(content);
  const validPlaceholders = Object.values(PLACEHOLDERS);
  const invalidPlaceholders = placeholders.filter(p => !validPlaceholders.includes(p));
  
  return {
    valid: invalidPlaceholders.length === 0,
    placeholders,
    invalidPlaceholders,
    message: invalidPlaceholders.length > 0 
      ? `Invalid placeholders: ${invalidPlaceholders.join(', ')}`
      : 'All placeholders are valid'
  };
};

export const generateMockDataForPlaceholders = (placeholders) => {
  const mockData = {};
  
  placeholders.forEach(placeholder => {
    switch (placeholder) {
      case PLACEHOLDERS.USER_NAME:
        mockData[placeholder] = 'John Doe';
        break;
      case PLACEHOLDERS.PHONE_NUMBER:
        mockData[placeholder] = '+1234567890';
        break;
      case PLACEHOLDERS.EMAIL_ID:
        mockData[placeholder] = 'john@example.com';
        break;
      default:
        // For custom placeholders, generate a default value
        mockData[placeholder] = `[${placeholder.replace(/_/g, ' ').toUpperCase()}]`;
    }
  });
  
  return mockData;
};

export const processCustomPlaceholders = (csvData) => {
  // CSV data format: [{ phone_number: '1234567890', custom_otp: '123456' }]
  const customMappings = {};
  
  csvData.forEach((row, index) => {
    const phone = row.phone_number || row.phone;
    if (phone) {
      customMappings[phone] = row;
    }
  });
  
  return customMappings;
};

export const getChannelSpecificPlaceholders = (channel) => {
  switch (channel) {
    case TEMPLATE_CHANNELS.WHATSAPP:
      return [PLACEHOLDERS.USER_NAME, PLACEHOLDERS.PHONE_NUMBER];
    case TEMPLATE_CHANNELS.SMS:
      return [PLACEHOLDERS.USER_NAME, PLACEHOLDERS.PHONE_NUMBER];
    case TEMPLATE_CHANNELS.EMAIL:
      return [PLACEHOLDERS.USER_NAME, PLACEHOLDERS.EMAIL_ID];
    default:
      return Object.values(PLACEHOLDERS);
  }
};
