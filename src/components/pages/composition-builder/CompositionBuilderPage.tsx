import * as React from 'react';
import composerData from '@/data/composerData.json';
import { BuilderPageWrapper, Panel } from './styled';
import CompositionBuilder from '@/components/organisms/composition-builder-form/CompositionBuilder';
import CompositionPreview from '@/components/organisms/composition-preview/CompositionPreview';
import { useCompositionState } from '@/state/composition/useCompositionState';
import { IOption } from '@/components/lib/client';
import { v4 as uuidv4 } from 'uuid';
import Menu from '@/components/molecules/menu/Menu';


const CompositionBuilderPage: React.FC = () => {
    const { composition, addSection } = useCompositionState();
    
    const onOptionAdded = (option: IOption) => {
        addSection({
            id: uuidv4(),
            text: option.phrase
        })
    }

    return (
        <BuilderPageWrapper>
            <Panel>
                <h2>Build Composition</h2>
                <div className='w-50 mb3'>
                    <Menu options={['Support Email', 'Bidness Email', 'Love letter']}/>
                </div>
                    <CompositionBuilder 
                        onOptionSelected={(option) => onOptionAdded(option)}
                        // TODO: Move this to a service that fetches it, eventually
                        selectedContext={composerData}
                    />
            </Panel>
            <Panel>
                <h2>Preview</h2>
                <CompositionPreview composition={composition}/>
            </Panel>
        </BuilderPageWrapper>
    )
}

export default CompositionBuilderPage;