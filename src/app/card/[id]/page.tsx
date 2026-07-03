// Server component that renders *everything except the AddToCollection button*, which will be a client component that we import onto this page
import { getCardById } from '@/lib/api';
import Card from '@/components/Card';
import AddToCollectionButton from '@/components/AddToCollectionButton'

export default async function DetailedCardPage({ params }: { params: Promise<{ id: string }> }) { // Async server component! The `params` of the page are Promises
  const { id } = await params; // Direct equivalent of our original `const { id } = useParams();`
  // `const location = useLocation(); // This is what allows us to use the Backpack Strat haha!` Nothing like this is needed here in Next.js!
  // `let navigate = useNavigate(); // To allow for automatic navigation to Collection page upon clicking "Add to collection"` And this belongs in the client component we import onto this page!

  // `card` isn't set using `useState` and a Backpack, it's a native server-side fetch using our own api!
  const card = await getCardById(id);
  // loading and error needs no state either, they will be taken care of by the page specific Error and Loading components!

  return (
    <div className="detailed-view-container">
      {/* LEFT COLUMN: Card & Main Action */}
      <div className="detailed-card-visual">
        < Card card={card} />

        {/* Our client-side AddToCollectionButton that has the only Browser interactivity on this page! */}
        <AddToCollectionButton card={card} />
      </div>

      {/* RIGHT COLUMN: Pricing Data. Remains completely untouched from the original */}
      <div className="market-analysis">
        <div>
          <h3>Want to add it to your real collection?</h3>
          <p className="market-stat">Current TCGPlayer market price: <span>${card.tcgplayer?.prices?.[0]?.market_price || 'N/A'}</span></p>
          {card.tcgplayer?.url
            ? <a className="external-link-btn" href={card.tcgplayer.url} target="_blank" rel="noopener noreferrer">Buy on tcgplayer.com</a>
            : <p>TCGPlayer link not available</p>}
          <p className="market-stat">Average 30 day price on CardMarket.com: <span>${card.cardmarket?.prices?.[0]?.avg30 || 'N/A'}</span></p>
          {card.cardmarket?.product_url
            ? <a className="external-link-btn" href={card.cardmarket.product_url} target="_blank" rel="noopener noreferrer">See card at cardmarket.com</a>
            : <p>CardMarket link not available</p>}
        </div>
      </div>
    </div>
  )
};