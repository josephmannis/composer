import React from 'react';
import { CheckLabel } from './styled';
import { Input } from '@/components/atoms/input/Input';
import { IContext, IOption } from '@/components/lib/client';
import ToggleableSection from '@/components/molecules/toggleable-section/ToggleableSection';

interface IEmailFormBuilderProps {
    onEmailUpdated: (email: string) => void;
    context: IContext;
}

interface IEmailFormBuilderState {
    selectedIssues: IOption[];
}

class EmailBuilder extends React.Component<IEmailFormBuilderProps, IEmailFormBuilderState> {
    private inputRefs: (HTMLInputElement | null)[];

    constructor(props: IEmailFormBuilderProps) {
        super(props);
        this.inputRefs = [];
        this.state = { selectedIssues: [] }
    }

    resolveIssueValues(): string {
        let text = ""
        this.state.selectedIssues.forEach(k => text += `${k.phrase}\n`);
        return text;
    }

    buildEmail() {
        let text = `${this.resolveIssueValues()}\n`
        this.props.onEmailUpdated(text);
    }

    onIssueToggled = (e: React.ChangeEvent<HTMLInputElement>) => {
        let id = e.target.name;
        let value = e.target.value;
        let newIssueState = [...this.state.selectedIssues];
        let existingItem = newIssueState.find((item) => item.name === id);
        if (existingItem) newIssueState = newIssueState.filter(i => i.name !== id);
        else newIssueState = [...newIssueState, {name: id, phrase: value}];

        this.setState({...this.state, selectedIssues: newIssueState}, () => this.buildEmail());
    }

    render() {
        return (
            <form>
                { this.props.context.sections.map((section, i) => {
                        return <ToggleableSection key={i} title={section.sectionTitle}>
                            { section.options.map((option, i) => 
                                <div key={i}>
                                    <input 
                                        ref={e => this.inputRefs = [...this.inputRefs, e]} 
                                        checked={this.state.selectedIssues.findIndex(o => o.name === option.name) !== -1} 
                                        type='checkbox' 
                                        name={option.name}
                                        value={option.phrase}
                                        onChange={(e) => this.onIssueToggled(e)}
                                    /> 
                                    <CheckLabel>{option.name}</CheckLabel>
                                </div>
                            ) }
                        </ToggleableSection>
                    })
                }
            </form>
        )
    }
}

export default EmailBuilder;