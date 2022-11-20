export default function QuoteGenerator() {
  return (
    <div className="w-10/12 max-w-lg space-y-6 rounded-lg bg-slate-200 px-4 py-6 shadow-lg">
      <header>
        <h1 className="text-center text-2xl font-bold">
          Random Quote Generator
        </h1>
      </header>

      <div>
        <div>Quote</div>
        <div>Author</div>
      </div>

      <footer>
        <div className="flex items-center justify-between">
          <ul className="flex space-x-3">
            <li>TTS</li>
            <li>Clipboard</li>
            <li>Twit</li>
          </ul>

          <button className="rounded-md bg-violet-700 px-3 py-2 text-violet-200">
            New Quote
          </button>
        </div>
      </footer>
    </div>
  );
}
