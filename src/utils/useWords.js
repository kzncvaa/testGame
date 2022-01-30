import {useEffect, useState} from "preact/hooks";

const NUM_ANSWERS = 365;
const getAnswerIndex = () =>
    Math.floor(
        (Date.now() - new Date(2022, 0, 23, 0, 0, 0).getTime()) / 86400e3
    ) % NUM_ANSWERS;

const useWords = () => {
    const [words, setWords] = useState([]);
    useEffect(() => import('/words.json').then((m) => setWords(m.default)), []);

    const answerIndex = getAnswerIndex();
    return {
        answer: words[answerIndex] || '',
        answerIndex,
        isGuessValid: (guess) => words.includes(guess),
    };
}

export {useWords}