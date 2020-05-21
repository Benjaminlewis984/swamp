import styled from 'styled-components'

export const ButtonContainerAlt = styled.button`
text-transform: capitalize;
font-size: 1.4rem;
background: transparent;
border: 0.05rem solid var(--lightBlue);
border-color: ${props =>
        props.cart ? "var(--mainBlue)" : "var(--mainBlue)"};
color: ${prop =>
        prop.cart ? "var(--mainYellow)" : "var(--lightBlue)"};
color: var(--mainPurple);
border-radius: 0.5rem;
padding: 0.2rem 0.5rem;
cursor: pointer;
margin: 0.2rem 0.5rem 0.2rem 0;
transition: all 0.5s ease-in-out;

&: hover {
    background: var(--lightBlue);
    color: var(--mainPurple);
}

&: focus {
    outline: none;
}
`