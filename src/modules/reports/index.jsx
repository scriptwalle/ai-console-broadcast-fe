import React, { useState } from 'react';
import ReportsList from './ReportsList.jsx';
import CampaignReport from './CampaignReport.jsx';

const ReportsPage = () => {
  const [currentCampaignId, setCurrentCampaignId] = useState(null);

  const handleViewReport = (campaignId) => {
    setCurrentCampaignId(campaignId);
  };

  const handleBackToList = () => {
    setCurrentCampaignId(null);
  };

  if (currentCampaignId) {
    return (
      <CampaignReport 
        campaignId={currentCampaignId} 
        onBack={handleBackToList}
      />
    );
  }

  return <ReportsList onViewReport={handleViewReport} />;
};

export default ReportsPage;

// Export as named export for App.jsx import
export { ReportsPage };

// Export components for direct use
export { default as ReportsList } from './ReportsList.jsx';
export { default as CampaignReport } from './CampaignReport.jsx';
export { default as MetricsCards } from './components/MetricsCards.jsx';
export { default as RecipientTable } from './components/RecipientTable.jsx';
export { default as StatusBadge } from './components/StatusBadge.jsx';
export { useReports } from './hooks/useReports.js';
export * from './utils/constants.js';
export * from './utils/statusUtils.js';
export * from './utils/mockData.js';
