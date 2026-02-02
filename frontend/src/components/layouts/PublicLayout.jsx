import { Outlet } from "react-router-dom";
import PublicNavbar from "../Navbars/PublicNavbar.jsx";

const PublicLayout = () => {
  return (
    <>
      <PublicNavbar />
      <Outlet />
    </>
  );
};

export default PublicLayout;
