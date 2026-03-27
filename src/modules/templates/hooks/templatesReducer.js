import { TEMPLATE_CHANNELS, APPROVAL_STATUS } from '../utils/constants.js';

export const TEMPLATES_ACTION_TYPES = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_TEMPLATES: 'SET_TEMPLATES',
  ADD_TEMPLATE: 'ADD_TEMPLATE',
  UPDATE_TEMPLATE: 'UPDATE_TEMPLATE',
  DELETE_TEMPLATE: 'DELETE_TEMPLATE',
  SET_TEMPLATE_STATUS: 'SET_TEMPLATE_STATUS',
  SET_TEMPLATE_IN_USE: 'SET_TEMPLATE_IN_USE',
  SET_FILTERS: 'SET_FILTERS',
  SET_PREVIEW_TEMPLATE: 'SET_PREVIEW_TEMPLATE',
  CLEAR_PREVIEW_TEMPLATE: 'CLEAR_PREVIEW_TEMPLATE'
};

// No mock templates - start with empty array
const mockTemplates = [];

export const initialTemplatesState = {
  templates: mockTemplates,
  loading: false,
  error: null,
  filters: { channel: 'all', status: 'all', provider: 'all' },
  previewTemplate: null,
  previewMode: 'readonly'
};

export const templatesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING': return { ...state, loading: action.payload };
    case 'SET_ERROR': return { ...state, error: action.payload, loading: false };
    case 'SET_TEMPLATES': return { ...state, templates: action.payload, loading: false, error: null };
    case 'ADD_TEMPLATE': return { ...state, templates: [...state.templates, { ...action.payload, id: `template-${Date.now()}`, createdAt: Date.now(), updatedAt: Date.now(), inUse: false }], loading: false, error: null };
    case 'UPDATE_TEMPLATE': return { ...state, templates: state.templates.map(t => t.id === action.payload.id ? { ...action.payload, updatedAt: Date.now() } : t), loading: false, error: null };
    case 'DELETE_TEMPLATE': return { ...state, templates: state.templates.filter(t => t.id !== action.payload), loading: false, error: null };
    case 'SET_TEMPLATE_STATUS': return { ...state, templates: state.templates.map(t => t.id === action.payload.templateId ? { ...t, status: action.payload.status, updatedAt: Date.now() } : t), loading: false, error: null };
    case 'SET_TEMPLATE_IN_USE': return { ...state, templates: state.templates.map(t => t.id === action.payload.templateId ? { ...t, inUse: action.payload.inUse } : t) };
    case 'SET_FILTERS': return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_PREVIEW_TEMPLATE': return { ...state, previewTemplate: action.payload.template, previewMode: action.payload.mode || 'readonly' };
    case 'CLEAR_PREVIEW_TEMPLATE': return { ...state, previewTemplate: null, previewMode: 'readonly' };
    default: return state;
  }
};
