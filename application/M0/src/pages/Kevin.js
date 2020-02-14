import React from 'react';
import kevin from "../imgs/kevin.jpg";

const Kevin = () => {
    return (
        <div>
            <h1>Kevin Huynh</h1>
            <img class="profile" src={kevin} />
            <p>My picture makes me look skinny.</p>
        </div>
    );
};

export default Kevin;