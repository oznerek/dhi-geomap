import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useShowTableStore } from "stores/tableStore";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { usePointStore, usePolygonListStore } from "stores/mapStore";
import { prepareGeoJSON } from "helpers/exportFile";

function DataTableModal() {
  const showTable = useShowTableStore((state) => state.showTable);
  const setShowTable = useShowTableStore((state) => state.setShowTable);
  const points = usePointStore((state) => state.points);
  const polygonList = usePolygonListStore((state) => state.polygonList);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState<any>(undefined);
  const [paginatedRows, setPaginatedRows] = useState<any>(undefined);
  const [keys, setKeys] = useState<never[]>([]);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    let sourceData = null;

    if (points?.features) {
      sourceData = points.features;
    } else if (polygonList.length > 0) {
      sourceData = prepareGeoJSON(polygonList).features;
    }

    if (sourceData) {
      setData(sourceData);

      const uniqueKeys: never[] = Array.from(
        new Set(
          sourceData.flatMap((f: { properties?: Record<string, any> }) =>
            Object.keys(f.properties || {})
          )
        )
      );

      setKeys(uniqueKeys);

      const paginated = sourceData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
      setPaginatedRows(paginated);
    }
  }, [points, polygonList, page, rowsPerPage]);
  return (
    <Dialog
      open={showTable}
      onClose={() => setShowTable(false)}
      maxWidth={false}
    >
      <DialogTitle>Data Table View</DialogTitle>
      <DialogContent
        sx={{
          paddingBottom: 0,
          minHeight: 80,
          maxHeight: "80vh",
          maxWidth: "unset",
        }}
      >
        {paginatedRows && keys && data && (
          <>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {keys.map((key) => (
                      <TableCell key={key}>{key}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedRows.map((row: any, index: any) => (
                    <TableRow key={index}>
                      {keys.map((key) => (
                        <TableCell key={key} component="th" scope="row">
                          {(row.properties && row.properties[key]) ?? "-"}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={data.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              labelRowsPerPage="Wierszy na stronę"
            />
          </>
        )}
        {(!paginatedRows || !keys) && (
          <>
            <Typography variant="h5">No data to display</Typography>
            <Typography variant="h6">
              Upload GeoJSON or draw polygons
            </Typography>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button aria-label="Close" onClick={() => setShowTable(false)}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DataTableModal;
