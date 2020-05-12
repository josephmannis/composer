import styled from "styled-components";
import { Card } from "@/components/atoms/card/Card";
import { H4 } from "@/components/atoms/typography/styled";


interface ISectionWrapperProps {
    showingContent: boolean;
}

export const Section = styled.div`
    transition: all .1s ease-in-out;
    
    &:hover{ 
       transform: scale(1.01);
    }
    margin-bottom: 2em;
`

export const SectionTitleWrapper = styled(Card)<ISectionWrapperProps>`
    display: flex;
    justify-content: space-between;
    transition: all 0s ease-in-out;
    background-color: white;
    padding: 1.75em;
    border-bottom-left-radius: ${props => props.showingContent ? '0' : ''};
    border-bottom-right-radius: ${props => props.showingContent ? '0' : ''};
`

export const SectionTitle = styled(H4)`
    margin: 0;
`

// TODO: Standardize style value
export const SectionContent = styled(Card)`
    background-color: #F8F8F8;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding: 1.75em;
    box-shadow: 0 12px 26px lightgray;
`