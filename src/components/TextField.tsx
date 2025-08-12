import { useState } from "react";

const splitText = (text: string, chunckSize = 10) => {
  const words = text.split(" ");
  const chunks = [];

  for (let i = 0; i < words.length; i += chunckSize) {
    chunks.push(words.slice(i, i + chunckSize).join(" "));
  }

  return chunks;
};

export const TextField = () => {
  const [inputText, setInputText] = useState("");
  const [chunks, setChunks] = useState<string[]>([]);
  const [fontSize, setFontSize] = useState(18);
  const [useDyslexicFont, setUseDyslexicFont] = useState(false);

  const handleProcess = () => {
    const result = splitText(inputText, 10);
    setChunks(result);
  };

  const handleFontSize = (option: "plus" | "minus") => {
    if (option === "plus") {
      setFontSize(fontSize + 2);
    }

    if (option === "minus") {
      if (fontSize === 14) {
        alert("Cant diminish font size.");
        return;
      }
      setFontSize(fontSize - 2);
    }
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <div className="my-5 space-x-5">
        <button aria-label="Dividir texto" onClick={handleProcess}>Dividir Texto</button>
        <button aria-label="Aumentar letra" onClick={() => handleFontSize('plus')}>
          Aumentar Letra
        </button>
        <button aria-label="Disminuir letra" onClick={() => handleFontSize('minus')}>
          Disminuir Letra
        </button>
        <label aria-label="Cambiar la tipografía">
          <input
            type="checkbox"
            checked={useDyslexicFont}
            onChange={() => setUseDyslexicFont(!useDyslexicFont)}
          />
          Tipografía Disléxica
        </label>
      </div>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Pega aquí</legend>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="textarea h-24"
          placeholder="Pegá tu texto aquí..."
        />
        <div className="label">Optional</div>
      </fieldset>

      <div style={{ marginTop: "2rem" }}>
        {chunks.map((chunk, i) => (
          <div key={i} style={{ marginBottom: "1rem", fontSize }}>
            <p className={useDyslexicFont ? "font-dyslexic" : ""}>{chunk}</p>
            <button onClick={() => speak(chunk)}>🔊 Escuchar</button>
          </div>
        ))}
      </div>
    </div>
  );
};
