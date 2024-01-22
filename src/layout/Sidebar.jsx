// dependencies
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import Collapse from "@mui/material/Collapse";
import PropTypes from "prop-types";

// icons
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DescriptionIcon from "@mui/icons-material/Description";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// components
import { PaperContext } from "../context/PaperContext";

export default function Sidebar() {
  const drawerWidth = 240;
  const papers = useContext(PaperContext);
  const [papersOpen, setPapersOpen] = useState(false);
  const location = useLocation();

  const handleClick = () => {
    setPapersOpen(!papersOpen);
  };

  let CustomerListItem = ({ to, primary, children, passkey }) => {
    return (
      <ListItem disablePadding key={passkey}>
        <ListItemButton
          component={Link}
          to={to}
          selected={location.pathname === to}
        >
          <ListItemIcon>{children}</ListItemIcon>
          <ListItemText primary={primary} />
        </ListItemButton>
      </ListItem>
    );
  };

  CustomerListItem.propTypes = {
    passkey: PropTypes.string,
    to: PropTypes.string.isRequired,
    primary: PropTypes.string.isRequired,
    children: PropTypes.node,
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List component="nav">
          {/* Home Navigation */}
          <CustomerListItem to="/" primary="Home">
            <HomeIcon />
          </CustomerListItem>

          {/* About Navigation */}
          <CustomerListItem to="/about" primary="About">
            <InfoIcon />
          </CustomerListItem>

          {/* Add Paper Navigation */}
          <CustomerListItem to="/add-paper" primary="Add Paper">
            <NoteAddIcon />
          </CustomerListItem>

          {/* Papers Navigation */}
          <ListItem disablePadding>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="Papers" />
              {papersOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>

          {/* List of papers */}
          {papers && (
            <Collapse in={papersOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {papers.map((paper) => (
                  <CustomerListItem
                    key={paper.id}
                    passkey={paper.id}
                    to={`/paper/${paper.id}`}
                    primary={paper.paperName}
                  />
                ))}
              </List>
            </Collapse>
          )}

          <Divider />

          {/* Settings Navigation */}
          <CustomerListItem to="/settings" primary="Settings">
            <SettingsIcon />
          </CustomerListItem>
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
}
