import React from "react";
import { AppBar, Box, Typography } from "@mui/material";
import Menu from "./components/Menu";
import Maps from "components/Maps";
import DrawCardModal from "components/DrawCardModal";
import SearchModal from "components/SearchModal";
import LoadUrlModal from "components/LoadUrlModal";
import DataTableModal from "components/TableModal";
import ErrorAlert from "components/ErrorAlert";
import { useDrawStore } from "stores/drawStore";

function App() {
  const drawPolygon = useDrawStore((state) => state.drawPolygon);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <ErrorAlert />
      <Menu />
      {drawPolygon && <DrawCardModal />}
      <SearchModal />
      <LoadUrlModal />
      <DataTableModal />
      <Maps />
      <AppBar
        position="fixed"
        color="primary"
        sx={{ top: "auto", bottom: 0, zIndex: 1300, textAlign: "center" }}
      >
        <Typography>Copyright © 2025 by Michał Oznerek for DHI</Typography>
      </AppBar>
    </Box>
  );
}

export default App;
