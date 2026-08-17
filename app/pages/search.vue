<script setup lang="ts">
import type { SneakerSearchResponse } from "~/types/sneaker";

useSeoMeta({
	title: "Sneaker search — Sneakers Collection",
	description: "Search sneakers by name or style code and compare live resale prices.",
});

const route = useRoute();
const input = ref(typeof route.query.q === "string" ? route.query.q : "");
const searchTerm = computed(() =>
	typeof route.query.q === "string" ? route.query.q.trim() : "",
);
const validationError = ref("");
const { data, error, status } = await useAsyncData(
	"sneaker-search",
	() =>
		searchTerm.value
			? $fetch<SneakerSearchResponse>("/api/sneakers/search", {
					query: { q: searchTerm.value, limit: 12 },
				})
			: Promise.resolve(null),
	{ watch: [searchTerm] },
);

function submitSearch() {
	const query = input.value.trim();
	if (query.length < 2) {
		validationError.value = "Enter at least two characters or a complete style code.";
		return;
	}

	validationError.value = "";
	navigateTo({ path: "/search", query: { q: query } });
}
</script>

<template>
	<section aria-labelledby="search-heading" class="flex flex-col gap-10">
		<header class="max-w-3xl">
			<p class="mb-3 text-sm font-medium text-muted">Live catalog</p>
			<h1 id="search-heading" class="text-balance text-5xl font-semibold sm:text-7xl">
				Find any sneaker
			</h1>
			<p class="mt-5 max-w-2xl text-pretty text-lg leading-8 text-muted">
				Search by model, colorway, or style code. Compare current asks from GOAT and
				Flight Club, with a direct StockX lookup.
			</p>
		</header>

		<form class="max-w-3xl" role="search" @submit.prevent="submitSearch">
			<label class="mb-2 block font-medium" for="sneaker-search">Sneaker or style code</label>
			<div class="flex flex-col gap-3 sm:flex-row">
				<input
					id="sneaker-search"
					v-model="input"
					:aria-describedby="validationError ? 'search-error' : 'search-help'"
					:aria-invalid="Boolean(validationError)"
					class="h-12 min-w-0 flex-1 rounded-xl border border-line bg-surface px-4 text-base"
					name="q"
					placeholder="Jordan 4 Bred or FV5029-006"
					type="search"
					@input="validationError = ''"
				/>
				<button
					class="min-h-12 rounded-xl bg-primary px-6 font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
					:disabled="status === 'pending'"
					type="submit"
				>
					{{ status === "pending" ? "Searching…" : "Search sneakers" }}
				</button>
			</div>
			<p v-if="validationError" id="search-error" class="mt-2 text-sm text-red-700 dark:text-red-400">
				{{ validationError }}
			</p>
			<p v-else id="search-help" class="mt-2 text-sm text-muted">
				Prices are live marketplace asks and can change at any time.
			</p>
		</form>

		<div aria-live="polite">
			<p v-if="status === 'pending'" class="rounded-3xl border border-line bg-surface p-8 text-muted">
				Searching live marketplaces…
			</p>
			<div v-else-if="error" class="rounded-3xl border border-line bg-surface p-8">
				<h2 class="text-xl font-semibold">Search is temporarily unavailable</h2>
				<p class="mt-2 text-muted">The resale providers did not respond. Try again shortly.</p>
			</div>
			<div v-else-if="data?.results.length" class="flex flex-col gap-6">
				<div class="flex items-end justify-between gap-4">
					<h2 class="text-2xl font-semibold">Results for “{{ data.query }}”</h2>
					<p class="text-sm tabular-nums text-muted">{{ data.results.length }} pairs</p>
				</div>
				<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					<SneakerCard
						v-for="(sneaker, index) in data.results"
						:key="sneaker.id"
						:priority="index < 3"
						:sneaker="sneaker"
					/>
				</div>
			</div>
			<div v-else-if="searchTerm" class="rounded-3xl border border-line bg-surface p-8">
				<h2 class="text-xl font-semibold">No sneakers found</h2>
				<p class="mt-2 text-muted">Try a shorter model name or the style code from the box label.</p>
			</div>
		</div>
	</section>
</template>
