import React, { useState } from 'react';
import { useTemplates } from './hooks/useTemplates.js';
import ChannelTabs from './components/ChannelTabs.jsx';
import TemplateList from './components/TemplateList.jsx';
import TemplateForm from './components/TemplateForm.jsx';
import TemplatePreview from './preview/TemplatePreview.jsx';

const Templates = () => {
  const {
    templates,
    loading,
    error,
    filters,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    setFilters,
    clearError,
    setPreviewTemplate,
    clearPreviewTemplate,
    previewTemplate,
    previewMode
  } = useTemplates();

  const [activeTab, setActiveTab] = useState('whatsapp');
  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);

  React.useEffect(() => {
    if (error) { alert(error); clearError(); }
  }, [error, clearError]);

  const handleAddTemplate = async (templateData) => {
    const result = await addTemplate(templateData);
    if (result.success) setShowTemplateForm(false);
  };

  const handleEditTemplate = async (templateData) => {
    const result = await updateTemplate(editingTemplate.id, templateData);
    if (result.success) { setEditingTemplate(null); setShowTemplateForm(false); }
  };

  const handleDeleteTemplate = async (templateId) => {
    const result = await deleteTemplate(templateId);
    if (!result.success) alert(result.error);
  };

  const openTemplateForm = (template = null) => {
    setEditingTemplate(template);
    setShowTemplateForm(true);
  };

  const filteredTemplates = templates.filter(template => template.channel === activeTab);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Templates</h1>
        <p className="text-slate-600 dark:text-slate-400">Create and manage templates for WhatsApp, SMS, and Email communications.</p>
      </div>

      <ChannelTabs templates={templates} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mb-8">
        <TemplateList
          templates={filteredTemplates}
          loading={loading}
          onEdit={openTemplateForm}
          onDelete={handleDeleteTemplate}
          onCreate={() => openTemplateForm()}
          onPreview={setPreviewTemplate}
          filters={filters}
          onFiltersChange={setFilters}
        />
      </div>

      {showTemplateForm && (
        <TemplateForm
          template={editingTemplate}
          onSave={editingTemplate ? handleEditTemplate : handleAddTemplate}
          onCancel={() => setShowTemplateForm(false)}
          loading={loading}
        />
      )}

      {previewTemplate && (
        <TemplatePreview
          template={previewTemplate}
          mode={previewMode}
          onBack={clearPreviewTemplate}
          onSave={async (template) => {
            if (editingTemplate) await handleEditTemplate(template);
            else await handleAddTemplate(template);
            clearPreviewTemplate();
          }}
        />
      )}
    </div>
  );
};

export default Templates;
