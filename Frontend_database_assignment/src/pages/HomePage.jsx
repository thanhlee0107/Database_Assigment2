import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../component/DashboardLayout";

function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <DashboardLayout title={"HOME PAGE"}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ mr: 2 }}>
            <Button variant="contained" onClick={() => navigate("/showTime")}>
              MANAGE SHOWTIME
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="success"
              onClick={() => navigate("/formShowTime")}
              style={{ marginRight: "10px" }}
            >
              INSERT SHOWTIME
            </Button>
          </Box>
          <Box sx={{ mr: 2 }}>
            <Button variant="contained" onClick={() => navigate("/findMovies")} color="secondary">
              FIND MOVIES
            </Button>
          </Box>
        </Box>
      </DashboardLayout>
    </>
  );
}
export default HomePage;
