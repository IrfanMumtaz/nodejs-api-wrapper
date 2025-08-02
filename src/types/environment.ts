export interface Environment {
  NODE_ENV: string;
  APP_PORT: string;
  DB_CONNECTION: string;
  DB_HOST: string;
  DB_PORT: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  [key: string]: string | undefined;
}
