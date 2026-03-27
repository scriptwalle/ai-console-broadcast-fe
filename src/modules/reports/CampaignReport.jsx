import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, Activity, CheckCircle } from 'lucide-react';
import { useReports } from './hooks/useReports.js';
import { CAMPAIGN_CHANNELS, CAMPAIGN_STATUS } from './utils/constants.js';
import { calculateCampaignMetrics, getPercentage } from './utils/mockData.js';
import { isCampaignComplete } from './utils/statusUtils.js';
import MetricsCards from './components/MetricsCards.jsx';
import RecipientTable from './components/RecipientTable.jsx';
import CampaignInfoSection from './components/CampaignInfoSection.jsx';
import StatusBadge from './components/StatusBadge.jsx';

const CampaignReport = ({ campaignId, onBack }) => {
  const { currentCampaign, loading, error, loadCampaignReport, stopRealTimeUpdates, clearError } = useReports();
  const [metrics, setMetrics] = useState(null);
  const [isRealTimeActive, setIsRealTimeActive] = useState(false);

  useEffect(() => {
    if (campaignId) loadCampaignReport(campaignId);
  }, [campaignId, loadCampaignReport]);

  useEffect(() => {
    if (currentCampaign) {
      setMetrics(calculateCampaignMetrics(currentCampaign.recipients, currentCampaign.channel));
      setIsRealTimeActive(
        currentCampaign.status === CAMPAIGN_STATUS.RUNNING && 
        !isCampaignComplete(currentCampaign.recipients, currentCampaign.channel)
      );
    }
  }, [currentCampaign]);

  useEffect(() => {
    if (error) { alert(error); clearError(); }
  }, [error, clearError]);

  useEffect(() => {
    return () => { if (campaignId) stopRealTimeUpdates(campaignId); };
  }, [campaignId, stopRealTimeUpdates]);

  const getCompletionRate = () => {
    if (!metrics || !currentCampaign) return 0;
    return getPercentage(metrics.totalDelivered + metrics.totalRead + metrics.totalOpened, metrics.totalRecipients);
  };

  if (loading && !currentCampaign) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-slate-600 border-t-transparent rounded-full animate-spin mr-3" />
          <span className="text-slate-600">Loading campaign report...</span>
        </div>
      </div>
    );
  }

  if (!currentCampaign) {
    return (
      <div className="p-6">
        <div className="text-center text-slate-500">
          <p>Campaign not found.</p>
          <button onClick={onBack} className="mt-4 px-4 py-2 bg-slate-700 text-white rounded-xl hover:bg-slate-800">
            Back to Reports
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-4 flex items-center text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Reports
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{currentCampaign.name}</h1>
            <div className="flex items-center mt-1 space-x-4">
              <span className="text-sm text-slate-600">{currentCampaign.channel}</span>
              <StatusBadge status={currentCampaign.status} />
              {isRealTimeActive && (
                <div className="flex items-center text-sm text-blue-600">
                  <Activity className="w-4 h-4 mr-1" /> Live Updates
                </div>
              )}
            </div>
          </div>
        </div>
        <button onClick={() => loadCampaignReport(campaignId)} className="flex items-center px-4 py-2 text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200">
          <RefreshCw className="w-4 h-4 mr-2" /> Refresh
        </button>
      </div>

      <CampaignInfoSection campaign={currentCampaign} />

      {metrics && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Performance Metrics</h2>
          <MetricsCards metrics={metrics} channel={currentCampaign.channel} />
        </div>
      )}

      {isRealTimeActive && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <Activity className="w-5 h-5 text-blue-600 mr-3" />
            <div className="flex-1">
              <div className="text-sm font-medium text-blue-900">Real-time Updates Active</div>
              <div className="text-xs text-blue-700">Delivery statuses are updating automatically</div>
            </div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Recipient Breakdown</h2>
        <RecipientTable recipients={currentCampaign.recipients} channel={currentCampaign.channel} loading={loading} />
      </div>

      {!isRealTimeActive && currentCampaign.status === CAMPAIGN_STATUS.RUNNING && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
            <div>
              <div className="text-sm font-medium text-green-900">Campaign Complete</div>
              <div className="text-xs text-green-700">All recipients have been processed</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignReport;
