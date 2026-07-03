'use client' // Client component since we need to use `useState`, `useEffect`, `useRef` and `onChange`

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // This replaces useNavigate
// import { searchCards } from '@/lib/api'; // Not used! For an important reason!
import { type PokemonCard } from '@/lib/types';

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [previews, setPreviews] = useState<PokemonCard[]>([]); // Starts as an empty array but it's not of type "array with empty values"; it's an array of our type PokemonCard!
  const [isOpen, setIsOpen] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Our original timeoutRef, now typed! From the docstring `This object is created internally and is returned from setTimeout() and setInterval()`. It's either that or null, starts as null
  const router = useRouter(); // Replaces `let navigate = useNavigate();`

  // Our useEffect to achieve debouncing is almost entirely the same as in the Vite version
  useEffect(() => {
    // Our edge case completely unchaned: Don't navigate to a search result page for an empty string
    if (!searchTerm.trim()) {
      setIsOpen(false);
      setPreviews([]);
      return;
    }

    // Our original setTimeout, completely unchanged. If the user stops typing for 500ms, this runs
    timeoutRef.current = setTimeout(async () => {
      // Handle local state
      setIsSearching(true);
      setIsOpen(true);

      // Do the fetching business. "Completely unchanged"; it is unchanged because we don't want our API in the Browser haha! Changed for a good reason
      try {
        const res = await fetch(`/api/search?q=${searchTerm}`); // If we want our API key securely on our server, we can't use searchCards directly here! We need to call our Route Handler instead!
        if (!res.ok) throw new Error("Network response was not ok.");

        const data = await res.json();
        setPreviews(data.results || []);
      } catch (err) {
        console.error("Preview fetch failed", err);
        setPreviews([]);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    // And then the important cleanup. If the user types again before 500ms, this kills the previous timer
    return () => {
      if (timeoutRef.current) { // Improvement in our cleanup function; now we guarantee that timeoutRef.current will never be `undefined` which is not in the contract we've written with TypeScript haha
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchTerm]); // Run every time there is a change in the searchTerm state variable

  // We still need a form submission function; now typed
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) { // We *do* use FormEvent here! Despite VSCode saying it's deprecated. In the Browser's native DOM library, FormEvent is deprecated in favor of SubmitEvent. But in the React ecosystem, React.FormEvent<HTMLFormElement> is apparently still perfectly safe, valid and *not* deprecated.
    e.preventDefault();

    if (!searchTerm.trim()) return; // Same safety check; return early if there is no search term
    if (timeoutRef.current) clearTimeout(timeoutRef.current); // Updated safety for the clearTimeout!

    setIsOpen(false); // Same important local state management to prevent the curtains from staying open when we return
    router.push(`/search?q=${searchTerm}`); // Replaces `navigate(`/search?q=${searchTerm}`);`
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center gap-8 bg-slate-800 px-8 py-4 border-b border-slate-700 shadow-md">
      <Link href="/" className="text-xl font-bold text-violet-500 transition-colors hover:text-violet-400">
        MyPokéCollection
      </Link>

      <Link
        href="/explore"
        className="font-medium text-slate-500 opacity-70 transition-all cursor-not-allowed hover:text-slate-400 hover:-translate-y-0.5 hover:rotate-1"
        onClick={(e) => e.preventDefault()}
        title="Coming Soon!"
      >
        Explore Cards
      </Link>
      <Link
        href="/create"
        className="font-medium text-slate-500 opacity-70 transition-all cursor-not-allowed hover:text-slate-400 hover:-translate-y-0.5 hover:rotate-1"
        onClick={(e) => e.preventDefault()}
        title="Coming Soon!"
      >
        Create Custom Card
      </Link>

      <form
        onSubmit={handleSubmit}
        className="ml-auto flex items-center rounded-full bg-slate-900 px-4 py-1.5 border border-transparent transition-all focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-500/10"
      >
        <input
          className="w-64 bg-transparent py-1 text-sm text-slate-50 outline-none border-none placeholder:text-slate-500"
          type='text'
          placeholder='Search Pokémon...'
          value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type='submit' className="px-2 text-lg opacity-60 transition-opacity hover:opacity-100 cursor-pointer">
          {/* To be swapped out with a Poké ball icon later */}
          {isSearching ? '🌀' : '🔍'}
        </button>
      </form>

      {/* THE DROPDOWN */}
      {isOpen && (
        <div className="absolute right-8 top-[calc(100%+5px)] z-[100] w-80 overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-xl">
          {isSearching ? (
            <p className="m-0 p-4 text-center text-sm text-slate-400">Locating Pokémon...</p>
          ) : previews.length > 0 ? (
            <ul className="m-0 flex flex-col p-0 list-none">

              {previews.map((card: PokemonCard) => ( // We could leave out `: PokemonCard` here and TS would infer the type from this line `const [previews, setPreviews] = useState<PokemonCard[]>([]);`
                <li key={card.id} className="border-b border-slate-700 last:border-b-0">
                  <Link
                    href={`/card/${card.id}`} // Next.js standard href
                    onClick={() => setIsOpen(false)}
                    className="flex flex-col p-3 text-slate-50 transition-colors hover:bg-slate-700/50"
                  // The "Backpack" is gone! No more `state={{ cardData: card }}`
                  >
                    <strong>{card.card_info?.name}</strong> <br />
                    <small className="preview-set-name">{card.card_info?.set_name}</small>
                  </Link>
                </li>
              ))}

              {/* The Goodreads-style "See all results" footer */}
              <li className="bg-slate-900/50 text-center">
                <Link
                  href={`/search?q=${searchTerm}`}
                  onClick={() => setIsOpen(false)}
                  className="block p-3 text-sm font-bold text-violet-400 transition-colors hover:bg-slate-800"
                >
                  See all results for "{searchTerm}"
                </Link>
              </li>
            </ul>
          ) : (
            <p className="m-0 p-4 text-center text-sm text-slate-400">No Pokémon found in the tall grass.</p>
          )}
        </div>
      )}
    </nav>
  )
};
