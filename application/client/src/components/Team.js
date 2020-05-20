import React from "react";
import { Link } from "react-router-dom";
import Disclaimer from "./Disclaimer";

// Import profile pictures
import ben from "../imgs/BenImage.jpg";
import dang from "../imgs/dang.jpg";
import will from "../imgs/william.jpg";
import joe from "../imgs/Joe.jpg";
import onu from "../imgs/Onu.jpg";
import kevin from "../imgs/kevin.jpg";
import ReactGA from 'react-ga';

const Team = () => {
  ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
  ReactGA.pageview(window.location.pathname + window.location.search);
  return (
    <div>
      <div className="col-10 mx-auto text-center text-title pt-5">
        <h2 className="text-center text-title">Our Team</h2>
        {/* First row */}
        <div className="row">
          <div className="mt-5 mb-5 mx-auto">
            <Link to="/ben">
              <img className="profile" src={ben} />
            </Link>
            <h3>Ben</h3>
            <p className="title">Team Lead</p>
          </div>

          <div className="mt-5 mb-5 mx-auto">
            <Link to="/dang">
              <img className="profile" src={dang} />
            </Link>
            <h3>Dang</h3>
            <p className="title">Front-End Lead</p>
          </div>

          <div className="mt-5 mb-5 mx-auto">
            <Link to="/will">
              <img className="profile" src={will} />
            </Link>
            <h3>Will</h3>
            <p className="title">Back-End Lead</p>
          </div>
        </div>

        {/* Second row */}
        <div className="row">
          <div className="mt-5 mb-5 mx-auto">
            <Link to="/joe">
              <img className="profile" src={joe} />
            </Link>
            <h3>Weerachai</h3>
            <p className="title">Git Master</p>
          </div>

          <div className="mt-5 mb-5 mx-auto">
            <Link to="/onu">
              <img className="profile" src={onu} />
            </Link>
            <h3>Onu</h3>
            <p className="title">Front-End</p>
          </div>

          <div className="mt-5 mb-5 mx-auto">
            <Link to="/kevin">
              <img className="profile" src={kevin} />
            </Link>
            <h3>Kevin</h3>
            <p className="title">Back-End</p>
          </div>
        </div>
      </div>
      <Disclaimer />
    </div>
  );
};

export default Team;
