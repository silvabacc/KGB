export const getConfig = () => ({
  PORT: process.env.PORT || 4000,
  GCP_PROJECT_ID: process.env.GCP_PROJECT_ID || '',
  GCP_PRIVATE_KEY: process.env.GCP_PRIVATE_KEY
    ? process.env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n')
    : '',
  GCP_CLIENT_EMAIL: process.env.GCP_CLIENT_EMAIL || '',
  SUPABASE_URL: process.env.SUPABASE_URL || '',
  SUPABASE_KEY: process.env.SUPABASE_KEY || ''
});
