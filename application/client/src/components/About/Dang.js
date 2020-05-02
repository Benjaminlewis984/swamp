import React from 'react';
import dang from "../../imgs/dang.jpg";

const Dang = () => {
    return (
        <div class="container">
            <h1>Dang Le</h1>
            <img class="profile" src={dang} />
            <h4>Senior at San Francisco State University</h4>
            <p class="box-lim">
                Born in Saigon, raised in California <br /> <br />
                Majoring in computer science with dreams of becoming a game developer. 
                Outside of school, I proudly work at the restaurant <i>MAMA</i> in Oakland.
                On my free time I enjoy hiking, exploring music, and playing video games.
            </p>
        </div>
    );
};

export default Dang;