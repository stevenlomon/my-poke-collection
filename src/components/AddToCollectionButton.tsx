'use client' // The only interactive part of the Detailed View Page!
import { PokemonCard } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useCollection } from '@/contexts/CollectionContext';

interface AddToCollectionButtonProps {
  card: PokemonCard;
}

export default function AddToCollectionButton({ card }: AddToCollectionButtonProps) {
  const { userCollection, addToCollection } = useCollection();
  const isAlreadyOwned = userCollection.some(c => c.id === card?.id); // `c` gets its type via Type Inference here; the type is inferred from the userCollection array! `.some()` returns true if any item in the array matches the condition
  const router = useRouter();

  return (
    <button className='add-to-collection-button' disabled={isAlreadyOwned} onClick={() => {
      addToCollection(card); // No `onAdd` prop anymore, we can use `addToCollection` straight from our Context instead
      router.push('/'); // Direct equivalent of `navigate('/');`
    }}>
      {!isAlreadyOwned ? 'Add to Collection!' : 'Already in Collection'}
    </button>
  )
};