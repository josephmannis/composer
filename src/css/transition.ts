import { css } from "styled-components";

export const scaleOnHover = css`
    transition: transform .1s ease-in-out;
    &:hover {
        transform: scale(1.05);
    }
`