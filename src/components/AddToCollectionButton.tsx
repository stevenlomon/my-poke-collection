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
    <button
      className='w-full max-w-62.5 cursor-pointer rounded-lg bg-violet-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-md disabled:cursor-not-allowed disabled:border disabled:border-slate-700 disabled:bg-slate-900 disabled:text-slate-500 disabled:hover:translate-y-0 disabled:hover:shadow-sm'
      disabled={isAlreadyOwned} onClick={() => {
        addToCollection(card); // No `onAdd` prop anymore, we can use `addToCollection` straight from our Context instead
        router.push('/'); // Direct equivalent of `navigate('/');`
      }}
    >
      {!isAlreadyOwned ? 'Add to Collection!' : 'Already in Collection'}
    </button>
  )
};