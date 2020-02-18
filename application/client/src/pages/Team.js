import React from 'react';
import { Switch, Route, Link } from "react-router-dom";

import ben from "../imgs/BenImage.jpg";
import dang from "../imgs/dang.jpg";
import will from "../imgs/william.jpg";
import joe from "../imgs/Joe.jpg";
import onu from "../imgs/Onu.jpeg";
import kevin from "../imgs/kevin.jpg";

import Ben from './Ben';
import Dang from './Dang';
import William from './William';
import Joe from './Joe';
import Onu from './Onu';
import Kevin from './Kevin';


const Team = () => {
  return (
    <div class="container">
      <h2>Our Team</h2>      

      <div class="team-box">
        <table>
          <tbody>
            <tr>
              <td>
                <Link to="/ben">
                  <img class="profile" src={ben} />
                </Link>
                <h3>Ben</h3>
                <p class="title">Team Lead</p>
              </td>
              <td>
                <Link to="/dang">
                  <img class="profile" src={dang} />
                </Link>
                <h3>Dang</h3>
                <p class="title">Front-End Lead</p>
              </td>
              <td>
                <Link to="/will">
                  <img class="profile" src={will} />
                </Link>
                <h3>Will</h3>
                <p class="title">Back-End Lead</p>
              </td>
            </tr>

            <tr>
              <td>
                <Link to="/joe">
                  <img class="profile" src={joe} />
                </Link>
                <h3>Weerachai</h3>
                <p class="title">Git Master</p>
              </td>
              <td>
                <Link to="/onu">
                  <img class="profile" src={onu} />
                </Link>
                <h3>Onu</h3>
                <p class="title">Front-End</p>
              </td>
              <td>
                <Link to="/kevin">
                  <img class="profile" src={kevin} />
                </Link>
                <h3>Kevin</h3>
                <p class="title">Back-End</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Switch>
          <Route exact path="/ben" component={Ben} />
          <Route exact path="/dang" component={Dang} />
          <Route exact path="/will" component={William} />
          <Route exact path="/joe" component={Joe} />
          <Route exact path="/onu" component={Onu} />
          <Route exact path="/kevin" component={Kevin} />
        </Switch>
    </div>
    
  );
};

export default Team;