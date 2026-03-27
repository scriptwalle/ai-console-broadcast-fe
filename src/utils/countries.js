// Comprehensive country data for international phone number support
export const COUNTRIES = [
  {
    code: '+1',
    name: 'United States',
    flag: '🇺🇸',
    phoneLength: 10,
    pattern: /^\d{10}$/,
    format: (number) => number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
  },
  {
    code: '+1',
    name: 'Canada',
    flag: '🇨🇦',
    phoneLength: 10,
    pattern: /^\d{10}$/,
    format: (number) => number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
  },
  {
    code: '+44',
    name: 'United Kingdom',
    flag: '🇬🇧',
    phoneLength: 10,
    pattern: /^\d{10}$/,
    format: (number) => number.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')
  },
  {
    code: '+91',
    name: 'India',
    flag: '🇮🇳',
    phoneLength: 10,
    pattern: /^\d{10}$/,
    format: (number) => number.replace(/(\d{5})(\d{5})/, '$1 $2')
  },
  {
    code: '+86',
    name: 'China',
    flag: '🇨🇳',
    phoneLength: 11,
    pattern: /^\d{11}$/,
    format: (number) => number.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3')
  },
  {
    code: '+49',
    name: 'Germany',
    flag: '🇩🇪',
    phoneLength: 11,
    pattern: /^\d{10,11}$/,
    format: (number) => number.replace(/(\d{3,4})(\d{7,8})/, '$1 $2')
  },
  {
    code: '+33',
    name: 'France',
    flag: '🇫🇷',
    phoneLength: 9,
    pattern: /^\d{9}$/,
    format: (number) => number.replace(/(\d{2})(\d{2})(\d{2})(\d{3})/, '$1 $2 $3 $4')
  },
  {
    code: '+81',
    name: 'Japan',
    flag: '🇯🇵',
    phoneLength: 11,
    pattern: /^\d{11}$/,
    format: (number) => number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
  },
  {
    code: '+82',
    name: 'South Korea',
    flag: '🇰🇷',
    phoneLength: 11,
    pattern: /^\d{11}$/,
    format: (number) => number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
  },
  {
    code: '+61',
    name: 'Australia',
    flag: '🇦🇺',
    phoneLength: 9,
    pattern: /^\d{9}$/,
    format: (number) => number.replace(/(\d{4})(\d{3})(\d{2})/, '$1 $2 $3')
  },
  {
    code: '+55',
    name: 'Brazil',
    flag: '🇧🇷',
    phoneLength: 11,
    pattern: /^\d{11}$/,
    format: (number) => number.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  },
  {
    code: '+52',
    name: 'Mexico',
    flag: '🇲🇽',
    phoneLength: 10,
    pattern: /^\d{10}$/,
    format: (number) => number.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')
  },
  {
    code: '+39',
    name: 'Italy',
    flag: '🇮🇹',
    phoneLength: 10,
    pattern: /^\d{10}$/,
    format: (number) => number.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')
  },
  {
    code: '+34',
    name: 'Spain',
    flag: '🇪🇸',
    phoneLength: 9,
    pattern: /^\d{9}$/,
    format: (number) => number.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')
  },
  {
    code: '+7',
    name: 'Russia',
    flag: '🇷🇺',
    phoneLength: 10,
    pattern: /^\d{10}$/,
    format: (number) => number.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')
  },
  {
    code: '+27',
    name: 'South Africa',
    flag: '🇿🇦',
    phoneLength: 9,
    pattern: /^\d{9}$/,
    format: (number) => number.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')
  },
  {
    code: '+20',
    name: 'Egypt',
    flag: '🇪🇬',
    phoneLength: 10,
    pattern: /^\d{10}$/,
    format: (number) => number.replace(/(\d{2})(\d{8})/, '$1 $2')
  },
  {
    code: '+234',
    name: 'Nigeria',
    flag: '🇳🇬',
    phoneLength: 11,
    pattern: /^\d{11}$/,
    format: (number) => number.replace(/(\d{3})(\d{3})(\d{5})/, '$1 $2 $3')
  },
  {
    code: '+254',
    name: 'Kenya',
    flag: '🇰🇪',
    phoneLength: 10,
    pattern: /^\d{10}$/,
    format: (number) => number.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')
  },
  {
    code: '+65',
    name: 'Singapore',
    flag: '🇸🇬',
    phoneLength: 8,
    pattern: /^\d{8}$/,
    format: (number) => number.replace(/(\d{4})(\d{4})/, '$1 $2')
  },
  {
    code: '+60',
    name: 'Malaysia',
    flag: '🇲🇾',
    phoneLength: 10,
    pattern: /^\d{10}$/,
    format: (number) => number.replace(/(\d{3})(\d{4})(\d{3})/, '$1-$2-$3')
  },
  {
    code: '+66',
    name: 'Thailand',
    flag: '🇹🇭',
    phoneLength: 9,
    pattern: /^\d{9}$/,
    format: (number) => number.replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3')
  },
  {
    code: '+62',
    name: 'Indonesia',
    flag: '🇮🇩',
    phoneLength: 11,
    pattern: /^\d{11}$/,
    format: (number) => number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
  },
  {
    code: '+63',
    name: 'Philippines',
    flag: '🇵🇭',
    phoneLength: 10,
    pattern: /^\d{10}$/,
    format: (number) => number.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')
  },
  {
    code: '+84',
    name: 'Vietnam',
    flag: '🇻🇳',
    phoneLength: 9,
    pattern: /^\d{9}$/,
    format: (number) => number.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')
  },
  {
    code: '+852',
    name: 'Hong Kong',
    flag: '🇭🇰',
    phoneLength: 8,
    pattern: /^\d{8}$/,
    format: (number) => number.replace(/(\d{4})(\d{4})/, '$1 $2')
  },
  {
    code: '+853',
    name: 'Macau',
    flag: '🇲🇴',
    phoneLength: 8,
    pattern: /^\d{8}$/,
    format: (number) => number.replace(/(\d{4})(\d{4})/, '$1 $2')
  },
  {
    code: '+886',
    name: 'Taiwan',
    flag: '🇹🇼',
    phoneLength: 9,
    pattern: /^\d{9}$/,
    format: (number) => number.replace(/(\d{2})(\d{4})(\d{4})/, '$1 $2 $3')
  },
  {
    code: '+90',
    name: 'Turkey',
    flag: '🇹🇷',
    phoneLength: 10,
    pattern: /^\d{10}$/,
    format: (number) => number.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')
  },
  {
    code: '+972',
    name: 'Israel',
    flag: '🇮🇱',
    phoneLength: 9,
    pattern: /^\d{9}$/,
    format: (number) => number.replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3')
  },
  {
    code: '+971',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    phoneLength: 9,
    pattern: /^\d{9}$/,
    format: (number) => number.replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3')
  },
  {
    code: '+966',
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    phoneLength: 9,
    pattern: /^\d{9}$/,
    format: (number) => number.replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3')
  },
  {
    code: '+968',
    name: 'Oman',
    flag: '🇴🇲',
    phoneLength: 8,
    pattern: /^\d{8}$/,
    format: (number) => number.replace(/(\d{4})(\d{4})/, '$1 $2')
  },
  {
    code: '+973',
    name: 'Bahrain',
    flag: '🇧🇭',
    phoneLength: 8,
    pattern: /^\d{8}$/,
    format: (number) => number.replace(/(\d{4})(\d{4})/, '$1 $2')
  },
  {
    code: '+974',
    name: 'Qatar',
    flag: '🇶🇦',
    phoneLength: 8,
    pattern: /^\d{8}$/,
    format: (number) => number.replace(/(\d{4})(\d{4})/, '$1 $2')
  },
  {
    code: '+965',
    name: 'Kuwait',
    flag: '🇰🇼',
    phoneLength: 8,
    pattern: /^\d{8}$/,
    format: (number) => number.replace(/(\d{4})(\d{4})/, '$1 $2')
  }
];

// Helper functions
export const getCountryByCode = (code) => {
  return COUNTRIES.find(country => country.code === code);
};

export const getDefaultCountry = () => {
  return COUNTRIES.find(country => country.code === '+91') || COUNTRIES[0];
};

export const validateInternationalPhone = (countryCode, number) => {
  const country = getCountryByCode(countryCode);
  if (!country) return false;
  
  return country.pattern.test(number.replace(/\s/g, ''));
};

export const formatInternationalPhone = (countryCode, number) => {
  const country = getCountryByCode(countryCode);
  if (!country) return `${countryCode} ${number}`;
  
  const cleanNumber = number.replace(/\s/g, '');
  const formattedNumber = country.format(cleanNumber);
  
  return `${countryCode} ${formattedNumber}`;
};
