import { AvatarPic } from "@/pages/BlogCard";
import logo from "../assets/gossips_logo.png";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Appbar = () => {
  return (
    <div className="border-b flex justify-between items-center px-10 py-4">
      <Link
        to={"/blogs"}
        className="text-lg font-semibold flex items-center cursor-pointer"
      >
        <img src={logo} alt="logo" className="w-8 rounded-full" />
        <span className="pl-4">Gossips</span>
      </Link>
      <div className="flex">
        <Link to={"/publish"}>
          <Button
            variant="secondary"
            className="bg-black text-white hover:text-black mr-10"
          >
            New Gossip
          </Button>
        </Link>
        <AvatarPic name="Rishav Chatterjee" />
      </div>
    </div>
  );
};

export default Appbar;
