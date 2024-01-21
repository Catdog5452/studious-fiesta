// dependencies
import CssBaseLine from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import AddLecturer from "../components/Add Paper/AddLecturer";
import Assessments from "../components/Add Paper/Assessments";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";

// components
import { PaperUpdateContext, PaperContext } from "../context/PaperContext";
import { addPaper } from "../database/PaperDB";
import CollapseAlert from "../components/CollapseAlert";
import SnackbarAlert from "../components/SnackbarAlert";

/**
 * Component to handle all adding of new papers to the system
 * @returns AddPaper Component
 */
export default function AddPaper() {
  // states
  const [newPaper, setNewPaper] = useState({
    id: "",
    paperCode: "",
    paperName: "",
    paperYear: new Date().getFullYear(),
    paperSemester: 1,
    paperDepartment: "",
    paperDescription: "",
    lecturers: [],
    assessments: [],
  });
  const [lecturers, setLecturers] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // contexts
  const setPapers = useContext(PaperUpdateContext);
  const papers = useContext(PaperContext);

  /**
   * Handle closing the snackbar
   * @param {*} event
   * @param {*} reason
   * @returns
   */
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  /**
   * Handle submitting the form and adding the paper to the database and context
   * @param {*} event onSubmit event
   * @returns return if error found
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    // check the total assessment weights
    let totalAssessmentWeight = 0;
    assessments.forEach((assessment) => {
      totalAssessmentWeight += parseInt(assessment.assessmentWeight);
    });

    // all assessments weight must be 100%
    if (totalAssessmentWeight !== 100) {
      setAlertOpen(true);
      setAlertMessage("Total assessment weight is not 100%");
      return;
    }

    // add lecturers and assessments to the new paper
    setNewPaper({
      ...newPaper,
      id: `${newPaper.paperCode}-${newPaper.paperYear}-${newPaper.paperSemester}`,
      lecturers: lecturers,
      assessments: assessments,
    });

    // check if paper already exists
    if (papers.find((paper) => paper.id === newPaper.id)) {
      setAlertOpen(true);
      setAlertMessage("Paper already exists");
      return;
    }

    // add the new paper to the database and context
    setPapers((papers) => [...papers, newPaper]);
    addPaper(newPaper);

    console.log(newPaper);
    setSnackbarOpen(true);

    handleReset();
  };

  /**
   * Handle resetting the form
   */
  const handleReset = () => {
    setNewPaper({
      id: "",
      paperCode: "",
      paperName: "",
      paperYear: new Date().getFullYear(),
      paperSemester: 1,
      paperDepartment: "",
      paperDescription: "",
    });
    setAlertOpen(false);
  };

  /**
   * Handle updating the newPaper state when a field is changed
   * @param {*} event onChange event
   */
  const handleChange = (event) => {
    setNewPaper({
      ...newPaper,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h5">Add Paper</Typography>

      <CssBaseLine />
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit}
        onReset={handleReset}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2} sx={{ width: "100%", maxWidth: 850 }}>
          {/* Paper code */}
          <Grid xs={12} sm={6}>
            <TextField
              required
              id="paperCode"
              label="Paper Code"
              name="paperCode"
              value={newPaper.paperCode}
              onChange={handleChange}
              autoFocus
              fullWidth
            />
          </Grid>

          {/* Paper name */}
          <Grid xs={12} sm={6}>
            <TextField
              required
              id="paperName"
              label="Paper Name"
              name="paperName"
              value={newPaper.paperName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Paper year 
            TODO: provide year selector*/}
          <Grid xs={6} sm={4}>
            <TextField
              required
              id="paperYear"
              label="Paper Year"
              name="paperYear"
              value={newPaper.paperYear}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Paper semester */}
          <Grid xs={6} sm={4}>
            <TextField
              required
              id="paperSemester"
              label="Paper Semester"
              name="paperSemester"
              fullWidth
              value={newPaper.paperSemester}
              onChange={handleChange}
            />
          </Grid>

          {/* Paper semester */}
          <Grid xs={6} sm={4}>
            <TextField
              id="paperDepartment"
              label="Paper Department"
              name="paperDepartment"
              fullWidth
              value={newPaper.paperDepartment}
              onChange={handleChange}
            />
          </Grid>

          {/* Paper description */}
          <Grid xs={12}>
            <TextField
              id="paperDescription"
              label="Paper Description"
              name="paperDescription"
              multiline
              rows={4}
              fullWidth
              value={newPaper.paperDescription}
              onChange={handleChange}
            />
          </Grid>

          {/* Add Lecturers */}
          <Grid xs={12}>
            <AddLecturer lecturers={lecturers} setLecturers={setLecturers} />
          </Grid>

          {/* Add Assessments */}
          <Grid xs={12}>
            <Assessments
              assessments={assessments}
              setAssessments={setAssessments}
            />
          </Grid>
        </Grid>

        {/* Alert */}
        <CollapseAlert alertOpen={alertOpen} setAlertOpen={setAlertOpen}>
          {alertMessage}
        </CollapseAlert>

        {/* Submit button */}
        <Grid
          spacing={2}
          container
          justifyContent="flex-end"
          sx={{ mt: 2, width: "100%", maxWidth: 400 }}
        >
          <Grid xs={12} sm={6}>
            <Button variant="contained" fullWidth color="success" type="submit">
              Add
            </Button>
          </Grid>
          <Grid xs={12} sm={6}>
            <Button variant="contained" fullWidth color="error" type="reset">
              Reset
            </Button>
          </Grid>
        </Grid>

        {/* Snackbar */}
        <SnackbarAlert
          severity="success"
          snackbarOpen={snackbarOpen}
          handleSnackbarClose={handleSnackbarClose}
        >
          Paper added successfully!
        </SnackbarAlert>
      </Box>
    </Box>
  );
}
