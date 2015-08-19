import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import rootReducer from './reducers';

let store = createStore(rootReducer);

React.render(
    <Provider store={store}>
      {() => <App />}
    </Provider>,
    document.getElementById('app')
);
