// libraries
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import Collapse from "@mui/material/Collapse";

// icons
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DescriptionIcon from "@mui/icons-material/Description";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// components
import { PaperConext } from "../context/PaperContext";

export default function Sidebar() {
  const drawerWidth = 240;
  const papers = useContext(PaperConext);
  const [papersOpen, setPapersOpen] = useState(false);

  const handleClick = () => {
    setPapersOpen(!papersOpen);
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
        <List>
          {/* Home Navigation */}
          <Link to="/">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
          </Link>

          {/* About Navigation */}
          <Link to="/about">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="About" />
              </ListItemButton>
            </ListItem>
          </Link>

          {/* Add Paper Navigation */}
          <Link to="/add-paper">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <NoteAddIcon />
                </ListItemIcon>
                <ListItemText primary="Add Paper" />
              </ListItemButton>
            </ListItem>
          </Link>

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
          <Collapse in={papersOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {papers.map((paper) => (
                <Link to={`/paper/${paper.id}`} key={paper.id}>
                  <ListItem disablePadding>
                    <ListItemButton
                      sx={{
                        pl: 4,
                        ...(location.pathname === `/paper/${paper.id}` && {
                          bgcolor: "primary.main",
                        }),
                      }}
                    >
                      <ListItemText primary={paper.paperName} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
          </Collapse>

          <Divider />

          {/* Settings Navigation */}
          <Link to="/settings">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
}
