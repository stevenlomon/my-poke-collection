'use client'

import { useCollection } from '@/contexts/CollectionContext';
import CollectionItem from '@/components/CollectionItem';

export default function Home() {
  const { userCollection, increaseAmount, decreaseAmount, removeCardFromCollection } = useCollection();
  const collectionSize = userCollection.length;

  return (
    <div className={collectionSize === 0
      ? "mt-16 text-center text-lg font-medium text-slate-400"
      : "grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8 p-8"
    }>
      {collectionSize === 0 ? (
        <p>There are no cards in your collection! Add your first card now :)</p>
      ) : (
        userCollection.map(collectionItem =>
          <CollectionItem
            key={collectionItem.id}
            card={collectionItem}
            onIncrease={increaseAmount}
            onDecrease={decreaseAmount}
            onDelete={removeCardFromCollection}
          />)
      )}
    </div>
  )
};
