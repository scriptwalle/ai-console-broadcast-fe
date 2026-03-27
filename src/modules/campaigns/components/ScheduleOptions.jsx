import React from 'react';
import { Clock, Calendar } from 'lucide-react';
import { SCHEDULE_OPTIONS } from '../utils/constants.js';

const ScheduleOptions = ({ 
  runNow, 
  scheduleTime, 
  lapseTime, 
  onRunNowChange, 
  onScheduleTimeChange, 
  onLapseTimeChange,
  errors 
}) => {
  const currentDateTime = new Date().toISOString().slice(0, 16);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Schedule Campaign</h3>
      
      {/* Schedule Options */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            When would you like to run this campaign?
          </label>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
              <input
                type="radio"
                name="schedule"
                checked={runNow}
                onChange={() => onRunNowChange(true)}
                className="w-4 h-4 text-slate-700 border-slate-300"
              />
              <Clock className="w-4 h-4 text-slate-600" />
              <div>
                <div className="font-medium">Run Now</div>
                <div className="text-sm text-slate-500">Starts in 2 minutes</div>
              </div>
            </label>
            
            <label className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
              <input
                type="radio"
                name="schedule"
                checked={!runNow}
                onChange={() => onRunNowChange(false)}
                className="w-4 h-4 text-slate-700 border-slate-300"
              />
              <Calendar className="w-4 h-4 text-slate-600" />
              <div className="flex-1">
                <div className="font-medium">Run Later</div>
                <div className="text-sm text-slate-500">Schedule for a specific time</div>
              </div>
            </label>
          </div>
        </div>

        {/* Schedule Time Picker */}
        {!runNow && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Schedule Time
            </label>
            <input
              type="datetime-local"
              value={scheduleTime || ''}
              onChange={(e) => onScheduleTimeChange(e.target.value)}
              min={currentDateTime}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
            {errors.scheduleTime && (
              <p className="text-sm text-red-600 mt-1">{errors.scheduleTime}</p>
            )}
          </div>
        )}

        {/* Lapse Time Picker */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Lapse Time
          </label>
          <input
            type="datetime-local"
            value={lapseTime || ''}
            onChange={(e) => onLapseTimeChange(e.target.value)}
            min={scheduleTime || currentDateTime}
            className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
          {errors.lapseTime && (
            <p className="text-sm text-red-600 mt-1">{errors.lapseTime}</p>
          )}
          <p className="text-xs text-slate-500 mt-1">
            Campaign will stop after this time
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScheduleOptions;
