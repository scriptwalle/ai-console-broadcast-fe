import React from 'react';
import { TEMPLATE_STATUS } from '../utils/constants.js';

const TemplateSelector = ({ 
  templates, 
  selectedTemplateId, 
  onTemplateSelect, 
  error,
  selectedChannel 
}) => {
  const filteredTemplates = templates.filter(template => {
    const matchesChannel = !selectedChannel || template.channel === selectedChannel;
    const hasValidStatus = [
      TEMPLATE_STATUS.APPROVED, 
      TEMPLATE_STATUS.ACTIVE
    ].includes(template.status);
    
    return matchesChannel && hasValidStatus;
  });

  if (filteredTemplates.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">Select Template</h3>
        <div className="text-center py-8 text-slate-500">
          <p>No approved templates available for {selectedChannel || 'selected channel'}.</p>
          <p className="text-sm mt-2">Please create and approve a template first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Select Template</h3>
      <div className="space-y-3">
        {filteredTemplates.map(template => (
          <button
            key={template.id}
            onClick={() => onTemplateSelect(template.id, template.content)}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
              selectedTemplateId === template.id
                ? 'border-slate-700 bg-slate-50'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="font-medium">{template.name}</div>
                <div className="text-sm text-slate-600 capitalize">{template.channel}</div>
                <div className="text-sm text-slate-500 mt-1 line-clamp-2">
                  {template.content.substring(0, 100)}...
                </div>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 ml-4 ${
                selectedTemplateId === template.id
                  ? 'bg-slate-700 border-slate-700'
                  : 'border-slate-300'
              }`}>
                {selectedTemplateId === template.id && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default TemplateSelector;
