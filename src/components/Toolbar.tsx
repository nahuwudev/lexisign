interface Props {
  fontSize: number;
  chunkSize: number;
  setChunkSize: (value: number) => void;
  useDyslexicFont: boolean;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  setUseDyslexicFont: React.Dispatch<React.SetStateAction<boolean>>;
  voiceRate: number;
  setVoiceRate: React.Dispatch<React.SetStateAction<number>>;
  voicePitch: number;
  setVoicePitch: React.Dispatch<React.SetStateAction<number>>;
}

export const Toolbar = ({
  chunkSize,
  fontSize,
  setChunkSize,
  useDyslexicFont,
  setUseDyslexicFont,
  setFontSize,
  voiceRate,
  setVoiceRate,
  voicePitch,
  setVoicePitch,
}: Props) => {
  return (
    <ul className="toolbar space-y-4">
      {/* Tamaño de fuente */}
      <li>
        <fieldset>
          <label className="label">
            Tamaño de la fuente
            <input
              type="range"
              value={fontSize}
              min="14"
              max="25"
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="range range-primary"
            />
          </label>
          <legend className="label">{fontSize}</legend>
        </fieldset>
      </li>

      {/* Palabras por bloque */}
      <li>
        <fieldset>
          <label className="label">
            Palabras por bloque
            <input
              type="range"
              value={chunkSize}
              min="5"
              max="25"
              onChange={(e) => setChunkSize(parseInt(e.target.value))}
              className="range range-primary"
            />
          </label>
          <legend className="label">{chunkSize}</legend>
        </fieldset>
      </li>

      {/* Velocidad de voz */}
      <li>
        <fieldset>
          <label className="label">
            Velocidad de voz
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={voiceRate}
              onChange={(e) => setVoiceRate(parseFloat(e.target.value))}
              className="range range-primary"
            />
          </label>
          <legend className="label">{voiceRate}x</legend>
        </fieldset>
      </li>

      {/* Tono de voz */}
      <li>
        <fieldset>
          <label className="label">
            Tono de voz
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={voicePitch}
              onChange={(e) => setVoicePitch(parseFloat(e.target.value))}
              className="range range-primary"
            />
          </label>
          <legend className="label">{voicePitch}</legend>
        </fieldset>
      </li>

      {/* Fuente disléxica */}
      <li>
        <label className="label" aria-label="Cambiar la tipografía">
          <input
            type="checkbox"
            className="checkbox"
            checked={useDyslexicFont}
            onChange={() => setUseDyslexicFont(!useDyslexicFont)}
          />
          Cambiar la tipografía
        </label>
      </li>
    </ul>
  );
};
