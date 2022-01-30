const Keyboard = ({onInput, onSubmit, guesses, isDone, matrix}) => {
    const keys = `qwertyuiopasdfghjklzxc⌫vbnm⏎`.split('');
    const classByKey = matrix
        .slice(0, guesses.length - 1)
        .reduce((acc, {guess, states = []}) => {
            states.forEach((state, index) => {
                const letter = guess?.[index];
                if (state === '🟩' || acc[letter] === '🟩') acc[letter] = '🟩';
                else if (state === '🟨' && acc[letter] !== '🟩') acc[letter] = '🟨';
                else if (state === '⬛' && acc[letter] !== '🟨') acc[letter] = '⬛';
            });
            return acc;
        }, {});

    return (
        <div class="keyboard">
            {keys.map((key) => (
                <button
                    class={`key ${classByKey[key]}`}
                    data-key={key}
                    onClick={() => {
                        if (key === '⏎') onSubmit();
                        else {
                            let value = guesses[guesses.length - 1] || '';
                            if (key === '⌫') value = value.slice(0, -1);
                            else value = (value + key).slice(0, 5);
                            onInput({target: {value}});
                        }
                        //navigator?.vibrate(10);
                    }}
                    disabled={isDone}
                >
                    {key}
                </button>
            ))}
        </div>
    );
}

export {Keyboard}