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
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { PaperUpdateContext } from "../context/PaperContext";

// components

export default function AddPaper() {
  const [paperCode, setPaperCode] = useState("");
  const [paperName, setPaperName] = useState("");
  const [paperYear, setPaperYear] = useState(new Date().getFullYear());
  const [paperSemester, setPaperSemester] = useState(1);
  const [paperDepartment, setPaperDepartment] = useState("");
  const [paperDescription, setPaperDescription] = useState("");
  const [lecturers, setLecturers] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const setPapers = useContext(PaperUpdateContext);

  const handleSubmit = (event) => {
    // TODO: implement
    event.preventDefault();

    let totalAssessmentWeight = 0;
    assessments.forEach((assessment) => {
      totalAssessmentWeight += parseInt(assessment.assessmentWeight);
    });

    if (totalAssessmentWeight !== 100) {
      // handle error
      setAlertOpen(true);
      setAlertMessage("Total assessment weight is not 100%");
      return;
    }

    const id = `${paperCode}-${paperYear}-${paperSemester}`;

    const paper = {
      id: id,
      paperCode: paperCode,
      paperName: paperName,
      paperYear: paperYear,
      paperSemester: paperSemester,
      paperDepartment: paperDepartment,
      paperDescription: paperDescription,
      lecturers: lecturers,
      assessments: assessments,
    };

    setPapers((papers) => [...papers, paper]);

    console.log(paper);

    handleReset();
  };

  const handleReset = () => {
    setLecturers([]);
    setAssessments([]);
    setPaperCode("");
    setPaperName("");
    setPaperYear(new Date().getFullYear());
    setPaperSemester(1);
    setPaperDepartment("");
    setPaperDescription("");
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
              value={paperCode}
              onChange={(event) => {
                setPaperCode(event.target.value);
              }}
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
              value={paperName}
              onChange={(event) => {
                setPaperName(event.target.value);
              }}
              fullWidth
            />
          </Grid>

          <Grid xs={6} sm={4}>
            {/* Paper year 
            TODO: provide year selector*/}
            <TextField
              required
              id="paperYear"
              label="Paper Year"
              name="paperYear"
              value={paperYear}
              onChange={(event) => {
                setPaperYear(event.target.value);
              }}
              fullWidth
            />
          </Grid>

          <Grid xs={6} sm={4}>
            {/* Paper semester */}
            <TextField
              required
              id="paperSemester"
              label="Paper Semester"
              name="paperSemester"
              fullWidth
              value={paperSemester}
              onChange={(event) => {
                setPaperSemester(event.target.value);
              }}
            />
          </Grid>

          <Grid xs={6} sm={4}>
            {/* Paper semester */}
            <TextField
              id="paperDepartment"
              label="Paper Department"
              name="paperDepartment"
              fullWidth
              value={paperDepartment}
              onChange={(event) => {
                setPaperDepartment(event.target.value);
              }}
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
              value={paperDescription}
              onChange={(event) => {
                setPaperDescription(event.target.value);
              }}
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
            {alertMessage}
          </Alert>
        </Collapse>

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
      </Box>
    </Box>
  );
}
