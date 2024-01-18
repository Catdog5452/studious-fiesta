import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import AddAssessment from "./AddAssessment";

export default function Assessments({ assessments, setAssessments }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteAssessment = (assessmentName) => {
    setAssessments(
      assessments.filter(
        (assessment) => assessment.assessmentName !== assessmentName
      )
    );
  };

  return (
    <Box>
      <Typography variant="h6">Assessments</Typography>
      {/* List all current assessments 
      Maybe want to use a table or more complex List*/}

      {/* Add new assessment to the paper */}
      <Button variant="contained" onClick={handleOpen}>
        NEW ASSESSMENTS
      </Button>

      <AddAssessment
        assessments={assessments}
        setAssessments={setAssessments}
        open={open}
        handleClose={handleClose}
      />
    </Box>
  );
}

Assessments.propTypes = {
  assessments: PropTypes.array.isRequired,
  setAssessments: PropTypes.func.isRequired,
};
