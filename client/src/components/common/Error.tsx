// Imports
import React from "react";
import styled from "styled-components";

// Styling
const StyledError = styled.div`
    position: relative;
    display: inline-block;
    font-size: 0.8rem;
    border-radius: 0.5rem;
    padding: 0.5rem 2rem 0.5rem 0.5rem;
    background-color: #f17575;
    color: #af4c4c;
    // Close Button
    button {
        position: absolute;
        right: 0.5rem;
        top: 0.37rem;
        border: none;
        border-radius: 50%;
        background-color: transparent;
        color: #af4c4c;
        font-size: 0.8rem;
    }
`;

// Props
interface Props {
    error: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
}

// Component
const Error = ({ error, setError }: Props) => {
    return (
        <StyledError>
            <strong>Error! </strong>
            {error}
            <button onClick={() => setError("")}>&#128473;</button>
        </StyledError>
    );
};

export default Error;
