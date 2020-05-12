import styled from "styled-components";
import { Card } from "@/components/atoms/card/Card";
import { scaleOnHover } from "@/css/transition";


interface IAccordionWrapperProps {
    showingContent: boolean;
}

export const AccordionHeader = styled(Card)<IAccordionWrapperProps>`
    display: flex;
    justify-content: space-between;
    transition: all 0s ease-in-out;
    background-color: white;
    padding: 1.75em;
    font-weight: bolder;
    box-shadow: 0 0 26px lightgray;
    border-bottom-left-radius: ${props => props.showingContent ? '0' : ''};
    border-bottom-right-radius: ${props => props.showingContent ? '0' : ''};
    ${props => props.showingContent ? '' : scaleOnHover};
`

// TODO: Standardize style value
export const AccordionContent = styled(Card)`
    background-color: #F8F8F8;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding: 1.75em;
    box-shadow: 0 12px 26px lightgray;

    & ${AccordionHeader}, & & {
        background-color: transparent;
        box-shadow: none;
        border-radius: 0;
        padding-left: 0;
        padding-right: 0;
        padding-bottom: 0;
    }
`

export const AccordionWrapper = styled.div`
    margin-bottom: 2em;
`