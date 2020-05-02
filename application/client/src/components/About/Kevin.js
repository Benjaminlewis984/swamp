import React from 'react';
import kevin from "../../imgs/kevin.jpg";
import '../../styles/kevin-style.css';

const Kevin = () => {
    return (
        <div>
            <div class="header">
                <h1 class="about">About Me</h1>
                <img class="profile" src={kevin} />
            </div>
            <div class="body">
                <h3>Kevin Huynh</h3>
                <p>Team member of Team 04 of CSC648 of Spring 2020.</p>
                <h5>Likes:</h5>
                <ul class="list-1">
                    <li>My pets</li>
                    <li>Spicy food</li>
                    <li>Watching random Youtube videos</li>
                </ul>
                <br></br>
                <h5>Dislikes:</h5>
                <ul class="list-1">
                    <li>Going to sleep or waking up too early</li>
                    <li>Leaving class at 9:45pm and waiting half an hour for the bus/bart</li>
                    <li>Spicy food</li>
                </ul>
            </div>
            <div class="spacing"></div>
        </div>
        
    );
};

export default Kevin;