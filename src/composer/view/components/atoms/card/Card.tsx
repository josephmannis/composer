import styled from "styled-components";
import { applyShadow, applyRadius } from "@/composer/view/global-styles/attributes";

export const Card = styled.div`
    background-color: white;
    width: 100%;
    ${applyShadow};
    ${applyRadius}
`