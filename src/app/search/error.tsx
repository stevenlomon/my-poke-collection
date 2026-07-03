'use client'
// Client component (uses `useEffect` and `onClick`) that is purely responsible for catching errors and displaying them!
// Under the hood it uses React Error Boundaries which is advanced React I've never had a reason to touch haha

// It wraps both our Search page *and* our Loading component:
//{/* The Error Boundary intercepts any crashes from its children */}
//  <NextJsErrorBoundary fallback={<Error />}>
//    
//    {/* Suspense intercepts any 'awaits' from its children */}
//    <ReactSuspense fallback={<Loading />}>
//      
//      {/* Our actual page */}
//      <SearchPage />
//      
//    </ReactSuspense>
//    
//  </NextJsErrorBoundary>

// Just like I wrote in the Loading component; absolutely mindblowing engineering

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) { // "Expect an object that has everything a standard Error has, AND also allow it to have a digest property."
  useEffect(() => {
    // Here we can log the error to the console or send it to services like Sentry or Datadog
    console.error("Caught by Next.js Error Boundary:", error)
  }, [error]);

  return (
    <div className="mt-24 flex flex-col items-center justify-center p-10 text-center">
      <h2 className="text-2xl font-bold text-red-400">Oh no! A wild error appeared!</h2>
      <p className="my-4 text-slate-400">{error.message || "Failed to fetch Pokémon data."}</p>

      {/* The reset function tells Next.js to re-run the server component and try again! */}
      <button
        className="cursor-pointer rounded-lg bg-slate-800 px-6 py-2.5 font-semibold text-slate-50 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-700 hover:shadow-md"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  )
};