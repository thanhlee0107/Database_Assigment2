import { db } from "../database/db.js";
import sql from "mssql"; // Đảm bảo bạn đã cài đặt mssql package

async function findMovies(req, res) {
  try {
    // Lấy tham số minRevenue từ query string
    const { minRevenue } = req.query;

    // Kiểm tra nếu thiếu tham số minRevenue
    if (!minRevenue) {
      return res.status(400).json({
        message: "minRevenue is required",
        success: false,
      });
    }

    // Chuyển tham số minRevenue sang kiểu số
    const min = parseFloat(minRevenue);

    if (isNaN(min)) {
      return res.status(400).json({
        message: "minRevenue must be a valid number",
        success: false,
      });
    }

    // Kết nối với cơ sở dữ liệu và truy vấn
    const request = db.request();

    // Truyền tham số minRevenue vào câu truy vấn gọi table-valued function
    const query = `
      SELECT * 
      FROM assignment2.Find_movies_by_revenue_cursor(@minRevenue)
    `;

    // Truyền tham số vào câu truy vấn
    request.input("minRevenue", sql.Decimal, min);

    // Thực hiện truy vấn SQL thay vì gọi execute
    const result = await request.query(query);

    // Trả kết quả phim
    res.status(200).json({
      success: true,
      movies: result.recordset, // recordset chứa kết quả truy vấn
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
      success: false,
    });
  }
}

export { findMovies };
