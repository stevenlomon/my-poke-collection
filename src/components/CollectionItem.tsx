'use client'

import { type CollectionItem as CardDataType } from "@/lib/types"
import Link from "next/link"

// Define the props the component expects, reusing our context types
interface CollectionItemProps {
  card: CardDataType;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onDelete: (id: string) => void;
}

const CollectionItem = ({ card, onIncrease, onDecrease, onDelete }: CollectionItemProps) => {
  return (
    // Re-used from the Vite React SPA. The Link will need to be updated
    <div className={`collection-item ${card.isNew ? 'animate-in' : ''}`}>
      {/* <Link href={`/card/${card.id}`} state={{ cardData: card }} ><CardImage cardId={card.id} cardName={card.card_info.name} /></Link> */}

      <div className="inventory-controls">
        {/* The onClicks need to be arrow functions since we're passing arguments to keep them as function references! 🚀 */}
        <button className="amount-btn" disabled={card.amount === 1} onClick={() => onDecrease(card.id)}>-</button>
        <span className="amount-display">Amount: {card.amount}</span>
        <button className="amount-btn" onClick={() => onIncrease(card.id)}>+</button>
      </div>
      <button className="remove-btn" onClick={() => onDelete(card.id)}>Remove from collection</button>
    </div>
  )
}

export default CollectionItem