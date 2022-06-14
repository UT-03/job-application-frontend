import { createContext } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    userType: null,
    login: () => { },
    logout: () => { }
});
