/**
 * React renderer.
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Import the styles here to process them with webpack
import '@public/style.css';
import EmailBuilderPage from '@/components/pages/email-builder/EmailBuilderPage';

ReactDOM.render(
    <EmailBuilderPage/>,
  document.getElementById('app')
);
