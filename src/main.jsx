// libraries
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// components
import Root from "./layout/Root";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Settings from "./pages/Settings";
import AddPaper from "./pages/AddPaper";
import Paper from "./pages/Paper";

// styles
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <div>About</div>,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/add-paper",
        element: <AddPaper />,
      },
      {
        path: "/paper/:id",
        element: <Paper />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
