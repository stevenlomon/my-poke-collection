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