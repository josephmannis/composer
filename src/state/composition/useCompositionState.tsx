import { useReducer } from 'react';
import { IComposition, ICompositionSection } from '@/components/lib/client';

type Payload = { section: ICompositionSection };
type Action = {type: 'add', payload: Payload} | {type: 'remove', payload: Payload};
type State = {composition: IComposition};

function compositionReducer(state: State, action: Action) {
    const { sections } = state.composition;
    switch (action.type) {
        case 'add': {
            return { composition: { sections: [...sections, action.payload.section] } };
        }
        case 'remove': {
            return { composition: { sections: sections.filter(s => s.id !== action.payload.section.id) } };
        } 
        default: {
            throw new Error(`Unhandled action type ${action}`);
        }
    }
}

export function useCompositionState() {
    const [{composition}, dispatch] = useReducer(compositionReducer, {composition:{sections:[]}});

    const addSection = (section: ICompositionSection) => dispatch({type: 'add', payload: {section: section}})
    const removeSection = (section: ICompositionSection) => dispatch({type: 'remove', payload: {section: section}})

    return {composition, addSection, removeSection};
}