import React from 'react';
import onu from "../../imgs/Onu.jpg";

const Onu = () => {
    return (
        <div>
            <header class="bg-white text-white text-center" padding-top="15px">
                <div class="container d-flex align-items-center flex-column">
                    <img class="profile" src={onu} alt="" />
                    <h1 class="text-dark text-uppercase mb-0">Onubulachi Wami</h1>
                    <p class="text-dark">Novice Web Developer - B.S. Computer Science</p>
                </div>
            </header>
            {/* <!-- About Section--> */}
            <section class="bg-info text-white mb-0" id="about" >
                <div class="container">
                    <h2 class="text-center text-uppercase text-white" >About</h2>
                    <div class="row">
                        <div class="col-lg-4 ml-auto">
                            <p class="lead">
                            Born of Nigerian parents in Pasadena, California, I moved to the 
                            Bay Area to pursue a degree in Computer Science at San Francisco 
                            State University. I originally studied Mathematics
                            at University of California: Santa Barbara until discovering Python for
                            a prerequisite class. I have never looked back. My interest in technology
                            originally sparked from childhood video games. I have dreams of eventually
                            becoming a software engineer or working in cyber-security as it becomes
                            an increasingly important field while technology continues to move forward. 
                        </p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="bg-light text-white mb-0" id="about">
                <div class="container">
                    <section class="bg-light text-dark mb-0" id="about">
                <div class="container">
                    <h2 class="text-center text-uppercase text-dark">Fun Facts</h2>
                    <div class="row">
                        <div class="col-lg-4 ml-auto">
                            <p class="lead">
<ul>
    <li>Sports: Basketball, Rugby, Track, Jump Rope</li>
    <li>Hobbies: Video Games, YouTube tutorials, Learning</li>
    <li>Music: Jazz Fusion, Hip Hop, (Alternative) R&B, Neo Soul </li>
</ul>
                        </p>
                        </div>
                    </div>
                </div>
            </section>     
                </div>
            </section>

            <footer class="footer text-center bg-secondary">
            <div class="container">
                <div class="row">

                    <div class="col-lg-4 mb-5 mb-lg-0">
                        <h4 class="text-uppercase mb-4">Contact Me</h4>
                        <a class="btn btn-outline-light btn-social mx-1" href="#!"><i class="fab fa-fw fa-facebook-f"></i></a>
                            <a class="btn btn-outline-light btn-social mx-1" href="#!"><i class="fab fa-fw fa-twitter"></i></a>
                            <a class="btn btn-outline-light btn-social mx-1" href="#!"><i class="fab fa-fw fa-linkedin-in"></i></a>
                    </div>
                </div>
            </div>
        </footer>
        </div>
    );
};

export default Onu;
