export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getRunNowTime = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 2); // 2-minute buffer
  return now.toISOString();
};

export const validateScheduleTime = (scheduledTime) => {
  const scheduleDate = new Date(scheduledTime);
  const now = new Date();
  
  return scheduleDate > now;
};

export const validateLapseTime = (scheduledTime, lapseTime) => {
  if (!scheduledTime || !lapseTime) return false;
  
  const scheduleDate = new Date(scheduledTime);
  const lapseDate = new Date(lapseTime);
  
  return lapseDate > scheduleDate;
};

export const generateMockContacts = (count = 100) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `contact-${i + 1}`,
    name: `Contact ${i + 1}`,
    phone: `+123456789${i.toString().padStart(2, '0')}`,
    email: `contact${i + 1}@example.com`
  }));
};
