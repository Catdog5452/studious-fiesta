import { useState } from "react";
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

export default function AddLecturer({ lecturers, setLecturers }) {
  // component code here
  const [open, setOpen] = useState(false);
  const [lecturerName, setLecturerName] = useState("");
  const [lecturerEmail, setLecturerEmail] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteLecturer = (lecturerEmail) => {
    setLecturers(
      lecturers.filter((lecturer) => lecturer.lecturerEmail !== lecturerEmail)
    );
  };

  const handleSubmit = () => {
    if (lecturerName != "" && lecturerEmail != "") {
      const lecturer = {
        lecturerName: lecturerName,
        lecturerEmail: lecturerEmail,
      };

      setLecturers([...lecturers, lecturer]);

      console.log(lecturer);
      setLecturerName("");
      setLecturerEmail("");

      handleClose();
    } else {
      // handle error
    }
  };

  return (
    <Box>
      <Typography variant="h6">Lecturers</Typography>
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
            {lecturers.map((lecturer) => (
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
                value={lecturerName}
                onChange={(event) => {
                  setLecturerName(event.target.value);
                }}
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
                value={lecturerEmail}
                onChange={(event) => {
                  setLecturerEmail(event.target.value);
                }}
                fullWidth
              />
            </Grid>
          </Grid>
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

AddLecturer.propTypes = {
  lecturers: PropTypes.array.isRequired,
  setLecturers: PropTypes.func.isRequired,
};
