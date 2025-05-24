import { Box } from "@mui/material";

function DashboardLayout(props) {
  return (
    <>
      <div style={{ minHeight: "100vh", backgroundColor: "#C1BAA1" }}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "center",
            mb: 3,
            bgcolor: "#4B5945",
            color: "white",
            fontSize: "bold",
          }}
        >
          {props.title}
        </Box>
        {props.children}
      </div>
    </>
  );
}

export default DashboardLayout;
