import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Phone } from 'lucide-react';
import { COUNTRIES, getCountryByCode, getDefaultCountry, validateInternationalPhone, formatInternationalPhone } from '../utils/countries.js';

const PhoneInput = ({ 
  value = { countryCode: '+91', number: '' }, 
  onChange, 
  error, 
  label, 
  placeholder = 'Enter phone number',
  disabled = false,
  required = false 
}) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [validationError, setValidationError] = useState('');

  // Initialize with default country
  useEffect(() => {
    const defaultCountry = value.countryCode ? getCountryByCode(value.countryCode) : getDefaultCountry();
    setSelectedCountry(defaultCountry);
    setPhoneNumber(value.number || '');
  }, [value.countryCode, value.number]);

  // Custom styles for react-select
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '40px',
      borderColor: error ? '#ef4444' : state.isFocused ? '#3b82f6' : '#d1d5db',
      '&:hover': {
        borderColor: error ? '#ef4444' : '#3b82f6',
      },
      boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none',
      fontSize: '14px',
      borderRadius: '0.75rem', // rounded-xl
    }),
    option: (provided, state) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      padding: '8px 12px',
      fontSize: '14px',
      backgroundColor: state.isFocused ? '#f3f4f6' : 'white',
      color: '#1f2937',
    }),
    singleValue: (provided) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      color: '#1f2937',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#6b7280',
      '&:hover': {
        color: '#374151',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none', // Hide the separator line
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 1000,
      position: 'absolute',
    }),
    menuList: (provided) => ({
      ...provided,
      padding: '4px',
      maxHeight: '200px',
      overflowY: 'auto',
    }),
  };

  // Format option display
  const formatOptionLabel = (country) => (
    <div className="flex items-center">
      <span className="mr-2 text-lg">{country.flag}</span>
      <span>{country.code} - {country.name}</span>
    </div>
  );

  // Format selected value
  const formatSingleValue = (country) => (
    <div className="flex items-center">
      <span className="mr-2 text-lg">{country.flag}</span>
      <span>{country.code}</span>
    </div>
  );

  // Handle country change
  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    handleChange(selectedOption, phoneNumber);
  };

  // Handle phone number change
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    setPhoneNumber(value);
    handleChange(selectedCountry, value);
  };

  // Combined change handler
  const handleChange = (country, number) => {
    const newPhoneValue = {
      countryCode: country.code,
      number: number
    };
    
    // Validate phone number
    if (number && !validateInternationalPhone(country.code, number)) {
      setValidationError(`Phone number must be ${country.phoneLength} digits`);
    } else {
      setValidationError('');
    }
    
    onChange(newPhoneValue);
  };

  // Get formatted display value
  const getDisplayValue = () => {
    if (!selectedCountry || !phoneNumber) return '';
    return formatInternationalPhone(selectedCountry.code, phoneNumber);
  };

  return (
    <div>
      <label className={`flex items-center text-sm font-medium text-slate-700 mb-1 ${required ? 'required' : ''}`}>
        <Phone className="w-4 h-4 mr-1" />
        {label}
      </label>
      <div className="flex space-x-2">
        {/* Country Code Selector */}
        <div className="w-40">
          <Select
            value={selectedCountry}
            onChange={handleCountryChange}
            options={COUNTRIES}
            styles={customStyles}
            formatOptionLabel={formatOptionLabel}
            formatSingleValue={formatSingleValue}
            isDisabled={disabled}
            placeholder="Select country"
            isSearchable={false}
            menuPlacement="auto"
          />
        </div>
        
        {/* Phone Number Input */}
        <div className="flex-1">
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-slate-100 ${
              error || validationError ? 'border-red-500' : 'border-slate-300'
            }`}
            maxLength={selectedCountry?.phoneLength || 15}
          />
        </div>
      </div>
      
      {/* Display formatted full number */}
      {getDisplayValue() && (
        <div className="mt-1 text-xs text-slate-500">
          Full: {getDisplayValue()}
        </div>
      )}
      
      {/* Error Display */}
      {(error || validationError) && (
        <p className="mt-1 text-sm text-red-600">
          {error || validationError}
        </p>
      )}
    </div>
  );
};

export default PhoneInput;
