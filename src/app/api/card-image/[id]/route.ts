import { NextResponse } from 'next/server';
// import { getCardImage } from './../../../lib/api';
// We could write our import like that but.. it looks like the work of a crazy person haha!
import { getCardImage } from '@/lib/api'; // Using the `@` path alias!
import { promises as fs } from 'fs'; // To read files off the server
import path from 'path'; // To safely navigate folder structures

// Our Next.js Backend fetches the raw image binary data from the PokéWallet API and then this Route handler 
// will sit as a proxy between the PokéWallet API and our frontend. The browser never directly talks to PokeWallet, 
// and PokeWallet never directly talks to the browser!

// This function is the equivalent of writing app.get('/api/image/:id, (req, res) => {` in Express!
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  // The `_` in front of `request` in the function parameters signals to the TS compiler that "I know I'm not using this parameter but I need to include it!" haha, completely new to me. 
  // `{ params }` And this is object destructuring, just like { props } in React!
  try {
    const { id } = await params;
    const blob = await getCardImage(id);

    return new NextResponse(blob, {
      status: 200,
      headers: {
        'Content-Type': blob.type || 'image/jpeg', // We let the blob dictate the format and fallback to jpeg
        'Cache-Control': 'public, max-age=86400, immutable',
        // 86400 seconds is 24h, 'public' tells Vercel's global CDN to cache this all over the world, and 'immutable' tells the browser "This specific URL's content will never change
      },
    });
  } catch (err) {
    // Get the absolute path to your public folder
    const fallbackPath = path.join(process.cwd(), 'public', 'unown.webp');

    // Read the image into raw binary data
    const fallbackBuffer = await fs.readFile(fallbackPath);
    
    // Send it back as a completely normal 200 OK response!
    return new NextResponse(fallbackBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=86400, immutable',
      },
    });
  }
};