import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router.jsx";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
  </AuthProvider>,
);
