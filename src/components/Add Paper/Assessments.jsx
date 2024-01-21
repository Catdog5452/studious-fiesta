// dependencies
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

// components
import AddAssessment from "./AddAssessment";

/**
 * Add a new assessment to the current new paper, and list all assessments
 * @param {*} param0 assessments and setAssessments props
 * @returns List of all assessments and the ability to add new assessments
 */
export default function Assessments({ assessments, setAssessments }) {
  // states
  const [open, setOpen] = useState(false);

  /**
   * Handle the open and close of the add assessment dialog
   */
  const handleOpen = () => {
    setOpen(true);
  };

  /**
   * Handle the open and close of the add assessment dialog
   */
  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Handle the delete assessment button click
   * @param {string} assessmentName name of the assessment to delete
   */
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
      {/* Display al the current assessments in a table */}
      <TableContainer component={Paper} sx={{ mt: 2, mb: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {/* Headers */}
          <TableHead>
            <TableRow>
              <TableCell>Assessment Name</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Due Time</TableCell>
              <TableCell>Sub Assessments</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          {/* Assessments */}
          <TableBody>
            {assessments.map((assessment) => (
              <TableRow
                key={assessment.assessmentName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {assessment.assessmentName}
                </TableCell>
                <TableCell>{assessment.assessmentWeight}</TableCell>
                <TableCell>{assessment.assessmentDueDate}</TableCell>
                <TableCell>{assessment.assessmentDueTime}</TableCell>
                <TableCell>{assessment.hasSubAssessments}</TableCell>
                <TableCell>
                  <IconButton
                    variant="contained"
                    onClick={() =>
                      handleDeleteAssessment(assessment.assessmentName)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add new assessment to the paper */}
      <Button variant="contained" onClick={handleOpen}>
        NEW ASSESSMENTS
      </Button>

      {/* Dialog for adding new assessment */}
      <AddAssessment
        assessments={assessments}
        setAssessments={setAssessments}
        open={open}
        handleClose={handleClose}
      />
    </Box>
  );
}

// prop types
Assessments.propTypes = {
  assessments: PropTypes.array.isRequired,
  setAssessments: PropTypes.func.isRequired,
};
