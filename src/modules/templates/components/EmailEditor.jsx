import React, { useState } from 'react';
import { Upload, X, Image, FileText, Mail, Paperclip } from 'lucide-react';
import { validateMediaFile } from '../utils/validation.js';

const EmailEditor = ({ subject, onSubjectChange, content, onChange, attachments, onAttachmentsChange, className = '' }) => {
  const [attachmentError, setAttachmentError] = useState('');

  const handleAttachmentUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    const validAttachments = [], errors = [];
    files.forEach(file => {
      const fileErrors = validateMediaFile(file, 'email');
      if (fileErrors.length === 0) {
        validAttachments.push({ file, preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null, type: file.type.split('/')[0], name: file.name, size: file.size });
      } else errors.push(`${file.name}: ${fileErrors[0]}`);
    });
    if (errors.length > 0) { setAttachmentError(errors.join('; ')); return; }
    setAttachmentError('');
    onAttachmentsChange([...attachments, ...validAttachments]);
  };

  const removeAttachment = (index) => {
    const newAttachments = [...attachments];
    if (newAttachments[index].preview) URL.revokeObjectURL(newAttachments[index].preview);
    newAttachments.splice(index, 1);
    onAttachmentsChange(newAttachments);
  };

  const getAttachmentIcon = (type) => type === 'image' ? <Image className="w-4 h-4" /> : type === 'application' ? <FileText className="w-4 h-4" /> : <Paperclip className="w-4 h-4" />;

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024, sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderEmailPreview = () => (
    <div className="bg-white border border-slate-200 rounded-lg max-w-2xl mx-auto">
      <div className="border-b border-slate-200 p-4 bg-slate-50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center"><Mail className="w-5 h-5 text-slate-600 mr-2" /><span className="text-sm font-medium">New Message</span></div>
          <div className="text-xs text-slate-500">Preview</div>
        </div>
        <div className="space-y-1">
          <div className="text-sm"><span className="text-slate-600">To: </span><span className="text-slate-900">john@example.com</span></div>
          <div className="text-sm"><span className="text-slate-600">Subject: </span><span className="font-medium text-slate-900">{subject || 'No Subject'}</span></div>
        </div>
      </div>
      <div className="p-4">
        {attachments.filter(a => a.type === 'image').map((attachment, index) => (
          <div key={index} className="mb-4"><img src={attachment.preview} alt={attachment.name} className="max-w-full h-auto rounded-lg" /><div className="text-xs text-slate-500 mt-1">{attachment.name}</div></div>
        ))}
        <div className="whitespace-pre-wrap text-slate-800">{content || 'Start typing...'}</div>
        {attachments.filter(a => a.type !== 'image').length > 0 && (
          <div className="mt-6 pt-4 border-t border-slate-200">
            <div className="text-sm font-medium text-slate-700 mb-2">Attachments:</div>
            {attachments.filter(a => a.type !== 'image').map((attachment, index) => (
              <div key={index} className="flex items-center p-2 bg-slate-50 rounded-lg">
                {getAttachmentIcon(attachment.type)}
                <div className="ml-2 flex-1"><div className="text-sm font-medium truncate">{attachment.name}</div><div className="text-xs text-slate-500">{formatFileSize(attachment.size)}</div></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Email Editor</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
            <div className="relative"><Mail className="absolute left-3 top-3 text-slate-400 w-5 h-5" /><input type="text" value={subject || ''} onChange={(e) => onSubjectChange(e.target.value)} className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500" placeholder="Welcome to our service" maxLength={200} /></div>
            <div className="text-xs text-slate-500 mt-1">{subject?.length || 0}/200</div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Body</label>
            <textarea value={content || ''} onChange={(e) => onChange(e.target.value)} rows={8} className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 resize-none" placeholder="Dear {{user_name}},\n\nThank you..." />
            <div className="text-xs text-slate-500 mt-1">Use placeholders: {'{{user_name}}'}, {'{{phone_number}}'}, {'{{email_id}}'}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Attachments</label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
              <input type="file" onChange={handleAttachmentUpload} multiple accept="image/*,.pdf,.doc,.docx,.txt" className="hidden" id="email-attachments-upload" />
              <label htmlFor="email-attachments-upload" className="cursor-pointer inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200"><Paperclip className="w-4 h-4 mr-2" />Add Attachments</label>
              <p className="text-xs text-slate-500 mt-2">Images (Max: 5MB), Documents (Max: 10MB)</p>
            </div>
            {attachments.length > 0 && <div className="mt-3 space-y-2">{attachments.map((attachment, index) => (<div key={index} className="flex items-center justify-between p-2 bg-slate-50 border rounded-lg"><div className="flex items-center flex-1">{getAttachmentIcon(attachment.type)}<div className="ml-2"><div className="text-sm font-medium truncate max-w-[200px]">{attachment.name}</div><div className="text-xs text-slate-500">{formatFileSize(attachment.size)}</div></div></div><button onClick={() => removeAttachment(index)} className="text-red-500 hover:text-red-700 ml-2"><X className="w-4 h-4" /></button></div>))}</div>}
            {attachmentError && <p className="mt-1 text-sm text-red-600">{attachmentError}</p>}
          </div>
        </div>
        <div><h3 className="text-lg font-semibold text-slate-900 mb-4">Email Preview</h3>{renderEmailPreview()}</div>
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
        <h4 className="font-medium text-slate-900 mb-2">Email Guidelines</h4>
        <ul className="text-sm text-slate-600 space-y-1"><li>• Subject line is required</li><li>• Use placeholders for personalization</li><li>• Images up to 5MB, Documents up to 10MB</li></ul>
      </div>
    </div>
  );
};

export default EmailEditor;
