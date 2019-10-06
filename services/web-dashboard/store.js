import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios'
import thunk from 'redux-thunk'
import Cookies from 'js-cookie'



// Initial State
const initState = {
	jwt: '',
	loginError: ''
}

// Action Type
const ON_LOGIN_SUCCESS = 'on_login_success'
const ON_LOGIN_FAIL = 'on_login_fail'

// function to return new state
// (oldState, action) => newState
export const reducer = (state = initState, action) => {

	switch(action.type) {
		case ON_LOGIN_SUCCESS: {
			const newState = { ...state }
			newState.jwt = action.payload.jwt
			return newState
		}
		case ON_LOGIN_FAIL: {
			const newState = { ...state }
			newState.loginError = action.payload.error
			return newState
		}
	}

	return state
}

// Action Creator
export const onLogin = (username, password, callback) => {
	return (dispatch) => {
		axios.post(`/api/login`, { 
			username, 
			password 
		}).then(response => {
			callback(response)
			if (response.data.status) {
        Cookies.set('jwt', response.data.jwt, { expires: 1, path: ' '})
				return dispatch({
					type: ON_LOGIN_SUCCESS,
					payload: {
						jwt: response.data.jwt
					}
				})
			}
		})
	}
}

export const onJwtReceived = (jwt) => {
  return (dispatch) => dispatch({
    type: ON_LOGIN_SUCCESS,
    payload: {
      jwt: jwt
    }
  })
}

export const onLogout = () => {
  return (dispatch) => {
    Cookies.remove('jwt', { path: '/' })
    dispatch({
      type: ON_LOGIN_SUCCESS,
      payload: {
        jwt: ''
      }
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