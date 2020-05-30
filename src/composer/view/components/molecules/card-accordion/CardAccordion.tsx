import React from 'react';
import { AccordionHeader, AccordionContent } from './styled';
import { Toggle } from '@/composer/view/components/atoms/toggle/Toggle';


interface ICompositionBuilderAccordionProps {
    headerContent: React.ReactElement;
    bodyContent: React.ReactElement;
}

const CardAccordion: React.FC<ICompositionBuilderAccordionProps> = ({headerContent, bodyContent}) => {
    const [showContent, toggleContent] = React.useState(false);
    return (
        <>
            <AccordionHeader showingContent={showContent} onClick={() => toggleContent(!showContent)}>
                {headerContent}

                <div className='m0 fw3'>{showContent ? '-' : '+'}</div>
            </AccordionHeader>
            <Toggle show={showContent}>
                <AccordionContent>
                    {bodyContent}
                </AccordionContent>
            </Toggle>
        </>
    )
}

export default CardAccordion;