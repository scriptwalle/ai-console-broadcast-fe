export const ENHANCED_MOCK_DATA = {
  user_name: "John Doe",
  phone_number: "+9876543210", 
  email_id: "john.doe@example.com",
  company_name: "Acme Corporation",
  order_id: "ORD-12345",
  verification_code: "789456",
  appointment_date: "March 28, 2026",
  amount: "$299.99",
  product_name: "Premium Subscription",
  support_phone: "+18001234567",
  website: "www.acmecorp.com",
  address: "123 Business Ave, Suite 100, New York, NY 10001",
  team_name: "Customer Success Team",
  manager_name: "Sarah Johnson",
  meeting_time: "2:00 PM EST",
  delivery_date: "April 1, 2026",
  tracking_number: "TRK123456789",
  invoice_number: "INV-2026-0328",
  discount_code: "SAVE20",
  renewal_date: "March 28, 2027"
};

export const getMockDataForPlaceholders = (placeholders) => {
  const mockData = {};
  
  placeholders.forEach(placeholder => {
    if (ENHANCED_MOCK_DATA[placeholder]) {
      mockData[placeholder] = ENHANCED_MOCK_DATA[placeholder];
    } else {
      // Generate default value for unknown placeholders
      mockData[placeholder] = `[${placeholder.replace(/_/g, ' ').toUpperCase()}]`;
    }
  });
  
  return mockData;
};
