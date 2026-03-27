import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { useTemplates } from '../../templates/hooks/useTemplates.js';
import { useCampaignForm } from '../hooks/useCampaignForm.js';
import { getRunNowTime, validateScheduleTime, validateLapseTime } from '../utils/scheduler.js';
import { CAMPAIGN_STATUS } from '../utils/constants.js';

// Import modular components
import Stepper from '../components/Stepper.jsx';
import ChannelSelector from '../components/ChannelSelector.jsx';
import TemplateSelector from '../components/TemplateSelector.jsx';
import VariableInput from '../components/VariableInput.jsx';
import RecipientSelector from '../components/RecipientSelector.jsx';
import TemplatePreview from '../components/TemplatePreview.jsx';
import ScheduleOptions from '../components/ScheduleOptions.jsx';
import CampaignSummary from '../components/CampaignSummary.jsx';

const CreateCampaignEnhanced = ({ campaign = null, onSave, onCancel, loading = false }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { 
    formData, 
    errors, 
    dynamicPlaceholders,
    updateFormData,
    validateStep,
    updateTemplate,
    updateVariable,
    toggleContactSelection,
    toggleGroupSelection,
    setErrors
  } = useCampaignForm(campaign);

  const { templates } = useTemplates();
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const steps = [
    { title: 'Channel', description: 'Choose communication channel' },
    { title: 'Template', description: 'Pick message template' },
    { title: 'Details', description: 'Name & variables' },
    { title: 'Recipients', description: 'Select target audience' },
    { title: 'Schedule', description: 'Review & schedule' }
  ];

  useEffect(() => {
    if (formData.runNow && !formData.scheduleTime) {
      updateFormData('scheduleTime', getRunNowTime());
    }
  }, [formData.runNow]);

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all steps
    let isValid = true;
    for (let i = 0; i <= currentStep; i++) {
      if (!validateStep(i)) {
        isValid = false;
        break;
      }
    }

    if (!isValid) return;

    // Additional schedule validation
    if (!validateScheduleTime(formData.scheduleTime)) {
      setErrors(prev => ({ ...prev, scheduleTime: 'Schedule time must be in the future' }));
      return;
    }

    if (!validateLapseTime(formData.scheduleTime, formData.lapseTime)) {
      setErrors(prev => ({ ...prev, lapseTime: 'Lapse time must be after schedule time' }));
      return;
    }

    await onSave({
      ...formData,
      status: CAMPAIGN_STATUS.SCHEDULED
    });
  };

  const handleTemplateSelect = (templateId) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      updateTemplate(templateId, template.content);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <ChannelSelector
            selectedChannel={formData.channel}
            onChannelSelect={(channel) => updateFormData('channel', channel)}
            error={errors.channel}
          />
        );

      case 1:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <TemplateSelector
                templates={templates}
                selectedTemplateId={formData.templateId}
                onTemplateSelect={handleTemplateSelect}
                error={errors.templateId}
                selectedChannel={formData.channel}
              />
            </div>
            {selectedTemplate && (
              <div>
                <TemplatePreview
                  template={selectedTemplate}
                  variables={formData.variables}
                  channel={formData.channel}
                />
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Campaign Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                placeholder="Enter campaign name"
                className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 ${
                  errors.name ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
            </div>
            
            <VariableInput
              variables={formData.variables}
              dynamicPlaceholders={dynamicPlaceholders}
              onVariableChange={updateVariable}
            />
          </div>
        );

      case 3:
        return (
          <RecipientSelector
            selectedContacts={formData.selectedContacts}
            selectedGroups={formData.selectedGroups}
            selectAllContacts={formData.selectAllContacts}
            selectAllGroups={formData.selectAllGroups}
            onToggleSelectAllContacts={(value) => updateFormData('selectAllContacts', value)}
            onToggleSelectAllGroups={(value) => updateFormData('selectAllGroups', value)}
            onContactSelect={toggleContactSelection}
            onGroupSelect={toggleGroupSelection}
            onContactRemove={toggleContactSelection}
            onGroupRemove={toggleGroupSelection}
            error={errors.recipients}
          />
        );

      case 4:
        return (
          <div className="space-y-6">
            <ScheduleOptions
              runNow={formData.runNow}
              scheduleTime={formData.scheduleTime}
              lapseTime={formData.lapseTime}
              onRunNowChange={(value) => updateFormData('runNow', value)}
              onScheduleTimeChange={(value) => updateFormData('scheduleTime', value)}
              onLapseTimeChange={(value) => updateFormData('lapseTime', value)}
              errors={errors}
            />
            
            <CampaignSummary
              formData={formData}
              selectedTemplate={selectedTemplate}
              errors={errors}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl mx-4 max-h-[90vh] flex flex-col border border-slate-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 flex-shrink-0">
          <h2 className="text-xl font-semibold text-slate-900">
            {campaign ? 'Edit Campaign' : 'Create New Campaign'}
          </h2>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <Stepper currentStep={currentStep} steps={steps} />
          
          <div className="min-h-[400px] mt-8">
            {renderStepContent()}
          </div>
        </div>

        <div className="flex justify-between p-6 border-t border-slate-200 flex-shrink-0">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center px-4 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          <div className="flex items-center space-x-3">
            {currentStep === steps.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-slate-700 text-white rounded-xl hover:bg-slate-800 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Schedule Campaign
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center px-4 py-2 bg-slate-700 text-white rounded-xl hover:bg-slate-800"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignEnhanced;
