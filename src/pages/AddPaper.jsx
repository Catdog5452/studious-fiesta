// dependencies
import CssBaseLine from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import AddLecturer from "../components/Add Paper/AddLecturer";
import AddAssessments from "../components/Add Paper/AddAssessments";
import { useState } from "react";

// components

export default function AddPaper() {
  const [lecturers, setLecturers] = useState([]);
  const handleSubmit = () => {
    // TODO: implement
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h5">Add Paper</Typography>

      <CssBaseLine />
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          {/* Paper code */}
          <Grid xs={12} sm={6}>
            <TextField
              required
              id="paperCode"
              label="Paper Code"
              name="paperCode"
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
              fullWidth
              defaultValue={new Date().getFullYear()}
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
              defaultValue={1}
            />
          </Grid>

          <Grid xs={6} sm={4}>
            {/* Paper semester */}
            <TextField
              id="paperDepartment"
              label="Paper Department"
              name="paperDepartment"
              fullWidth
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
            />
          </Grid>

          {/* Add Lecturers */}

          <Grid xs={12}>
            <AddLecturer lecturers={lecturers} setLecturers={setLecturers} />
          </Grid>

          {/* Add Assessments */}
          <Grid xs={12}>
            <AddAssessments />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
