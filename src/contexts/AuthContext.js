import { browserLocalPersistence, browserSessionPersistence, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, setPersistence, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {auth,googleProvider} from '../fireBase'

const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    async function signUp(email,password,displayName) {
        try {
            setError('');
            const userCredentials = await createUserWithEmailAndPassword(auth,email,password);

            if(displayName){
                await updateProfile(userCredentials.user,{displayName});
            }

            return userCredentials.user;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    }

    async function login(email,password,rememberMe = true) {
        try {
            setError('');
            // Set persistence type based on "Remember Me" option
            const persistenceType = rememberMe ? 
            // LOCAL: Persists even when browser is closed (default)
            browserLocalPersistence : 
            // SESSION: Cleared when browser window is closed
            browserSessionPersistence;
    
            await setPersistence(auth, persistenceType);

            return await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError(err.message);
            throw err;
        }
    }

    async function logout() {
        try {
            setError('');

            return await signOut(auth); 
        } catch (error) {
            setError(error.message);
            throw error;
        }
    }

    async function signInWithGoogle(rememberMe = true) {
        try {
            setError('');
            const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence;
            await setPersistence(auth,persistenceType);
            return await signInWithPopup(auth,googleProvider);
        } catch (error) {
            setError(error);
            throw error;
        }
    }

    async function  resetPassword(email) {
        try {
            setError('');

            return await sendPasswordResetEmail(auth,email);
        } catch (error) {
            setError(error);
            throw error;
        }
        
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
        });
    
        // Cleanup subscription on unmount
        return unsubscribe;
      }, []);

    const value = {
        user,
        error,
        signUp,
        login,
        logout,
        signInWithGoogle,
        resetPassword
    }
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

