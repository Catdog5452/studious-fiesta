// libraries
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
//import IconButton from "@mui/material/IconButton";
//import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Paper Management System
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
