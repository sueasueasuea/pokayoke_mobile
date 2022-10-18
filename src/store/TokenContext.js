import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TokenContext = createContext();

export const useTokenContext = () => useContext(TokenContext)

const TokenContextProvider = ({ children }) => {
    const [accessToken, setAccToken] = useState(null);
    const [refreshToken, setRefToken] = useState(null);

    useEffect(() => {
        
        AsyncStorage.setItem('accessToken', `${accessToken}` )
    }, [accessToken])

    useEffect(() => {
        
        AsyncStorage.setItem('refreshToken', `${refreshToken}`)
    }, [refreshToken])

    return (
        <TokenContext.Provider value={{ accessToken, setAccToken, refreshToken, setRefToken }}>
            {children}
        </TokenContext.Provider>
    )
}

export default TokenContextProvider;