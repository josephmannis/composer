import styled from "styled-components";

export const Card = styled.div`
    border-radius: 15px;
    box-shadow: 0 0 26px lightgray;
    background-color: white;
    transition: all .5s;
    width: 100%;
    &::hover {
        transform: scale(1.2);
        box-shadow: 0 0 0 36px gray;
    }
`