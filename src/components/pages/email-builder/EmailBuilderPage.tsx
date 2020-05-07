import * as React from 'react';
import emailSectionValues from '@/data/composerData.json';
import { BuilderPageWrapper, Panel, EmailPreview } from './styled';
import EmailBuilder from '@/components/organisms/email-builder-form/EmailBuilderForm';

const EmailBuilderPage: React.FC = () => {
    const [emailText, setText] = React.useState("Woo I am previewing this email")


    return (
        <BuilderPageWrapper>
            <Panel>
                <h3>Build Email</h3>
                <EmailBuilder 
                    onEmailUpdated={(email) => setText(email)}
                    sections={emailSectionValues.sections}
                />
            </Panel>
            <Panel>
                <h3>Preview</h3>
                <EmailPreview >{emailText}</EmailPreview>
            </Panel>
        </BuilderPageWrapper>

    )
}

export default EmailBuilderPage;