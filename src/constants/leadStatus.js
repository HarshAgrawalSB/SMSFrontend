export const LEAD_STATUS_OPTIONS = [
  'NEW_LEAD',
  'CONTACTED',
  'INFORMATION_SESSION_ATTENDED',
  'APPLICATION_SUBMITTED',
  'ENROLLED',
  'LOST'
];

export const LEAD_STATUS_LABELS = {
  NEW_LEAD: 'New lead',
  CONTACTED: 'Contacted',
  INFORMATION_SESSION_ATTENDED: 'Information session attended',
  APPLICATION_SUBMITTED: 'Application submitted',
  ENROLLED: 'Enrolled',
  LOST: 'Lost'
};

export const getLeadStatusLabel = (status) => LEAD_STATUS_LABELS[status] ?? status;
