import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios'
import thunk from 'redux-thunk'

// initial State
const initState = {
  jwt: '',
  loginError: ''
}


// Action Type
const ON_LOGIN_SUCCESS = 'on_login_success'
const ON_LOGIN_FAIL = 'on_login_fail'

// REDUCERS is function to return newstate (oldState, action) => newState
export const reducer = (state = initState, action) => {
  switch(action.type){
    case ON_LOGIN_SUCCESS:{
      const newState = { ...state }
      newState.jwt = action.payload.jwt
      return newState
    }
      
    case ON_LOGIN_FAIL:{
      const newState = { ...state }
      newState.loginError = action.payload.error
      return newState
    }
      
  }
  return state
}

// ACTIONS
export const onLogin = (username, password) => {
  return (dispatch) => {
    axios.post(`/api/login`, { 
      username,
      password
    }).then(response => {
      if (response.data.status){
        return dispatch({
          type: ON_LOGIN_SUCCESS,
          payload: {
            jwt: response.data.jwt
          }
        })
      }
      return dispatch({
        type: ON_LOGIN_FAIL,
        payload: {
          error: response.data.error
        }
      })
    })
  }
}

export function initializeStore (initialState = initState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  )
}