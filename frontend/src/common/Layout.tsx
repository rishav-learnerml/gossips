import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Outlet />
      <Toaster />
    </div>
  );
};

export default Layout;
