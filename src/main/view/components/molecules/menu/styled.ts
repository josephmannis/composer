import styled from "styled-components";
import { applyFocusTint, scaleOnHover } from "@/main/view/global-styles/transitions";
import { zindex } from "@/main/view/global-styles/indexing";
import { applyShadow } from "@/main/view/global-styles/attributes";

interface MenuInputProps {
    showMenu: boolean;
}

// TODO: Make an input?
export const MenuInput = styled.div<MenuInputProps>`
    display: flex;
    justify-content: space-between;
    padding: .75em 1em; 
    background-color: #E2E2E2;
    border-radius: ${props => props.showMenu ? '7px 7px 0 0' : '7px'};
    ${props => props.showMenu ? '' : scaleOnHover };
`

export const MenuItem = styled.div`
    padding: .75em 1em; 
    border-bottom: .5px solid #E2E2E2;
    width: 100%;
    ${applyFocusTint};
`

export const MenuDropdown = styled.div`
    position: absolute;
    width: 100%;
    background-color: white;
    border-radius: 0 0 14px 14px;
    z-index: ${zindex.dropdown};
    ${applyShadow};

    & ${MenuItem}:last-child {
        border: none;
    }
`