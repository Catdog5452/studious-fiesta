// dependencies
import Box from "@mui/material/Box";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

// components
import { PaperContext, PaperUpdateContext } from "../context/PaperContext";
import Overview from "../components/Paper/Overview";
import Lecturers from "../components/Paper/Lecturers";
import PaperAssessments from "../components/Paper/Assessments";
import { addPaper, deletePaper, updatePaper } from "../database/PaperDB";

function a11yProps(index) {
  return {
    id: `paper-tab-${index}`,
    "aria-controls": `paper-tabpanel-${index}`,
  };
}

export default function Paper() {
  const papers = useContext(PaperContext);
  const setPapers = useContext(PaperUpdateContext);
  const params = useParams();
  const paperId = params.id;
  const paper = papers.find((paper) => paper.id === paperId);
  const [tabValue, setTabValue] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const navigate = useNavigate();

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDelete = () => {
    setOpenDelete(false);

    const newPapers = papers.filter((paper) => paper.id !== paperId);
    setPapers(newPapers);
    deletePaper(paperId).then(() => {
      navigate("/");
    });
  };

  const handleUpdate = (newPaper) => {
    // replace the paper in the list with the new one
    const newPapers = papers.map((paper) => {
      if (paper.id === paperId) {
        return newPaper;
      } else {
        return paper;
      }
    });

    setPapers(newPapers);
    console.log(newPapers);

    if (paperId == newPaper.id) {
      updatePaper(newPaper);
    } else {
      deletePaper(paperId).then(() => {
        addPaper(newPaper).then(() => {
          navigate(`/paper/${newPaper.id}`);
        });
      });
    }
  };

  return (
    paper && (
      <Box>
        <Grid container spacing={2}>
          <Grid xs={10}>
            <Typography variant="h4">
              {paper.paperCode}: {paper.paperName}
            </Typography>
          </Grid>
          <Grid xs={2} display="flex" alignItems="right" justifyContent="right">
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={handleOpenDelete}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Grid>
        </Grid>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Paper"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this paper? This can not be
              undone, and all data associated with this paper will be lost.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDelete}
              variant="outlined"
              color="warning"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              variant="outlined"
              color="error"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Box
          sx={{ mt: 1, borderBottom: 1, borderTop: 1, borderColor: "divider" }}
        >
          <Tabs
            value={tabValue}
            onChange={(event, newValue) => setTabValue(newValue)}
          >
            <Tab label="Overview" {...a11yProps(0)} />
            <Tab label="Lecturers" {...a11yProps(1)} />
            <Tab label="Assessments" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={tabValue} index={0}>
          <Overview paper={paper} handleUpdate={handleUpdate} />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <Lecturers paper={paper} />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={2}>
          <PaperAssessments paper={paper} />
        </CustomTabPanel>
      </Box>
    )
  );
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`paper-tab-${index}`}
      aria-labelledby={`paper-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
