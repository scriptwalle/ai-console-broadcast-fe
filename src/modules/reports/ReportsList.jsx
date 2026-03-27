import React, { useState, useEffect } from 'react';
import { useReports } from './hooks/useReports.js';
import CampaignsTable from './components/CampaignsTable.jsx';

const ReportsList = () => {
  const {
    campaigns,
    loading,
    error,
    filters,
    loadCampaignReport,
    setFilters,
    clearError
  } = useReports();

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (error) {
      alert(error);
      clearError();
    }
  }, [error, clearError]);

  const handleViewReport = (campaignId) => {
    loadCampaignReport(campaignId);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Reports & Analytics</h1>
        <p className="text-slate-600 dark:text-slate-400">View detailed campaign performance and delivery reports.</p>
      </div>

      <CampaignsTable
        campaigns={campaigns}
        loading={loading}
        onViewReport={handleViewReport}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </div>
  );
};

export default ReportsList;
