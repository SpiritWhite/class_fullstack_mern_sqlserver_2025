import { DataSource } from "typeorm";
import Usuario from "../entity/Usuario.js";

export const AppDataSource = new DataSource({
  type: "mssql",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 1433,
  username: process.env.DB_USER || "sa",
  password: process.env.DB_PASSWORD || "YourStrong!Passw0rd",
  database: process.env.DB_NAME || "mi_base_de_datos",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  entities: [Usuario],
  synchronize: true,
  logging: false,
});

export default AppDataSource;
