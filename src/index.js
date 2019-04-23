import React from 'react';
import  { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import saveData from './modules/reducers'
import './index.css';
import App from '../src/components/App/index';
import * as serviceWorker from './serviceWorker';
const store = createStore(saveData)

render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
