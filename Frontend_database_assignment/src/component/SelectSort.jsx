import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectSort(props) {
  const { sortType, setSortType } = props;

  const [typeSort, setTypeSort] = React.useState(sortType);

  const handleChange = (e) => {
    setSortType(e.target.value);
  };

  React.useEffect(() => {
    setTypeSort(sortType);
  }, [sortType]);

  return (
    <FormControl sx={{ minWidth: 150 }} size="small">
      <InputLabel id="demo-select-small-label">Sort type</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={typeSort}
        label="Sort"
        onChange={handleChange}
      >
        <MenuItem value={"Ascending"}>Ascending</MenuItem>
        <MenuItem value={"Descending"}>Descending</MenuItem>
      </Select>
    </FormControl>
  );
}
