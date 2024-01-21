//dependecies
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";

export default function OverviewEdit({
  newPaper,
  setNewPaper,
  handleCancel,
  handleSave,
}) {
  const handleChange = (event) => {
    setNewPaper((prevPaper) => ({
      ...prevPaper,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Grid
      component="form"
      onSubmit={handleSave}
      onReset={handleCancel}
      container
      spacing={2}
      sx={{ mt: 2, width: "100%", maxWidth: 850 }}
    >
      <Grid xs={12}>
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
      <Grid xs={12}>
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

      {/* Paper year */}
      <Grid xs={12}>
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
      <Grid xs={12}>
        <TextField
          required
          id="paperSemester"
          label="Paper Semester"
          name="paperSemester"
          value={newPaper.paperSemester}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      {/* Paper department */}
      <Grid xs={12}>
        <TextField
          id="paperDepartment"
          label="Paper Department"
          name="paperDepartment"
          value={newPaper.paperDepartment}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      {/* Paper description */}
      <Grid xs={12}>
        <TextField
          id="paperDescription"
          label="Paper Description"
          name="paperDescription"
          value={newPaper.paperDescription}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
        />
      </Grid>
      <Grid xs={12}>
        <Button
          variant="outlined"
          color="success"
          type="submit"
          sx={{ mr: 2, width: "100%", maxWidth: 120 }}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          color="warning"
          type="reset"
          sx={{ width: "100%", maxWidth: 120 }}
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
}

OverviewEdit.propTypes = {
  newPaper: PropTypes.object.isRequired,
  setNewPaper: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};
