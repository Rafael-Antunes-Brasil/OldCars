'use client';

import { useState } from 'react';

type Props = {
    text: string;
};

export default function TextToSpeech({ text }: Props) {
    const [isSpeaking, setIsSpeaking] = useState(false);

    const speak = () => {
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        const ptVoice = voices.find(v => v.lang === 'pt-BR');
        if (ptVoice) utterance.voice = ptVoice;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    };

    const stop = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    return (
        <div className="flex justify-end mt-4">
            {!isSpeaking ? (
                <button
                    onClick={speak}
                    className="flex items-center gap-2 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-xl shadow-md transition duration-300 ease-in-out"
                >
                    <span role="img" aria-label="som">🔊</span>
                </button>
            ) : (
                <button
                    onClick={stop}
                    className="flex items-center gap-2 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-xl shadow-md transition duration-300 ease-in-out"
                >
                    <span role="img" aria-label="parar">⏹</span>
                </button>
            )}
        </div>
    );
}
