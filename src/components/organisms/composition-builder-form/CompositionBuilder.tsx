import React from 'react';
import { IContext, IOption } from '@/components/lib/client';
import ToggleableSection from '@/components/molecules/toggleable-section/ToggleableSection';

interface ICompositionBuilderProps {
    onOptionSelected: (option: IOption) => void;
    selectedContext: IContext
}

export const CompositionBuilder: React.FC<ICompositionBuilderProps> = ({onOptionSelected, selectedContext}) => {
    return (
        <>
            { selectedContext.sections.map((section, i) => {
                    return <ToggleableSection key={i} title={section.sectionTitle}>
                        { section.options.map((option, i) => 
                            <div key={i} onClick={() => onOptionSelected(option)}>
                                {option.name}
                            </div>
                        ) }
                    </ToggleableSection>
                })
            }
        </>
    )
}

export default CompositionBuilder;