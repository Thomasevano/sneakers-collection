import type { MarketplacePrice, Sneaker } from "~~/app/types/sneaker";

const ALGOLIA_ENDPOINT =
	"https://2fwotdvm2o-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%20(lite)%203.25.1&x-algolia-application-id=2FWOTDVM2O&x-algolia-api-key=ac96de6fef0e02bb95d433d8d5c7038a";
const GOAT_INDEX = "product_variants_v2";
const FLIGHT_CLUB_INDEX = "product_variants_v2_flight_club";

interface AlgoliaHit {
	objectID?: string;
	id: number | string;
	product_template_id: number;
	name: string;
	brand_name: string;
	details: string;
	sku: string;
	slug: string;
	grid_picture_url?: string;
	main_picture_url?: string;
	release_date?: string;
	retail_price_cents_usd?: number;
	lowest_price_cents_usd?: number;
}

interface AlgoliaResponse {
	results: Array<{ hits: AlgoliaHit[] }>;
}

interface AlgoliaRequest {
	indexName: string;
	params: string;
}

function request(indexName: string, query: string, hitsPerPage: number): AlgoliaRequest {
	return {
		indexName,
		params: new URLSearchParams({
			distinct: "true",
			hitsPerPage: String(hitsPerPage),
			page: "0",
			query,
		}).toString(),
	};
}

async function queryAlgolia(requests: AlgoliaRequest[]) {
	const response = await fetch(ALGOLIA_ENDPOINT, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ requests }),
		signal: AbortSignal.timeout(12_000),
	});

	if (!response.ok) {
		throw new Error(`Sneaker provider returned ${response.status}`);
	}

	return (await response.json()) as AlgoliaResponse;
}

function cents(value: number | undefined) {
	return typeof value === "number" && value > 0 ? value / 100 : null;
}

function normalizeStyleId(value: string) {
	return value.replace(/[\s-]/g, "").toLowerCase();
}

async function withMarketplacePrices(hits: AlgoliaHit[]) {
	if (!hits.length) return [];

	const flightClub = await queryAlgolia(
		hits.map((hit) => request(FLIGHT_CLUB_INDEX, hit.sku, 1)),
	);

	return hits.map((hit, index) => {
		const flightClubHit = flightClub.results[index]?.hits.find(
			(result) => normalizeStyleId(result.sku) === normalizeStyleId(hit.sku),
		);
		const marketplaces: MarketplacePrice[] = [
			{
				name: "GOAT",
				price: cents(hit.lowest_price_cents_usd),
				url: `https://www.goat.com/sneakers/${hit.slug}`,
			},
			{
				name: "Flight Club",
				price: cents(flightClubHit?.lowest_price_cents_usd),
				url: flightClubHit
					? `https://www.flightclub.com/${flightClubHit.slug}`
					: `https://www.flightclub.com/catalogsearch/result/?q=${encodeURIComponent(hit.sku)}`,
			},
			{
				name: "StockX",
				price: null,
				url: `https://stockx.com/search?s=${encodeURIComponent(hit.sku)}`,
			},
		];

		return {
			id: String(hit.product_template_id || hit.id || hit.objectID),
			name: hit.name,
			brand: hit.brand_name,
			styleId: hit.sku,
			colorway: hit.details,
			imageUrl: hit.grid_picture_url || hit.main_picture_url || "",
			releaseDate: hit.release_date || null,
			retailPrice: cents(hit.retail_price_cents_usd),
			marketplaces,
		} satisfies Sneaker;
	});
}

export async function searchSneakers(query: string, limit: number) {
	const response = await queryAlgolia([request(GOAT_INDEX, query, limit)]);
	return withMarketplacePrices(response.results[0]?.hits.slice(0, limit) ?? []);
}

export async function getUpcomingReleases(limit: number) {
	const year = new Date().getUTCFullYear();
	const response = await queryAlgolia([
		request(GOAT_INDEX, String(year), 50),
		request(GOAT_INDEX, String(year + 1), 50),
	]);
	const now = Date.now();
	const unique = new Map<string, AlgoliaHit>();

	for (const result of response.results) {
		for (const hit of result.hits) {
			if (hit.release_date && Date.parse(hit.release_date) > now) {
				unique.set(normalizeStyleId(hit.sku), hit);
			}
		}
	}

	const releases = [...unique.values()]
		.sort((a, b) => Date.parse(a.release_date || "") - Date.parse(b.release_date || ""))
		.slice(0, limit);

	return withMarketplacePrices(releases);
}
