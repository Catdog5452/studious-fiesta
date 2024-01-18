import { useState } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

export default function AddLecturer({ lecturers, setLecturers }) {
  // component code here
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteLecturer = (lecturerEmail) => {
    setLecturers(
      lecturers.filter((lecturer) => lecturer.lecturerEmail !== lecturerEmail)
    );
  };

  return (
    <Box>
      <Typography variant="h6">Lecturers</Typography>
      {/* List all current lecturers for this paper */}
      <List>
        {lecturers.map((lecturer) => (
          <ListItem key={lecturer.lecturerEmail}>
            <ListItemText primary={lecturer.lecturerName} />
            <ListItemSecondaryAction>
              <IconButton
                onClick={() => {
                  handleDeleteLecturer(lecturer.lecturerEmail);
                }}
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {/* Add new lecturer to the paper */}
      <Button variant="contained" onClick={handleClickOpen}>
        New lecturer
      </Button>

      {/* Popup */}
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
            setLecturers([...lecturers, formData]);
            console.log(formData);
            handleClose();
          },
        }}
      >
        <DialogTitle>Add new lecturer</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {/* Lecturer name */}
            <Grid xs={12} sm={6}>
              <TextField
                required
                id="lecturerName"
                label="Lecturer Name"
                name="lecturerName"
                autoFocus
                fullWidth
              />
            </Grid>

            {/* Lecturer email */}
            <Grid xs={12} sm={6}>
              <TextField
                required
                id="lecturerEmail"
                label="Lecturer Email"
                name="lecturerEmail"
                fullWidth
              />
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
    </Box>
  );
}

AddLecturer.propTypes = {
  lecturers: PropTypes.array.isRequired,
  setLecturers: PropTypes.func.isRequired,
};
