import styled from "styled-components";

export const CrossMark = styled.div`
    &:before {
        content: "\\D7";
        font-size: 2em;
        position: relative;
    }
`

export const Plus = styled(CrossMark)`
    transform: rotate(45);
`