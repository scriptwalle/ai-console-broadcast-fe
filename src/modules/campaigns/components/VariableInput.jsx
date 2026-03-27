import React from 'react';

const VariableInput = ({ variables, dynamicPlaceholders, onVariableChange }) => {
  if (dynamicPlaceholders.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">Campaign Details</h3>
        <div className="text-sm text-slate-500">
          No dynamic variables found in selected template.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Dynamic Variables</h3>
      <div className="space-y-3">
        {dynamicPlaceholders.map(placeholder => (
          <div key={placeholder} className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">
              {placeholder.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </label>
            <input
              type="text"
              value={variables[placeholder] || ''}
              onChange={(e) => onVariableChange(placeholder, e.target.value)}
              placeholder={`Enter ${placeholder}`}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
            <div className="text-xs text-slate-500">
              This will replace {'{{' + placeholder + '}}'} in the template
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariableInput;
