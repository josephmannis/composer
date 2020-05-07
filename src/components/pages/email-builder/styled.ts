import styled from "styled-components";
import { Card } from "@/components/atoms/card/Card";


export const Panel = styled(Card)`
    display: flex;
    flex-direction: column;
    padding: 1.5em;
    width: 50%;
    overflow: scroll;
    & h3 {
        margin-top: 0;
    }
`

export const BuilderPageWrapper = styled.div`
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    padding-top: 1em;
    height: 100%;
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);

    & ${Panel} {
        margin: 1.5em 1.5em;
    }
`

export const EmailPreview = styled.div`
    background-color: #fff5ea;
    border: none;
    border-radius: 10px;
    padding: 1em;
    white-space: pre-wrap;
    resize: horizontal;
    height: 100%;
`