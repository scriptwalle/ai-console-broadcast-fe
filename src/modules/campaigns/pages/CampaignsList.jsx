import React, { useState } from 'react';
import { useCampaigns } from '../hooks/useCampaigns.js';
import CampaignList from '../components/CampaignList.jsx';
import CreateCampaignEnhanced from './CreateCampaignEnhanced.jsx';

const CampaignsList = () => {
  const {
    campaigns,
    loading,
    error,
    addCampaign,
    updateCampaign,
    deleteCampaign,
    clearError,
    creatingCampaign
  } = useCampaigns();

  const [showCreateCampaign, setShowCreateCampaign] = useState(false);

  React.useEffect(() => {
    if (error) { 
      alert(error); 
      clearError(); 
    }
  }, [error, clearError]);

  const handleCreateCampaign = async (campaignData) => {
    const result = await addCampaign(campaignData);
    if (result.success) {
      setShowCreateCampaign(false);
    }
  };

  const handleEditCampaign = async (campaignData) => {
    // For now, just create a new campaign (edit functionality can be added later)
    const result = await addCampaign(campaignData);
    if (result.success) {
      setShowCreateCampaign(false);
    }
  };

  const handleDeleteCampaign = async (campaignId) => {
    const result = await deleteCampaign(campaignId);
    if (!result.success) alert(result.error);
  };

  const handleViewCampaign = (campaign) => {
    // TODO: Implement campaign view modal/page
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Campaigns</h1>
        <p className="text-slate-600 dark:text-slate-400">Create and manage your broadcast campaigns.</p>
      </div>

      <CampaignList
        campaigns={campaigns}
        loading={loading}
        onEdit={handleEditCampaign}
        onDelete={handleDeleteCampaign}
        onCreate={() => setShowCreateCampaign(true)}
        onView={handleViewCampaign}
      />

      {showCreateCampaign && (
        <CreateCampaignEnhanced
          campaign={null}
          onSave={handleCreateCampaign}
          onCancel={() => setShowCreateCampaign(false)}
          loading={creatingCampaign}
        />
      )}
    </div>
  );
};

export default CampaignsList;
