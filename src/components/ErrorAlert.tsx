import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { useErrorStore } from "stores/urlStore";

function ErrorAlert() {
  const showError = useErrorStore((state) => state.showError);
  const setShowError = useErrorStore((state) => state.setShowError);

  return (
    <Snackbar
      open={showError.display}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={() => setShowError({ display: false, error: "" })}
    >
      <Alert
        severity="error"
        onClose={() => setShowError({ display: false, error: "" })}
        sx={{ width: "100%" }}
      >
        {showError.error}
      </Alert>
    </Snackbar>
  );
}

export default ErrorAlert;
