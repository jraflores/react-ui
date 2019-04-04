import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import UserSearch from './pages/UserSearch';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<UserSearch q=''/>, document.getElementById('top'));
// ReactDOM.render(form, document.getElementById('middleSecion'));
// ReactDOM.render(<TableResults/>, document.getElementById('bottom'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
