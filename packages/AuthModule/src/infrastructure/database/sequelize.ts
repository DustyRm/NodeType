import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { UserModel } from '../models/user.model';

dotenv.config();

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  models: [UserModel],
  logging: false,
});

export async function connectDatabase(): Promise<void> {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // ou sync({ force: true }) se quiser recriar
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
}
