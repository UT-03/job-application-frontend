import { useState, useCallback, useEffect } from 'react';

export const useAuth = () => {
    const [token, setToken] = useState(false);

    const login = useCallback((token) => {
        setToken(token);
        localStorage.setItem(
            'immigrationJobUserData',
            JSON.stringify({
                token: token
            })
        );
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        localStorage.removeItem('immigrationJobUserData');
    }, []);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('immigrationJobUserData'));
        if (storedData && storedData.token) {
            login(storedData.token);
        }
    }, [login]);

    return { token, login, logout };
};