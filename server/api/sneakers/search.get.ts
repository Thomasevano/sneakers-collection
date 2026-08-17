import type { SneakerSearchResponse } from "~~/app/types/sneaker";
import { searchSneakers } from "../../utils/sneaks";

export default defineEventHandler(async (event): Promise<SneakerSearchResponse> => {
	const { limit: rawLimit, q: rawQuery } = getQuery(event);
	const query = typeof rawQuery === "string" ? rawQuery.trim() : "";
	const requestedLimit = Number(rawLimit) || 12;
	const limit = Math.min(Math.max(requestedLimit, 1), 24);

	if (query.length < 2 || query.length > 80) {
		throw createError({
			statusCode: 400,
			statusMessage: "Search must contain between 2 and 80 characters.",
		});
	}

	try {
		const results = await searchSneakers(query, limit);
		setResponseHeader(event, "cache-control", "public, max-age=60, stale-while-revalidate=300");
		return { query, results };
	} catch {
		throw createError({
			statusCode: 502,
			statusMessage: "Sneaker search is temporarily unavailable.",
		});
	}
});
