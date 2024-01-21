// dependencies
import { useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

// components
import CollapseAlert from "../CollapseAlert";

/**
 * Add a new assessment to the current new paper
 *
 * @export
 * @param {*} {
 *   assessments,
 *   setAssessments,
 *   open,
 *   handleClose,
 * }
 * @return {*}
 */
export default function AddAssessment({
  assessments,
  setAssessments,
  open,
  handleClose,
}) {
  // states
  const [newAssessment, setNewAssessment] = useState({
    assessmentName: "",
    assessmentWeight: "",
    assessmentDueDate: dayjs(),
    assessmentDueTime: dayjs().minute(0),
    hasSubAssessments: false,
  });

  // alert states
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  /**
   * Handle any changes to the form and update the newAssessment state
   * @param {*} event onChange event
   */
  const handleChange = (event) => {
    setNewAssessment((newAssessment) => ({
      ...newAssessment,
      [event.target.name]: event.target.value,
    }));
  };

  /**
   * Clear the form
   */
  const clearForm = () => {
    setNewAssessment({
      assessmentName: "",
      assessmentWeight: "",
      assessmentDueDate: dayjs(),
      assessmentDueTime: dayjs().minute(0),
      hasSubAssessments: false,
    });
  };

  /**
   * Handle the submit button click
   * @returns if there is a validation error, display a snackbar message and return
   */
  const handleSubmit = () => {
    // check if the assessment name is empty
    if (newAssessment.assessmentName === "") {
      console.log("Assessment name is empty");
      setAlertMessage("Assessment name is empty");
      setAlertOpen(true);
      return;
    }

    // check if the assessment name already exists
    const isAssessmentNameExists = assessments.some(
      (assessment) => assessment.assessmentName === newAssessment.assessmentName
    );
    if (isAssessmentNameExists) {
      console.log("Assessment name already exists");
      setAlertMessage("Assessment name already exists");
      setAlertOpen(true);
      return;
    }

    // check if the assessment weight is a number
    if (isNaN(newAssessment.assessmentWeight)) {
      console.log("Assessment weight must be a number");
      setAlertMessage("Assessment weight must be a number");
      setAlertOpen(true);
      return;
    }

    // check if the assessment weight is empty
    if (newAssessment.assessmentWeight === "") {
      console.log("Assessment weight is empty");
      setAlertMessage("Assessment weight is empty");
      setAlertOpen(true);
      return;
    }

    // create an assessment object. this is the format that the database expects
    const assessment = {
      assessmentName: newAssessment.assessmentName,
      assessmentWeight: newAssessment.assessmentWeight,
      assessmentDueDate: newAssessment.assessmentDueDate.format("DD/MM/YYYY"),
      assessmentDueTime: newAssessment.assessmentDueTime.format("HH:mma"),
      hasSubAssessments: newAssessment.hasSubAssessments ? "Yes" : "No",
    };

    // add the assessment to the state
    setAssessments((assessments) => [...assessments, assessment]);

    // close the dialog and reset the form
    handleClose();
    setAlertOpen(false);
    clearForm();
  };

  return (
    <Container>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* Dialog for adding new assessment */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add new assessment</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {/* Assessment name */}
              <Grid xs={12}>
                <TextField
                  required
                  id="assessmentName"
                  label="Assessment Name"
                  name="assessmentName"
                  value={newAssessment.assessmentName}
                  onChange={handleChange}
                  autoFocus
                  fullWidth
                />
              </Grid>

              {/* Assessment due date */}
              <Grid xs={12} sm={6}>
                <DatePicker
                  label="Due Date"
                  name="assessmentDueDate"
                  value={newAssessment.assessmentDueDate}
                  onChange={handleChange}
                  format="DD/MM/YYYY"
                  fullWidth
                />
              </Grid>

              {/* Assessment due time */}
              <Grid xs={12} sm={6}>
                <TimePicker
                  label="Due Time"
                  name="assessmentDueTime"
                  value={newAssessment.assessmentDueTime}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

              {/* Assessment weight */}
              <Grid xs={12} sm={6}>
                <TextField
                  required
                  id="assessmentWeight"
                  label="Assessment Weight"
                  name="assessmentWeight"
                  value={newAssessment.assessmentWeight}
                  onChange={handleChange}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid xs={12} sm={6}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={newAssessment.hasSubAssessments}
                        onChange={handleChange}
                        name="hasSubAssessments"
                        id="hasSubAssessments"
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label="Are there any sub assessments?"
                    labelPlacement="start"
                  />
                </FormGroup>
              </Grid>
            </Grid>

            {/* Alert */}
            <CollapseAlert alertOpen={alertOpen} setAlertOpen={setAlertOpen}>
              {alertMessage}
            </CollapseAlert>
          </DialogContent>
          <DialogActions>
            {/* Submit button */}
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Add
            </Button>

            {/* Cancel button */}
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                handleClose();
                setAlertOpen(false);
                clearForm();
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
    </Container>
  );
}

// prop types
AddAssessment.propTypes = {
  assessments: PropTypes.array.isRequired,
  setAssessments: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
