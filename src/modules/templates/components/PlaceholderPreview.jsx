import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { renderPreview, getPlaceholdersFromContent } from '../utils/placeholders.js';
import { TEMPLATE_CHANNELS } from '../utils/constants.js';

const PlaceholderPreview = ({ 
  content, 
  channel, 
  showPlaceholders = true, 
  onTogglePlaceholders,
  className = '' 
}) => {
  const placeholders = getPlaceholdersFromContent(content);
  const hasPlaceholders = placeholders.length > 0;
  
  const renderChannelSpecificPreview = (content) => {
    switch (channel) {
      case TEMPLATE_CHANNELS.WHATSAPP:
        return (
          <div className="bg-slate-100 p-4 rounded-lg max-w-md">
            <div className="flex justify-start mb-2">
              <div className="bg-green-500 text-white p-3 rounded-2xl rounded-tl-none max-w-xs">
                <p className="text-sm whitespace-pre-wrap">{content}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-slate-200 text-slate-800 p-3 rounded-2xl rounded-tr-none max-w-xs">
                <p className="text-sm whitespace-pre-wrap">This is a preview of how your message will appear to the recipient.</p>
              </div>
            </div>
          </div>
        );
        
      case TEMPLATE_CHANNELS.SMS:
        return (
          <div className="bg-slate-900 text-white p-4 rounded-lg max-w-sm font-mono text-sm">
            <div className="border-b border-slate-700 pb-2 mb-2">
              <span className="text-slate-400 text-xs">NEW MESSAGE</span>
            </div>
            <div className="whitespace-pre-wrap">{content}</div>
            <div className="text-slate-400 text-xs mt-2">
              {content.length}/160 characters
            </div>
          </div>
        );
        
      case TEMPLATE_CHANNELS.EMAIL:
        return (
          <div className="bg-white border border-slate-200 rounded-lg max-w-2xl">
            <div className="border-b border-slate-200 p-4">
              <div className="text-sm text-slate-600 mb-1">Subject:</div>
              <div className="font-medium text-slate-900">Sample Email Subject</div>
            </div>
            <div className="p-4">
              <div className="whitespace-pre-wrap text-slate-800">{content}</div>
            </div>
          </div>
        );
        
      default:
        return <div className="p-4 bg-slate-50 rounded-lg">{content}</div>;
    }
  };

  if (!content) {
    return (
      <div className={`text-center text-slate-400 py-8 ${className}`}>
        <Eye className="w-8 h-8 mx-auto mb-2" />
        <p>Enter template content to see preview</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Preview</h3>
        {hasPlaceholders && (
          <button
            onClick={onTogglePlaceholders}
            className="flex items-center text-sm text-slate-600 hover:text-slate-800 transition-colors"
          >
            {showPlaceholders ? (
              <>
                <EyeOff className="w-4 h-4 mr-1" />
                Hide Placeholders
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-1" />
                Show Placeholders
              </>
            )}
          </button>
        )}
      </div>
      
      {hasPlaceholders && showPlaceholders && (
        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
          <div className="text-sm font-medium text-slate-700 mb-2">Placeholders found:</div>
          <div className="flex flex-wrap gap-2">
            {placeholders.map((placeholder, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-slate-200 text-slate-700 rounded text-xs font-mono"
              >
                {`{{${placeholder}}}`}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="border border-slate-200 rounded-lg p-4 bg-white">
        {renderChannelSpecificPreview(
          showPlaceholders ? content : renderPreview(content)
        )}
      </div>
      
      {hasPlaceholders && !showPlaceholders && (
        <div className="mt-3 text-xs text-slate-500">
          <em>Preview shows mock data: {Object.entries({
            user_name: 'John Doe',
            phone_number: '+1234567890',
            email_id: 'john@example.com'
          }).map(([key, value]) => `${key} → ${value}`).join(', ')}</em>
        </div>
      )}
    </div>
  );
};

export default PlaceholderPreview;
