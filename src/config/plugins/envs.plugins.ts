process.loadEnvFile();

export const env = {
    PORT: process.env.PORT || 3000,
    MAILER_EMAIL: process.env.MAILER_EMAIL || '',
    MAILER_SECRET_KEY: process.env.MAILER_SECRET_KEY || '',
}