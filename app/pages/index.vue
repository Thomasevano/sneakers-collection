<script setup lang="ts">
import type { ReleaseResponse } from "~/types/sneaker";
import { site } from "~/data/site";

useSeoMeta({
	title: site.name,
	description: site.description,
});

const query = ref("");
const searchError = ref("");
const { data: releases } = await useFetch<ReleaseResponse>("/api/releases", {
	query: { limit: 3 },
});
const nextRelease = computed(() => releases.value?.results[0]);

function submitSearch() {
	const value = query.value.trim();
	if (value.length < 2) {
		searchError.value = "Enter at least two characters or a complete style code.";
		return;
	}

	searchError.value = "";
	navigateTo({ path: "/search", query: { q: value } });
}
</script>

<template>
	<div class="flex flex-col gap-24 lg:gap-32">
		<section class="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
			<div class="flex flex-col items-start gap-6">
				<p class="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
					Live sneaker catalog
				</p>
				<h1 class="text-balance text-5xl font-semibold leading-none sm:text-6xl lg:text-7xl">
					Find the next pair before it drops.
				</h1>
				<p class="max-w-2xl text-pretty text-lg leading-8 text-muted">
					Search sneakers, follow upcoming releases, and compare current resale asks
					across the marketplaces that matter.
				</p>
				<form class="w-full max-w-xl" role="search" @submit.prevent="submitSearch">
					<label class="sr-only" for="home-search">Search sneakers</label>
					<div class="flex flex-col gap-3 sm:flex-row">
						<input
							id="home-search"
							v-model="query"
							:aria-describedby="searchError ? 'home-search-error' : undefined"
							:aria-invalid="Boolean(searchError)"
							class="h-12 min-w-0 flex-1 rounded-xl border border-line bg-surface px-4 text-base"
							placeholder="Jordan 4 Bred or FV5029-006"
							type="search"
							@input="searchError = ''"
						/>
						<button
							class="min-h-12 rounded-xl bg-primary px-6 font-medium text-primary-foreground"
							type="submit"
						>
							Search sneakers
						</button>
					</div>
					<p v-if="searchError" id="home-search-error" class="mt-2 text-sm text-red-700 dark:text-red-400">
						{{ searchError }}
					</p>
				</form>
				<NuxtLink class="font-medium" to="/releases">Browse all upcoming releases →</NuxtLink>
			</div>

			<div class="overflow-hidden rounded-4xl border border-line bg-canvas p-6 shadow-lg">
				<div v-if="nextRelease" class="flex aspect-[4/5] flex-col">
					<img
						:alt="`${nextRelease.name} in ${nextRelease.colorway}`"
						class="min-h-0 flex-1 object-contain"
						decoding="async"
						fetchpriority="high"
						height="1200"
						:src="nextRelease.imageUrl"
						width="1200"
					/>
					<div class="border-t border-line pt-5">
						<p class="text-xs text-muted">Next confirmed release</p>
						<p class="mt-1 text-balance text-xl font-semibold">{{ nextRelease.name }}</p>
					</div>
				</div>
				<div v-else class="flex aspect-[4/5] items-center justify-center text-center text-muted">
					Live release data is temporarily unavailable.
				</div>
			</div>
		</section>

		<section v-if="releases?.results.length" aria-labelledby="featured-heading" class="flex flex-col gap-8">
			<div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
				<div>
					<p class="mb-2 text-sm font-medium text-muted">Release calendar</p>
					<h2 id="featured-heading" class="text-balance text-3xl font-semibold sm:text-4xl">
						Dropping next
					</h2>
				</div>
				<NuxtLink class="font-medium" to="/releases">View release calendar →</NuxtLink>
			</div>
			<div class="grid gap-5 md:grid-cols-3">
				<SneakerCard
					v-for="(sneaker, index) in releases.results"
					:key="sneaker.id"
					:priority="index < 3"
					:sneaker="sneaker"
				/>
			</div>
		</section>

		<section
			class="grid gap-8 rounded-4xl bg-foreground p-8 text-background sm:p-12 lg:grid-cols-[1fr_auto] lg:items-end"
		>
			<div class="max-w-2xl">
				<p class="mb-4 text-sm font-medium">Build your index</p>
				<h2 class="text-balance text-3xl font-semibold sm:text-4xl">
					Collections, favorites, and wanted lists are next.
				</h2>
				<p class="mt-4 max-w-xl text-pretty leading-7 text-background/70">
					Search real releases and marketplace listings today. Soon, you'll be able to
					save any pair to your collection, favorites, or wanted list.
				</p>
			</div>
			<NuxtLink
				class="flex min-h-11 items-center justify-center rounded-full bg-primary px-5 font-medium text-primary-foreground"
				to="/search"
			>
				Search the catalog
			</NuxtLink>
		</section>
	</div>
</template>
