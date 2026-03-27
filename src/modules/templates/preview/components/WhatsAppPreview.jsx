import React from 'react';
import { MessageCircle, CheckCircle, Clock, User } from 'lucide-react';
import { renderPreview } from '../../utils/placeholders.js';
import { getMockDataForPlaceholders } from '../../utils/mockData.js';

const WhatsAppPreview = ({ template, className = '' }) => {
  const mockData = getMockDataForPlaceholders(['user_name', 'phone_number', 'email_id', 'company_name', 'order_id', 'verification_code']);
  const previewContent = renderPreview(template.content, mockData);
  
  const renderMedia = () => {
    if (!template.media) return null;
    
    if (template.media.type === 'image') {
      return (
        <div className="mb-2">
          <img 
            src={template.media.preview} 
            alt="Media attachment" 
            className="rounded-lg max-w-full h-auto"
          />
        </div>
      );
    }
    
    return (
      <div className="flex items-center p-3 bg-slate-50 rounded-lg mb-2">
        <div className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center mr-3">
          <div className="w-4 h-4 bg-slate-400 rounded"></div>
        </div>
        <div>
          <div className="text-sm font-medium text-slate-900">{template.media.name}</div>
          <div className="text-xs text-slate-500">{template.media.size} bytes</div>
        </div>
      </div>
    );
  };

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      <div className="bg-slate-100 rounded-2xl shadow-lg overflow-hidden">
        {/* Chat Header */}
        <div className="bg-green-600 text-white p-4 flex items-center">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
            <User className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="font-medium">Customer Support</div>
            <div className="text-xs text-green-100">Online</div>
          </div>
          <div className="text-xs text-green-100">10:30 AM</div>
        </div>
        
        {/* Chat Messages */}
        <div className="p-4 space-y-4 bg-white">
          {/* Receiver Message */}
          <div className="flex justify-start">
            <div className="max-w-xs lg:max-w-md">
              <div className="flex items-center mb-1">
                <div className="w-6 h-6 bg-slate-300 rounded-full mr-2"></div>
                <span className="text-xs text-slate-500">You</span>
              </div>
              <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-200">
                <p className="text-sm text-slate-800">Hi! I need help with my order.</p>
                <div className="text-xs text-slate-400 mt-1">10:30 AM</div>
              </div>
            </div>
          </div>
          
          {/* Sender Message (Template) */}
          <div className="flex justify-end">
            <div className="max-w-xs lg:max-w-md">
              <div className="flex items-center justify-end mb-1">
                <span className="text-xs text-slate-500 mr-2">Acme Support</span>
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-3 h-3 text-white" />
                </div>
              </div>
              
              <div className="bg-green-500 text-white p-3 rounded-2xl rounded-tr-none shadow-sm">
                {/* Media */}
                {renderMedia()}
                
                {/* Message Content */}
                <p className="text-sm whitespace-pre-wrap">{previewContent}</p>
                
                {/* Timestamp and Status */}
                <div className="flex items-center justify-end mt-1">
                  <span className="text-xs text-green-100">10:31 AM</span>
                  <CheckCircle className="w-3 h-3 text-green-100 ml-1" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Follow-up Message */}
          <div className="flex justify-start">
            <div className="max-w-xs lg:max-w-md">
              <div className="flex items-center mb-1">
                <div className="w-6 h-6 bg-slate-300 rounded-full mr-2"></div>
                <span className="text-xs text-slate-500">You</span>
              </div>
              <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-200">
                <p className="text-sm text-slate-800">Thank you! That's very helpful.</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-slate-400">10:32 AM</span>
                  <CheckCircle className="w-3 h-3 text-slate-400 ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Chat Input */}
        <div className="border-t border-slate-200 p-3 bg-slate-50">
          <div className="flex items-center">
            <div className="flex-1 bg-white border border-slate-300 rounded-full px-4 py-2 text-sm text-slate-400">
              Type a message...
            </div>
            <div className="ml-2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Template Info */}
      <div className="mt-4 p-4 bg-slate-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-slate-900">Template Details</h4>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            template.status === 'approved' ? 'bg-green-100 text-green-800' :
            template.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {template.status || 'pending'}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
          <div>
            <span className="font-medium">Provider:</span> {template.provider || 'meta'}
          </div>
          <div>
            <span className="font-medium">Category:</span> {template.category || 'utility'}
          </div>
          <div>
            <span className="font-medium">Name:</span> {template.name}
          </div>
          <div>
            <span className="font-medium">Length:</span> {template.content?.length || 0} chars
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppPreview;
