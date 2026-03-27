import axios from 'axios';
import { getAuthKey, getGroupId } from '../utils/auth.js';

// Environment configuration
const getApiBaseUrl = () => {
  const env = import.meta.env.VITE_API_ENV || 'dev';
  
  switch (env.toLowerCase()) {
    case 'uat':
      return import.meta.env.VITE_UAT_API_URL || 'https://uat-api.example.com/api/v4';
    case 'prod':
      return import.meta.env.VITE_PROD_API_URL || 'https://api.example.com/api/v4';
    case 'dev':
    default:
      return import.meta.env.VITE_DEV_API_URL || 'http://localhost:8004/api/v4';
  }
};

// Get current environment
export const getCurrentEnvironment = () => {
  return import.meta.env.VITE_API_ENV || 'dev';
};

// Get API base URL
export const getApiUrl = () => {
  const url = getApiBaseUrl();
  return url;
};

// Create axios instance with environment-based configuration
const apiClient = axios.create({
  baseURL: getApiUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add authorization header
apiClient.interceptors.request.use(
  (config) => {
    const authKey = getAuthKey();
    if (authKey) {
      config.headers['authorization'] = authKey;
    }
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.response?.status === 401) {
      console.error('Unauthorized - Please check your authorization key');
    }
    return Promise.reject(error);
  }
);

// Common API wrapper class
class APIWrapper {
  constructor(endpoint = '/apiai') {
    this.endpoint = endpoint;
  }

  // Generic API call method
  async call(action, params = {}, additionalData = {}) {
    try {
      const requestData = {
        data: {
          _action: action,
          _param: {
            group_id: getGroupId(),
            ...params
          },
          ...additionalData
        }
      };

      const response = await apiClient.post(this.endpoint, requestData);
      return response.data;
    } catch (error) {
      console.error(`API Error [${action}]:`, error);
      throw error;
    }
  }

  // Get method for fetching data with pagination
  async get(action, params = {}, page = 1) {
    return this.call(action, { ...params, page: page.toString() });
  }

  // Post method for creating data
  async post(action, params = {}, data = {}) {
    return this.call(action, params, data);
  }

  // Put method for updating data
  async put(action, params = {}, data = {}) {
    return this.call(action, params, data);
  }

  // Delete method for removing data
  async delete(action, params = {}) {
    return this.call(action, params);
  }

  // Custom endpoint method
  async customCall(endpoint, action, params = {}, additionalData = {}) {
    try {
      const requestData = {
        data: {
          _action: action,
          _param: {
            group_id: getGroupId(),
            ...params
          },
          ...additionalData
        }
      };

      const response = await apiClient.post(endpoint, requestData);
      
      return response.data;
    } catch (error) {
      console.error(`Custom API Error [${action}]:`, error);
      throw error;
    }
  }
}

// Create default API wrapper instance
export const api = new APIWrapper();

// Export the class for creating custom instances
export { APIWrapper };

// Export the axios client for advanced usage
export default apiClient;
