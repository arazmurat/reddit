import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'
import App from './containers/App'
const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}
const store = createStore(
  reducer, compose(applyMiddleware(...middleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  
)
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// import React from 'react'
// import { render } from 'react-dom'
// import { Provider } from 'react-redux'
// import { createStore, applyMiddleware, compose } from 'redux' 
// // import store from './store'
// import App from './containers/App'
// import reducer from './reducers'
// import thunk from 'redux-thunk'
// import { createLogger } from 'redux-logger'

// const middleware = [thunk]

// if(process.env.NODE_ENV !== 'production') {
//   middleware.push(createLogger())
// }

// const store = createStore(reducer,
//   compose(applyMiddleware(...middleware),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// )

// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// )


// //SELECT_SUBREDDIT, INVALID_SUBREDDIT, RECEIVE_POSTS, REQUEST_POSTS