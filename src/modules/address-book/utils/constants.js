export const VALIDATION_RULES = {
  REQUIRED: 'required',
  EMAIL: 'email',
  PHONE_10_DIGITS: 'phone_10_digits',
  WHATSAPP_10_DIGITS: 'whatsapp_10_digits'
};

export const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL: 'Please enter a valid email address',
  PHONE_10_DIGITS: 'Phone number must be exactly 10 digits',
  WHATSAPP_10_DIGITS: 'WhatsApp number must be exactly 10 digits',
  GROUP_EXISTS: 'A group with this name already exists'
};

export const CSV_HEADERS = ['name', 'email', 'phone', 'whatsapp', 'group'];

export const INITIAL_CONTACT_STATE = {
  name: '',
  email: '',
  phone: {
    countryCode: '+91',
    number: ''
  },
  whatsapp: {
    countryCode: '+91',
    number: ''
  },
  groups: []
};

export const INITIAL_GROUP_STATE = {
  name: ''
};
