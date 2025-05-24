import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import showTimeRoutes from "./routes/showTime.js";
import showTransactionsRoutes from "./routes/showTransaction.js";
import findMoviesRoutes from "./routes/findMovies.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// API for showTimeRoutes
app.use("/api", showTimeRoutes);
// API for showTransactionRoutes
app.use("/api", showTransactionsRoutes);
//API for findMoviesRoutes
app.use("/api", findMoviesRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
