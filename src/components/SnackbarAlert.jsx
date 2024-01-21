// dependencies
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import PropTypes from "prop-types";

export default function SnackbarAlert({
  snackbarOpen,
  handleSnackbarClose,
  severity,
  children,
}) {
  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {children}
      </Alert>
    </Snackbar>
  );
}

SnackbarAlert.propTypes = {
  snackbarOpen: PropTypes.bool.isRequired,
  severity: PropTypes.string.isRequired,
  handleSnackbarClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};
