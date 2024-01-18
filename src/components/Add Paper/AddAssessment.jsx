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

export default function AddAssessment({
  assessments,
  setAssessments,
  open,
  handleClose,
}) {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [dueDate, setDueDate] = useState(dayjs());
  const [dueTime, setDueTime] = useState(dayjs().minute(0));
  const [hasSubAssessments, setHasSubAssessments] = useState(false);
  const [subAssessments, setSubAssessments] = useState([]);

  return (
    <Container>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* Dialog for adding new assessment */}

        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            autoComplete: "off",
            onSubmit: (event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              const formData = Object.fromEntries(data.entries());
              setAssessments([...assessments, formData]);
              console.log(formData);
              handleClose();
            },
          }}
        >
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
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoFocus
                  fullWidth
                />
              </Grid>

              {/* Assessment due date */}
              <Grid xs={12} sm={6}>
                <DatePicker
                  label="Due Date"
                  name="assessmentDueDate"
                  value={dueDate}
                  onChange={(newValue) => {
                    setDueDate(newValue);
                  }}
                  format="DD/MM/YYYY"
                />
              </Grid>

              {/* Assessment due time */}
              <Grid xs={12} sm={6}>
                <TimePicker
                  label="Due Time"
                  name="assessmentDueTime"
                  value={dueTime}
                  onChange={(newValue) => {
                    setDueTime(newValue);
                  }}
                />
              </Grid>

              {/* Assessment weight */}
              <Grid xs={12} sm={6}>
                <TextField
                  required
                  id="assessmentWeight"
                  label="Assessment Weight"
                  name="assessmentWeight"
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
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
                        checked={hasSubAssessments}
                        onChange={(event) =>
                          setHasSubAssessments(event.target.checked)
                        }
                      />
                    }
                    label="Are there any sub assessments?"
                    labelPlacement="start"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="success" type="submit">
              Add
            </Button>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
    </Container>
  );
}

AddAssessment.propTypes = {
  assessments: PropTypes.array.isRequired,
  setAssessments: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
