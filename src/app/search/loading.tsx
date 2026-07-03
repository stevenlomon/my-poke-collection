// This loading component.. is a server component! Next.js allows us to code loading completely without using `useState` and `useEffect`!!
// There's no booleans flags to track, no ternary operators like `isLoading ? <Loading /> : <Page />`, and not a single API dependency!

// How? Under the hood, Next.js runs ReactSuspence which is advanced React that wraps our page component:
// {/* Suspense intercepts any 'awaits' from its children */}
//    <ReactSuspense fallback={<Loading />}>
//      
//      {/* Our actual page! */}
//      <SearchPage />
//      
//    </ReactSuspense>

// Absolutely mindblowing

export default function Loading() {
  return (
    // A Tailwind flex container to center everything perfectly on the screen
    <div className="flex min-h-[50vh] flex-col items-center justify-center">
      
      {/* Pure Tailwind Pokéball themed spinner */}
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-700 border-t-violet-500"></div>
      
      {/* The pulsing text to let the user know the server is working */}
      <p className="mt-6 text-lg font-semibold text-slate-400 animate-pulse">
        Catching Pokémon data...
      </p>
      
    </div>
  )
};