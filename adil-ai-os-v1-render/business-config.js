export const business = {
  name: process.env.BUSINESS_NAME || 'Adil Tech Solution',
  email: process.env.BUSINESS_EMAIL || 'adilteachsolution@gmail.com',
  website: 'https://adilteachsolution.github.io/adiltechsolution/',
  whatsapp: process.env.WHATSAPP_NUMBER || '',
  packages: [
    { id: 'basic', name: 'Basic', price: 199, bestFor: 'simple projects and customers starting small' },
    { id: 'standard', name: 'Standard', price: 499, bestFor: 'growing businesses that need more features and support' },
    { id: 'premium', name: 'Premium', price: 999, bestFor: 'advanced projects, automation and more complete business solutions' }
  ],
  services: [
    'Website Development', 'App Development', 'AI Solutions', 'SEO',
    'Social Media Marketing', 'Google Business Profile Management',
    'Graphic Design', 'Technical Support'
  ]
};
