<script setup lang="ts">
useSeoMeta({
	title: "About — Sneakers Collection",
	description: "Why Sneakers Collection documents sneakers as objects meant to be worn.",
});

const principles = [
	{
		number: "01",
		title: "Wear everything",
		body: "Patina is evidence. A crease says more than a deadstock label ever could.",
	},
	{
		number: "02",
		title: "Keep the context",
		body: "Record the release, then add the trip, the concert, and the ordinary Tuesday.",
	},
	{
		number: "03",
		title: "Choose slowly",
		body: "A smaller rotation with a point of view beats a wall built from alerts.",
	},
] as const;
</script>

<template>
	<div class="flex flex-col gap-16 lg:gap-24">
		<section class="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
			<div>
				<p class="mb-3 text-sm font-medium text-muted">About the archive</p>
				<h1 class="text-balance text-5xl font-semibold leading-none sm:text-7xl">
					A collection should remember more than receipts.
				</h1>
			</div>
			<p class="max-w-2xl text-pretty text-lg leading-8 text-muted">
				Sneakers Collection is a personal record of design, wear, and memory. It
				exists to make the collection easier to enjoy—not harder to touch.
			</p>
		</section>

		<section aria-labelledby="principles-heading" class="grid gap-5 md:grid-cols-3">
			<h2 id="principles-heading" class="sr-only">Principles</h2>
			<article
				v-for="principle in principles"
				:key="principle.number"
				class="rounded-3xl border border-line bg-surface p-7 shadow-sm"
			>
				<p class="mb-10 text-sm font-medium tabular-nums text-muted">
					{{ principle.number }}
				</p>
				<h3 class="text-balance text-2xl font-semibold">{{ principle.title }}</h3>
				<p class="mt-3 text-pretty leading-7 text-muted">{{ principle.body }}</p>
			</article>
		</section>

		<section class="rounded-4xl border border-line bg-surface p-8 sm:p-12">
			<p class="max-w-4xl text-balance text-3xl font-semibold leading-tight sm:text-5xl">
				“The best pair in the collection is the one that comes home different.”
			</p>
		</section>
	</div>
</template>
