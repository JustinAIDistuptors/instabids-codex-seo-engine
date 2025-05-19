import { Sequelize, Options } from 'sequelize';
import { env } from './env';

// Define database connection options
const dbConfig: Options = {
  host: env.DB_HOST,
  port: env.DB_PORT,
  dialect: 'postgres',
  logging: env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: true,
    underscored: true,
  },
  dialectOptions: {
    // SSL configuration for production
    ...(env.NODE_ENV === 'production' && {
      ssl: {
        require: true,
        rejectUnauthorized: false, // This may need to be true in some environments
      },
    }),
  },
};

// Create Sequelize instance
const sequelize = new Sequelize(
  env.DB_NAME,
  env.DB_USER,
  env.DB_PASSWORD,
  dbConfig
);

// Function to test database connection
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    return false;
  }
}

// Export Sequelize instance
export default sequelize;
