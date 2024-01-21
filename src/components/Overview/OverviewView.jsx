// dependencies
import PropTypes from "prop-types";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function OverviewView({ paper, enableEditMode }) {
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid xs={12}>
        <Typography variant="h5">Paper Code</Typography>
        <Typography>{paper.paperCode}</Typography>
      </Grid>

      {/* Paper name */}
      <Grid xs={12}>
        <Typography variant="h5">Paper Name</Typography>
        <Typography>{paper.paperName}</Typography>
      </Grid>

      {/* Paper year */}
      <Grid xs={12}>
        <Typography variant="h5">Paper Year</Typography>
        <Typography>{paper.paperYear}</Typography>
      </Grid>

      {/* Paper semester */}
      <Grid xs={12}>
        <Typography variant="h5">Paper Semester</Typography>
        <Typography>{paper.paperSemester}</Typography>
      </Grid>

      {/* Paper department */}
      <Grid xs={12}>
        <Typography variant="h5">Paper Department</Typography>
        <Typography>
          {paper.paperDepartment === "" ? "Not Listed" : paper.paperDepartment}
        </Typography>
      </Grid>

      {/* Paper description */}
      <Grid xs={12}>
        <Typography variant="h5">Paper Description</Typography>
        <Typography>
          {paper.paperDescription === ""
            ? "Not Listed"
            : paper.paperDescription}
        </Typography>
      </Grid>

      <Grid xs={12}>
        <Button variant="outlined" onClick={enableEditMode}>
          Edit Overview
        </Button>
      </Grid>
    </Grid>
  );
}

OverviewView.propTypes = {
  paper: PropTypes.object.isRequired,
  enableEditMode: PropTypes.func.isRequired,
};
