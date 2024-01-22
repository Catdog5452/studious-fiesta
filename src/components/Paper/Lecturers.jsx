// dependencies
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Components
import CollapseAlert from "../CollapseAlert";

// TODO: implement this component. Table of papers with name and email, delete option, add button, maybe a contact button to redirect to mailto:email
export default function Lecturers({ paper, handleUpdate }) {
  const [newPaper, setNewPaper] = useState(paper);
  const [open, setOpen] = useState(false);
  const [newLecturer, setNewLecturer] = useState({
    lecturerName: "",
    lecturerEmail: "",
  });
  const [lecturers, setLecturers] = useState(newPaper.lecturers);

  // alert states
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteLecturer = (lecturerEmail) => {
    const updatedLecturers = lecturers.filter(
      (lecturer) => lecturer.lecturerEmail !== lecturerEmail
    );

    setLecturers(updatedLecturers);
    handlePaperUpdate(updatedLecturers);
  };

  const handleChange = (event) => {
    setNewLecturer((prevLecturer) => ({
      ...prevLecturer,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    if (newLecturer.lecturerName === "") {
      setAlertOpen(true);
      setAlertMessage("Please enter a lecturer name");
      return;
    }

    if (newLecturer.lecturerEmail === "") {
      setAlertOpen(true);
      setAlertMessage("Please enter a lecturer email");
      return;
    }

    // handle if the email already exists
    if (
      lecturers.find(
        (lecturer) => lecturer.lecturerEmail === newLecturer.lecturerEmail
      )
    ) {
      setAlertOpen(true);
      setAlertMessage("Lecturer email already exists");
      return;
    }

    const updatedLecturers = [...lecturers, newLecturer];
    setLecturers(updatedLecturers);

    handlePaperUpdate(updatedLecturers);

    console.log(newLecturer);
    setNewLecturer({
      lecturerName: "",
      lecturerEmail: "",
    });

    handleClose();
  };

  const handlePaperUpdate = (updatedLecturers) => {
    const updatedPaper = {
      ...newPaper,
      lecturers: updatedLecturers,
    };

    setNewPaper(updatedPaper);
    handleUpdate(updatedPaper);
  };

  useEffect(() => {
    setNewPaper((newPaper) => ({
      ...newPaper,
      lecturers: lecturers,
    }));
  }, [lecturers]);

  useEffect(() => {
    setNewPaper(paper);
  }, [paper]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5">Lecturers</Typography>
      {/* List all current lecturers for this paper */}

      <TableContainer component={Paper} sx={{ mt: 2, mb: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Lecturer Name</TableCell>
              <TableCell>Lecturer Email</TableCell>
              <TableCell width={30} align="right">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newPaper.lecturers.map((lecturer) => (
              <TableRow
                key={lecturer.lecturerEmail}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {lecturer.lecturerName}
                </TableCell>
                <TableCell>{lecturer.lecturerEmail}</TableCell>
                <TableCell align="right">
                  <IconButton
                    variant="contained"
                    onClick={() => {
                      handleDeleteLecturer(lecturer.lecturerEmail);
                    }}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add new lecturer to the paper */}
      <Button variant="contained" onClick={handleClickOpen}>
        New lecturer
      </Button>

      {/* Popup */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new lecturer</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {/* Lecturer name */}
            <Grid xs={12} sm={6}>
              <TextField
                autoComplete="off"
                required
                id="lecturerName"
                label="Lecturer Name"
                name="lecturerName"
                value={newLecturer.lecturerName}
                onChange={handleChange}
                autoFocus
                fullWidth
              />
            </Grid>

            {/* Lecturer email */}
            <Grid xs={12} sm={6}>
              <TextField
                autoComplete="off"
                required
                id="lecturerEmail"
                label="Lecturer Email"
                name="lecturerEmail"
                value={newLecturer.lecturerEmail}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
          <CollapseAlert alertOpen={alertOpen} setAlertOpen={setAlertOpen}>
            {alertMessage}
          </CollapseAlert>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Add
          </Button>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

Lecturers.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  paper: PropTypes.object.isRequired,
};
