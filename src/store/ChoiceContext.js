import React, { createContext, useContext, useState} from 'react';

export const ChoiceContext = createContext();

export const useChoiceContext = () => useContext(ChoiceContext)

const ChoiceContextProvider = ({children}) => {
    const [choice, setChoice] = useState({SS:''})

    return (
        <ChoiceContext.Provider value={{choice, setChoice}}>
            {children}
        </ChoiceContext.Provider>
    )
}

export default ChoiceContextProvider