import React, { createContext, useContext, useState} from 'react';

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext)

const AuthContextProvider = ({children}) => {
    const [userData, setUserData] = useState({empNo:'',name:'',img:'',plant:''})

    return (
        <AuthContext.Provider value={{userData, setUserData}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider