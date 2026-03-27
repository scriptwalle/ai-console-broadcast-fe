import { useReducer } from 'react';
import { INITIAL_CAMPAIGN_STATE, CAMPAIGN_STATUS } from '../utils/constants.js';
import { MOCK_CAMPAIGNS } from '../utils/mockData.js';
import { getRunNowTime } from '../utils/scheduler.js';

const initialCampaignsState = {
  campaigns: MOCK_CAMPAIGNS,
  loading: false,
  error: null,
  creatingCampaign: false
};

const CAMPAIGNS_ACTION_TYPES = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_CAMPAIGNS: 'SET_CAMPAIGNS',
  ADD_CAMPAIGN: 'ADD_CAMPAIGN',
  UPDATE_CAMPAIGN: 'UPDATE_CAMPAIGN',
  DELETE_CAMPAIGN: 'DELETE_CAMPAIGN',
  SET_CREATING_CAMPAIGN: 'SET_CREATING_CAMPAIGN'
};

const campaignsReducer = (state, action) => {
  switch (action.type) {
    case CAMPAIGNS_ACTION_TYPES.SET_LOADING:
      return { ...state, loading: action.payload };
    case CAMPAIGNS_ACTION_TYPES.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case CAMPAIGNS_ACTION_TYPES.SET_CAMPAIGNS:
      return { ...state, campaigns: action.payload, loading: false, error: null };
    case CAMPAIGNS_ACTION_TYPES.ADD_CAMPAIGN:
      return { 
        ...state, 
        campaigns: [...state.campaigns, { ...action.payload, id: `campaign-${Date.now() }` }], 
        loading: false, 
        error: null 
      };
    case CAMPAIGNS_ACTION_TYPES.UPDATE_CAMPAIGN:
      return { 
        ...state, 
        campaigns: state.campaigns.map(c => c.id === action.payload.id ? action.payload : c), 
        loading: false, 
        error: null 
      };
    case CAMPAIGNS_ACTION_TYPES.DELETE_CAMPAIGN:
      return { 
        ...state, 
        campaigns: state.campaigns.filter(c => c.id !== action.payload), 
        loading: false, 
        error: null 
      };
    case CAMPAIGNS_ACTION_TYPES.SET_CREATING_CAMPAIGN:
      return { ...state, creatingCampaign: action.payload };
    default:
      return state;
  }
};

export const useCampaigns = () => {
  const [state, dispatch] = useReducer(campaignsReducer, initialCampaignsState);

  const addCampaign = async (campaignData) => {
    dispatch({ type: CAMPAIGNS_ACTION_TYPES.SET_CREATING_CAMPAIGN, payload: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newCampaign = {
      ...campaignData,
      status: CAMPAIGN_STATUS.SCHEDULED,
      scheduledTime: campaignData.runNow ? getRunNowTime() : campaignData.scheduleTime,
      createdAt: new Date().toISOString()
    };
    
    dispatch({ type: CAMPAIGNS_ACTION_TYPES.ADD_CAMPAIGN, payload: newCampaign });
    dispatch({ type: CAMPAIGNS_ACTION_TYPES.SET_CREATING_CAMPAIGN, payload: false });
    
    return { success: true };
  };

  const updateCampaign = async (campaignId, campaignData) => {
    dispatch({ type: CAMPAIGNS_ACTION_TYPES.SET_LOADING, payload: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    dispatch({ type: CAMPAIGNS_ACTION_TYPES.UPDATE_CAMPAIGN, payload: { ...campaignData, id: campaignId } });
    return { success: true };
  };

  const deleteCampaign = async (campaignId) => {
    dispatch({ type: CAMPAIGNS_ACTION_TYPES.SET_LOADING, payload: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    dispatch({ type: CAMPAIGNS_ACTION_TYPES.DELETE_CAMPAIGN, payload: campaignId });
    return { success: true };
  };

  const clearError = () => dispatch({ type: CAMPAIGNS_ACTION_TYPES.SET_ERROR, payload: null });

  return {
    ...state,
    addCampaign,
    updateCampaign,
    deleteCampaign,
    clearError
  };
};
