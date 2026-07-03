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
    <div className="mx-auto my-8 flex w-full max-w-4xl flex-col gap-12 rounded-2xl bg-slate-800 p-8 shadow-md md:flex-row md:items-start">
      {/* LEFT COLUMN: Card & Main Action */}
      <div className="flex flex-1 flex-col items-center gap-6">
        < Card card={card} />

        {/* Our client-side AddToCollectionButton that has the only Browser interactivity on this page! */}
        <AddToCollectionButton card={card} />
      </div>

      {/* RIGHT COLUMN: Pricing Data. Remains completely untouched from the original */}
      <div className="flex-[1.5] rounded-xl border border-slate-700 bg-slate-900 p-8">
        <div className="w-full">
          <h3 className="mt-0 mb-6 border-b-2 border-slate-700 pb-3 text-xl font-bold text-slate-50">
            Want to add it to your real collection?
          </h3>

          <p className="mb-4 flex items-center justify-between text-base text-slate-400">
            Current TCGPlayer market price:
            <span className="text-xl font-bold text-emerald-400">
              ${card.tcgplayer?.prices?.[0]?.market_price || 'N/A'}
            </span>
          </p>
          {card.tcgplayer?.url
            ?
            <a className="mb-8 block rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-center text-[0.95rem] font-semibold text-slate-50 transition-all hover:-translate-y-0.5 hover:border-slate-500 hover:shadow-sm" href={card.tcgplayer.url} target="_blank" rel="noopener noreferrer">
              Buy on tcgplayer.com
            </a>
            :
            <p className="mb-8 text-sm text-slate-500 italic">
              TCGPlayer link not available
            </p>
          }

          <p className="mb-4 flex items-center justify-between text-base text-slate-400">
            Average 30 day price on CardMarket.com:
            <span className="text-xl font-bold text-emerald-400">
              ${card.cardmarket?.prices?.[0]?.avg30 || 'N/A'}
            </span>
          </p>
          {card.cardmarket?.product_url
            ?
            <a className="block rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-center text-[0.95rem] font-semibold text-slate-50 transition-all hover:-translate-y-0.5 hover:border-slate-500 hover:shadow-sm" href={card.cardmarket.product_url} target="_blank" rel="noopener noreferrer">
              See card at cardmarket.com
            </a>
            :
            <p className="text-sm text-slate-500 italic">
              CardMarket link not available
            </p>
          }
        </div>
      </div>
    </div>
  )
};