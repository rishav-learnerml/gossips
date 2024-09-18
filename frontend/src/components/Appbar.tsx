import { AvatarPic } from "@/pages/BlogCard";
import logo from '../assets/gossips_logo.png'

const Appbar = () => {
  return (
    <div className="border-b flex justify-between items-center px-10 py-4">
      <div className="text-lg font-semibold flex items-center">
        <img src={logo} alt="logo" className="w-8 rounded-full"/>
        <span className="pl-4">Gossips</span>
      </div>
      <div>
        <AvatarPic name="Rishav Chatterjee" />
      </div>
    </div>
  );
};

export default Appbar;
