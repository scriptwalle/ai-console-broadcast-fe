import { CSV_HEADERS } from './constants.js';
import { validateContact } from './validation.js';

export const parseCSV = (csvText) => {
  const lines = csvText.trim().split('\n');
  if (lines.length === 0) {
    return { contacts: [], errors: [] };
  }

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const contacts = [];
  const errors = [];

  // Validate headers
  const hasRequiredHeaders = ['name', 'email', 'phone'].every(h => headers.includes(h));
  if (!hasRequiredHeaders) {
    errors.push({
      row: 0,
      error: 'CSV must contain at least name, email, and phone columns'
    });
    return { contacts, errors };
  }

  // Parse data rows
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const rowData = {};

    headers.forEach((header, index) => {
      rowData[header] = values[index] || '';
    });

    // Validate contact data
    const validationErrors = validateContact(rowData);
    
    if (Object.keys(validationErrors).length > 0) {
      errors.push({
        row: i + 1,
        data: rowData,
        errors: validationErrors
      });
    } else {
      contacts.push({
        ...rowData,
        id: `contact-${Date.now()}-${i}`,
        groups: rowData.group ? [rowData.group] : []
      });
    }
  }

  return { contacts, errors };
};

export const generateErrorReport = (errors) => {
  let report = 'CSV Import Error Report\n';
  report += '========================\n\n';

  errors.forEach(error => {
    report += `Row ${error.row}:\n`;
    if (error.data) {
      report += `  Data: ${JSON.stringify(error.data, null, 2)}\n`;
    }
    report += `  Errors:\n`;
    if (typeof error.errors === 'object') {
      Object.entries(error.errors).forEach(([field, fieldErrors]) => {
        fieldErrors.forEach(err => {
          report += `    ${field}: ${err}\n`;
        });
      });
    } else {
      report += `    ${error.error}\n`;
    }
    report += '\n';
  });

  return report;
};
