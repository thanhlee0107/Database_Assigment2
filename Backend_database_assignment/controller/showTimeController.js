import sql from "mssql";
import { db } from "../database/db.js";
import { formatIsoDate, formatIsoDateToTime } from "../utils/formatTime.js";
import { DateTime } from "msnodesqlv8";

async function getAllShowTime(req, res) {
  const { idMovie, cinemaName, startDate, endDate, orderType } = req.body;

  try {
    //handle missing data
    if (!idMovie || !cinemaName || !startDate || !endDate || !orderType) {
      throw new Error("Missing data");
    }

    // create a new request object
    const request = db.request();

    // Add input parameters for the stored procedure
    request.input("idMovie", sql.Int, idMovie);
    request.input("cinemaName", sql.NVarChar, cinemaName);
    request.input("startDate", sql.Date, startDate);
    request.input("endDate", sql.Date, endDate);
    request.input("orderType", sql.NVarChar, orderType);

    // Execute the stored procedure
    const result = await request.execute("assignment2.getAllShowTime");

    // handle format date, start_time, end_time
    result.recordset.map((item) => {
      item.date = formatIsoDate(item.date);
      item.start_time = formatIsoDateToTime(item.start_time);
      item.end_time = formatIsoDateToTime(item.end_time);
    });

    // Return response
    res.status(200).json({
      result: result.recordset,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
      success: false,
    });
  }
}

async function insertShowtime(req, res) {
  const {
    movie_format,
    language,
    status,
    date,
    weekday,
    start_time,
    cinema_name,
    room_number,
    movie_id,
  } = req.body;

  try {
    if (
      !movie_format ||
      !language ||
      !status ||
      !date ||
      !weekday ||
      !start_time ||
      !cinema_name ||
      !room_number ||
      !movie_id
    ) {
      throw new Error("Missing data");
    }
    const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (!timeRegex.test(start_time)) {
      throw new Error("Invalid time format, expected HH:mm:ss");
    }

    const result = await db
      .request()
      .input("movie_format", sql.NVarChar, movie_format)
      .input("language", sql.NVarChar, language)
      .input("status", sql.NVarChar, status)
      .input("date", sql.Date, date)
      .input("weekday", sql.NVarChar, weekday)
      .input("start_time", sql.NVarChar, start_time)
      .input("cinema_name", sql.NVarChar, cinema_name)
      .input("room_number", sql.Int, room_number)
      .input("movie_id", sql.Int, movie_id)
      .execute("insert_showtime"); // Tên Stored Procedure

    res.status(200).json({
      message: "Thêm suất chiếu thành công!",
      result: result.recordsets,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
      success: false,
    });
  }
}

async function updateShowtime(req, res) {
  const {
    showtime_id,
    movie_format,
    language,
    status,
    date,
    weekday,
    start_time,
    cinema_name,
    room_number,
    movie_id,
  } = req.body;

  try {
    if (!showtime_id) {
      throw new Error("showtime_id is required");
    }

    if (
      start_time &&
      !/^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(start_time)
    ) {
      throw new Error("Invalid time format, expected HH:mm:ss");
    }
    const result = await db
      .request()
      .input("showtime_id", sql.Int, showtime_id)
      .input("movie_format", sql.NVarChar, movie_format || null)
      .input("language", sql.NVarChar, language || null)
      .input("status", sql.NVarChar, status || null)
      .input("date", sql.Date, date || null)
      .input("weekday", sql.NVarChar, weekday || null)
      .input("start_time", sql.NVarChar, start_time || null)
      .input("cinema_name", sql.NVarChar, cinema_name || null)
      .input("room_number", sql.Int, room_number || null)
      .input("movie_id", sql.Int, movie_id || null)
      .execute("update_showtime"); // Tên Stored Procedure

    res.status(200).json({
      message: "Cập nhật suất chiếu thành công!",
      result: result.recordsets,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      success: false,
    });
  }
}

async function deleteShowtime(req, res) {
  const showtime_id = Number(req.params.showtime_id);
  try {
    // Kiểm tra showtime_id có được cung cấp không
    if (!showtime_id) {
      throw new Error("showtime_id is required");
    }

    // Gọi Stored Procedure delete_showtime
    const result = await db
      .request()
      .input("showtime_id", sql.Int, showtime_id)
      .execute("delete_showtime"); // Tên Stored Procedure

    res.status(200).json({
      message: "Xóa suất chiếu thành công!",
      result: result.recordsets,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
      success: false,
    });
  }
}

export { getAllShowTime, insertShowtime, updateShowtime, deleteShowtime };
