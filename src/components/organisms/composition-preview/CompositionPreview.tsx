
import React from 'react';
import { IComposition } from '@/components/lib/client';
import { Section, CompositionText } from './styled';


interface ICompositionPreviewProps {
    composition: IComposition;
}

const CompositionPreview: React.FC<ICompositionPreviewProps> = ({ composition }) => {
    return (
        <div className='flex flex-column'>
            {composition.sections.map((s, i) => <Section key={i}> {s.text} </Section>)}
        </div>
    )
}

export default CompositionPreview;