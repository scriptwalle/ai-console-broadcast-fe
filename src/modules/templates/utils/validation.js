import { VALIDATION_RULES, TEMPLATE_CHANNELS } from './constants.js';

export const validateTemplate = (template) => {
  const errors = {};

  // Template name validation
  if (!template.name || template.name.trim() === '') {
    errors.name = 'Template name is required';
  } else if (template.name.length < VALIDATION_RULES.TEMPLATE_NAME.minLength) {
    errors.name = `Template name must be at least ${VALIDATION_RULES.TEMPLATE_NAME.minLength} characters`;
  } else if (template.name.length > VALIDATION_RULES.TEMPLATE_NAME.maxLength) {
    errors.name = `Template name must not exceed ${VALIDATION_RULES.TEMPLATE_NAME.maxLength} characters`;
  }

  // Channel-specific validation
  switch (template.channel) {
    case TEMPLATE_CHANNELS.WHATSAPP:
      if (!template.content || template.content.trim() === '') {
        errors.content = 'Message body is required';
      } else if (template.content.length > VALIDATION_RULES.WHATSAPP_BODY.maxLength) {
        errors.content = `Message body must not exceed ${VALIDATION_RULES.WHATSAPP_BODY.maxLength} characters`;
      }
      
      if (!template.provider) {
        errors.provider = 'Provider is required';
      }
      
      if (!template.category) {
        errors.category = 'Category is required';
      }
      break;

    case TEMPLATE_CHANNELS.SMS:
      if (!template.content || template.content.trim() === '') {
        errors.content = 'Message body is required';
      } else if (template.content.length > VALIDATION_RULES.SMS_BODY.maxLength) {
        errors.content = `Message body must not exceed ${VALIDATION_RULES.SMS_BODY.maxLength} characters`;
      }
      break;

    case TEMPLATE_CHANNELS.EMAIL:
      if (!template.subject || template.subject.trim() === '') {
        errors.subject = 'Subject is required';
      } else if (template.subject.length > VALIDATION_RULES.EMAIL_SUBJECT.maxLength) {
        errors.subject = `Subject must not exceed ${VALIDATION_RULES.EMAIL_SUBJECT.maxLength} characters`;
      }
      
      if (!template.content || template.content.trim() === '') {
        errors.content = 'Email body is required';
      } else if (template.content.length < VALIDATION_RULES.EMAIL_BODY.minLength) {
        errors.content = `Email body must be at least ${VALIDATION_RULES.EMAIL_BODY.minLength} characters`;
      }
      break;
  }

  return errors;
};

export const validateMediaFile = (file, channel) => {
  const errors = [];

  if (!file) {
    return errors;
  }

  // Check file size (5MB for images, 10MB for documents)
  const maxSize = file.type.startsWith('image/') ? 5 * 1024 * 1024 : 10 * 1024 * 1024;
  if (file.size > maxSize) {
    errors.push(`File size must not exceed ${maxSize / (1024 * 1024)}MB`);
  }

  // Check file type
  const allowedTypes = [
    'image/jpeg', 'image/png', 'image/gif',
    'application/pdf', 'text/plain', 'application/msword'
  ];
  
  if (!allowedTypes.includes(file.type)) {
    errors.push('Invalid file type. Allowed types: JPG, PNG, GIF, PDF, TXT, DOC');
  }

  return errors;
};

export const extractPlaceholders = (content) => {
  const placeholderRegex = /\{\{(\w+)\}\}/g;
  const placeholders = [];
  let match;

  while ((match = placeholderRegex.exec(content)) !== null) {
    if (!placeholders.includes(match[1])) {
      placeholders.push(match[1]);
    }
  }

  return placeholders;
};
