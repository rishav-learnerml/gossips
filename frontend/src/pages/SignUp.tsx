import Auth from "../components/Auth";
import Quote from "../components/Quote";

const SignUp = () => {
  return (
    <div className="flex flex-col-reverse justify-between sm:flex-row reverse">
      <Auth type="signup" />
      <Quote />
    </div>
  );
};

export default SignUp;
