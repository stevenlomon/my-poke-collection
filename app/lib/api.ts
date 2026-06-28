const BASE_URL = "https://api.pokewallet.io";
// No axios needed!! Next.js utilizes Node's native fetch and supercharges it with everything axios helps us with when we build Vite React SPAs!

// Small helper function so that we don't have to repeat headers
function getHeaders() {
  const apiKey = process.env.POKEWALLET_API_KEY;
  
  // Fail early and fail loud
  if (!apiKey) {
    throw new Error(
      "CRITICAL: POKEWALLET_API_KEY is missing. Set it in .env or .env.local!"
    );
  }

  return {
    'X-API-Key': apiKey 
  }
};

export const searchCards = async (query: string, page = 1, limit = 20) => {
  try {
    // Native fetch doesn't have a 'params' object, so we use URLSearchParams
    const params = new URLSearchParams({
      q: query,
      page: page.toString(),
      limit: limit.toString()
    });

    const res = await fetch(`${BASE_URL}/search?${params.toString()}`, {
      headers: getHeaders(),
    });

    if (!res.ok) {
      // If the API returns a 404 or 500, we throw our own clear error of type Error
      throw new Error(`PokeWallet API returned status: ${res.status}`);
    }

    return res.json(); // We parse the external JSON from PokéWallet into a JS object here. Because we pass this object directly to a Server Component, it never crosses a Next.js-to-Client serialization boundary!! This is the seed for a complete brain chemistry altering haha
  
  } catch(err) {
    // Whether `err` is already of type Error or not, we log the raw, ugly error to the server console for US to debug
    console.error(`Server error fetching cards using searchCards:`, err);

    // Now; normalize the error so that the UI (our to-be-built `error.tsx`) always gets a predictable Error object
    if (err instanceof Error) { 
      // If it is *already* of type Error...
      throw err; // ..simply toss it up the chain to the UI
    } else {
      // Else..
      throw new Error("An unexpected network error occurred while contacting PokeWallet."); // ..create our own Error object
    }
  }
};