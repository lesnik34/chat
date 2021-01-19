import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from "./store/reducers/rootReducer";
import thunk from "redux-thunk";
import './index.scss'

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;


const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
// const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);
