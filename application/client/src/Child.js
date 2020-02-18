// Step 1: Import react
import React from 'react';

// Step 2: Make child function
const Child = ({ title }) => { // 'title' is a prop; props go here, and are ready only

    // Step 4: Must return valid jsx object
    return (
        <div>
            <h1>{title}</h1>
        </div>
    );
};

// Step 3: Export
export default Child;