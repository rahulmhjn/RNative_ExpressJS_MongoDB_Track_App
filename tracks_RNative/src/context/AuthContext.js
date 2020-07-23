import { AsyncStorage } from 'react-native';
import createDataContext  from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload }
        case 'current_user':
            return { ...state, email: action.payload }
        // case 'signup':
        //     return { ...state, token: action.payload, errorMessage: '' }
        case 'signin':
            return { token: action.payload, errorMessage: '' }
        case 'clear_error_message':
            return { ...state, errorMessage: '' };
        case 'signout':
            return { token: null, errorMessage: '', email: '' }
        default: 
            return state;
    }
};

const currentUser = dispatch => async () => {
    const response = await trackerApi.get('/user');
    dispatch({type: 'current_user',payload: response.data.email});
}

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if(token) {
        dispatch({type: 'signin', payload: token});
        navigate('mainFlow');
    }
    else {
        navigate('loginFlow');
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clear_error_message'});
}


const signup = (dispatch) => {
    return async ({ email, password }) => {
        try {
            const response = await trackerApi.post('/signup', { email, password });
            console.log(response.data);
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: 'signin',payload: response.data.token});
            navigate('mainFlow');
            
        } catch (err) {
            dispatch({ type: 'add_error', payload: 'Something went wrong with signup'})
        }

    }
}
const signin = (dispatch) => {
    return async ({ email, password }) => {
        // make api request with that email and password
        try {
            const response = await trackerApi.post('/signin', {email, password});
            console.log(response.data);
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: 'signin',payload: response.data.token});
            navigate('mainFlow');
        } catch (err) {
            dispatch({ type: 'add_error', payload: 'Something went wrong with signin'})
        }

    }
}

const signout = (dispatch) => {
 return async () => {
    await AsyncStorage.removeItem('token');
    dispatch({type:'signout'});
    navigate('loginFlow');
 }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup, clearErrorMessage, tryLocalSignin, currentUser },
    { token: null, errorMessage: '', email:'' }
);