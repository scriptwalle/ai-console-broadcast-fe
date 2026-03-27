import React, { useState, useEffect } from 'react';
import { X, Save, Users } from 'lucide-react';
import { validateGroup } from '../utils/validation.js';
import { INITIAL_GROUP_STATE } from '../utils/constants.js';

const GroupForm = ({ group = null, onSave, onCancel, loading = false, existingGroups = [] }) => {
  const [formData, setFormData] = useState(group || INITIAL_GROUP_STATE);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (group) {
      setFormData(group);
    } else {
      setFormData(INITIAL_GROUP_STATE);
    }
    setErrors({});
  }, [group]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors.name) {
      setErrors(prev => ({
        ...prev,
        name: undefined
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateGroup(formData, existingGroups);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      await onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-md mx-4 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            {group ? 'Edit Group' : 'Create New Group'}
          </h2>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              <Users className="w-4 h-4 mr-1" />
              Group Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all duration-200 dark:bg-slate-700 dark:text-slate-100 ${
                errors.name ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
              }`}
              placeholder="Marketing Team"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name[0]}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-slate-700 dark:bg-slate-600 text-white rounded-xl hover:bg-slate-800 dark:hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {group ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GroupForm;
