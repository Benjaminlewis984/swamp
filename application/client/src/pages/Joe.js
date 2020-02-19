import React from 'react';
import joe from "../imgs/Joe.jpg";

const Joe = () => {
    return (
        <div>
            <h1>Weerachai Poorakkiat</h1>
            <img class="profile" src={joe} />
            <p>Hello Hungry People :)</p>
            <div> 
                <p>You can call me 'Joe' that's my nickname</p>
                <p>I was born in Thailand, Land of smile :)</p>
                <p>I've been living in the U.S for 15 years (approximately)</p>
                <p>I was pursueing Register Nurse degree but found out that it's not right
                    for me so I changed it to be computer science since it attracts me so much in
                    tern of excitement and joys when I can create something.
                </p>
                <p> On top of it, if i can solve/fix something, it gives me happiness and joys to my life!!!</p>
                <p>-Hobby-</p>
                <li> I love sleeping (I hope everybody does too!) </li>
                <li> I love dogs but i dont like cats (they are great betrayers!!! lol)</li>
                <li> I'm developing games for now as a beginner but HEY! I got 2 games to show off lol </li>
                <p>MY goal is... A full stack dev, who can help community to be better</p>
            </div>
        </div>
    );
};

export default Joe;