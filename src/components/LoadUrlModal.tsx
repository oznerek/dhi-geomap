import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { loadUrl } from "api/loadUrl";
import React, { useState } from "react";
import { usePointStore } from "stores/mapStore";
import { useErrorStore, useLoadUrlStore } from "stores/urlStore";

function LoadUrlModal() {
  const [text, setText] = useState(
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
  );
  const showLoadUrl = useLoadUrlStore((state) => state.showLoadUrl);
  const setLoadUrl = useLoadUrlStore((state) => state.setLoadUrl);
  const setShowError = useErrorStore((state) => state.setShowError);
  const setPoints = usePointStore((state) => state.setPoints);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLoad();
    handleClose();
  };
  const handleClose = () => {
    setLoadUrl(false);
  };

  async function handleLoad() {
    var result = undefined;
    try {
      result = await loadUrl(text);
      if (typeof result === "string") {
        result = JSON.parse(result);
      }
      setPoints(result);
    } catch (err: any) {
      const errorMessage =
        typeof err === "string"
          ? err
          : err?.message || "Wystąpił nieznany błąd.";
      setShowError({ display: true, error: errorMessage });
    }
  }

  return (
    <Dialog open={showLoadUrl} onClose={handleClose}>
      <DialogTitle>Load GeoJSON from URL</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0, minWidth: 480, minHeight: 20 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="search"
            name="search"
            label="GeoJSON URL"
            placeholder="https:/example.com/data.geojson"
            type="text"
            fullWidth
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
          />
          <DialogActions>
            <Button aria-label="Cancel" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              aria-label="Load"
              color="primary"
              variant="contained"
              disabled={!text}
              type="submit"
            >
              Load
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default LoadUrlModal;
