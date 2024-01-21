import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

export default function CollapseAlert({ alertOpen, setAlertOpen, children }) {
  return (
    <Collapse in={alertOpen}>
      <Alert
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => setAlertOpen(false)}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mt: 2 }}
      >
        {children}
      </Alert>
    </Collapse>
  );
}

CollapseAlert.propTypes = {
  alertOpen: PropTypes.bool,
  setAlertOpen: PropTypes.func,
  children: PropTypes.node,
};
