// CardImage is *not* a client component! We don't 'use client' here. 
// In the Vite React SPA version, the CardImage component had to use `useState`, `useEffect` and `URL.createObjectURL()`
// None of that is needed here since CardImage is simply a wrapper around the Next.js native Image server component!
import Image from "next/image";

interface CardImageProps {
  cardId: string;
  cardName: string;
}

export default function CardImage({ cardId, cardName }: CardImageProps) {
  return (
    <Image
      src={`/api/card-image/${cardId}`} // We fetch from our own custom proxy Route Handler!
      alt={cardName}
      width={250}  // Next.js requires width/height to prevent layout shift
      height={350}
      className="card-image object-cover"
    />
  );
}