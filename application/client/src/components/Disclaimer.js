import React from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";

const Disclaimer = () => {
    return (
      <DiscWrapper>
        <div class="fixed-bottom text-center font-italic bg-dark text-light">
        SFSU Software Engineering Project CSC648-848, Spring 2020. For
        Demonstration Only
        </div>
      </DiscWrapper>
    )
}

export default Disclaimer;

const DiscWrapper = styled.div`
-webkit-user-select: none;     
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
`