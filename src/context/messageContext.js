import createDataContext from "./createDataContext";
import claspApi from '../api/clasp';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";
import { ENDPOINT } from "../api/ENDPOINT";

const socket = io(ENDPOINT);

const messageReducer = (state, action) => {
    switch (action.type){
        case 'send_message':
            let newConvo = state.curConvo;
            newConvo.push(action.payload)
            return {...state, curConvo: newConvo};
        case 'add_error':
            return {...state, error: action.payload};
        default:
            return state;
    }
};

const sendMessage = async (newMessage) => {
    try{
        const response = claspApi.send('/createMessage', newMessage);
        console.log(response.data);
        socket.emit("sendMessage", newMessage);
        dispatch({type: 'send_message', payload: newMessage});
    } catch(err){
        dispatch({ type: 'add_error', payload: "Something went wrong... please try again shortly"});
    }
}


export const { Provider, Context } = createDataContext(messageReducer, { sendMessage }, { curConvo: [{message: '', sender: '', receiver: ''}], error: ''});