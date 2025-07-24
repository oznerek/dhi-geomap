import React from "react";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import UndoIcon from "@mui/icons-material/Undo";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import { usePolygonListStore, usePolygonStore } from "stores/mapStore";

function DrawCardModal() {
  const polygonPoints = usePolygonStore((state) => state.polygonPoints);
  const setPolygonPoints = usePolygonStore((state) => state.setPolygonPoints);
  const polygonList = usePolygonListStore((state) => state.polygonList);
  const setPolygonList = usePolygonListStore((state) => state.setPolygonList);
  return (
    <Box
      sx={{
        position: "absolute",
        top: 100,
        right: 20,
        zIndex: 1000,
      }}
    >
      <CustomPaper>
        <Typography variant="h6">Drawing mode</Typography>
        <Box height={16} />
        {(polygonPoints.length < 1 || polygonList.length < 1) && (
          <Typography>Click on map to start drawing</Typography>
        )}
        {polygonPoints.length > 0 && (
          <Box display="flex" gap={1} sx={{ paddingY: 1 }}>
            <Tooltip title="Complete polygon" placement="bottom">
              <span>
                <Button
                  aria-label="Complete polygon"
                  color="primary"
                  variant="contained"
                  disabled={polygonPoints.length < 3}
                  onClick={() => {
                    setPolygonList([...polygonList, polygonPoints]);
                    setPolygonPoints([]);
                  }}
                  sx={{
                    borderRadius: "50%",
                    minWidth: 0,
                    width: 36,
                    height: 36,
                    padding: 0,
                  }}
                >
                  <CheckIcon />
                </Button>
              </span>
            </Tooltip>
            <Tooltip title="Undo last point" placement="bottom">
              <span>
                <IconButton
                  color="warning"
                  aria-label="Undo last point"
                  disabled={polygonPoints.length < 2}
                  onClick={() => setPolygonPoints(polygonPoints.slice(0, -1))}
                >
                  <UndoIcon />
                </IconButton>
              </span>
            </Tooltip>

            <Tooltip title="Cancel drawing" placement="bottom">
              <IconButton
                aria-label="Cancel drawing"
                onClick={() => setPolygonPoints([])}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        {polygonList.length > 0 && (
          <>
            <Divider aria-hidden="true" />
            <Box gap={1} sx={{ paddingTop: 2 }}>
              <Typography sx={{ paddingBottom: 2 }}>
                Polygons: {polygonList.length}
              </Typography>
              <Tooltip title="Clear all polygons" placement="bottom">
                <Button
                  aria-label="Clear all polygons"
                  onClick={() => setPolygonList([])}
                  variant="contained"
                  color="error"
                  sx={{
                    borderRadius: "50%",
                    minWidth: 0,
                    width: 36,
                    height: 36,
                    padding: 0,
                  }}
                >
                  <CloseIcon />
                </Button>
              </Tooltip>
            </Box>
          </>
        )}
      </CustomPaper>
    </Box>
  );
}

const CustomPaper = styled(Paper)(({ theme }) => ({
  width: 240,
  minheight: 120,
  padding: theme.spacing(2),
  ...theme.typography.body2,
}));

export default DrawCardModal;
