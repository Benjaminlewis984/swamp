import React from 'react';
import profile_picture from "../../imgs/william.jpg";
import flopts_picture from "../../imgs/flopts.png";

const William = () => {
    return (
        <div>
            <h1>William Lew</h1>
            <img class="profile" src={profile_picture} />
            <p>GPU-accelerated and Graphics Programming</p>
            <p>Born in Saratoga, California</p>
            
            <br/>

            <h3>Flopts (HPC server cluster)</h3>
            <img src={flopts_picture} width="50%" height="50%"/>
        </div>
    );
};

export default William;