import { useEffect, useState } from 'react';
import quoteLeft from '../assets/quote-left.svg';
import quoteRight from '../assets/quote-right.svg';
import {
  ShareIcon,
  SpeakerWaveIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';
import VoiceSelector from './VoiceSelector';

export default function QuoteGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [author, setAuthor] = useState('');
  const [quote, setQuote] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [voice, setVoice] = useState(0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>();

  useEffect(() => {
    (() => {
      let voices = window.speechSynthesis.getVoices();

      voices = voices.filter((voice) => {
        return (
          voice.lang === 'ko-KR' ||
          voice.lang === 'en-US' ||
          voice.lang === 'ja-JP' ||
          voice.lang === 'zh-CN'
        );
      });

      setVoices(voices);
    })();
  }, [quote]);

  const handleClickNewQuote = async () => {
    try {
      setIsLoading(true);

      const response = await fetch('http://api.quotable.io/random');
      const data = await response.json();
      setAuthor(data.author);
      setQuote(data.content);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickTweetQuote = () => {
    if (!quote) return;
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quote}`;
    window.open(tweetUrl, '_blank');
  };

  const handleClickCopyQuote = () => {
    if (!quote) return;
    navigator.clipboard.writeText(quote);
  };

  const handleClickTTS = () => {
    if (!quote || !voices) return;
    let utterance = new SpeechSynthesisUtterance(`${quote} by ${author}`);

    const synth = window.speechSynthesis;
    utterance.voice = voices[voice];
    synth.speak(utterance);
  };

  const selectVoice = (voiceIndex: number) => {
    setVoice(voiceIndex);
  };

  return (
    <div className="w-10/12 max-w-xl space-y-6 rounded-lg bg-slate-200 px-4 py-6 shadow-lg">
      <header>
        <h1 className="text-center text-2xl font-bold">
          Random Quote Generator
        </h1>
      </header>

      <div className="flex flex-col rounded-md border border-slate-300 p-3">
        {quote ? (
          <>
            <div className="flex justify-between space-x-2 ">
              <img src={quoteLeft} className="h-5 w-5" alt="" />
              <p className="break-all text-center text-2xl">{quote}</p>
              <img src={quoteRight} className="h-5 w-5 self-end" alt="" />
            </div>
            <div className="author mt-5 flex justify-between text-lg font-bold">
              {voices && (
                <VoiceSelector voices={voices} selectVoice={selectVoice} />
              )}

              <div>
                <span className="mr-1 ">-</span>
                {author}
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-32 select-none items-center justify-center">
            <p className="text-center text-gray-500">
              Click the button below to generate a random quote.
            </p>
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <ul className="flex space-x-3">
            <li
              onClick={handleClickTTS}
              className={`cursor-pointer rounded-full p-2 transition hover:bg-violet-200 ${
                !quote && 'cursor-not-allowed'
              }`}
            >
              <SpeakerWaveIcon className="h-6 w-6" />
            </li>
            <li
              onClick={handleClickCopyQuote}
              className={`cursor-pointer rounded-full p-2 transition hover:bg-violet-200 ${
                !quote && 'cursor-not-allowed'
              }`}
            >
              <ClipboardDocumentIcon className="h-6 w-6 " />
            </li>
            <li
              onClick={handleClickTweetQuote}
              className={`cursor-pointer rounded-full p-2 transition hover:bg-violet-200 ${
                !quote && 'cursor-not-allowed'
              }`}
            >
              <ShareIcon className="h-6 w-6" />
            </li>
          </ul>

          <button
            disabled={isLoading}
            onClick={handleClickNewQuote}
            className={`select-none rounded-md bg-violet-600 px-4 py-3 text-violet-200 transition hover:bg-violet-800`}
          >
            {isLoading ? 'Loading...' : 'New Quote'}
          </button>
        </div>
      </div>

      <footer>
        <p className="text-red-500">{errorMessage}</p>
      </footer>
    </div>
  );
}
