import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { h, render } from 'preact';
import App from './components/app';

render(<App />, document.getElementById('root'));
