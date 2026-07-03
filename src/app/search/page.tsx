// Not a client component! It's a pure server component and because of this it'll be a *lot* slimmer than the
// *behemoth* that is the original SearchPage haha. Because we don't have a client component doing both client and server work! 
// No more `useState` or `useEffect`. Because we are on the server, we don't need an "effect" to run after the page loads. We just pause the server (await searchCards()), get the data, and render the HTML instantly.
// No more `useSearchParams` -> Next.js automatically hands the URL parameters directly to our Page component as a prop called `searchParams`
// No more handleNextPage functions. We just use standard Next.js `Link` tags that point to the next page's URL!
import Link from 'next/link';
import { searchCards } from '@/lib/api';
import { type PokemonCard } from '@/lib/types';
import SearchResultItem from '@/components/SearchResultItem';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string, page?: string, limit?: string }>; }) {
  const params = await searchParams;
  const query = params.q;
  const page = parseInt(params.page || "1");
  const limit = parseInt(params.limit || "20");

  // Our empty state; returned instanty, no fetching needed
  if (!query) {
    return (
      <div className="mt-24 text-center">
        <h2 className="mb-4 text-2xl font-bold text-slate-50">Looking for Pokémon?</h2>
        <p className="text-slate-400">Use the search bar to find cards to add to your collection!</p>
      </div>
    )
  }

  // The actual fetch now is just pure server-side awaiting! No useEffect and no loading states related to the data fetching!!
  // If it fails, Next.js automatically catches it for us in error.tsx! And all `await`-ing is intercepted by loading.tsx! 
  const data = await searchCards(query, page, limit);
  const searchResults = data.results;
  const pagination = data.pagination;

  // Our zero results state
  if (searchResults.lenth === 0) {
    return (
      <div className="mt-24 text-center">
        <h2 className="mb-4 text-2xl font-bold text-slate-50">No Pokémon found in the tall grass!</h2>
        <p className="text-slate-400">Try with another search query!</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <p className="text-slate-400 mb-8 font-medium">Showing results for "{query}" - {pagination.total} total results</p>

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-8 p-0 m-0 list-none">
        {searchResults.map((result: PokemonCard) => (
          // Once again; no more "Backpack strat" haha! Next.js Link handles all of the caching
          <Link key={result.id} href={`/card/${result.id}`}>
            <SearchResultItem resultItem={result} />
          </Link>
        ))}
      </ul>

      {/* The Pagination Controls */}
      <div className="mt-12 flex items-center justify-center gap-4">
        {/* If we can go back, render a Link. If not, render a disabled button! */}
        {pagination.page > 1 ? (
          <Link
            className="rounded-lg border border-slate-700 bg-slate-800 px-6 py-2.5 font-semibold text-slate-50 shadow-sm transition-all hover:-translate-y-0.5 hover:border-violet-500 hover:text-violet-400 hover:shadow-md"
            href={`/search?q=${query}&page=${page - 1}&limit=${limit}`}
          >
            Previous
          </Link>
        ) : (
          <button className="cursor-not-allowed rounded-lg border border-slate-800 bg-slate-900 px-6 py-2.5 font-semibold text-slate-500 opacity-50 shadow-none" disabled>
            Previous
          </button>
        )}

        {/* If we can go forward, render a Link. If not, render a disabled button! */}
        {pagination.page < pagination.total_pages ? (
          <Link
            className="rounded-lg border border-slate-700 bg-slate-800 px-6 py-2.5 font-semibold text-slate-50 shadow-sm transition-all hover:-translate-y-0.5 hover:border-violet-500 hover:text-violet-400 hover:shadow-md"
            href={`/search?q=${query}&page=${page + 1}&limit=${limit}`}
          >
            Next
          </Link>
        ) : (
          <button className="cursor-not-allowed rounded-lg border border-slate-800 bg-slate-900 px-6 py-2.5 font-semibold text-slate-500 opacity-50 shadow-none" disabled>
            Next
          </button>
        )}
      </div>
    </div>
  )
};