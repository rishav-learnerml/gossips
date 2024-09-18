import Auth from "../components/Auth";
import Quote from "../components/Quote";

const SignIn = () => {
  return (
    <div className="flex flex-col-reverse justify-between sm:flex-row reverse">
      <Auth type="signin" />
      <Quote />
    </div>
  );
};

export default SignIn;
