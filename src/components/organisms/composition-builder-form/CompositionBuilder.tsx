import React from 'react';
import { IContext, IOption, ISection } from '@/components/lib/client';
import { IconTag } from '@/components/atoms/tag/Tag';
import CardAccordion from '@/components/molecules/card-accordion/CardAccordion';

interface ICompositionBuilderProps {
    onOptionSelected: (option: IOption) => void;
    selectedContext: IContext
}

export const CompositionBuilder: React.FC<ICompositionBuilderProps> = ({onOptionSelected, selectedContext}) => {
    const tagOptions = (section: ISection) => {
        return (
            section.options.map((option, i) => 
                <div key={i} className='mr3 mb3' onClick={() => onOptionSelected(option)}>
                    <IconTag icon='plus' >
                        {option.name}
                    </IconTag>
                </div>
            )
        )   
    }

    const buildSection = (section: ISection, key: number) => {
        return (
            <div className='mb3'>
                <CardAccordion
                    key={key}
                    headerContent={<>{section.sectionTitle}</>}
                    bodyContent={
                        <div>
                            <div className='flex flex-wrap w-100'>
                                { tagOptions(section) }
                            </div>
                            { section.subSections.map((section, i) => buildSection(section, i)) }
                        </div>
                    }/>
            </div>
            )
        }
    
    return (
        <>
            { selectedContext.sections.map((section, i) => buildSection(section, i)) }
        </>
    )
}

export default CompositionBuilder;