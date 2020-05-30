/**
 * React renderer.
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Import the styles here to process them with webpack
import CompositionBuilderPage from '@components/pages/composition-builder/CompositionBuilderPage';
import { StyleBaseline } from '@view/global-styles/baseline';
import 'tachyons';
import '@public/style.css';

ReactDOM.render(
  <>
    <StyleBaseline/>
    <CompositionBuilderPage/>
  </>,
  document.getElementById('app')
);
