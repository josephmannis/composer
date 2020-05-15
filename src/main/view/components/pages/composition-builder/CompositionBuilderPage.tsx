import * as React from 'react';
import { BuilderPageWrapper, Panel } from './styled';
import CompositionBuilder from '@/main/view/components/organisms/composition-builder-form/CompositionBuilder';
import CompositionPreview from '@/main/view/components/organisms/composition-preview/CompositionPreview';
import { useCompositionState } from '@/main/view/state/composition/useCompositionState';
import { IOption, IContext } from '@/main/view/lib/client';
import { v4 as uuidv4 } from 'uuid';
import Menu from '@/main/view/components/molecules/menu/Menu';
import { ContextService } from '@/main/application/service/context/service';
import Spinner from '../../atoms/spinner/Spinner';

// TODO: use a connector
const CompositionBuilderPage: React.FC = () => {
    const { composition, addSection } = useCompositionState();
    const [loading, setLoading] = React.useState(true);
    // TODO: Make nullable for error case
    const [contexts, setContexts] = React.useState<IContext[]>([]);
    const [selectedContext, setSelected] = React.useState<IContext | undefined>();
    
    const onOptionAdded = (option: IOption) => {
        addSection({
            id: uuidv4(),
            text: option.phrase
        })
    }

    React.useEffect(() => {
        function onContextsFetched(contexts: IContext[]) {
            setContexts(contexts);
            if (contexts.length !== 0) setSelected(contexts[0]);
            setLoading(false);
        }


        async function getContexts() {
            // TODO: convert to hook
            let service = new ContextService();
            // TODO: Catch error, show modal
            service.all().then(res => {
                onContextsFetched(res.map(c => {
                return {
                    ...c,
                    ...c.model
                }
                }));
            }).catch(error => window.alert(`Error fetching the contexts, whoops welcome to using an alpha app! ${error}`));
        }

        getContexts();
    }, [])

    return (
        <BuilderPageWrapper>
            <Panel>
                <h2>Build Composition</h2>
                {loading && <Spinner/>}
                {!loading && selectedContext &&
                    <>
                        <div className='w-50 mb3'>
                            <Menu options={contexts.map(c => c.name)}/>
                        </div>
                        <CompositionBuilder 
                            onOptionSelected={(option) => onOptionAdded(option)}
                            // TODO: Move this to a service that fetches it, eventually
                            selectedContext={selectedContext}
                        />
                    </>
                }
                {!loading && contexts.length === 0 &&
                    <>
                        <p>No contexts! make one :)</p>
                    </>
                }
            </Panel>
            <Panel>
                <h2>Preview</h2>
                <CompositionPreview composition={composition}/>
            </Panel>
        </BuilderPageWrapper>
    )
}

export default CompositionBuilderPage;