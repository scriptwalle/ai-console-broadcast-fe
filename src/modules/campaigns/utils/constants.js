export const CAMPAIGN_CHANNELS = {
  WHATSAPP: 'whatsapp',
  SMS: 'sms',
  EMAIL: 'email'
};

export const CAMPAIGN_STATUS = {
  DRAFT: 'draft',
  SCHEDULED: 'scheduled',
  RUNNING: 'running',
  COMPLETED: 'completed',
  FAILED: 'failed'
};

export const INITIAL_CAMPAIGN_STATE = {
  name: '',
  channel: '',
  templateId: '',
  selectedContacts: [],
  selectedGroups: [],
  selectAllContacts: false,
  selectAllGroups: false,
  variables: {},
  scheduleTime: null,
  lapseTime: null,
  runNow: true,
  status: CAMPAIGN_STATUS.DRAFT
};

export const SCHEDULE_OPTIONS = {
  RUN_NOW: 'run_now',
  RUN_LATER: 'run_later'
};

export const TEMPLATE_STATUS = {
  APPROVED: 'approved',
  ACTIVE: 'active',
  PENDING: 'pending',
  REJECTED: 'rejected',
  INACTIVE: 'inactive'
};
