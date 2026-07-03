import Card from './Card';
import { type PokemonCard } from '@/lib/types';

// Receives a mapping of individual PokemonCards from the search page 
// `{searchResults.map((result: PokemonCard) => (`
// and passes them along to the Card component. The shapes match perfectly at every single step
interface SearchResultItemProps {
  resultItem: PokemonCard;
}

export default function SearchResultItem({ resultItem }: SearchResultItemProps) {
  return (
    <li className="flex h-full box-border flex-col items-center rounded-2xl bg-slate-800 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1.5 hover:shadow-lg">
      < Card card={resultItem} />
    </li>
  )
};