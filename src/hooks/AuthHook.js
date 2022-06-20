import { useState, useCallback, useEffect } from 'react';

export const useAuth = () => {
    const [token, setToken] = useState();
    const [userType, setUserType] = useState();
    const [userId, setUserId] = useState();

    const login = useCallback((token, userType, userId) => {
        setToken(token);
        setUserType(userType);
        setUserId(userId);

        localStorage.setItem(
            'immigrationJobUserData',
            JSON.stringify({
                token: token,
                userType: userType,
                userId: userId
            })
        );
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserType(null);
        setUserId(null);
        localStorage.removeItem('immigrationJobUserData');
    }, []);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('immigrationJobUserData'));
        if (storedData && storedData.token) {
            login(storedData.token, storedData.userType, storedData.userId);
        }
    }, [login]);

    return { token, userType, userId, login, logout };
};