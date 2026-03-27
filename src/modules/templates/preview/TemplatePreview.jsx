import React from 'react';
import { ArrowLeft, Save, Eye, X } from 'lucide-react';
import { TEMPLATE_CHANNELS } from '../utils/constants.js';
import { getChannelIcon, getChannelLabel } from '../utils/channelHelpers.jsx';
import WhatsAppPreview from './components/WhatsAppPreview.jsx';
import SMSPreview from './components/SMSPreview.jsx';
import EmailPreview from './components/EmailPreview.jsx';

const renderChannelPreview = (template) => {
  switch (template.channel) {
    case TEMPLATE_CHANNELS.WHATSAPP: return <WhatsAppPreview template={template} />;
    case TEMPLATE_CHANNELS.SMS: return <SMSPreview template={template} />;
    case TEMPLATE_CHANNELS.EMAIL: return <EmailPreview template={template} />;
    default: return <div className="text-center text-slate-500 py-8">Unknown channel</div>;
  }
};

const TemplatePreview = ({ template, mode = 'readonly', onBack, onSave, className = '' }) => {
  const handleSave = async () => { if (onSave) await onSave(template); };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl mx-4 max-h-[90vh] overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center"><Eye className="w-6 h-6 text-slate-600 mr-3" /><div><h1 className="text-xl font-semibold">Template Preview</h1><p className="text-sm text-slate-600">{mode === 'edit' ? 'Review before saving' : 'View template details'}</p></div></div>
            <div className="flex items-center space-x-2">
              {mode === 'edit' && <button onClick={handleSave} className="flex items-center px-4 py-2 bg-slate-700 text-white rounded-lg"><Save className="w-4 h-4 mr-2" />Save</button>}
              <button onClick={onBack} className="p-2 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
        <div className="bg-white border-b border-slate-200 px-6 py-2">
          <div className="flex items-center text-sm text-slate-600"><span>Templates</span><span className="mx-2">/</span><span className="flex items-center">{getChannelIcon(template.channel)}<span className="ml-1">{getChannelLabel(template.channel)}</span></span><span className="mx-2">/</span><span className="text-slate-900 font-medium">Preview</span></div>
        </div>
        <div className="bg-white border-b border-slate-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div><h2 className="text-lg font-semibold">{template.name}</h2><div className="flex items-center mt-1 space-x-4"><span className="flex items-center text-sm text-slate-600">{getChannelIcon(template.channel)}<span className="ml-1">{getChannelLabel(template.channel)}</span></span>{template.channel === TEMPLATE_CHANNELS.WHATSAPP && template.status && <span className={`px-2 py-1 rounded-full text-xs font-medium ${template.status === 'approved' ? 'bg-green-100 text-green-800' : template.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{template.status}</span>}</div></div>
            <div className="text-sm text-slate-500">{template.content?.length || 0} chars{template.channel === TEMPLATE_CHANNELS.SMS && template.content?.length > 160 && <span className="text-yellow-600 ml-2">({Math.ceil(template.content.length / 160)} SMS)</span>}</div>
          </div>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-280px)]">
          <div className="bg-white rounded-lg border border-slate-200 p-6">{renderChannelPreview(template)}</div>
        </div>
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">{mode === 'edit' ? 'Review carefully before saving.' : 'Read-only preview.'}</div>
            <div className="flex items-center space-x-3">
              {mode === 'edit' && <><button onClick={onBack} className="px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg">Continue Editing</button><button onClick={handleSave} className="flex items-center px-4 py-2 bg-slate-700 text-white rounded-lg"><Save className="w-4 h-4 mr-2" />Save Template</button></>}
              {mode === 'readonly' && <button onClick={onBack} className="flex items-center px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg"><ArrowLeft className="w-4 h-4 mr-2" />Close</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;
