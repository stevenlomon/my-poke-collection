// The shape of the data we use coming directly from the PokeWallet API. Can easily be expanded
export interface PokemonCard {
  id: string;
  // We mirror the nested structure of the API response
  card_info: {
    id: string;
    set_name?: string; // The question mark makes this optional
  };
}

// The shape of the data strictly inside our Context state
export interface CollectionItem extends PokemonCard {
  amount: number;
  isNew: boolean;
}