import { useState } from "react";

interface Props {
  chunks: string[];
  fontSize: number;
  useDyslexicFont: boolean;
  voiceRate: number;
  voicePitch: number;
}

export const TextOutput = ({
  chunks,
  fontSize,
  useDyslexicFont,
  voiceRate,
  voicePitch,
}: Props) => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentWord, setCurrentWord] = useState<string | null>(null);

  const speak = (text: string) => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = voiceRate;
    utterance.pitch = voicePitch;
    utterance.lang = "es-ES";

    const words = text.split(" ");
    let wordIndex = 0;

    utterance.onboundary = (event) => {
      if (event.name === "word" || event.charIndex >= 0) {
        setCurrentWord(words[wordIndex] || null);
        wordIndex++;
      }
    };

    utterance.onend = () => setCurrentWord(null);

    speechSynthesis.speak(utterance);
    setIsPaused(false);
  };

  const pause = () => {
    speechSynthesis.pause();
    setIsPaused(true);
  };

  const resume = () => {
    speechSynthesis.resume();
    setIsPaused(false);
  };

  const stop = () => {
    speechSynthesis.cancel();
    setIsPaused(false);
    setCurrentWord(null);
  };

  return (
    <div className="mt-5 space-y-6 w-full lg:w-2/3">
      {chunks.map((chunk, i) => (
        <div
          key={i}
          className="bg-white shadow-lg rounded-xl p-5 border border-gray-200"
          style={{ fontSize }}
        >
          <p
            className={`${useDyslexicFont ? "font-dyslexic" : ""} leading-relaxed`}
          >
            {chunk.split(" ").map((word, idx) => (
              <span
                key={idx}
                className={`transition-colors duration-200 ${
                  word === currentWord
                    ? "bg-yellow-300 rounded px-1"
                    : "bg-transparent"
                }`}
              >
                {word}{" "}
              </span>
            ))}
          </p>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => speak(chunk)}
              className="px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm"
            >
              🔊 Leer
            </button>
            {isPaused ? (
              <button
                onClick={resume}
                className="px-3 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm"
              >
                ▶️ Reanudar
              </button>
            ) : (
              <button
                onClick={pause}
                className="px-3 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white text-sm"
              >
                ⏸ Pausar
              </button>
            )}
            <button
              onClick={stop}
              className="px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm"
            >
              ⏹ Detener
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
