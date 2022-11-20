import { useState } from 'react';
import quoteLeft from '../assets/quote-left.svg';
import quoteRight from '../assets/quote-right.svg';

export default function QuoteGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [author, setAuthor] = useState('');
  const [quote, setQuote] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClickNewQuote = async () => {
    try {
      setIsLoading(true);

      const response = await fetch('http://api.quotable.io/random');
      const data = await response.json();
      console.log('data', data);
      setAuthor(data.author);
      setQuote(data.content);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickTweetQuote = () => {
    //
  };

  const handleClickCopyQuote = () => {
    navigator.clipboard.writeText(quote);
  };

  const handleClickTTS = () => {
    //
  };

  return (
    <div className="w-10/12 max-w-lg space-y-6 rounded-lg bg-slate-200 px-4 py-6 shadow-lg">
      <header>
        <h1 className="text-center text-2xl font-bold">
          Random Quote Generator
        </h1>
      </header>

      <div className="flex flex-col rounded-md border border-violet-300 p-3">
        <div className="flex justify-between space-x-2 ">
          <img src={quoteLeft} className="h-5 w-5" alt="" />
          <p className="break-all text-center text-2xl">{quote}</p>
          <img src={quoteRight} className="h-5 w-5 self-end" alt="" />
        </div>
        <p className="author mt-5 flex justify-end text-lg font-bold">
          <span className="mr-1 ">-</span>
          {author}
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <ul className="flex space-x-3">
            <li>TTS</li>
            <li onClick={handleClickCopyQuote}>Clipboard</li>
            <li>Twit</li>
          </ul>

          <button
            disabled={isLoading}
            onClick={handleClickNewQuote}
            className={`rounded-md bg-violet-700 px-4 py-3 text-violet-200 transition hover:bg-violet-800`}
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
