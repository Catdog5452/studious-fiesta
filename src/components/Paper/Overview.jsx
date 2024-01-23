// dependencies
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

// components
import OverviewEdit from "../Overview/OverviewEdit";
import OverviewView from "../Overview/OverviewView";
import SnackbarAlert from "../SnackbarAlert";

/**
 * Display the paper overview, including all information about the paper and the ability to edit the paper
 * @param {*} param0 paper prop and handleUpdate function
 * @returns Overview component
 */
export default function Overview({ paper, handleUpdate }) {
  // states
  const [editMode, setEditMode] = useState(false);
  const [newPaper, setNewPaper] = useState(paper);

  // snackbar states
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  /**
   * Enable edit mode
   */
  const enableEditMode = () => {
    setEditMode(true);
  };

  /**
   * Disable edit mode
   */
  const disableEditMode = () => {
    setEditMode(false);
  };

  /**
   * Handle the snackbar close event
   * @param {*} event onClose event
   * @param {*} reason reason for closing the snackbar
   * @returns if the snackbar was closed by clicking away, return
   */
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  /**
   * Handle the save button click
   * @param {*} event onSubmit event
   * @returns if no changes were made, display a snackbar message and return
   */
  const handleSave = (event) => {
    event.preventDefault();

    // if no changes were made, display a snackbar message and return
    if (newPaper === paper) {
      setSnackbarMessage("No changes made");
      setOpenSnackbar(true);
      setSnackbarSeverity("success");
      disableEditMode();
      return;
    }

    // update the paper
    handleUpdate(newPaper);

    // display a snackbar message
    setSnackbarMessage("Changes saved");
    setOpenSnackbar(true);
    setSnackbarSeverity("success");

    // disable edit mode
    disableEditMode();
  };

  /**
   * Discard any changes and revert to the original paper
   */
  const handleCancel = () => {
    // revert to the original paper
    setNewPaper(paper);

    // display a snackbar message
    setSnackbarMessage("Changes discarded");
    setOpenSnackbar(true);
    setSnackbarSeverity("warning");

    // disable edit mode
    disableEditMode();
  };

  // update the newPaper state when the paper prop changes
  useEffect(() => {
    setNewPaper(paper);
  }, [paper]);

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1 }}>
        {" "}
        Overview{" "}
      </Typography>
      {/* Different components depending on whether in edit mode or not */}
      {editMode ? (
        <OverviewEdit
          newPaper={newPaper}
          setNewPaper={setNewPaper}
          handleCancel={handleCancel}
          handleSave={handleSave}
        />
      ) : (
        <OverviewView paper={newPaper} enableEditMode={enableEditMode} />
      )}

      {/* Snackbar alert for any messages */}
      <SnackbarAlert
        snackbarOpen={openSnackbar}
        handleSnackbarClose={handleSnackbarClose}
        severity={snackbarSeverity}
      >
        {snackbarMessage}
      </SnackbarAlert>
    </Box>
  );
}

/**
 * Prop types for the Overview component
 */
Overview.propTypes = {
  paper: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};
