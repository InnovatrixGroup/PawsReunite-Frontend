import logo from "../pics/logo.png";
import { useEffect } from "react";
import "../styles/WelcomePage.css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function WelcomePage() {
  useEffect(() => {
    // add class to body for styling
    document.body.classList.add("welcome-page-body");
    // remove class when component unmount
    return () => {
      document.body.classList.remove("welcome-page-body");
    };
  });

  return (
    <div className="welcome-page-container">
      <div className="welcome-page-topbar">
        <img src={logo} alt="logo" className="w-12" />
        <a href="./signin">
          <button className="welcome-page-signin-btn">Sign In</button>
        </a>
      </div>
      <section className="welcome-page-words-container">
        <h1 className="">
          Discover the <span>Path</span> to Reunion
        </h1>
        <h3>Find Your Beloved Pet's Way Back Home!</h3>
        <p className="hidden md:block lg:block signup-container">
          Join us by <a href="./signup">Signing Up</a> Today and Find Your Furry Friend's Way Back
          to You!
        </p>

        <div className="block md:hidden lg:hidden signup-container">
          <NavigateNextIcon fontSize="small" />
          <a href="./signup">Sign up now</a>
        </div>
      </section>
    </div>
  );
}
