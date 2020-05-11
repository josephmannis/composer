import React from 'react';
import { SectionHeader } from './styled';
import { Toggle } from '@/components/atoms/toggle/Toggle';


interface ICompositionBuilderSectionProps {
    title: string;
}

const ToggleableSection: React.FC<ICompositionBuilderSectionProps> = props => {
    const [showContent, toggleContent] = React.useState(false);
    return (
        <>
            <SectionHeader onClick={() => toggleContent(!showContent)}>
                <h4>{props.title}</h4>
                <h4>{showContent ? '-' : '+'}</h4>
            </SectionHeader>
            <Toggle show={showContent}>
                {props.children}
            </Toggle>
        </>
    )
}

export default ToggleableSection;