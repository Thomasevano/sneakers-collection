<script setup lang="ts">
import type { ReleaseResponse } from "~/types/sneaker";

useSeoMeta({
	title: "Upcoming releases — Sneakers Collection",
	description: "Browse confirmed upcoming sneaker releases and current resale listings.",
});

const { data, error, status, refresh } = await useFetch<ReleaseResponse>("/api/releases", {
	query: { limit: 12 },
});
</script>

<template>
	<section aria-labelledby="releases-heading" class="flex flex-col gap-10">
		<header class="max-w-3xl">
			<p class="mb-3 text-sm font-medium text-muted">Release calendar</p>
			<h1 id="releases-heading" class="text-balance text-5xl font-semibold sm:text-7xl">
				Upcoming releases
			</h1>
			<p class="mt-5 max-w-2xl text-pretty text-lg leading-8 text-muted">
				Confirmed pairs ordered by release date, with live marketplace asks when
				pre-release listings are available.
			</p>
		</header>

		<p v-if="status === 'pending'" class="rounded-3xl border border-line bg-surface p-8 text-muted">
			Loading upcoming releases…
		</p>
		<div v-else-if="error" class="rounded-3xl border border-line bg-surface p-8">
			<h2 class="text-xl font-semibold">Release data is temporarily unavailable</h2>
			<p class="mt-2 text-muted">The live catalog did not respond.</p>
			<button
				class="mt-5 min-h-11 rounded-xl bg-primary px-5 font-medium text-primary-foreground"
				type="button"
				@click="refresh()"
			>
				Try again
			</button>
		</div>
		<div v-else-if="data?.results.length" class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			<SneakerCard
				v-for="(sneaker, index) in data.results"
				:key="sneaker.id"
				:priority="index < 3"
				:sneaker="sneaker"
			/>
		</div>
		<div v-else class="rounded-3xl border border-line bg-surface p-8">
			<h2 class="text-xl font-semibold">No confirmed releases yet</h2>
			<p class="mt-2 text-muted">Check again as brands publish the next calendar.</p>
		</div>
	</section>
</template>
