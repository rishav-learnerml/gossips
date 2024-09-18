import logo from "../assets/gossips_logo.png";

const Quote = () => {
  return (
    <div className="bg-slate-200 h-[45vh] sm:h-screen sm:w-6/12 flex justify-center items-center flex-col">
      <img src={logo} alt="logo" className="w-52 rounded-full" />
      <div className="flex justify-center items-center flex-col">
        <div className="max-w-md text-center text-3xl font-semibold font-mono text-gray-800 py-3">
          No #FOMO with #GOSSIPS
        </div>
      </div>
    </div>
  );
};

export default Quote;
