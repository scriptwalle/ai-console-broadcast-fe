export const TEMPLATE_CHANNELS = {
  WHATSAPP: 'whatsapp',
  SMS: 'sms',
  EMAIL: 'email'
};

export const WHATSAPP_PROVIDERS = {
  META: 'meta',
  COM: 'com',
  NETCORE: 'netcore'
};

export const WHATSAPP_CATEGORIES = {
  MARKETING: 'marketing',
  UTILITY: 'utility',
  AUTHENTICATION: 'authentication'
};

export const APPROVAL_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

export const PLACEHOLDERS = {
  USER_NAME: 'user_name',
  PHONE_NUMBER: 'phone_number',
  EMAIL_ID: 'email_id'
};

export const MOCK_PLACEHOLDER_DATA = {
  [PLACEHOLDERS.USER_NAME]: 'John Doe',
  [PLACEHOLDERS.PHONE_NUMBER]: '+1234567890',
  [PLACEHOLDERS.EMAIL_ID]: 'john@example.com'
};

export const WHATSAPP_PLACEHOLDER_MAPPING = {
  [PLACEHOLDERS.USER_NAME]: '1',
  [PLACEHOLDERS.PHONE_NUMBER]: '2',
  [PLACEHOLDERS.EMAIL_ID]: '3'
};

export const VALIDATION_RULES = {
  TEMPLATE_NAME: {
    required: true,
    minLength: 3,
    maxLength: 100
  },
  WHATSAPP_BODY: {
    required: true,
    maxLength: 1024
  },
  SMS_BODY: {
    required: true,
    maxLength: 160
  },
  EMAIL_SUBJECT: {
    required: true,
    maxLength: 200
  },
  EMAIL_BODY: {
    required: true,
    minLength: 10
  }
};

export const MEDIA_TYPES = {
  IMAGE: {
    mime: ['image/jpeg', 'image/png', 'image/gif'],
    maxSize: 5 * 1024 * 1024, // 5MB
    extensions: ['.jpg', '.jpeg', '.png', '.gif']
  },
  DOCUMENT: {
    mime: ['application/pdf', 'text/plain', 'application/msword'],
    maxSize: 10 * 1024 * 1024, // 10MB
    extensions: ['.pdf', '.txt', '.doc', '.docx']
  }
};

export const INITIAL_TEMPLATE_STATE = {
  name: '',
  channel: TEMPLATE_CHANNELS.WHATSAPP,
  content: '',
  status: APPROVAL_STATUS.PENDING,
  provider: WHATSAPP_PROVIDERS.META,
  category: WHATSAPP_CATEGORIES.UTILITY,
  media: null,
  subject: '',
  attachments: []
};
