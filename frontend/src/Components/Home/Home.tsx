import React from "react";
import "./Home.css";
import { useSelector} from "react-redux";

function Home() {
  const followUp = useSelector((state: any) => state.followUp);

  return (
    <div className="homeDiv">
      <div className="textHome">
      <h1>Welcome to Super Vacations !</h1>
      <p>
        Super Vacations guided tours include airfare from more than 100
        conveniently located U.S. airports, great hotels, delightful meals and
        interesting sights. <br/>
        Our expert Tour Directors are quite simply the best
        in the industry. They handle all travel details to ensure that your
        vacation is happy and carefree. We are proud to be one of America’s most
        reputable tour companies, producing unparalleled travel experiences
        since 1973. <br/><br/><span>Discover for yourself the many benefits of traveling with
        Super Vacations...</span>
      </p>
      </div>
      <footer>&copy; All Right Reserved to Lital Ackerman</footer>


    </div>
  );
}

export default Home;
