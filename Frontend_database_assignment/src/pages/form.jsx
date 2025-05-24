import React, { useState } from "react";
import { 
  Box, 
  Button, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Grid 
} from "@mui/material";
import { notifyError, notifySuccess } from "../utils/notify";
import instanceAxios from "../config_axios/configAxios";
import { useNavigate } from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import DashboardLayout from "../component/DashboardLayout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lightGreen } from "@mui/material/colors";

// Theme configuration
const theme = createTheme({
  palette: {
    primary: { 
      main: lightGreen["200"] 
    },
  },
});

const Form = () => {
  const navigate = useNavigate();
  
  // Initial form state
  const [formData, setFormData] = useState({
    movie_format: "2D",
    language: "English",
    status: "Active",
    date: "",
    weekday: "",
    start_time: "",
    cinema_name: "",
    room_number: "",
    movie_id: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate all fields are filled
    const isValid = Object.values(formData).every(field => field !== "");
    if (!isValid) {
      notifyError("Vui lòng điền đầy đủ thông tin!");
      return;
    }
  
    // Format start time
    if (formData.start_time) {
      const timeParts = formData.start_time.split(":");
      if (timeParts.length === 2) {
        formData.start_time = `${timeParts[0]}:${timeParts[1]}:00`;
      }
    }
  
    try {
      const response = await instanceAxios.post("/api/insert-showtime", formData);
  
      if (response.data.success) {
        notifySuccess("Thêm lịch chiếu thành công!");
        navigate("/");
      } else {
        notifyError(response.data.error || "Thêm lịch chiếu thất bại.");
      }
    } catch (err) {
      if (err.response) {
        notifyError(err.response.data.error || "Lỗi kết nối API");
      } else {
        notifyError("Lỗi kết nối API");
      }
    }
  };

  return (
    <DashboardLayout title="THÊM LỊCH CHIẾU">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "F0E68C", // Màu be (Beige)
          padding: 4,
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: "800px",
            padding: "24px",
            backgroundColor: "#34495e",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            color: "#fff",
          }}
        >
          {/* Nút quay lại trang chủ */}
          <Box sx={{ mb: 3 }}>
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => navigate("/")}
                startIcon={<KeyboardReturnIcon />}
              >
                Quay về trang chủ
              </Button>
            </ThemeProvider>
          </Box>

          <Grid container spacing={3}>
            {/* Định dạng phim */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: "#ffffff" }}>Định dạng</InputLabel>
                <Select
                  name="movie_format"
                  value={formData.movie_format}
                  onChange={handleChange}
                  label="Định dạng"
                  sx={{
                    backgroundColor: "#2c3e50",
                    color: "#ffffff",
                    "& .MuiInputBase-input": {
                      color: "#ffffff", // White text for input
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#f4d03f",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#f4d03f",
                    },
                  }}
                >
                  <MenuItem value="2D">2D</MenuItem>
                  <MenuItem value="3D">3D</MenuItem>
                  <MenuItem value="IMAX">IMAX</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Ngôn ngữ */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ngôn ngữ"
                name="language"
                value={formData.language}
                onChange={handleChange}
                sx={{
                  backgroundColor: "#2c3e50",
                  "& .MuiInputLabel-root": {
                    color: "#ffffff",
                  },
                  "& .MuiInputBase-input": {
                    color: "#ffffff", // White text for input
                  },
                }}
              />
            </Grid>

            {/* Ngày chiếu */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ngày chiếu"
                name="date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.date}
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                  const weekday = days[selectedDate.getDay()];
                  
                  handleChange({
                    target: {
                      name: 'date',
                      value: e.target.value
                    }
                  });
                  
                  handleChange({
                    target: {
                      name: 'weekday',
                      value: weekday
                    }
                  });
                }}
                sx={{
                  backgroundColor: "#2c3e50",
                  "& .MuiInputLabel-root": {
                    color: "#ffffff",
                  },
                  "& .MuiInputBase-input": {
                    color: "#ffffff", // White text for input
                    "&::placeholder": {
                      color: "#ffffff", // White placeholder text
                      opacity: 1,
                    },
                  },
                }}
                InputProps={{
                  style: { color: "#ffffff" }
                }}
              />
            </Grid>

            {/* Ngày trong tuần */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ngày trong tuần"
                name="weekday"
                value={formData.weekday}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  backgroundColor: "#2c3e50",
                  "& .MuiInputLabel-root": {
                    color: "#ffffff",
                  },
                  "& .MuiInputBase-input": {
                    color: "#ffffff", // White text for input
                    backgroundColor: "#40525e", // Slightly different background to indicate readonly
                  },
                }}
              />
            </Grid>

            {/* Giờ bắt đầu */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Giờ bắt đầu"
                name="start_time"
                type="time"
                InputLabelProps={{ shrink: true }}
                value={formData.start_time}
                onChange={handleChange}
                sx={{
                  backgroundColor: "#2c3e50",
                  "& .MuiInputLabel-root": {
                    color: "#ffffff",
                  },
                  "& .MuiInputBase-input": {
                    color: "#ffffff", // White text for input
                    "&::placeholder": {
                      color: "#ffffff", // White placeholder text
                      opacity: 1,
                    },
                  },
                }}
                InputProps={{
                  style: { color: "#ffffff" }
                }}
              />
            </Grid>

            {/* Số phòng */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Số phòng"
                name="room_number"
                value={formData.room_number}
                onChange={handleChange}
                sx={{
                  backgroundColor: "#2c3e50",
                  "& .MuiInputLabel-root": {
                    color: "#ffffff",
                  },
                  "& .MuiInputBase-input": {
                    color: "#ffffff", // White text for input
                  },
                }}
              />
            </Grid>

            {/* Mã phim */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mã phim"
                name="movie_id"
                value={formData.movie_id}
                onChange={handleChange}
                sx={{
                  backgroundColor: "#2c3e50",
                  "& .MuiInputLabel-root": {
                    color: "#ffffff",
                  },
                  "& .MuiInputBase-input": {
                    color: "#ffffff", // White text for input
                  },
                }}
              />
            </Grid>

            {/* Tên rạp */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: "#ffffff" }}>Tên rạp</InputLabel>
                <Select
                  name="cinema_name"
                  value={formData.cinema_name}
                  onChange={handleChange}
                  label="Tên rạp"
                  sx={{
                    backgroundColor: "#2c3e50",
                    color: "#ffffff",
                    "& .MuiInputBase-input": {
                      color: "#ffffff", // White text for input
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#f4d03f",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#f4d03f",
                    },
                  }}
                >
                  <MenuItem value="CGV Crescent Mall">CGV Crescent Mall</MenuItem>
                  <MenuItem value="CGV Pandora City">CGV Pandora City</MenuItem>
                  <MenuItem value="CGV SC VivoCity">CGV SC VivoCity</MenuItem>
                  <MenuItem value="CGV Vincom Landmark 81">CGV Vincom Landmark 81</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Nút submit */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Thêm lịch chiếu
          </Button>
        </form>
      </Box>
    </DashboardLayout>
  );
};

export default Form;