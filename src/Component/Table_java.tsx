import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TableComponent from "./TableComponent";
import backgroundImage from "../assets/img/Media.jpg";

const Table_java = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          backgroundImage: `url(${backgroundImage})`, // Use the imported image
          backgroundSize: "cover", // Ensure the image covers the box
          backgroundPosition: "center", // Center the image
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
          gap: "1%",
        }}
      >
        <Typography
          sx={{
            pb: "0",
            fontWeight: "bold", // Increase the font weight
            fontFamily: "Montserrat, sans-serif", // Change the font family
            color: "#FFf",
            textShadow: "2px 2px 4px rgba(255, 255, 255, 0.7)",
          }}
          variant="h2"
        >
          React Data Table Component
        </Typography>

        <Box
          sx={{
            width: "80vw",
            height: "auto",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "start",
            borderRadius: 3,
            boxShadow: 1,
          }}
        >
          <Box>
            <TableComponent />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Table_java;
