import React from 'react';
import { Mail, User, Paperclip } from 'lucide-react';
import { renderPreview } from '../../utils/placeholders.js';
import { getMockDataForPlaceholders } from '../../utils/mockData.js';

const EmailHeader = ({ template, mockData }) => {
  const getCurrentDate = () => new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <div className="border-b border-slate-200 p-6 bg-slate-50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-slate-900">{template.subject || 'No Subject'}</h2>
        <div className="text-sm text-slate-500">{getCurrentDate()}</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center"><span className="text-sm font-medium text-slate-600 w-16">From:</span><div className="flex items-center"><div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2"><span className="text-white text-sm font-bold">AC</span></div><div><div className="text-sm font-medium text-slate-900">Acme Support</div><div className="text-xs text-slate-500">support@acmecorp.com</div></div></div></div>
        <div className="flex items-center"><span className="text-sm font-medium text-slate-600 w-16">To:</span><div className="flex items-center"><div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center mr-2"><User className="w-4 h-4 text-slate-600" /></div><div><div className="text-sm font-medium text-slate-900">{mockData.user_name}</div><div className="text-xs text-slate-500">{mockData.email_id}</div></div></div></div>
      </div>
    </div>
  );
};

const EmailAttachments = ({ attachments }) => {
  if (!attachments?.length) return null;
  return (
    <div className="border-t border-slate-200 p-4 bg-slate-50">
      <div className="flex items-center mb-3"><Paperclip className="w-4 h-4 text-slate-500 mr-2" /><span className="text-sm font-medium">{attachments.length} Attachment{attachments.length > 1 ? 's' : ''}</span></div>
      <div className="space-y-2">{attachments.map((a, i) => <div key={i} className="flex items-center p-3 bg-white border rounded-lg"><div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center mr-3">{a.type === 'image' ? <img src={a.preview} alt={a.name} className="w-8 h-8 rounded object-cover" /> : <div className="w-5 h-5 bg-slate-300 rounded"></div>}</div><div className="flex-1"><div className="text-sm font-medium">{a.name}</div><div className="text-xs text-slate-500">{a.size} bytes</div></div></div>)}</div>
    </div>
  );
};

const EmailInfoPanel = ({ template, previewContent }) => (
  <div className="mt-4 bg-slate-50 rounded-lg p-4">
    <h4 className="font-medium text-slate-900 mb-3">Email Template Details</h4>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-600">
      <div><span className="font-medium">Template:</span> {template.name}</div>
      <div><span className="font-medium">Subject:</span> {template.subject || 'None'}</div>
      <div><span className="font-medium">Body:</span> {template.content?.length || 0} chars</div>
      <div><span className="font-medium">Size:</span> {new Blob([previewContent]).size} bytes</div>
    </div>
    {template.content?.match(/\{\{(\w+)\}\}/g) && <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded"><div className="text-sm font-medium text-blue-900 mb-2">Placeholders:</div><div className="flex flex-wrap gap-2">{template.content.match(/\{\{(\w+)\}\}/g)?.map((p, i) => <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-mono">{p}</span>)}</div></div>}
  </div>
);

const EmailPreview = ({ template, className = '' }) => {
  const mockData = getMockDataForPlaceholders(['user_name', 'email_id', 'company_name', 'order_id']);
  const previewContent = renderPreview(template.content, mockData);
  const inlineImages = template.attachments?.filter(a => a.type === 'image') || [];

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-slate-800 text-white px-6 py-3 flex items-center justify-between"><div className="flex items-center"><Mail className="w-5 h-5 mr-2" /><span className="font-medium">Acme Mail</span></div><div className="flex items-center space-x-4 text-sm"><span>Compose</span><span>Inbox</span><span>Sent</span></div></div>
        <EmailHeader template={template} mockData={mockData} />
        <div className="p-6 bg-white">
          <div className="whitespace-pre-wrap text-slate-800 leading-relaxed">{previewContent}</div>
          {inlineImages.length > 0 && <div className="my-4 space-y-3">{inlineImages.map((img, i) => <div key={i} className="text-center"><img src={img.preview} alt={img.name} className="max-w-full h-auto rounded-lg" /><div className="text-xs text-slate-500 mt-1">{img.name}</div></div>)}</div>}
          <div className="mt-8 pt-4 border-t border-slate-200"><div className="text-sm text-slate-600"><div className="font-medium text-slate-900">Best regards,</div><div>The Acme Team</div></div></div>
        </div>
        <EmailAttachments attachments={template.attachments} />
        <div className="border-t border-slate-200 px-6 py-3 bg-slate-50"><div className="flex items-center justify-between text-xs text-slate-500"><div>This email was sent to {mockData.email_id}</div><div>Acme Corporation</div></div></div>
      </div>
      <EmailInfoPanel template={template} previewContent={previewContent} />
    </div>
  );
};

export default EmailPreview;
