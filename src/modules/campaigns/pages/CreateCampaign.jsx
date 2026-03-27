import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, ArrowRight, Save, Smartphone, MessageSquare, Mail } from 'lucide-react';
import { useTemplates } from '../../templates/hooks/useTemplates.js';
import { useGroups } from '../../address-book/hooks/useGroups.js';
import { CAMPAIGN_CHANNELS } from '../utils/constants.js';
import Stepper from '../components/Stepper.jsx';

const CreateCampaign = ({ campaign = null, onSave, onCancel, loading = false }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    channel: '',
    templateId: '',
    targetGroups: []
  });
  const [errors, setErrors] = useState({});

  const { templates } = useTemplates();
  const { groups } = useGroups();

  const steps = [
    {
      title: 'Select Channel',
      description: 'Choose communication channel'
    },
    {
      title: 'Select Template',
      description: 'Pick a message template'
    },
    {
      title: 'Select Target Groups',
      description: 'Choose recipient groups'
    }
  ];

  useEffect(() => {
    if (campaign) {
      setFormData({
        name: campaign.name || '',
        channel: campaign.channel || '',
        templateId: campaign.templateId || '',
        targetGroups: campaign.targetGroups || []
      });
    }
  }, [campaign]);

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 0:
        if (!formData.channel) {
          newErrors.channel = 'Please select a channel';
        }
        break;
      case 1:
        if (!formData.templateId) {
          newErrors.templateId = 'Please select a template';
        }
        break;
      case 2:
        if (formData.targetGroups.length === 0) {
          newErrors.targetGroups = 'Please select at least one target group';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    if (validateStep(currentStep)) {
      await onSave(formData);
    }
  };

  const handleChannelSelect = (channel) => {
    setFormData(prev => ({ ...prev, channel, templateId: '', targetGroups: [] }));
    if (errors.channel) setErrors(prev => ({ ...prev, channel: undefined }));
  };

  const handleTemplateSelect = (templateId) => {
    setFormData(prev => ({ ...prev, templateId }));
    if (errors.templateId) setErrors(prev => ({ ...prev, templateId: undefined }));
  };

  const handleGroupToggle = (groupId) => {
    setFormData(prev => ({
      ...prev,
      targetGroups: prev.targetGroups.includes(groupId)
        ? prev.targetGroups.filter(id => id !== groupId)
        : [...prev.targetGroups, groupId]
    }));
    if (errors.targetGroups) setErrors(prev => ({ ...prev, targetGroups: undefined }));
  };

  const filteredTemplates = templates.filter(template => 
    formData.channel ? template.channel === formData.channel : true
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Select Communication Channel</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.values(CAMPAIGN_CHANNELS).map(channel => (
                <button
                  key={channel}
                  onClick={() => handleChannelSelect(channel)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.channel === channel
                      ? 'border-slate-700 bg-slate-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2 flex justify-center">
                      {channel === CAMPAIGN_CHANNELS.WHATSAPP && <Smartphone className="w-8 h-8 text-green-600" />}
                      {channel === CAMPAIGN_CHANNELS.SMS && <MessageSquare className="w-8 h-8 text-blue-600" />}
                      {channel === CAMPAIGN_CHANNELS.EMAIL && <Mail className="w-8 h-8 text-purple-600" />}
                    </div>
                    <div className="font-medium capitalize">{channel}</div>
                  </div>
                </button>
              ))}
            </div>
            {errors.channel && <p className="text-sm text-red-600">{errors.channel}</p>}
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Select Template</h3>
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <p>No templates available for {formData.channel || 'selected channel'}.</p>
                <p className="text-sm mt-2">Please create a template first.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTemplates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template.id)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      formData.templateId === template.id
                        ? 'border-slate-700 bg-slate-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{template.name}</div>
                        <div className="text-sm text-slate-600 capitalize">{template.channel}</div>
                        <div className="text-sm text-slate-500 mt-1 truncate">
                          {template.content.substring(0, 100)}...
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        formData.templateId === template.id
                          ? 'bg-slate-700 border-slate-700'
                          : 'border-slate-300'
                      }`}>
                        {formData.templateId === template.id && (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
            {errors.templateId && <p className="text-sm text-red-600">{errors.templateId}</p>}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Select Target Groups</h3>
            {groups.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <p>No groups available.</p>
                <p className="text-sm mt-2">Please create groups in Address Book first.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {groups.map(group => (
                  <button
                    key={group.id}
                    onClick={() => handleGroupToggle(group.id)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      formData.targetGroups.includes(group.id)
                        ? 'border-slate-700 bg-slate-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{group.name}</div>
                        <div className="text-sm text-slate-600">
                          {group.contacts?.length || 0} contacts
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        formData.targetGroups.includes(group.id)
                          ? 'bg-slate-700 border-slate-700'
                          : 'border-slate-300'
                      }`}>
                        {formData.targetGroups.includes(group.id) && (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
            {errors.targetGroups && <p className="text-sm text-red-600">{errors.targetGroups}</p>}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto border border-slate-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">
            {campaign ? 'Edit Campaign' : 'Create New Campaign'}
          </h2>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <Stepper currentStep={currentStep} steps={steps} />
          
          <div className="mb-6">
            <input
              type="text"
              placeholder="Campaign Name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>

          <div className="min-h-[300px]">
            {renderStepContent()}
          </div>
        </div>

        <div className="flex justify-between p-6 border-t border-slate-200">
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
                {campaign ? 'Update' : 'Create'} Campaign
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

export default CreateCampaign;
