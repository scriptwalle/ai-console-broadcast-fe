# API Wrapper Documentation

## Overview

The common API wrapper provides a standardized way to make API calls across all modules (Address Book, Templates, Campaigns, etc.). It handles authentication, environment configuration, request formatting, and error handling automatically.

## Environment Configuration

The API wrapper supports multiple environments (DEV, UAT, PROD) through environment variables.

### Setup

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Update `.env.local` with your environment settings:
```env
# API Environment (dev, uat, prod)
VITE_API_ENV=dev

# Environment-specific URLs
VITE_DEV_API_URL=http://localhost:8004/api/v4
VITE_UAT_API_URL=https://uat-api.example.com/api/v4
VITE_PROD_API_URL=https://api.example.com/api/v4
```

### Environment Priority

1. **DEV** (default): Uses `VITE_DEV_API_URL` or falls back to `http://localhost:8004/api/v4`
2. **UAT**: Uses `VITE_UAT_API_URL` or falls back to `https://uat-api.example.com/api/v4`
3. **PROD**: Uses `VITE_PROD_API_URL` or falls back to `https://api.example.com/api/v4`

### Environment Detection

```javascript
import { getCurrentEnvironment, getApiUrl } from '../services/api.js';

console.log('Current Environment:', getCurrentEnvironment()); // dev, uat, prod
console.log('API URL:', getApiUrl()); // Environment-specific URL
```

## Usage Examples

### Basic Usage

```javascript
import { api } from '../services/api.js';

// Simple GET request (uses environment-specific URL)
const response = await api.get('listNotificationUserData', { page: '1' });

// POST request with data
const response = await api.post('createTemplate', {}, templateData);

// PUT request for updates
const response = await api.put('updateTemplate', { template_id: '123' }, templateData);

// DELETE request
const response = await api.delete('deleteTemplate', { template_id: '123' });
```

### Custom API Instance

```javascript
import { APIWrapper } from '../services/api.js';

// Create custom instance for different endpoint
const customAPI = new APIWrapper('/custom-endpoint');

const response = await customAPI.get('customAction', { param: 'value' });
```

### Module-Specific API Services

#### Address Book API
```javascript
import { addressBookAPI } from '../services/addressBookAPI.js';

// Get contacts with pagination (uses environment URL)
const contacts = await addressBookAPI.getContacts(1);
```

#### Templates API
```javascript
import { templatesAPI } from '../services/templatesAPI.js';

// Get templates
const templates = await templatesAPI.getTemplates(1, { status: 'approved' });

// Create template
const newTemplate = await templatesAPI.createTemplate(templateData);
```

#### Campaigns API
```javascript
import { campaignsAPI } from '../services/campaignsAPI.js';

// Get campaigns
const campaigns = await campaignsAPI.getCampaigns(1, { status: 'active' });

// Schedule campaign
const result = await campaignsAPI.scheduleCampaign(campaignId, scheduleData);
```

## Request Structure

All API calls are automatically formatted as:

```javascript
{
  data: {
    _action: "actionName",
    _param: {
      group_id: "from localStorage",
      ...yourParams
    },
    ...additionalData
  }
}
```

## Features

### Environment Support
- Automatic environment detection from `VITE_API_ENV`
- Environment-specific base URLs
- Debug logging of current environment and URL
- `X-Environment` header added to all requests

### Automatic Authentication
- Authorization header is automatically added from localStorage
- Group ID is automatically included in all requests

### Error Handling
- 401 errors are automatically logged
- All errors are caught and logged with context

### Console Logging
- All requests and responses are logged to console
- Environment information logged for debugging
- Easy debugging with action-specific labels

### Pagination Support
- Built-in support for paginated requests
- Automatic page parameter handling

## Response Handling

```javascript
try {
  const response = await api.get('listNotificationUserData', { page: '1' });
  
  // Handle response data
  if (response.data && response.data.data) {
    const contacts = response.data.data.users || response.data.data;
    console.log('Contacts loaded:', contacts);
  }
} catch (error) {
  console.error('API call failed:', error);
  // Handle error
}
```

## Advanced Usage

### Custom Endpoint Calls
```javascript
import { api } from '../services/api.js';

// Call different endpoint
const response = await api.customCall('/different-endpoint', 'customAction', params);
```

### Direct Axios Access
```javascript
import apiClient from '../services/api.js';

// Use axios client directly for custom requests
const response = await apiClient.post('/custom', data, {
  headers: { 'Custom-Header': 'value' }
});
```

### Environment-Specific Logic
```javascript
import { getCurrentEnvironment } from '../services/api.js';

const env = getCurrentEnvironment();
if (env === 'prod') {
  // Production-specific logic
} else if (env === 'uat') {
  // UAT-specific logic
} else {
  // Development-specific logic
}
```

## Best Practices

1. **Use module-specific APIs**: Prefer using `addressBookAPI`, `templatesAPI`, etc. over direct `api` calls
2. **Handle errors**: Always wrap API calls in try-catch blocks
3. **Check response structure**: Verify response data structure before using
4. **Use pagination**: Implement proper pagination for large datasets
5. **Console debugging**: Use the built-in console logs for debugging
6. **Environment variables**: Keep sensitive URLs in environment files
7. **Test environments**: Test API calls in all environments before deployment

## Authentication Requirements

The API wrapper requires:
- Authorization key in localStorage (`authKey`)
- Group ID in localStorage (`groupId`)

Configure these using the profile icon in the header before making API calls.

## Deployment Considerations

### Development
```env
VITE_API_ENV=dev
VITE_DEV_API_URL=http://localhost:8004/api/v4
```

### UAT/Staging
```env
VITE_API_ENV=uat
VITE_UAT_API_URL=https://uat-api.yourdomain.com/api/v4
```

### Production
```env
VITE_API_ENV=prod
VITE_PROD_API_URL=https://api.yourdomain.com/api/v4
```

The application will automatically use the correct URL based on the `VITE_API_ENV` variable.
