import * as dotenv from "dotenv";
import sequelize from "sequelize";

dotenv.config({
  path: process.env.ENVIRONMENT ? `.env.${process.env.ENVIRONMENT}` : `.env`,
});

const db = new sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
    logging: true,
  }
);

export default db;
