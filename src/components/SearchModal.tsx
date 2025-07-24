import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { geocodeLocation, reverseGeocode } from "api/openStreetMap";
import { useInitialMapStore } from "stores/mapStore";
import { useErrorStore, useSearchStore } from "stores/urlStore";

function SearchModal() {
  const [text, setText] = useState("");
  const showSearch = useSearchStore((state) => state.showSearch);
  const setShowSearch = useSearchStore((state) => state.setShowSearch);
  const setInitialMap = useInitialMapStore((state) => state.setInitialMap);
  const setShowError = useErrorStore((state) => state.setShowError);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch();
    handleClose();
  };
  const handleClose = () => {
    setShowSearch(false);
  };

  async function handleSearch() {
    var result = undefined;
    try {
      if (checkIsCoordinateData(text)) {
        const [lat, lon] = getCoordinate(text);
        result = await reverseGeocode(lat, lon);
      } else {
        result = await geocodeLocation(text);
      }
      if (result) {
        setInitialMap({
          longitude: Number(result.lon),
          latitude: Number(result.lat),
          zoom: 13,
        });
      }
    } catch (err: any) {
      const errorMessage =
        typeof err === "string"
          ? err
          : err?.message || "Wystąpił nieznany błąd.";
      setShowError({ display: true, error: errorMessage });
    }
  }

  function checkIsCoordinateData(query: string): boolean {
    const trimmed = query.trim();
    const parts = trimmed.split(/[,\s]+/);

    if (parts.length !== 2) return false;

    const lat = parseFloat(parts[0]);
    const lon = parseFloat(parts[1]);

    return !isNaN(lat) && !isNaN(lon);
  }
  function getCoordinate(query: string): [lat: number, lon: number] {
    const trimmed = query.trim();
    const parts = trimmed.split(/[,\s]+/);

    const lat = parseFloat(parts[0]);
    const lon = parseFloat(parts[1]);

    return [lat, lon];
  }

  return (
    <Dialog open={showSearch} onClose={handleClose}>
      <DialogTitle>Search Location</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0, minWidth: 480, minHeight: 20 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="search"
            name="search"
            label="Search"
            placeholder="Enter coordinates or place name"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setText(e.currentTarget.value)}
          />
          <DialogActions>
            <Button aria-label="Cancel" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              aria-label="Search"
              color="primary"
              variant="contained"
              disabled={!text}
              type="submit"
            >
              Search
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default SearchModal;
