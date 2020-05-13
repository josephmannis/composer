import styled from 'styled-components';


export const Panel = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1.5em;
    width: 50%;
    overflow-y: auto;

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