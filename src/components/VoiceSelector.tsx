interface Props {
  voices: SpeechSynthesisVoice[];
  selectVoice: (voiceIndex: number) => void;
}

const voiceMap: Record<string, string> = {
  'Microsoft Heami - Korean (Korean)': 'Korean',
  'Google US English': 'English',
  'Google 日本語': 'Japanese',
  'Google 한국의': 'Korean 2',
  'Google 普通话（中国大陆）': 'Chinese',
};

export default function VoiceSelector({ voices, selectVoice }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    selectVoice(Number(e.target.value));
  };

  //? 중국어를 못찾는다.

  return (
    <select
      className="cursor-pointer bg-transparent px-2 outline-none"
      onChange={handleChange}
    >
      {voices.map((voice, idx) => (
        <option key={voice.name} value={idx} className="">
          {voiceMap[voice.name] || 'Chinese'}
        </option>
      ))}
    </select>
  );
}
