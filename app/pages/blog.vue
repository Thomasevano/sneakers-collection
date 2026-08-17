<script setup lang="ts">
useSeoMeta({
	title: "Journal — Sneakers Collection",
	description: "Notes on sneaker design, collecting, and wearing every pair.",
});

const stories = [
	{
		category: "Field notes",
		date: "12 Aug 2026",
		title: "The case for wearing the rare pair",
		excerpt:
			"A shoe changes when it becomes part of a life. That is the point, not the problem.",
	},
	{
		category: "Design study",
		date: "03 Aug 2026",
		title: "Why gum soles keep coming back",
		excerpt:
			"Quiet contrast, honest material, and a visual weight that grounds almost any upper.",
	},
	{
		category: "Rotation",
		date: "27 Jul 2026",
		title: "A three-pair travel rotation",
		excerpt:
			"One daily pair, one weather pair, one wildcard. Everything else stays home.",
	},
] as const;
</script>

<template>
	<section aria-labelledby="journal-heading" class="flex flex-col gap-10">
		<header class="max-w-3xl">
			<p class="mb-3 text-sm font-medium text-muted">From the notebook</p>
			<h1 id="journal-heading" class="text-balance text-5xl font-semibold sm:text-7xl">
				Journal
			</h1>
			<p class="mt-5 max-w-2xl text-pretty text-lg leading-8 text-muted">
				Short reads about materials, silhouettes, and building a collection that
				earns its space.
			</p>
		</header>

		<div class="grid gap-5 lg:grid-cols-3">
			<article
				v-for="story in stories"
				:key="story.title"
				class="flex flex-col gap-4 rounded-3xl border border-line bg-surface p-7 shadow-sm"
			>
					<div class="flex justify-between gap-4 text-xs text-muted">
						<p>{{ story.category }}</p>
						<time class="shrink-0 tabular-nums">{{ story.date }}</time>
					</div>
					<h2 class="text-balance text-2xl font-semibold">{{ story.title }}</h2>
					<p class="text-pretty leading-7 text-muted">{{ story.excerpt }}</p>
			</article>
		</div>
	</section>
</template>
