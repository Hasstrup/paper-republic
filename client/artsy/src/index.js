import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Wrapper from './wrapper';
import {BrowserRouter} from 'react-router-dom'
import Autho from './components/Autho'
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
      <BrowserRouter >
        <Wrapper/>
        </BrowserRouter>,

document.getElementById('root'));
registerServiceWorker();
