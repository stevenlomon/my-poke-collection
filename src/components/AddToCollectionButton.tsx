'use client' // The only interactive part of the Detailed View Page!
import { PokemonCard } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface AddToCollectionButtonProps {
  card: PokemonCard;
}

export default function AddToCollectionButton({ card }: AddToCollectionButtonProps) {
  return (
    <div>AddToCollectionButton</div>
  )
};