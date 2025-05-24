import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ListShowTime from "../component/ListShowTime";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lightGreen } from "@mui/material/colors";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import DashboardLayout from "../component/DashboardLayout";
import instanceAxios from "../config_axios/configAxios";
import { useState } from "react";
import SelectDate from "../component/SelectDate";
import SelectSort from "../component/SelectSort";
import { notifyError, notifySuccess } from "../utils/notify";

const theme = createTheme({
  palette: {
    primary: { main: lightGreen["200"] },
  },
});

function ShowTimePage() {
  const navigate = useNavigate();
  const [listShowTime, setListShowTime] = useState([]);
  const [idMovie, setIdMovie] = useState("");
  const [cinemaName, setCinemaName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortType, setSortType] = useState("");
  const [currentShowtime, setCurrentShowtime] = useState(null); // Giữ thông tin showtime đang chỉnh sửa

  async function getListShowTime() {
    if (!idMovie || !cinemaName || !startDate || !endDate || !sortType) {
      notifyError("Missing data");
      return;
    }

    try {
      const result = await instanceAxios.post("/api/show_time", {
        idMovie: Number(idMovie),
        cinemaName: cinemaName,
        startDate: startDate,
        endDate: endDate,
        orderType: sortType === "Ascending" ? "date_asc" : "date_desc",
      });
      setListShowTime(result.data.result);
    } catch (err) {
      notifyError("Call api failed");
    }
  }

  async function deleteShowtime(showtimeId) {
    if (!showtimeId) {
      notifyError("Missing showtime ID");
      return;
    }

    try {
      const response = await instanceAxios.delete(`/api/delete-showtime/${Number(showtimeId)}`);

      if (response.data.success) {
        setListShowTime((prevList) => {
          const updatedList = prevList.filter((row) => row.showtime_id !== showtimeId);
          return updatedList;
        });
        
        notifySuccess("Showtime deleted successfully");
      } else {
        notifyError(response.data.error || "Failed to delete showtime");
      }
    } catch (err) {
        if (err.response) {
          notifyError(err.response.data.error || "Call API failed");
        } else {
          notifyError("Call API failed");
        }
    }
  }

  // Hàm để cập nhật thông tin showtime
  async function updateShowtime() {
    if (!currentShowtime) {
      notifyError("No showtime selected for update");
      return;
    }

    try {
      const response = await instanceAxios.put(`/api/update-showtime/${currentShowtime.showtime_id}`, currentShowtime);
      if (response.data.success) {
        setListShowTime((prevList) => {
          return prevList.map((showtime) =>
            showtime.showtime_id === currentShowtime.showtime_id
              ? { ...showtime, ...currentShowtime }
              : showtime
          );
        });
        notifySuccess("Showtime updated successfully");
        setCurrentShowtime(null); // Reset showtime after update
      } else {
        notifyError(response.data.error || "Failed to update showtime");
      }
    } catch (err) {
      notifyError("Call API failed");
    }
  }

  function setDate(data) {
    if (data.title === "Start date") {
      setStartDate(data.value);
    } else if (data.title === "End date") {
      setEndDate(data.value);
    }
  }

  function setSortTypeData(data) {
    setSortType(data);
  }

  function handleResetInput() {
    setIdMovie("");
    setCinemaName("");
    setStartDate("");
    setEndDate("");
    setSortType("");
    setListShowTime([]);
  }

  // Hàm mở giao diện chỉnh sửa
  function openEditForm(showtime) {
    setCurrentShowtime(showtime);
  }

  return (
    <>
      <DashboardLayout title={"SHOW TIME PAGE"}>
        <div className="container">
          {/* Return to home page */}
          <Box sx={{ mb: 2 }}>
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => navigate("/")}
              >
                <Box sx={{ mr: 1 }}>
                  <KeyboardReturnIcon />
                </Box>
                Return Home page
              </Button>
            </ThemeProvider>
          </Box>
          {/* INPUT DATA */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              mb: 2,
            }}
          >
            {/* ID MOVIE */}
            <Box sx={{ ml: 2, width: 150 }}>
              <TextField
                id="outlined-number"
                label="Id movie"
                type="number"
                sx={{
                  color: "white",
                }}
                value={idMovie}
                onChange={(e) => setIdMovie(e.target.value)}
                inputProps={{ min: 1, step: 1 }}
                size="small"
              />
            </Box>
            {/* Cinema name */}
            <Box sx={{ ml: 2 }}>
              <TextField
                id="outlined-search"
                label="Cinema name"
                type="search"
                size="small"
                value={cinemaName}
                onChange={(e) => setCinemaName(e.target.value)}
              />
            </Box>
            {/* Start date */}
            <Box sx={{ ml: 2 }}>
              <SelectDate
                title="Start date"
                startDate={startDate}
                setDate={setDate}
              />
            </Box>
            {/* End date */}
            <Box sx={{ ml: 2 }}>
              <SelectDate
                title="End date"
                endDate={endDate}
                setDate={setDate}
              />
            </Box>
            {/* Sort type */}
            <Box sx={{ ml: 2 }}>
              <SelectSort sortType={sortType} setSortType={setSortTypeData} />
            </Box>
          </Box>
          {/* Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Box sx={{ mr: 2 }}>
              <Button onClick={handleResetInput} variant="contained">
                RESET
              </Button>
            </Box>
            <Box sx={{ mr: 2 }}>
              <Button
                onClick={getListShowTime}
                variant="contained"
                color="success"
              >
                SEARCH
              </Button>
            </Box>
          </Box>
          {/* Show list show time */}
          <ListShowTime
            listShowTime={listShowTime}
            onDeleteShowtime={deleteShowtime}
            onEditShowtime={openEditForm} // Thêm hàm chỉnh sửa
            onList={getListShowTime}
          />

          {/* Edit ShowTime form */}
          {currentShowtime && (
            <Box sx={{ marginTop: 3 }}>
              <TextField
                label="Update Cinema Name"
                value={currentShowtime.cinema_name}
                onChange={(e) =>
                  setCurrentShowtime({
                    ...currentShowtime,
                    cinema_name: e.target.value,
                  })
                }
                fullWidth
              />
              {/* Các trường khác cũng thực hiện tương tự */}
              <Box sx={{ mt: 2 }}>
                <Button onClick={updateShowtime} variant="contained" color="primary">
                  Update Showtime
                </Button>
              </Box>
            </Box>
          )}
        </div>
      </DashboardLayout>
    </>
  );
}

export default ShowTimePage;
