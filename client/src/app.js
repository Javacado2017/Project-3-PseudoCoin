import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import { browserHistory, Router } from 'react-router';
import routes from './routes.js';


import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);


injectTapEventPlugin();

ReactDOM.render((
    <Provider store={createStoreWithMiddleware(reducers)}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Router history={browserHistory} routes={routes} />
        </MuiThemeProvider>
    </Provider>
    ),
    document.getElementById('react-app'));