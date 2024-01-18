import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import AddAssessment from "./AddAssessment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

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
      <TableContainer component={Paper} sx={{ mt: 2, mb: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
