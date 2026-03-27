import { useReducer } from 'react';
import { TEMPLATE_CHANNELS, APPROVAL_STATUS, INITIAL_TEMPLATE_STATE } from '../utils/constants.js';
import { templatesReducer, initialTemplatesState, TEMPLATES_ACTION_TYPES } from './templatesReducer.js';

export const useTemplates = () => {
  const [state, dispatch] = useReducer(templatesReducer, initialTemplatesState);

  const addTemplate = async (templateData) => {
    dispatch({ type: TEMPLATES_ACTION_TYPES.SET_LOADING, payload: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    dispatch({ type: TEMPLATES_ACTION_TYPES.ADD_TEMPLATE, payload: templateData });
    if (templateData.channel === TEMPLATE_CHANNELS.WHATSAPP) {
      setTimeout(() => {
        const randomStatus = Math.random() > 0.3 ? APPROVAL_STATUS.APPROVED : APPROVAL_STATUS.REJECTED;
        dispatch({ type: TEMPLATES_ACTION_TYPES.SET_TEMPLATE_STATUS, payload: { templateId: `template-${Date.now() - 500}`, status: randomStatus } });
      }, 2000);
    }
    return { success: true };
  };

  const updateTemplate = async (templateId, templateData) => {
    dispatch({ type: TEMPLATES_ACTION_TYPES.SET_LOADING, payload: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    dispatch({ type: TEMPLATES_ACTION_TYPES.UPDATE_TEMPLATE, payload: { ...templateData, id: templateId } });
    return { success: true };
  };

  const deleteTemplate = async (templateId) => {
    const template = state.templates.find(t => t.id === templateId);
    if (template?.inUse) return { success: false, error: 'Cannot delete template in use' };
    dispatch({ type: TEMPLATES_ACTION_TYPES.SET_LOADING, payload: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    dispatch({ type: TEMPLATES_ACTION_TYPES.DELETE_TEMPLATE, payload: templateId });
    return { success: true };
  };

  const setTemplateStatus = async (templateId, status) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    dispatch({ type: TEMPLATES_ACTION_TYPES.SET_TEMPLATE_STATUS, payload: { templateId, status } });
    return { success: true };
  };

  const setTemplateInUse = (templateId, inUse) => dispatch({ type: TEMPLATES_ACTION_TYPES.SET_TEMPLATE_IN_USE, payload: { templateId, inUse } });
  const setFilters = (filters) => dispatch({ type: TEMPLATES_ACTION_TYPES.SET_FILTERS, payload: filters });
  const clearError = () => dispatch({ type: TEMPLATES_ACTION_TYPES.SET_ERROR, payload: null });
  const setPreviewTemplate = (template, mode = 'readonly') => dispatch({ type: TEMPLATES_ACTION_TYPES.SET_PREVIEW_TEMPLATE, payload: { template, mode } });
  const clearPreviewTemplate = () => dispatch({ type: TEMPLATES_ACTION_TYPES.CLEAR_PREVIEW_TEMPLATE });

  const getFilteredTemplates = () => {
    let filtered = state.templates;
    if (state.filters.channel !== 'all') filtered = filtered.filter(t => t.channel === state.filters.channel);
    if (state.filters.status !== 'all') filtered = filtered.filter(t => t.channel === TEMPLATE_CHANNELS.WHATSAPP && t.status === state.filters.status);
    if (state.filters.provider !== 'all') filtered = filtered.filter(t => t.channel === TEMPLATE_CHANNELS.WHATSAPP && t.provider === state.filters.provider);
    return filtered;
  };

  const getTemplatesByChannel = (channel) => state.templates.filter(t => t.channel === channel);

  return {
    ...state, addTemplate, updateTemplate, deleteTemplate, setTemplateStatus, setTemplateInUse,
    setFilters, getFilteredTemplates, getTemplatesByChannel, clearError, setPreviewTemplate, clearPreviewTemplate
  };
};
