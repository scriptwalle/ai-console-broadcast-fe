export const getAuthKey = () => {
  return localStorage.getItem('authKey');
};

export const getGroupId = () => {
  return localStorage.getItem('groupId');
};

export const setAuthKey = (key) => {
  if (key && key.trim()) {
    localStorage.setItem('authKey', key.trim());
    return true;
  }
  return false;
};

export const setGroupId = (groupId) => {
  if (groupId && groupId.trim()) {
    localStorage.setItem('groupId', groupId.trim());
    return true;
  }
  return false;
};

export const setAuthConfig = (key, groupId) => {
  const keySet = setAuthKey(key);
  const groupSet = setGroupId(groupId);
  return keySet && groupSet;
};

export const clearAuthKey = () => {
  localStorage.removeItem('authKey');
};

export const clearGroupId = () => {
  localStorage.removeItem('groupId');
};

export const clearAuthConfig = () => {
  localStorage.removeItem('authKey');
  localStorage.removeItem('groupId');
};

export const hasAuthKey = () => {
  return !!localStorage.getItem('authKey');
};

export const hasGroupId = () => {
  return !!localStorage.getItem('groupId');
};

export const hasAuthConfig = () => {
  return !!localStorage.getItem('authKey') && !!localStorage.getItem('groupId');
};
