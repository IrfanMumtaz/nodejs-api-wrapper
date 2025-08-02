import dotenv from 'dotenv';
dotenv.config();

interface DatabaseConfig {
  client: string;
  connection: {
    host: string;
    port: string;
    user: string;
    password: string;
    database: string;
    ssl: boolean | { rejectUnauthorized: boolean };
  };
  migrations: {
    table: string;
    path: string;
  };
  models: {
    path: string;
  };
}

const config: DatabaseConfig = {
  client: process.env.DB_CONNECTION || 'mysql',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '3306',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'test',
    ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false,
  },
  migrations: {
    table: 'migrations',
    path: './migrations',
  },
  models: {
    path: './src/models',
  },
};

export default config;
