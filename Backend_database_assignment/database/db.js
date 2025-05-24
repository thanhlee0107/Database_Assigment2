import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const { SQL_SERVER, SQL_DATABASE, SQL_USER, SQL_PASSWORD } = process.env;

const config = {
  server: SQL_SERVER,
  database: SQL_DATABASE,
  user: SQL_USER,
  password: SQL_PASSWORD,
  options: {
    trustedConnection: true, // Using WINDOWS AUTHENTICATION
    trustServerCertificate: true, // pass through ssl
    enableArithAbort: true,
    encrypt: true, // Encrypt connection
  },
  driver: "msnodesqlv8", // using msnodesqlv8
};

const db = await sql.connect(config);

export { db };
