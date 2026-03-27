import React, { useState } from 'react';
import { Upload, X, Image, FileText, MessageCircle, Check } from 'lucide-react';
import { validateMediaFile } from '../utils/validation.js';

const WhatsAppEditor = ({ content, onChange, media, onMediaChange, provider, onProviderChange, category, onCategoryChange, className = '' }) => {
  const [mediaError, setMediaError] = useState('');

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const errors = validateMediaFile(file, 'whatsapp');
    if (errors.length > 0) { setMediaError(errors[0]); return; }
    setMediaError('');
    onMediaChange({ file, preview: URL.createObjectURL(file), type: file.type.split('/')[0], name: file.name, size: file.size });
  };

  const removeMedia = () => { if (media?.preview) URL.revokeObjectURL(media.preview); onMediaChange(null); setMediaError(''); };
  const getMediaIcon = (type) => type === 'image' ? <Image className="w-5 h-5" /> : <FileText className="w-5 h-5" />;
  const formatFileSize = (bytes) => { if (bytes === 0) return '0 Bytes'; const k = 1024, sizes = ['Bytes', 'KB', 'MB', 'GB']; return parseFloat((bytes / Math.pow(k, Math.floor(Math.log(bytes) / Math.log(k)))).toFixed(2)) + ' ' + sizes[Math.floor(Math.log(bytes) / Math.log(k))]; };

  const renderChatPreview = () => (
    <div className="bg-slate-100 p-4 rounded-lg max-w-md">
      <div className="flex justify-start mb-3">
        <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm max-w-xs border border-slate-200">
          {media && (<div className="mb-2">{media.type === 'image' ? <img src={media.preview} alt="Media" className="rounded-lg max-w-full mb-2" /> : <div className="flex items-center p-3 bg-slate-50 rounded-lg">{getMediaIcon(media.type)}<div className="ml-2"><div className="text-sm font-medium truncate max-w-[200px]">{media.name}</div><div className="text-xs text-slate-500">{formatFileSize(media.size)}</div></div></div>}</div>)}
          <div className="bg-green-500 text-white p-3 rounded-2xl rounded-tl-none"><p className="text-sm whitespace-pre-wrap">{content || 'Start typing...'}</p></div>
          <div className="text-xs text-slate-400 mt-1">12:30 PM</div>
        </div>
      </div>
      <div className="flex justify-end"><div className="bg-slate-200 text-slate-800 p-3 rounded-2xl rounded-tr-none max-w-xs"><p className="text-sm">Preview message</p><div className="text-xs text-slate-500 mt-1">12:31 PM <Check className="w-3 h-3 inline" /><Check className="w-3 h-3 inline" /></div></div></div>
    </div>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Message Editor</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Provider</label><select value={provider || ''} onChange={(e) => onProviderChange(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl"><option value="meta">Meta</option><option value="com">CoM</option><option value="netcore">Netcore</option></select></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Category</label><select value={category || ''} onChange={(e) => onCategoryChange(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-xl"><option value="marketing">Marketing</option><option value="utility">Utility</option><option value="authentication">Authentication</option></select></div>
          </div>
          <div><label className="block text-sm font-medium text-slate-700 mb-1">Message Body</label><div className="relative"><MessageCircle className="absolute left-3 top-3 text-slate-400 w-5 h-5" /><textarea value={content || ''} onChange={(e) => onChange(e.target.value)} rows={6} className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-xl resize-none" placeholder="Hello {{user_name}}..." /></div><div className="text-xs text-slate-500 mt-1">{content?.length || 0}/1024 | Use: {'{{user_name}}'}</div></div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Media (Optional)</label>
            {!media ? (<div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center"><input type="file" onChange={handleMediaUpload} accept="image/*,.pdf,.doc,.docx" className="hidden" id="whatsapp-media-upload" /><label htmlFor="whatsapp-media-upload" className="cursor-pointer inline-flex items-center px-4 py-2 bg-slate-100 rounded-lg"><Upload className="w-4 h-4 mr-2" />Choose File</label><p className="text-xs text-slate-500 mt-2">Max 5MB images, 10MB documents</p></div>) : (<div className="border border-slate-200 rounded-lg p-3"><div className="flex items-center justify-between"><div className="flex items-center">{getMediaIcon(media.type)}<div className="ml-2"><div className="text-sm font-medium truncate max-w-[200px]">{media.name}</div><div className="text-xs text-slate-500">{formatFileSize(media.size)}</div></div></div><button onClick={removeMedia} className="text-red-500 hover:text-red-700"><X className="w-4 h-4" /></button></div></div>)}
            {mediaError && <p className="mt-1 text-sm text-red-600">{mediaError}</p>}
          </div>
        </div>
        <div><h3 className="text-lg font-semibold text-slate-900 mb-4">Chat Preview</h3>{renderChatPreview()}</div>
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4"><h4 className="font-medium text-slate-900 mb-2">WhatsApp Guidelines</h4><ul className="text-sm text-slate-600 space-y-1"><li>• Max 1024 characters</li><li>• Use {'{{variable_name}}'} placeholders</li><li>• Media: Images 5MB, Documents 10MB</li></ul></div>
    </div>
  );
};

export default WhatsAppEditor;
