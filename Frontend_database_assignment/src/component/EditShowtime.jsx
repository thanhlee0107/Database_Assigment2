import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, TextField } from "@mui/material";

export default function EditShowTime(props) {
  const { isOpen, data, closeDialog, onSubmit } = props;
  const [open, setOpen] = React.useState(isOpen);
  const [dataShowTime, setDataShowTime] = React.useState(data);
  React.useEffect(() => {
    setOpen(isOpen); // Mở dialog khi isOpen là true
    setDataShowTime(data); // Cập nhật dữ liệu showtime
  }, [isOpen, data]);
  const handleSubmit = () => {
    onSubmit(dataShowTime); // Gửi dữ liệu showtime đã cập nhật
    closeDialog();
    setOpen(false);
  };
  const handleClose = () => {
    closeDialog();
    setOpen(false);
  };
  const handleChange = (field, value) => {
    setDataShowTime((prevData) => ({ ...prevData, [field]: value }));
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth
      maxWidth="md" // Tăng chiều rộng tối đa của Dialog
    >
      <DialogTitle id="responsive-dialog-title" sx={{ textAlign: "center" }}>
        EDIT SHOWTIME
      </DialogTitle>
      <DialogContent
        sx={{
          paddingBottom: "24px", // Giảm padding dưới
          overflow: "auto", // Cho phép cuộn nếu không đủ không gian
        }}
      >
        <Stack spacing={2} sx={{ mt: 2 }}>
          {/* Render các trường nhập liệu */}
          <TextField
            label="Format"
            value={dataShowTime.movie_format}
            onChange={(e) => handleChange("movie_format", e.target.value)}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Language"
            value={dataShowTime.language}
            onChange={(e) => handleChange("language", e.target.value)}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Status"
            value={dataShowTime.status}
            onChange={(e) => handleChange("status", e.target.value)}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Date"
            value={dataShowTime.date}
            onChange={(e) => handleChange("date", e.target.value)}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Start time"
            value={dataShowTime.start_time}
            onChange={(e) => handleChange("start_time", e.target.value)}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="End time"
            value={dataShowTime.end_time}
            onChange={(e) => handleChange("end_time", e.target.value)}
            fullWidth
            variant="outlined"
            disabled
          />
          <TextField
            label="Room number"
            value={dataShowTime.room_number}
            onChange={(e) => handleChange("room_number", e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error" variant="contained">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="success" variant="outlined">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
