import { css } from "styled-components";

export const scaleOnHover = css`
    transition: transform .1s ease-in-out;
    &:hover {
        transform: scale(1.05);
    }
`

export const applyFocusTint = css`
    transition: background-color .1s ease-in-out;
    &:hover {
        background-color: #E2E2E2;
    }
`