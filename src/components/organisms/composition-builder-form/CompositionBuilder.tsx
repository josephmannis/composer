import React from 'react';
import { IContext, IOption, ISection } from '@/components/lib/client';
import { IconTag } from '@/components/atoms/tag/Tag';
import { v4 } from 'uuid';
import CardAccordion from '@/components/molecules/card-accordion/CardAccordion';

interface ICompositionBuilderProps {
    onOptionSelected: (option: IOption) => void;
    selectedContext: IContext
}

export const CompositionBuilder: React.FC<ICompositionBuilderProps> = ({onOptionSelected, selectedContext}) => {
    const tagOptions = (section: ISection) => {
        return (
            section.options.map((option) => 
                <div key={v4()} className='mr3' onClick={() => onOptionSelected(option)}>
                    <IconTag icon='plus' >
                        {option.name}
                    </IconTag>
                </div>
            )
        )   
    }

    const buildSection = (section: ISection) => {
        return (
            <CardAccordion
                key={v4()}
                headerContent={<>{section.sectionTitle}</>}
                bodyContent={
                    <div>
                        <div className='flex flex-wrap w-100'>
                            { tagOptions(section) }
                        </div>
                        { section.subSections.map((section) => buildSection(section)) }
                    </div>
                }/>
            )
        }
    
    return (
        <>
            { selectedContext.sections.map((section, i) => buildSection(section)) }
        </>
    )
}

export default CompositionBuilder;