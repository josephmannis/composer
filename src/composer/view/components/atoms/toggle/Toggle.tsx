import styled from "styled-components";

interface IToggleProps {
    show: boolean;
}

export const Toggle = styled.div<IToggleProps>`
    display: ${ props => props.show ? 'initial' : 'none' }
 `