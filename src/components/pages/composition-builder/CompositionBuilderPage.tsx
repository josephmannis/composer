import * as React from 'react';
import composerData from '@/data/composerData.json';
import { BuilderPageWrapper, Panel } from './styled';
import CompositionBuilder from '@/components/organisms/composition-builder-form/CompositionBuilder';
import CompositionPreview from '@/components/organisms/composition-preview/CompositionPreview';
import { useCompositionState } from '@/state/composition/useCompositionState';
import { IOption } from '@/components/lib/client';
import { Card } from '@/components/atoms/card/Card';

const CompositionBuilderPage: React.FC = () => {
    const { composition, addSection } = useCompositionState();
    
    const onOptionAdded = (option: IOption) => {
        addSection({
            id: 'stub',
            text: option.phrase
        })
    }

    return (
        <BuilderPageWrapper>
            <Panel>
                <Card>
                    <h3>Build Composition</h3>
                    <CompositionBuilder 
                        onOptionSelected={(option) => onOptionAdded(option)}
                        // TODO: Move this to a service that fetches it, eventually
                        selectedContext={composerData}
                        />
                </Card>
            </Panel>
            <Panel>
                <h3>Preview</h3>
                <CompositionPreview composition={composition}/>
            </Panel>
        </BuilderPageWrapper>
    )
}

export default CompositionBuilderPage;