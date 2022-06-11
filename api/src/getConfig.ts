export const getConfig = () => ({
  PORT: process.env.PORT || 4000,
  SUPABASE_URL: process.env.SUPABASE_URL || '',
  SUPABASE_KEY: process.env.SUPABASE_KEY || ''
});
