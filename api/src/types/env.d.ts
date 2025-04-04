declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    JWT_SECRET: string;
    JWT_EXPIRATION: string;
    DATABASE_URL: string;
    SALT_ROUNDS: string;
  }
}
