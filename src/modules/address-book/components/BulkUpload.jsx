import React, { useState, useRef } from 'react';
import { X, Upload, Download, AlertCircle, CheckCircle, Mail } from 'lucide-react';
import { parseCSV, generateErrorReport } from '../utils/csvParser.js';

const UploadZone = ({ onFileSelect, file }) => (
  <div className="mb-6">
    <div className="flex items-center mb-4">
      <Upload className="w-5 h-5 text-blue-600 mr-2" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Upload CSV File</h3>
    </div>
    <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-6 text-center">
      <input type="file" accept=".csv" onChange={onFileSelect} className="hidden" id="csv-upload" />
      <label htmlFor="csv-upload" className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        <Upload className="w-4 h-4 mr-2" />Choose CSV File
      </label>
      {file && <p className="mt-3 text-sm text-gray-600">Selected: <span className="font-medium">{file.name}</span></p>}
    </div>
  </div>
);

const CsvFormatGuide = () => (
  <div className="mb-6 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">CSV Format Requirements:</h4>
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Your CSV file should include:</p>
    <code className="text-xs bg-gray-200 dark:bg-slate-600 px-2 py-1 rounded">name,email,phone,whatsapp,group</code>
    <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400">
      <li>• <strong>name, email, phone</strong> are required</li>
      <li>• <strong>whatsapp, group</strong> are optional</li>
    </ul>
  </div>
);

const ErrorDisplay = ({ errors }) => errors.length > 0 && (
  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 rounded-lg">
    <div className="flex items-center mb-2"><AlertCircle className="w-5 h-5 text-red-600 mr-2" /><h4 className="font-medium text-red-900">Validation Errors</h4></div>
    <div className="max-h-40 overflow-y-auto">{errors.map((error, index) => <div key={index} className="text-sm text-red-700">{error.error || Object.values(error.errors || {}).flat().join(', ')}</div>)}</div>
  </div>
);

const UploadResult = ({ result, onDownloadReport, onSendEmail, onReset, onClose }) => (
  <div className="text-center">
    <div className="mb-6"><CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" /><h3 className="text-xl font-semibold mb-2">Upload Complete!</h3>
      <div className="flex justify-center space-x-8"><div className="text-center"><div className="text-2xl font-bold text-green-600">{result.imported}</div><div className="text-sm">Imported</div></div><div className="text-center"><div className="text-2xl font-bold text-red-600">{result.skipped}</div><div className="text-sm">Skipped</div></div><div className="text-center"><div className="text-2xl font-bold">{result.total}</div><div className="text-sm">Total</div></div></div>
    </div>
    {result.errors.length > 0 && <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-left"><div className="flex items-center justify-between mb-2"><div className="flex items-center"><AlertCircle className="w-5 h-5 text-yellow-600 mr-2" /><h4 className="font-medium">{result.errors.length} rows had errors</h4></div><button onClick={onDownloadReport} className="flex items-center px-3 py-1 text-sm bg-yellow-600 text-white rounded"><Download className="w-3 h-3 mr-1" />Download Report</button></div></div>}
    <div className="flex justify-center space-x-3">
      <button onClick={onReset} className="px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-md">Upload Another</button>
      {result.errors.length > 0 && <button onClick={onSendEmail} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md"><Mail className="w-4 h-4 mr-2" />Send Report</button>}
      <button onClick={onClose} className="px-4 py-2 bg-green-600 text-white rounded-md">Done</button>
    </div>
  </div>
);

const BulkUpload = ({ onClose, onUpload, existingGroups = [] }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [errors, setErrors] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') { setFile(selectedFile); setUploadResult(null); setErrors([]); }
    else alert('Please select a valid CSV file');
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true); setErrors([]);
    try {
      const fileContent = await file.text();
      const { contacts, errors: parseErrors } = parseCSV(fileContent);
      const validatedContacts = contacts.map(contact => {
        if (contact.groups?.length > 0) {
          const groupName = contact.groups[0];
          if (!existingGroups.some(g => g.name.toLowerCase() === groupName.toLowerCase())) {
            parseErrors.push({ row: 'Unknown', data: contact, errors: { group: [`Group "${groupName}" does not exist`] } });
            return null;
          }
        }
        return contact;
      }).filter(Boolean);
      if (parseErrors.length > 0) setErrors(parseErrors);
      const success = await onUpload(validatedContacts);
      if (success) setUploadResult({ total: contacts.length, imported: validatedContacts.length, skipped: parseErrors.length, errors: parseErrors });
    } catch (error) { setErrors([{ error: 'Failed to parse CSV: ' + error.message }]); }
    finally { setUploading(false); }
  };

  const downloadErrorReport = () => { const report = generateErrorReport(errors); const blob = new Blob([report], { type: 'text/plain' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'upload-error-report.txt'; a.click(); };
  const simulateEmailNotification = () => { alert('Upload report has been sent to your email!'); };
  const resetUpload = () => { setFile(null); setUploadResult(null); setErrors([]); if (fileInputRef.current) fileInputRef.current.value = ''; };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Bulk Upload Contacts</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6">
          {!uploadResult ? (
            <>
              <UploadZone onFileSelect={handleFileSelect} file={file} />
              <CsvFormatGuide />
              <ErrorDisplay errors={errors} />
              <div className="flex justify-end space-x-3">
                <button onClick={onClose} className="px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-md">Cancel</button>
                <button onClick={handleUpload} disabled={!file || uploading} className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50">
                  {uploading ? <div className="flex items-center"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />Uploading...</div> : 'Upload Contacts'}
                </button>
              </div>
            </>
          ) : (
            <UploadResult result={uploadResult} onDownloadReport={downloadErrorReport} onSendEmail={simulateEmailNotification} onReset={resetUpload} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkUpload;
