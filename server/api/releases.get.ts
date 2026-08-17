import type { ReleaseResponse } from "~~/app/types/sneaker";
import { getUpcomingReleases } from "../utils/sneaks";

export default defineEventHandler(async (event): Promise<ReleaseResponse> => {
	const requestedLimit = Number(getQuery(event).limit) || 12;
	const limit = Math.min(Math.max(requestedLimit, 1), 24);

	try {
		const results = await getUpcomingReleases(limit);
		setResponseHeader(event, "cache-control", "public, max-age=900, stale-while-revalidate=3600");
		return { results };
	} catch {
		throw createError({
			statusCode: 502,
			statusMessage: "Upcoming releases are temporarily unavailable.",
		});
	}
});
