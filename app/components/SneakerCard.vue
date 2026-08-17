<script setup lang="ts">
import type { Sneaker } from "~/types/sneaker";

const props = withDefaults(
	defineProps<{
		sneaker: Sneaker;
		priority?: boolean;
	}>(),
	{ priority: false },
);

const currency = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 0,
});
const releaseDate = computed(() =>
	props.sneaker.releaseDate
		? new Intl.DateTimeFormat("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric",
			}).format(new Date(props.sneaker.releaseDate))
		: null,
);
</script>

<template>
	<article class="overflow-hidden rounded-3xl border border-line bg-surface shadow-sm">
		<div class="aspect-[4/3] overflow-hidden bg-canvas p-4">
			<img
				v-if="sneaker.imageUrl"
				:alt="`${sneaker.name} in ${sneaker.colorway}`"
				class="size-full object-contain"
				decoding="async"
				:fetchpriority="priority ? 'high' : 'auto'"
				height="900"
				:loading="priority ? 'eager' : 'lazy'"
				:src="sneaker.imageUrl"
				width="1200"
			/>
			<div v-else class="flex size-full items-center justify-center text-sm text-muted">
				Image unavailable
			</div>
		</div>
		<div class="flex flex-col gap-5 p-5">
			<div class="min-w-0">
				<div class="mb-1 flex justify-between gap-4 text-xs text-muted">
					<p>{{ sneaker.brand }}</p>
					<p class="shrink-0 tabular-nums">{{ sneaker.styleId }}</p>
				</div>
				<h2 class="text-balance text-lg font-semibold text-foreground">
					{{ sneaker.name }}
				</h2>
				<p class="mt-1 truncate text-sm text-muted">{{ sneaker.colorway }}</p>
				<p v-if="releaseDate" class="mt-2 text-sm text-muted">
					Releases {{ releaseDate }}
				</p>
			</div>

			<ul class="grid grid-cols-3 gap-2 border-t border-line pt-4">
				<li v-for="marketplace in sneaker.marketplaces" :key="marketplace.name">
					<a
						class="flex min-h-11 flex-col justify-center rounded-xl px-2 hover:bg-canvas focus-visible:bg-canvas"
						:href="marketplace.url"
						rel="noreferrer noopener"
						target="_blank"
					>
						<span class="truncate text-xs text-muted">{{ marketplace.name }}</span>
						<span class="font-medium tabular-nums">
							{{ marketplace.price ? currency.format(marketplace.price) : "View" }}
						</span>
					</a>
				</li>
			</ul>
		</div>
	</article>
</template>
