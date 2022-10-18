import React, { createContext, useContext, useState } from 'react';

export const LoadingContext = createContext();

export const useLoadingContext = () => useContext(LoadingContext)

const LoadingContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingContextProvider