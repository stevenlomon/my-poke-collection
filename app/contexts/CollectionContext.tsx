'use client' // This state will live in the Browser!

import { createContext, useContext, useState } from 'react';
import { PokemonCard, CollectionItem } from '../lib/types';

interface CollectionContextType {
  userCollection: CollectionItem[]; // A User Collection is an array of Collection Items!
  addToCollection: (card: PokemonCard) => void; // Seeing `void` brings me back to writing C++ haha
  increaseAmount: (id: string) => void;
  decreaseAmount: (id: string) => void;
  removeCardFromCollection: (id: string) => void;
}

const CollectionContext = createContext<CollectionContextType | null>(null);

export function CollectionProvider({ children }: { children: React.ReactNode }) { // Typing `children` as React.ReactNode which basically means "literally anything React is allowed to render". A polite "any" that TypeScript allows haha
  const [userCollection, setUserCollection] = useState<CollectionItem[]>([]); // This will never scream about `never[]` again, expecting a literal empty array

  // These functions are unchanged from the Vite React SPA version! (Minus the TypeScripting haha)
  function addToCollection(card: PokemonCard) {
    setUserCollection(prev => [...prev, { ...card, amount: 1, isNew: true }]);
  }

  function increaseAmount(id: string) {
    setUserCollection(prev => prev.map(item => item.id === id ? { ...item, amount: item.amount + 1 } : item));
  }

  function decreaseAmount(id: string) {
    setUserCollection(prev => prev.map(item => item.id === id ? { ...item, amount: item.amount - 1 } : item));
  }

  function removeCardFromCollection(id: string) {
    setUserCollection(prev => prev.filter(item => item.id !== id));
  }

  return (
    <CollectionContext.Provider value={{ userCollection, addToCollection, increaseAmount, decreaseAmount, removeCardFromCollection }}>
      {children}
    </CollectionContext.Provider>
  );
};

// Custom hook so that our pages can easily grab the data
export function useCollection() {
  const context = useContext(CollectionContext);

  // Having this ensures 100% that we have a valid context and makes the app fail loudly if we don't
  if (!context) {
    throw new Error("useCollection must be used within a CollectionProvider");
  }

  return context;
};