import React, { useReducer } from 'react';
import { IComposition, ICompositionSection } from '@/components/lib/client';

type Payload = { section: ICompositionSection };
type Action = {type: 'add', payload: Payload} | {type: 'remove', payload: Payload};
type Dispatch = (action: Action) => void;
type State = {composition: IComposition};
type ProviderProps = {children: React.ReactNode};

const CompositionContext = React.createContext<State | undefined>(undefined);
const CompositionDispatchContext = React.createContext<Dispatch | undefined>(undefined); 

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

function CompositionProvider({children}: ProviderProps) {
    const [state, dispatch] = useReducer(compositionReducer, {composition:{sections:[]}});

    return (
        <CompositionContext.Provider value={state}>
            <CompositionDispatchContext.Provider value={dispatch}>
                {children}
            </CompositionDispatchContext.Provider>
        </CompositionContext.Provider>
    )
}

function useCompositionState() {
    const context = React.useContext(CompositionContext);

    if (context === undefined) {
        throw new Error('useCompositionState must be used within a CompositionProvider');
    }
}

function useCompositionDispatch() {
    const context = React.useContext(CompositionDispatchContext);

    if (context === undefined) {
        throw new Error('useCompositionDispatch must be used within a CompositionProvider');
    }
}

export { CompositionProvider, useCompositionState, useCompositionDispatch }