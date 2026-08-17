<script setup lang="ts">
useSeoMeta({
	title: "Sneakers Collection",
	description: "Make beautiful websites regardless of your design experience.",
});
</script>

<template>
	<section class="flex min-h-[65vh] flex-col items-center justify-center gap-7 text-center">
		<div class="max-w-3xl">
			<h1 class="text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
				Make beautiful websites regardless of your design experience.
			</h1>
			<p class="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-8 text-muted">
				Beautiful, fast, and modern Vue interfaces powered by Nuxt.
			</p>
		</div>
		<div class="flex flex-wrap justify-center gap-3">
			<a
				class="flex min-h-11 items-center rounded-full bg-primary px-5 font-medium text-primary-foreground"
				href="https://nuxt.com/docs"
				rel="noreferrer"
				target="_blank"
			>
				Documentation
			</a>
			<NuxtLink
				class="flex min-h-11 items-center rounded-full border border-line px-5 font-medium"
				to="/about"
			>
				About
			</NuxtLink>
		</div>
	</section>
</template>
