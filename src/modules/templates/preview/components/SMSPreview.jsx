import React from 'react';
import { Signal, Wifi, Battery, AlertTriangle, Check } from 'lucide-react';
import { renderPreview } from '../../utils/placeholders.js';
import { getMockDataForPlaceholders } from '../../utils/mockData.js';

const PhoneFrame = ({ previewContent }) => {
  const getCurrentTime = () => new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  return (
    <div className="bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border-8 border-slate-800">
      <div className="bg-black px-6 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-1"><Signal className="w-3 h-3 text-white" /><Wifi className="w-3 h-3 text-white" /></div>
        <div className="text-white text-xs font-medium">9:41 AM</div>
        <div className="flex items-center space-x-1"><div className="w-4 h-2 border border-white rounded-sm"></div><Battery className="w-4 h-4 text-white" /></div>
      </div>
      <div className="bg-slate-800 px-6 py-1 flex items-center justify-between text-slate-300 text-xs"><span>Verizon</span><span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span></div>
      <div className="bg-slate-700 px-4 py-3 flex items-center text-white font-medium">Messages</div>
      <div className="bg-slate-950 p-4 min-h-[400px]">
        <div className="bg-slate-800 rounded-lg p-3 mb-4 flex items-center">
          <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center mr-3 text-white font-medium">JD</div>
          <div className="flex-1"><div className="text-white font-medium">John Doe</div><div className="text-slate-400 text-sm">+9876543210</div></div>
          <div className="text-slate-400 text-xs">{getCurrentTime()}</div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-start"><div className="bg-slate-700 text-white p-3 rounded-2xl rounded-tl-none max-w-[80%]"><p className="text-sm">Hi! Can you help me?</p><div className="text-xs text-slate-400 mt-1">9:38 AM</div></div></div>
          <div className="flex justify-end"><div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none max-w-[80%]"><p className="text-sm whitespace-pre-wrap">{previewContent}</p><div className="text-xs text-blue-100 mt-1">{getCurrentTime()}</div></div></div>
        </div>
      </div>
      <div className="bg-slate-800 border-t border-slate-700 p-3"><div className="flex items-center bg-slate-700 rounded-full px-4 py-2"><span className="text-slate-400 text-sm flex-1">Text message</span><div className="ml-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">↑</div></div></div>
      <div className="bg-black h-2"></div>
    </div>
  );
};

const SMSInfoPanel = ({ template, charCount, isMultiSMS, smsCount }) => (
  <div className="mt-4 bg-slate-50 rounded-lg p-4">
    <h4 className="font-medium text-slate-900 mb-3">SMS Details</h4>
    <div className={`p-3 rounded-lg mb-3 ${isMultiSMS ? 'bg-yellow-50 border border-yellow-200' : 'bg-green-50 border border-green-200'}`}>
      <div className="flex items-center justify-between mb-2"><span className="font-medium">Character Count</span><span className={`text-sm font-medium ${isMultiSMS ? 'text-yellow-700' : 'text-green-700'}`}>{charCount}/160</span></div>
      {isMultiSMS ? <div className="flex items-center text-sm text-yellow-700"><AlertTriangle className="w-4 h-4 mr-1" /> Will be split into {smsCount} SMS</div> : <div className="flex items-center text-sm text-green-700"><Check className="w-4 h-4 mr-1" /> Single SMS</div>}
    </div>
    <div className="grid grid-cols-2 gap-4 text-sm text-slate-600"><div><span className="font-medium">Template:</span> {template.name}</div><div><span className="font-medium">Type:</span> SMS</div></div>
  </div>
);

const SMSPreview = ({ template, className = '' }) => {
  const mockData = getMockDataForPlaceholders(['user_name', 'phone_number', 'verification_code']);
  const previewContent = renderPreview(template.content, mockData);
  const charCount = previewContent?.length || 0;
  const isMultiSMS = charCount > 160;
  const smsCount = Math.ceil(charCount / 160);
  return (
    <div className={`max-w-md mx-auto ${className}`}>
      <PhoneFrame previewContent={previewContent} />
      <SMSInfoPanel template={template} charCount={charCount} isMultiSMS={isMultiSMS} smsCount={smsCount} />
    </div>
  );
};

export default SMSPreview;
