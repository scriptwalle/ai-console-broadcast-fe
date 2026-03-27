import React from 'react';
import { MessageSquare, Mail, Smartphone } from 'lucide-react';
import { CAMPAIGN_CHANNELS } from '../utils/constants.js';
import { replacePlaceholders } from '../utils/templateParser.js';

const TemplatePreview = ({ template, variables = {}, channel }) => {
  if (!template) return null;

  const processedContent = replacePlaceholders(template.content, variables);

  const renderWhatsAppPreview = () => (
    <div className="bg-slate-50 rounded-lg p-4 max-w-sm">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center">
          <Smartphone className="w-4 h-4 text-slate-600" />
        </div>
        <div className="flex-1">
          <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm">
            <div className="text-sm text-slate-800 whitespace-pre-wrap">
              {processedContent}
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-1">Delivered</div>
        </div>
      </div>
    </div>
  );

  const renderSMSPreview = () => (
    <div className="bg-slate-100 rounded-lg p-4 max-w-sm">
      <div className="flex items-center space-x-2 mb-2">
        <MessageSquare className="w-4 h-4 text-slate-600" />
        <span className="text-sm font-medium text-slate-700">SMS Message</span>
      </div>
      <div className="bg-white rounded-lg p-3 shadow-sm">
        <div className="text-sm text-slate-800 whitespace-pre-wrap">
          {processedContent}
        </div>
      </div>
      <div className="text-xs text-slate-500 mt-2">
        {processedContent.length}/160 characters
      </div>
    </div>
  );

  const renderEmailPreview = () => (
    <div className="bg-white border border-slate-200 rounded-lg max-w-lg">
      <div className="border-b border-slate-200 p-4">
        <div className="flex items-center space-x-2">
          <Mail className="w-4 h-4 text-slate-600" />
          <span className="text-sm font-medium text-slate-700">Email Preview</span>
        </div>
      </div>
      <div className="p-4">
        <div className="text-sm font-medium text-slate-900 mb-2">
          {template.subject || 'No Subject'}
        </div>
        <div className="text-sm text-slate-800 whitespace-pre-wrap border-t border-slate-100 pt-3">
          {processedContent}
        </div>
      </div>
    </div>
  );

  const renderPreview = () => {
    switch (channel) {
      case CAMPAIGN_CHANNELS.WHATSAPP:
        return renderWhatsAppPreview();
      case CAMPAIGN_CHANNELS.SMS:
        return renderSMSPreview();
      case CAMPAIGN_CHANNELS.EMAIL:
        return renderEmailPreview();
      default:
        return <div className="text-slate-500">Preview not available</div>;
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-md font-semibold text-slate-700">Template Preview</h4>
      {renderPreview()}
    </div>
  );
};

export default TemplatePreview;
