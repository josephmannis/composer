import { createGlobalStyle } from "styled-components";

export const StyleBaseline = createGlobalStyle`
    html * {
        ::-webkit-scrollbar {
            background-color: transparent;
            width: .7em;
        }

        ::-webkit-scrollbar-track {
            background: #E8E8E8;
            border-radius: 25px;
        }

        ::-webkit-scrollbar-thumb {
            background: #3BA9ED;
            border-radius: 25px;
        }

        /* ::-webkit-scrollbar-thumb:hover {
            back
        } */
    }

    * {
        box-sizing: border-box;
    }

    html, body, .app {
        height: 100%;
    }

    body {
        margin: 0;
        font-family: Avenir, Arial, Helvetica, sans-serif;

        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
`