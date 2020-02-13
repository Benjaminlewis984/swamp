import React from 'react';
import profile_picture from "../imgs/william.jpg";

const William = () => {
    return (
        <div>
            <h1>William Lew</h1>
            <img class="profile" src={profile_picture} />
            <p>Hello world.</p>
        </div>
    );
};

export default William;