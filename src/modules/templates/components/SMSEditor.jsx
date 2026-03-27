import React from 'react';
import { Type, Smartphone } from 'lucide-react';

const SMSEditor = ({ 
  content, 
  onChange, 
  className = '' 
}) => {
  const charCount = content?.length || 0;
  const maxChars = 160;
  const remainingChars = maxChars - charCount;
  const isOverLimit = charCount > maxChars;

  const renderSMSPreview = () => {
    const messageContent = content || 'Start typing your SMS message...';
    
    return (
      <div className="bg-slate-900 text-white p-4 rounded-lg max-w-sm mx-auto font-mono text-sm">
        {/* Phone Header */}
        <div className="border-b border-slate-700 pb-2 mb-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs">NEW MESSAGE</span>
            <Smartphone className="w-3 h-3 text-slate-400" />
          </div>
        </div>
        
        {/* Message Content */}
        <div className="whitespace-pre-wrap min-h-[80px]">{messageContent}</div>
        
        {/* Character Counter */}
        <div className={`mt-3 pt-2 border-t border-slate-700 text-xs ${
          isOverLimit ? 'text-red-400' : 'text-slate-400'
        }`}>
          <div className="flex justify-between items-center">
            <span>{charCount}/{maxChars} characters</span>
            {isOverLimit && (
              <span className="text-red-400">
                {Math.ceil(charCount / maxChars)} messages
              </span>
            )}
          </div>
          {isOverLimit && (
            <div className="mt-1 text-red-400">
              Standard SMS limit exceeded. Message will be split.
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Section */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">SMS Editor</h3>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Message Body
            </label>
            <div className="relative">
              <Type className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
              <textarea
                value={content}
                onChange={(e) => onChange(e.target.value)}
                rows={6}
                className={`w-full pl-10 pr-3 py-2 border rounded-xl focus:outline-none focus:ring-2 resize-none ${
                  isOverLimit 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-slate-300 focus:ring-slate-500'
                }`}
                placeholder="Hi {{user_name}}, your verification code is 123456. Valid for 10 minutes."
              />
            </div>
            
            {/* Character Count and Guidelines */}
            <div className="mt-3 space-y-2">
              <div className={`flex justify-between items-center text-sm ${
                isOverLimit ? 'text-red-600' : 'text-slate-600'
              }`}>
                <span>{charCount}/{maxChars} characters</span>
                {isOverLimit && (
                  <span>{Math.ceil(charCount / maxChars)} messages</span>
                )}
              </div>
              
              {isOverLimit && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">
                  Message exceeds standard SMS limit and will be split into multiple parts.
                </div>
              )}
              
              <div className="text-xs text-slate-500">
                Use placeholders: {'{{user_name}}'}, {'{{phone_number}}'}, {'{{email_id}}'}
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">SMS Preview</h3>
          {renderSMSPreview()}
        </div>
      </div>

      {/* SMS Guidelines */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
        <h4 className="font-medium text-slate-900 mb-2">SMS Guidelines</h4>
        <ul className="text-sm text-slate-600 space-y-1">
          <li>• Standard SMS limit: 160 characters</li>
          <li>• Longer messages will be split into multiple SMS</li>
          <li>• URLs are automatically converted to clickable links</li>
          <li>• Use placeholders for personalization</li>
          <li>• Avoid special characters that may not display correctly</li>
        </ul>
      </div>

      {/* URL Detection */}
      {content && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">URL Detection</h4>
          <div className="text-sm text-blue-800">
            The following URLs were detected in your message and will be clickable:
            {content.match(/https?:\/\/[^\s]+/g)?.map((url, index) => (
              <div key={index} className="mt-1 font-mono text-xs bg-blue-100 rounded px-2 py-1 inline-block mr-2">
                {url}
              </div>
            )) || (
              <span className="text-blue-600 italic">No URLs detected</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SMSEditor;
