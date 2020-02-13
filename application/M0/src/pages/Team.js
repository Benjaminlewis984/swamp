import React from 'react';
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";

const Team = () => {
    return (
      <div id="team container">
          <h2>648</h2>

          <Row id="top">
              <div>
                <img />
                <h3>Ben</h3>
                <p>Team lead</p>
              </div>

              <div>
                <img />
                <h3>Dang</h3>
                <p>Front end lead</p>
              </div>

              <div>
                <img />
                <h3>Will</h3>
                <p>Back end lead</p>
              </div>
          </Row>
          <Row id="bottom">
              <div>

              </div>
          </Row>
      </div>  
    );
};

export default Team;