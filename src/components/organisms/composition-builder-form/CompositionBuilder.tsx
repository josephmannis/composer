import React from 'react';
import { IContext, IOption } from '@/components/lib/client';
import ToggleableSection from '@/components/molecules/toggleable-section/ToggleableSection';
import { IconTag } from '@/components/atoms/tag/Tag';

interface ICompositionBuilderProps {
    onOptionSelected: (option: IOption) => void;
    selectedContext: IContext
}

export const CompositionBuilder: React.FC<ICompositionBuilderProps> = ({onOptionSelected, selectedContext}) => {
    return (
        <>
            { selectedContext.sections.map((section, i) => {
                    return <ToggleableSection key={i} title={section.sectionTitle}>
                        <div className='flex flex-wrap w-100'>
                            { section.options.map((option, i) => 
                                <div className='mr3' onClick={() => onOptionSelected(option)}>
                                    <IconTag icon='plus' key={i}>
                                            {option.name}
                                    </IconTag>
                                </div>
                            ) }
                        </div>
                    </ToggleableSection>
                })
            }
        </>
    )
}

export default CompositionBuilder;