export const REPORTS_ACTION_TYPES = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_CAMPAIGNS: 'SET_CAMPAIGNS',
  SET_CURRENT_CAMPAIGN: 'SET_CURRENT_CAMPAIGN',
  UPDATE_RECIPIENT_STATUS: 'UPDATE_RECIPIENT_STATUS',
  BATCH_UPDATE_RECIPIENTS: 'BATCH_UPDATE_RECIPIENTS',
  CREATE_SNAPSHOT: 'CREATE_SNAPSHOT',
  SET_REAL_TIME_UPDATES: 'SET_REAL_TIME_UPDATES',
  CLEAR_REAL_TIME_UPDATES: 'CLEAR_REAL_TIME_UPDATES',
  SET_FILTERS: 'SET_FILTERS'
};

export const initialReportsState = {
  campaigns: [],
  currentCampaign: null,
  loading: false,
  error: null,
  snapshots: {},
  realTimeUpdates: {},
  filters: { search: '', status: 'all', channel: 'all' }
};

export const reportsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_CAMPAIGNS':
      return { ...state, campaigns: action.payload, loading: false, error: null };
    case 'SET_CURRENT_CAMPAIGN':
      return { ...state, currentCampaign: action.payload, loading: false, error: null };
    case 'BATCH_UPDATE_RECIPIENTS': {
      const { campaignId, updates } = action.payload;
      return {
        ...state,
        campaigns: state.campaigns.map(c => {
          if (c.id !== campaignId) return c;
          return { ...c, recipients: c.recipients.map(r => {
            const update = updates.find(u => u.recipientId === r.id);
            return update ? { ...r, status: update.newStatus, updatedAt: Date.now() } : r;
          })};
        })
      };
    }
    case 'CREATE_SNAPSHOT': {
      const { campaignId, snapshot } = action.payload;
      return { ...state, snapshots: { ...state.snapshots, [campaignId]: snapshot } };
    }
    case 'SET_REAL_TIME_UPDATES':
      return { ...state, realTimeUpdates: { ...state.realTimeUpdates, [action.payload.campaignId]: action.payload.intervalId } };
    case 'CLEAR_REAL_TIME_UPDATES': {
      const id = state.realTimeUpdates[action.payload.campaignId];
      if (id) clearInterval(id);
      const newUpdates = { ...state.realTimeUpdates };
      delete newUpdates[action.payload.campaignId];
      return { ...state, realTimeUpdates: newUpdates };
    }
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    default:
      return state;
  }
};
