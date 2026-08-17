export interface MarketplacePrice {
	name: "GOAT" | "Flight Club" | "StockX";
	price: number | null;
	url: string;
}

export interface Sneaker {
	id: string;
	name: string;
	brand: string;
	styleId: string;
	colorway: string;
	imageUrl: string;
	releaseDate: string | null;
	retailPrice: number | null;
	marketplaces: MarketplacePrice[];
}

export interface SneakerSearchResponse {
	query: string;
	results: Sneaker[];
}

export interface ReleaseResponse {
	results: Sneaker[];
}
