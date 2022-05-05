export const getConfig = () => ({
  DISCORD_TOKEN: process.env.DISCORD_TOKEN || '',
  KGB_API_URL: process.env.KGB_API_URL || '',
  PORT: process.env.PORT || 4000
});
