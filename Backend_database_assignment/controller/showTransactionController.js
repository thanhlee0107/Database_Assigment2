import sql from "mssql";
import { db } from "../database/db.js";
import { CustomError } from "../models/CustomError.js";

// function to get all transactions
async function getAllTransaction(req, res) {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      throw new CustomError("Missing Data", 422);
    }

    // create a new request object
    const request = db.request();

    // add input parameters for the stored procedured
    request.input("startDate", sql.Date, startDate);
    request.input("endDate", sql.Date, endDate);

    // Execute the stored procedure
    const result = await request.execute("assignment2.getAllTransaction");

    res.status(200).json({
      result: result.recordset,
      success: true,
    });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      error: err.message,
      success: false,
    });
  }
}

export { getAllTransaction };
