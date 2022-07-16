import createDataContext from "./createDataContext";
import claspApi from '../api/clasp';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const userReducer = (state, action) => {
    switch (action.type){
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'create_user':
            return {errorMessage: '', token: action.payload};
        case 'clear_error_message':
            return {...state, errorMessage: ''};
        default:
            return state;
    }
};

const localSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('@api-token');

    if(token){
        dispatch({type: 'create_user', payload: token });
    }
}

const createUser = dispatch => async (userInfo) => {
    try {
        const response = await claspApi.post('/createuser', userInfo);
        await AsyncStorage.setItem('@api_token', response.data.token);
        dispatch({ type: 'create_user', payload: response.data.token});
        dispatch({ type: 'clear_error_message' });
    } catch (err) {
        dispatch({ type: 'add_error', payload: "Something went wrong with signup"});
    }
};


export const { Provider, Context } = createDataContext(userReducer, { createUser, localSignin }, {token: null, errorMessage: ''});