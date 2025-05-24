import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import instanceAxios from "../config_axios/configAxios";
import { notifyError, notifySuccess } from "../utils/notify";
import EditShowTime from "./EditShowTime"; // Import form chỉnh sửa

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover, // Thay đổi màu khi hover
    cursor: "pointer", // Thay đổi con trỏ chuột
  },
}));

export default function ListShowTime(props) {
  const [listShowTime, setListShowTime] = React.useState(props.listShowTime);
  const [showtimeToEdit, setShowtimeToEdit] = React.useState(null); // Thêm state cho showtime đang chỉnh sửa

  React.useEffect(() => {
    setListShowTime(props.listShowTime);
  }, [props.listShowTime]);

  // Handle update action
  const handleUpdate = (id) => {
    const showtime = listShowTime.find(item => item.showtime_id === id);
    if (showtime) {
      setShowtimeToEdit(showtime);  // Cập nhật dữ liệu showtime vào state để chỉnh sửa
    }
  };

  // Handle delete action
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this showtime?")) {
      await props.onDeleteShowtime(id);
    }
  };

  // Function to handle updating showtime after changes
  const handleSaveChanges = async (updatedShowtime) => {
    try {
      // Gửi request API cập nhật dữ liệu showtime
      const response = await instanceAxios.post(`/api/update-showtime`, updatedShowtime);
      props.onList();
      setShowtimeToEdit(null); // Đóng form sau khi lưu
      if (response.data.success) {
        notifySuccess("Showtime updated successfully");
      } else {
        notifyError(response.data.error || "Failed to update showtime");
      }
    } catch (err) {
        if (err.response) {
          console.log("ABC")
          notifyError(err.response.data.error || "Call API failed");
        } else {
          notifyError("Call API failed");
        }
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Format</StyledTableCell>
              <StyledTableCell align="center">Language</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Start time</StyledTableCell>
              <StyledTableCell align="center">End time</StyledTableCell>
              <StyledTableCell align="center">Room</StyledTableCell>
              <StyledTableCell align="center">Remain</StyledTableCell>
              <StyledTableCell align="center">Sold</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listShowTime.map((row, index) => (
              <StyledTableRow key={row.showtime_id}>
                <StyledTableCell align="center">{row.showtime_id}</StyledTableCell>
                <StyledTableCell align="center">{row.movie_format}</StyledTableCell>
                <StyledTableCell align="center">{row.language}</StyledTableCell>
                <StyledTableCell align="center">{row.status}</StyledTableCell>
                <StyledTableCell align="center">{row.date}</StyledTableCell>
                <StyledTableCell align="center">{row.start_time}</StyledTableCell>
                <StyledTableCell align="center">{row.end_time}</StyledTableCell>
                <StyledTableCell align="center">{row.room_number}</StyledTableCell>
                <StyledTableCell align="center">{row.remain}</StyledTableCell>
                <StyledTableCell align="center">{row.sold}</StyledTableCell>
                <StyledTableCell align="center">
                  {/* Actions */}
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleUpdate(row.showtime_id)}
                    startIcon={<EditIcon />}
                    sx={{ mr: 1 }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(row.showtime_id)}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Form chỉnh sửa showtime */}
      {showtimeToEdit && (
        <EditShowTime
          isOpen={showtimeToEdit !== null}  // Kiểm tra nếu có showtime đang chỉnh sửa
          data={showtimeToEdit}  // Dữ liệu showtime cần chỉnh sửa
          closeDialog={() => setShowtimeToEdit(null)}  // Đóng form chỉnh sửa khi nhấn hủy
          onSubmit={handleSaveChanges}  // Gửi dữ liệu đã thay đổi khi nhấn submit
        />
      )}
    </>
  );
}
