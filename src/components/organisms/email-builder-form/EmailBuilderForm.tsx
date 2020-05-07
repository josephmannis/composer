import React from 'react';
import { CheckLabel } from './styled';
import { Input } from '@/components/atoms/input/Input';
import { IEmailContent } from '@/components/lib/client';

interface IEmailFormBuilderProps {
    defaultContent: IEmailContent;
    onEmailUpdated: (email: string) => void;
}

interface IEmailFormBuilderState {
    greeting: string;
    closing: string;
    selectedIssues: string[];
}

class EmailBuilder extends React.Component<IEmailFormBuilderProps, IEmailFormBuilderState> {
    private inputRefs: (HTMLInputElement | null)[];

    constructor(props: IEmailFormBuilderProps) {
        super(props);
        this.inputRefs = [];
        this.state = {
            greeting: props.defaultContent.greeting,
            closing: props.defaultContent.closing,
            selectedIssues: []
        }
    }

    resolveIssueValues(): string {
        let phrases = this.props.defaultContent.issueFields;
        let text = ""
        this.state.selectedIssues.forEach(k => text += `${phrases.get(k)}\n`);
        return text;
    }

    buildEmail() {
        let text = `${this.state.greeting}\n\n${this.resolveIssueValues()}\n${this.state.closing}`
        this.props.onEmailUpdated(text);
    }

    onIssueToggled = (e: React.ChangeEvent<HTMLInputElement>) => {
        let id = e.target.name;
        let newIssueState = [...this.state.selectedIssues];
        if (newIssueState.includes(id)) newIssueState = newIssueState.filter(i => i !== id);
        else newIssueState = [...newIssueState, id];

        this.setState({...this.state, selectedIssues: newIssueState}, () => this.buildEmail());
    }

    onGreetingChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, greeting: e.target.value}, () => this.buildEmail());
    }


    onClosingChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, closing: e.target.value}, () => this.buildEmail());
    }

    render() {
        return (
            <form>                            
                <label>
                    Greeting:
                    <Input onChange={(e) => this.onGreetingChanged(e)} defaultValue={this.state.greeting} name="greeting" type='text'/>
                </label>
                <ul>
                    { Array.from(this.props.defaultContent.issueFields.keys()).map((issueName, i) => 
                        <div key={i}>
                            <input 
                                ref={e => this.inputRefs = [...this.inputRefs, e]} 
                                checked={this.state.selectedIssues.includes(issueName)} 
                                type='checkbox' 
                                name={issueName}
                                onChange={(e) => this.onIssueToggled(e)}
                            /> 
                            <CheckLabel>{issueName}</CheckLabel>
                        </div>
                    ) }
                </ul>
                <label>
                    Closing:
                    <Input onChange={(e) => this.onClosingChanged(e)} defaultValue={this.state.closing} name="closing" type='text'/>
                </label>
            </form>
        )
    }
}

export default EmailBuilder;