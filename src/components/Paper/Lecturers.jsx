// dependencies
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
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
  const [newLecturer, setNewLecturer] = useState({
    lecturerName: "",
    lecturerEmail: "",
  });
  const [lecturers, setLecturers] = useState(newPaper.lecturers);

  // alert states
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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

  const handleSubmit = (event) => {
    event.preventDefault();
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

    handleReset();
  };

  const handlePaperUpdate = (updatedLecturers) => {
    const updatedPaper = {
      ...newPaper,
      lecturers: updatedLecturers,
    };

    setNewPaper(updatedPaper);
    handleUpdate(updatedPaper);
  };

  const handleReset = () => {
    setNewLecturer({
      lecturerName: "",
      lecturerEmail: "",
    });
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
    <Box>
      <Typography variant="h5">Lecturers</Typography>
      {/* List all current lecturers for this paper */}

      <TableContainer
        component={Paper}
        sx={{ mt: 2, mb: 2, minWidth: 650, width: "100%" }}
      >
        <Table aria-label="simple table">
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
                    color="error"
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

      {/* Add new lecturer */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        onReset={handleReset}
        sx={{ mt: 2 }}
      >
        <Grid container spacing={2} sx={{ width: "100%" }}>
          <Grid xs={12}>
            <Typography variant="h6">Add New Lecturer</Typography>
          </Grid>

          <Grid xs={12}>
            <TextField
              label="Lecturer Name"
              variant="outlined"
              name="lecturerName"
              value={newLecturer.lecturerName}
              onChange={handleChange}
              fullWidth
              required
              autoComplete="off"
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              label="Lecturer Email"
              variant="outlined"
              name="lecturerEmail"
              value={newLecturer.lecturerEmail}
              onChange={handleChange}
              fullWidth
              required
              autoComplete="off"
            />
          </Grid>
          <Grid xs={12}>
            <CollapseAlert alertOpen={alertOpen} setAlertOpen={setAlertOpen}>
              {alertMessage}
            </CollapseAlert>
          </Grid>
          <Grid xs={3}>
            <Button variant="outlined" color="success" type="submit" fullWidth>
              Add Lecturer
            </Button>
          </Grid>
          <Grid xs={3}>
            <Button variant="outlined" color="warning" type="reset" fullWidth>
              Reset
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

Lecturers.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  paper: PropTypes.object.isRequired,
};
