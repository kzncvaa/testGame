import {useEffect, useState} from "preact/hooks";

const useSavedGuesses = (answer) => {
    const [guesses, setGuesses] = useState(['']);
    const setSavedGuesses = (f) => {
        setGuesses((oldGuesses) => {
            const newGuesses = f(oldGuesses);
            localStorage.setItem(answer, JSON.stringify(newGuesses));
            return newGuesses;
        });
    };

    useEffect(() => {
        const loadGuesses = () =>
            setGuesses(JSON.parse(localStorage.getItem(answer)) || ['']);
        loadGuesses();
        window.addEventListener('storage', loadGuesses);
        window.addEventListener('visibilitychange', loadGuesses);
        return () => {
            window.removeEventListener('storage', loadGuesses);
            window.removeEventListener('visibilitychange', loadGuesses);
        };
    }, [answer]);

    return [guesses, setSavedGuesses];
}

export {useSavedGuesses}