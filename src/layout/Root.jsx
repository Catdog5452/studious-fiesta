// dependencies
import { Outlet } from "react-router-dom";
import CssBaseLine from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

// components
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Root() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseLine />
      <Header />
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
