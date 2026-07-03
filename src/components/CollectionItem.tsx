'use client'

import { type CollectionItem as CardDataType } from '@/lib/types';
import Link from 'next/link';
import CardImage from './CardImage';

// Define the props the component expects, reusing our context type
interface CollectionItemProps {
  card: CardDataType;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function CollectionItem({ card, onIncrease, onDecrease, onDelete }: CollectionItemProps) {
  return (
    // Re-used from the Vite React SPA. The Link is the only thing updated and is now Next native
    <div className={`flex flex-col items-center gap-4 rounded-2xl bg-slate-800 p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${card.isNew ? 'relative z-10 animate-slam-in' : ''}`}>
      {/* This.. */}
      {/* <Link to={`/card/${card.id}`} state={{ cardData: card }} ><CardImage cardId={card.id} cardName={card.card_info.name} /></Link> */}
      {/* ..becomes this! With a new fallback on the card name. `state` is not a property for Next.js Link and the "Backpack strat" from the original version is taken care of entirely by Next; Next.js *is* the backpack now haha! */}
      <Link href={`/card/${card.id}`} className="block w-full text-center">
        <CardImage cardId={card.id} cardName={card.card_info.name || "Pokemon Card"} />
      </Link>

      {/* The Math Pill */}
      <div className="flex items-center gap-4 rounded-full bg-slate-900 px-3 py-1.5">
        {/* The onClicks need to be arrow functions since we're passing arguments to keep them as function references! 🚀 */}
        <button
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-slate-800 font-semibold text-slate-50 shadow-sm transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-slate-800"
          disabled={card.amount === 1}
          onClick={() => onDecrease(card.id)}
        >
          -
        </button>
        <span className="min-w-6 select-none text-center text-sm font-semibold text-slate-50">
          Amount: {card.amount}
        </span>
        <button
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-slate-800 font-semibold text-slate-50 shadow-sm transition-colors hover:bg-violet-500"
          onClick={() => onIncrease(card.id)}
        >
          +
        </button>
      </div>

      {/* The Remove Button */}
      <button
        className="cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium text-red-400 opacity-70 transition-all hover:bg-red-400/10 hover:opacity-100"
        onClick={() => onDelete(card.id)}
      >
        Remove from collection
      </button>
    </div>
  )
};
