import dotenv from 'dotenv';
import { DataSource } from "typeorm";
import Usuario from "../entity/Usuario.js";

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_SERVER || "localhost",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 1433,
  username: process.env.DB_USER || "sa",
  password: process.env.DB_PASSWORD || "Password",
  database: process.env.DB_NAME || "mi_base_de_datos",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  entities: [Usuario],
  synchronize: true,
  logging: false,
});

export default AppDataSource;
