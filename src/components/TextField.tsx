import { useEffect, useState } from "react";
import { Toolbar } from "./Toolbar";
import { TextOutput } from "./TextOutput";

const splitText = (text: string, chunkSize = 10) => {
  const words = text.split(" ");
  const chunks = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(" "));
  }
  return chunks;
};

export const TextField = () => {
  const [inputText, setInputText] = useState("");
  const [chunks, setChunks] = useState<string[]>([]);
  const [fontSize, setFontSize] = useState(18);
  const [useDyslexicFont, setUseDyslexicFont] = useState(false);
  const [chunkSize, setChunkSize] = useState(10);
  const [voiceRate, setVoiceRate] = useState(1);
  const [voicePitch, setVoicePitch] = useState(1);

  useEffect(() => {
    if (inputText.trim()) {
      setChunks(splitText(inputText, chunkSize));
    } else {
      setChunks([]);
    }
  }, [inputText, chunkSize]);

  return (
    <div className="flex-col flex items-center">
      <div className="flex gap-10 w-full lg:w-3/4 my-10">
        <Toolbar
          fontSize={fontSize}
          chunkSize={chunkSize}
          setFontSize={setFontSize}
          setChunkSize={setChunkSize}
          setUseDyslexicFont={setUseDyslexicFont}
          useDyslexicFont={useDyslexicFont}
          voiceRate={voiceRate}
          setVoiceRate={setVoiceRate}
          voicePitch={voicePitch}
          setVoicePitch={setVoicePitch}
        />

        <div className="flex-1">
          <fieldset className="fieldset w-full">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="textarea h-96 w-full mx-auto focus:outline-none"
              placeholder="Pegá tu texto aquí..."
            />
          </fieldset>
        </div>
      </div>

      <TextOutput
        chunks={chunks}
        fontSize={fontSize}
        useDyslexicFont={useDyslexicFont}
        voiceRate={voiceRate}
        voicePitch={voicePitch}
      />
    </div>
  );
};
