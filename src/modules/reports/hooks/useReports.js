import { useReducer, useEffect, useRef } from 'react';
import { MOCK_CAMPAIGNS, calculateCampaignMetrics } from '../utils/mockData.js';
import { getNextStatus, getBatchUpdateRecipients, getRandomUpdateInterval, isCampaignComplete, getStatusUpdateMessage } from '../utils/statusUtils.js';
import { reportsReducer, initialReportsState, REPORTS_ACTION_TYPES } from './reportsReducer.js';

export const useReports = () => {
  const [state, dispatch] = useReducer(reportsReducer, initialReportsState);
  const updateIntervals = useRef({});

  useEffect(() => {
    dispatch({ type: REPORTS_ACTION_TYPES.SET_LOADING, payload: true });
    setTimeout(() => {
      dispatch({ type: REPORTS_ACTION_TYPES.SET_CAMPAIGNS, payload: MOCK_CAMPAIGNS });
      MOCK_CAMPAIGNS.forEach(campaign => {
        if (campaign.executedAt && campaign.recipients.length > 0) {
          dispatch({ type: REPORTS_ACTION_TYPES.CREATE_SNAPSHOT, payload: { campaignId: campaign.id, snapshot: { campaignId: campaign.id, executedAt: campaign.executedAt, recipients: [...campaign.recipients], metrics: calculateCampaignMetrics(campaign.recipients, campaign.channel) } } });
        }
      });
    }, 500);
  }, []);

  const loadCampaignReport = async (campaignId) => {
    dispatch({ type: REPORTS_ACTION_TYPES.SET_LOADING, payload: true });
    await new Promise(resolve => setTimeout(resolve, 300));
    const campaign = state.campaigns.find(c => c.id === campaignId);
    if (campaign) {
      dispatch({ type: REPORTS_ACTION_TYPES.SET_CURRENT_CAMPAIGN, payload: campaign });
      if (campaign.status === 'running') startRealTimeUpdates(campaignId, campaign.channel);
    }
  };

  const startRealTimeUpdates = (campaignId, channel) => {
    stopRealTimeUpdates(campaignId);
    const intervalId = setInterval(() => {
      const campaign = state.campaigns.find(c => c.id === campaignId);
      if (!campaign || isCampaignComplete(campaign.recipients, channel)) { stopRealTimeUpdates(campaignId); return; }
      const batchRecipients = getBatchUpdateRecipients(campaign.recipients);
      if (batchRecipients.length === 0) { stopRealTimeUpdates(campaignId); return; }
      const updates = batchRecipients.map(r => ({ recipientId: r.id, newStatus: getNextStatus(r.status, channel) })).filter(u => u.newStatus);
      if (updates.length > 0) dispatch({ type: REPORTS_ACTION_TYPES.BATCH_UPDATE_RECIPIENTS, payload: { campaignId, updates } });
    }, getRandomUpdateInterval());
    updateIntervals.current[campaignId] = intervalId;
    dispatch({ type: REPORTS_ACTION_TYPES.SET_REAL_TIME_UPDATES, payload: { campaignId, intervalId } });
  };

  const stopRealTimeUpdates = (campaignId) => {
    const intervalId = updateIntervals.current[campaignId];
    if (intervalId) { clearInterval(intervalId); delete updateIntervals.current[campaignId]; }
    dispatch({ type: REPORTS_ACTION_TYPES.CLEAR_REAL_TIME_UPDATES, payload: { campaignId } });
  };

  useEffect(() => () => { Object.values(updateIntervals.current).forEach(clearInterval); }, []);

  const getCampaignMetrics = (campaignId) => {
    const campaign = state.campaigns.find(c => c.id === campaignId);
    return campaign ? calculateCampaignMetrics(campaign.recipients, campaign.channel) : null;
  };

  const getFilteredRecipients = (campaignId) => {
    const campaign = state.campaigns.find(c => c.id === campaignId);
    if (!campaign) return [];
    return campaign.recipients.filter(r => (!state.filters.search || r.name.toLowerCase().includes(state.filters.search.toLowerCase()) || r.identifier.toLowerCase().includes(state.filters.search.toLowerCase())) && (state.filters.status === 'all' || r.status === state.filters.status));
  };

  return {
    ...state,
    loadCampaignReport,
    startRealTimeUpdates,
    stopRealTimeUpdates,
    getCampaignMetrics,
    getFilteredRecipients,
    setFilters: (filters) => dispatch({ type: REPORTS_ACTION_TYPES.SET_FILTERS, payload: filters }),
    clearError: () => dispatch({ type: REPORTS_ACTION_TYPES.SET_ERROR, payload: null })
  };
};
