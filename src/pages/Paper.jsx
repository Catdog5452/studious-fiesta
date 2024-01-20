// dependencies
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";

// components
import { PaperContext } from "../context/PaperContext";
import Overview from "../components/Paper/Overview";
import Lecturers from "../components/Paper/Lecturers";
import PaperAssessments from "../components/Paper/Assessments";

function a11yProps(index) {
  return {
    id: `paper-tab-${index}`,
    "aria-controls": `paper-tabpanel-${index}`,
  };
}

export default function Paper() {
  const papers = useContext(PaperContext);
  const params = useParams();
  const paperId = params.id;
  const paper = papers.find((paper) => paper.id === paperId);
  const [tabValue, setTabValue] = useState(0);

  return (
    paper && (
      <Box>
        <Typography variant="h4">
          {paper.paperCode}: {paper.paperName}
        </Typography>
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
          <Overview paper={paper} />
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
