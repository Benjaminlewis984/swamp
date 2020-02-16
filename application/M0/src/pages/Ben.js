import React from 'react';
import '../styles/Benjamin.css';
import sf_logo from "../imgs/sf-logo.png";
import BenImage from "../imgs/BenImage.jpg";
import linkedIn from "../imgs/LinkedIn_logo.png";

const Ben = () => {
    return (
    <body bgcolor="white">
        <div>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div class="linkedIn" target="_blank">
                <a href="https://www.linkedin.com/in/benjamin-lewis984/" target="_blank">
                <img src={linkedIn} alt="LinkedIn_logo" width="35px" href="https://www.linkedin.com/in/benjamin-lewis984/"></img>
                </a> 
            </div>
            <p>
                <img src={sf_logo} alt="sf-logo" class="sf-image" />
            </p>
            <div class="glow">
                <h1 id="aboutme" class="about-me-text">ABOUT ME</h1>
            </div>
            <p id='name' class="ben-text">Benjamin Lewis</p>
        
        
        </div>
        <img class="profile" src={BenImage} />

        <div class="paragraph">
            <p>
                Born in Lincoln, California I moved to Bay Area in order to persue a computer science degree at San Francisco State University
            </p>
            <p>I have worked a few jobs since I was 16 as: </p>
            <p>--OUYA Software Developer Intern</p>
            <p>--ITC Associate Engineer</p>
            <p>--Swim Instructor (part time currently)</p>
            <p>Some hobbies include</p>
            <p>--Playing piano</p>
            <p>--Logic Pro X music production</p>
            <p>--Reading (Fantasy genre is my favorite)</p>
            <p>--Playing video games (FromSoft is my favorite game developer)</p>
        </div>
    </body>
    );
};

export default Ben;