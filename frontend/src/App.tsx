import { RouterProvider } from "react-router-dom";
import "./App.css";
import Approuter from "./router/Approuter";

function App() {
  return <RouterProvider router={Approuter} />;
}

export default App;
