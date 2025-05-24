import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import DashboardLayout from "../component/DashboardLayout";

import axios from "axios";

function MovieSearch() {
  const navigate = useNavigate();
  const [minRevenue, setMinRevenue] = useState(""); // Dùng để lưu giá trị input
  const [movies, setMovies] = useState([]); // Dùng để lưu danh sách phim tìm được
  const [error, setError] = useState(""); // Dùng để lưu thông báo lỗi

  // Hàm gọi API khi người dùng nhấn nút tìm kiếm
  const handleSearch = async () => {
    try {
      // Kiểm tra nếu minRevenue chưa nhập
      if (!minRevenue) {
        setError("Please provide a minimum revenue.");
        return;
      }

      // Gửi yêu cầu GET tới API
      const response = await axios.get(
        `http://localhost:5000/api/movies?minRevenue=${minRevenue}`
      );

      // Cập nhật kết quả trả về vào state movies
      setMovies(response.data.movies);
      setError(""); // Xóa lỗi nếu có
    } catch (err) {
      // Nếu có lỗi, hiển thị thông báo lỗi
      setError(err.response ? err.response.data.error : "Something went wrong");
      setMovies([]);
    }
  };

  return (
    <div>
      <DashboardLayout title={"FIND MOVIE"}>
        <div style={{ padding: "20px" }}>
          <Button onClick={() => navigate("/")} style={buttonStyle}>
            <span className="material-icons" style={iconStyle}>
              arrow_back
            </span>
            Return Home
          </Button>
          <h1>Movie Search</h1>

          {/* Input để người dùng nhập minRevenue */}
          <input
            type="number"
            placeholder="Enter minimum revenue"
            value={minRevenue}
            onChange={(e) => setMinRevenue(e.target.value)} // Cập nhật minRevenue khi người dùng thay đổi
          />

          {/* Nút tìm kiếm */}
          <button onClick={handleSearch}>Search</button>

          {/* Hiển thị lỗi nếu có */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Hiển thị danh sách phim */}
          <div>
            {movies.length > 0 ? (
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: "20px",
                }}
              >
                <thead>
                  <tr>
                    <th style={headerStyle}>Movie Name</th>
                    <th style={headerStyle}>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map((movie, index) => (
                    <tr key={index} style={rowStyle}>
                      <td style={cellStyle}>{movie.movie_name}</td>
                      <td style={cellStyle}>
                        {new Intl.NumberFormat().format(movie.revenue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No movies found.</p>
            )}
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}

const headerStyle = {
  backgroundColor: "#f4f4f4",
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "left",
  fontWeight: "bold",
};

const rowStyle = {
  borderBottom: "1px solid #ddd",
};

const cellStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "left",
};
const buttonStyle = {
  display: "flex",
  alignItems: "center",
  padding: "10px",
  border: "1px solid #ddd",
  backgroundColor: "#f4f4f4",
  cursor: "pointer",
};

const iconStyle = {
  marginRight: "8px",
  fontSize: "18px",
};

export default MovieSearch;
