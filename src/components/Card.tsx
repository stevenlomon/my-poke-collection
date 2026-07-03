import CardImage from './CardImage';
import { type PokemonCard } from '@/lib/types';

interface CardProps {
  card: PokemonCard;
}

export default function Card({ card }: CardProps) {
  return (
    // Completely unchanged from the Vite React SPA version with exception of the fallback improvement
    <div className="flex flex-col items-center text-center gap-1">
      <h2 className="m-0 text-lg font-bold text-slate-50">{card.card_info?.name}</h2>
      <h3 className="m-0 mb-4 text-sm font-medium text-slate-400">Set: {card.card_info?.set_name}</h3>

      <CardImage cardId={card.id} cardName={card.card_info.name} />
    </div>
  )
};