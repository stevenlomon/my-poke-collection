'use client' // This state will live in the Browser!

import { createContext, useContext, useState } from 'react';

const CollectionContext = createContext(null);

export function CollectionProvider({ children }: { children: React.ReactNode }) { // Typing `children` as React.ReactNode which basically means "literally anything React is allowed to render". A polite "any" that TypeScript allows haha
  const [userCollection, setUserCollection] = useState([]);

  // These functions are unchanged from the Vite React SPA version!
  function addToCollection(card) {
    setUserCollection(prev => [...prev, { ...card, amount: 1, isNew: true }]);
  }

  function increaseAmount(id) {
    setUserCollection(prev => prev.map(item => item.id === id ? { ...item, amount: item.amount + 1 } : item));
  }

  function decreaseAmount(id) {
    setUserCollection(prev => prev.map(item => item.id === id ? { ...item, amount: item.amount - 1 } : item));
  }

  function removeCardFromCollection(id) {
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
  return useContext(CollectionContext);
};