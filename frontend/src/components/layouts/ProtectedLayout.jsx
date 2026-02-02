import { Outlet } from "react-router-dom";
import DashboardNavbar from "../Navbars/DashboardNavbar";

const ProtectedLayout = () => {
  return (
    <>
      <DashboardNavbar />
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
