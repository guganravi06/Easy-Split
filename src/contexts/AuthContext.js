import React, { createContext, useContext } from 'react';

const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {

    const value = {}
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

