import { useState, useCallback, useEffect } from 'react';

export const useAuth = () => {
    const [token, setToken] = useState();
    const [userType, setUserType] = useState();

    const login = useCallback((token, userType) => {
        setToken(token);
        setUserType(userType);

        localStorage.setItem(
            'immigrationJobUserData',
            JSON.stringify({
                token: token,
                userType: userType
            })
        );
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserType(null);
        localStorage.removeItem('immigrationJobUserData');
    }, []);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('immigrationJobUserData'));
        if (storedData && storedData.token) {
            login(storedData.token, storedData.userType);
        }
    }, [login]);

    return { token, userType, login, logout };
};