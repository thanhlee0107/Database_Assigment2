import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
function SelectDate(props) {
  const { startDate, endDate, title, setDate } = props;

  const [startDateSelect, setStartDateSelect] = React.useState(
    startDate ? dayjs(startDate) : null
  );
  const [endDateSelect, setEndDateSelect] = React.useState(
    endDate ? dayjs(endDate) : null
  );

  React.useEffect(() => {
    if (title === "Start date") {
      setStartDateSelect(startDate ? dayjs(startDate) : null);
    }
  }, [startDate]);
  React.useEffect(() => {
    if (title === "End date") {
      setEndDateSelect(endDate ? dayjs(endDate) : null);
    }
  }, [endDate]);

  function handleOnChange(e) {
    const formattedDate = e ? e.format("YYYY-MM-DD") : null;
    setDate({ title: title, value: formattedDate });
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={title}
        format="YYYY-MM-DD"
        slotProps={{
          textField: {
            size: "small",
          },
        }}
        value={title === "Start date" ? startDateSelect : endDateSelect}
        onChange={handleOnChange}
      />
    </LocalizationProvider>
  );
}

export default SelectDate;
