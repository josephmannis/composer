import React from 'react';
import styled from "styled-components";
import { scaleOnHover } from "@/composer/view/global-styles/transitions";

export const Tag = styled.div`
    background-color: #3BA9ED;
    border-radius: 22px;
    color: white;
    display: flex;
    justify-content: space-between;
    padding: .5em 1em;
    font-weight: bolder;
    width: fit-content;
    flex-wrap: nowrap;
    ${scaleOnHover};
`

interface IconTagProps {
    icon: 'plus' | 'minus';
}


export const IconTag: React.FC<IconTagProps> = ({icon, children}) => {
    const mapIcon = () => {
        switch(icon) {
            case 'plus':
                return '+'
            case 'minus':
                return '-'
            default:
                return ''
        }
    }

    return (
       <Tag>
           {children}
           <div className='ml3'>
                {mapIcon()}
           </div>
       </Tag>
    )
}