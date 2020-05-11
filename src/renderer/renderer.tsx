/**
 * React renderer.
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Import the styles here to process them with webpack
import '@public/style.css';
import CompositionBuilderPage from '@/components/pages/composition-builder/CompositionBuilderPage';
import 'tachyons';

ReactDOM.render(
    <CompositionBuilderPage/>,
  document.getElementById('app')
);
