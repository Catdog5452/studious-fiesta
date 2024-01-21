// dependencies
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

// components
import OverviewEdit from "../Overview/OverviewEdit";
import OverviewView from "../Overview/OverviewView";
import SnackbarAlert from "../SnackbarAlert";

/* TODO: Add a paper overview page. I want it to include: paper name, 
code, year, semester, department, and description. I want there to be 
a toggle button where I can toggle edit mode, then either save or 
cancel changes. I'm still undecided if you should be able to change
 the code, year, and semester given the PK relies on those */
export default function Overview({ paper, handleUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const [newPaper, setNewPaper] = useState(paper);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const enableEditMode = () => {
    setEditMode(true);
  };

  const disableEditMode = () => {
    setEditMode(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (newPaper === paper) {
      setSnackbarMessage("No changes made");
      setOpenSnackbar(true);
      setSnackbarSeverity("success");
      disableEditMode();
      return;
    }

    const updatedPaper = {
      ...newPaper,
      id: `${newPaper.paperCode}-${newPaper.paperYear}-${newPaper.paperSemester}`,
    };

    handleUpdate(updatedPaper);
    setSnackbarMessage("Changes saved");
    setOpenSnackbar(true);
    setSnackbarSeverity("success");
    disableEditMode();
  };

  const handleCancel = () => {
    // TODO: Cancel the changes made to the paper
    setNewPaper(paper);
    setSnackbarMessage("Changes discarded");
    setOpenSnackbar(true);
    setSnackbarSeverity("warning");
    disableEditMode();
  };

  useEffect(() => {
    setNewPaper(paper);
  }, [paper]);

  return (
    <Box>
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

Overview.propTypes = {
  paper: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};
