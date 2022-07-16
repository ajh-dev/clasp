import React, { useEffect, useContext } from "react";
import { Context as userContext } from "../context/userContext";

const InitialLoad = ({ navigation }) => {
    const { state, localSignin } = useContext(userContext);

    useEffect( () => {
        localSignin();

        if(state.token){
            navigation.navigate('Startup');
        } else {
            //FIXME: Set to home directory
            navigation.navigate('Profile');
        }
    }, [])

    return null;
};

export default InitialLoad;