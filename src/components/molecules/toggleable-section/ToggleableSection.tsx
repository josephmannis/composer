import React from 'react';
import { SectionTitle, Section, SectionTitleWrapper, SectionContent } from './styled';
import { Toggle } from '@/components/atoms/toggle/Toggle';
import { Card } from '@/components/atoms/card/Card';


interface ICompositionBuilderSectionProps {
    title: string;
}

const ToggleableSection: React.FC<ICompositionBuilderSectionProps> = props => {
    const [showContent, toggleContent] = React.useState(false);
    return (
        <Section>
            <SectionTitleWrapper showingContent={showContent} onClick={() => toggleContent(!showContent)}>
                <SectionTitle>{props.title}</SectionTitle>
                <SectionTitle>{showContent ? '-' : '+'}</SectionTitle>
            </SectionTitleWrapper>
            <Toggle show={showContent}>
                <SectionContent>
                    {props.children}
                </SectionContent>
            </Toggle>
        </Section>
    )
}

export default ToggleableSection;