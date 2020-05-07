import * as React from 'react';
import phrases from '@/data/issuePhraseMap.json';
import defaultEmailData from '@/data/emailDataMap.json';
import { BuilderPageWrapper, Panel, EmailPreview } from './styled';
import EmailBuilder from '@/components/organisms/email-builder-form/EmailBuilderForm';
import { IEmailContent } from '@/components/lib/client';

const EmailBuilderPage: React.FC = () => {
    const [emailText, setText] = React.useState("Woo I am previewing this email")

    const buildIssues = (): Map<string, string> => {
        let data = new Map<string, string>();
        let values = Object.values(phrases);
        let keys = Object.keys(phrases);
        keys.forEach((key, i) =>  data.set(key, values[i]))
        return data;
    }

    const buildDefaultData = (): IEmailContent => {
        return {
            issueFields: buildIssues(),
            greeting: defaultEmailData.Greeting,
            closing: defaultEmailData.Closing
        }
    }

    return (
        <BuilderPageWrapper>
            <Panel>
                <h3>Build Email</h3>
                <EmailBuilder 
                    defaultContent={buildDefaultData()}
                    onEmailUpdated={(email) => setText(email)}
                />
            </Panel>
            <Panel>
                <h3>Preview</h3>
                <EmailPreview>
                    {emailText}
                </EmailPreview>
            </Panel>
        </BuilderPageWrapper>

    )
}

export default EmailBuilderPage;