import { VALIDATION_RULES, ERROR_MESSAGES } from './constants.js';
import { validateInternationalPhone } from '../../../utils/countries.js';

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};

export const validateField = (value, rules) => {
  const errors = [];

  for (const rule of rules) {
    switch (rule) {
      case VALIDATION_RULES.REQUIRED:
        if (!value || value.trim() === '') {
          errors.push(ERROR_MESSAGES.REQUIRED);
        }
        break;
      case VALIDATION_RULES.EMAIL:
        if (value && !validateEmail(value)) {
          errors.push(ERROR_MESSAGES.EMAIL);
        }
        break;
      case VALIDATION_RULES.PHONE_10_DIGITS:
        if (value && !validatePhone(value)) {
          errors.push(ERROR_MESSAGES.PHONE_10_DIGITS);
        }
        break;
      case VALIDATION_RULES.WHATSAPP_10_DIGITS:
        if (value && !validatePhone(value)) {
          errors.push(ERROR_MESSAGES.WHATSAPP_10_DIGITS);
        }
        break;
    }
  }

  return errors;
};

// New validation for international phone fields
export const validateInternationalPhoneField = (phoneData, fieldName = 'Phone') => {
  const errors = [];
  
  if (!phoneData || !phoneData.countryCode) {
    errors.push(`${fieldName} country code is required`);
  }
  
  if (!phoneData || !phoneData.number) {
    errors.push(`${fieldName} number is required`);
  } else if (!validateInternationalPhone(phoneData.countryCode, phoneData.number)) {
    const countryCode = phoneData.countryCode;
    // Get expected length for this country
    const countryLength = getExpectedPhoneLength(countryCode);
    errors.push(`${fieldName} must be ${countryLength} digits for ${countryCode}`);
  }
  
  return errors;
};

// Helper to get expected phone length for a country
const getExpectedPhoneLength = (countryCode) => {
  const lengths = {
    '+1': 10, '+44': 10, '+91': 10, '+86': 11, '+49': '10-11', '+33': 9,
    '+81': 11, '+82': 11, '+61': 9, '+55': 11, '+52': 10, '+39': 10,
    '+34': 9, '+7': 10, '+27': 9, '+20': 10, '+234': 11, '+254': 10,
    '+65': 8, '+60': 10, '+66': 9, '+62': 11, '+63': 10, '+84': 9,
    '+852': 8, '+853': 8, '+886': 9, '+90': 10, '+972': 9, '+971': 9,
    '+966': 9, '+968': 8, '+973': 8, '+974': 8, '+965': 8
  };
  return lengths[countryCode] || 'valid';
};

export const validateContact = (contact) => {
  const errors = {};

  errors.name = validateField(contact.name, [VALIDATION_RULES.REQUIRED]);
  errors.email = validateField(contact.email, [VALIDATION_RULES.REQUIRED, VALIDATION_RULES.EMAIL]);
  
  // Handle international phone validation
  if (contact.phone && typeof contact.phone === 'object') {
    errors.phone = validateInternationalPhoneField(contact.phone, 'Phone');
  } else {
    // Fallback to old validation for backward compatibility
    errors.phone = validateField(contact.phone, [VALIDATION_RULES.PHONE_10_DIGITS]);
  }
  
  if (contact.whatsapp && typeof contact.whatsapp === 'object') {
    errors.whatsapp = validateInternationalPhoneField(contact.whatsapp, 'WhatsApp');
  } else {
    // Fallback to old validation for backward compatibility
    errors.whatsapp = validateField(contact.whatsapp, [VALIDATION_RULES.WHATSAPP_10_DIGITS]);
  }

  // Remove empty error arrays
  Object.keys(errors).forEach(key => {
    if (errors[key].length === 0) {
      delete errors[key];
    }
  });

  return errors;
};

export const validateGroup = (group, existingGroups = []) => {
  const errors = {};

  errors.name = validateField(group.name, [VALIDATION_RULES.REQUIRED]);
  
  if (group.name && existingGroups.some(g => g.toLowerCase() === group.name.toLowerCase())) {
    errors.name = [ERROR_MESSAGES.GROUP_EXISTS];
  }

  // Remove empty error arrays
  Object.keys(errors).forEach(key => {
    if (errors[key].length === 0) {
      delete errors[key];
    }
  });

  return errors;
};
