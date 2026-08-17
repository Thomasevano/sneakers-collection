<script setup lang="ts">
import { site } from "~/data/site";

const route = useRoute();
const query = ref("");
const searchError = ref("");
const isMenuOpen = ref(false);

function searchPages() {
	const value = query.value.trim().toLowerCase();
	const match = site.navigation.find((item) =>
		item.label.toLowerCase().includes(value),
	);

	if (!value || !match) {
		searchError.value = "Enter a page name, such as Docs or About.";
		return;
	}

	searchError.value = "";
	isMenuOpen.value = false;
	navigateTo(match.to);
}

watch(
	() => route.path,
	() => {
		isMenuOpen.value = false;
	},
);
</script>

<template>
	<header class="sticky top-0 z-40 border-b border-line bg-background/95">
		<div class="mx-auto flex min-h-16 max-w-7xl items-center gap-6 px-5 sm:px-8">
		<NuxtLink class="flex min-h-11 items-center gap-2 font-bold" to="/">
			<svg aria-hidden="true" class="size-8" viewBox="0 0 32 32">
				<path
					clip-rule="evenodd"
					d="M17.65 10.13 15.88 7.03 7.03 22.55h3.5l7.12-12.42Zm2.23 3.92-1.77 3.15 1.28 2.25h-2.55l-1.74 3.1h9.63l-4.85-8.5Z"
					fill="currentColor"
					fill-rule="evenodd"
				/>
			</svg>
			<span>{{ site.name }}</span>
		</NuxtLink>

		<nav aria-label="Main navigation" class="hidden items-center gap-5 md:flex">
			<NuxtLink
				v-for="item in site.navigation"
				:key="item.to"
				:aria-current="route.path === item.to ? 'page' : undefined"
				class="flex min-h-11 items-center text-sm text-muted hover:text-foreground"
				:class="{ 'font-medium text-primary': route.path === item.to }"
				:to="item.to"
			>
				{{ item.label }}
			</NuxtLink>
		</nav>

		<div class="ml-auto flex items-center gap-1">
			<form class="relative hidden lg:block" role="search" @submit.prevent="searchPages">
				<label class="sr-only" for="desktop-search">Search pages</label>
				<input
					id="desktop-search"
					v-model="query"
					:aria-describedby="searchError ? 'desktop-search-error' : undefined"
					:aria-invalid="Boolean(searchError)"
					class="h-10 w-48 rounded-xl border border-line bg-surface px-3 text-sm"
					placeholder="Search pages…"
					type="search"
					@input="searchError = ''"
				/>
				<p
					v-if="searchError"
					id="desktop-search-error"
					class="absolute right-0 top-12 w-64 rounded-xl border border-line bg-background p-3 text-xs text-red-600 shadow-lg"
				>
					{{ searchError }}
				</p>
			</form>

			<ThemeSwitch />
			<button
				:aria-expanded="isMenuOpen"
				:aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
				class="flex size-11 items-center justify-center rounded-xl md:hidden"
				type="button"
				@click="isMenuOpen = !isMenuOpen"
			>
				<svg aria-hidden="true" class="size-5" fill="none" viewBox="0 0 24 24">
					<path
						:d="isMenuOpen ? 'M6 6l12 12M18 6 6 18' : 'M4 7h16M4 12h16M4 17h16'"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-width="2"
					/>
				</svg>
			</button>
		</div>
		</div>

		<div v-if="isMenuOpen" class="border-t border-line px-5 py-4 md:hidden">
			<form class="mb-3" role="search" @submit.prevent="searchPages">
				<label class="sr-only" for="mobile-search">Search pages</label>
				<input
					id="mobile-search"
					v-model="query"
					:aria-describedby="searchError ? 'mobile-search-error' : undefined"
					:aria-invalid="Boolean(searchError)"
					class="h-11 w-full rounded-xl border border-line bg-surface px-3"
					placeholder="Search pages…"
					type="search"
					@input="searchError = ''"
				/>
				<p v-if="searchError" id="mobile-search-error" class="mt-2 text-sm text-red-600">
					{{ searchError }}
				</p>
			</form>
			<nav aria-label="Mobile navigation" class="flex flex-col">
				<NuxtLink
					v-for="item in site.navigation"
					:key="item.to"
					:aria-current="route.path === item.to ? 'page' : undefined"
					class="flex min-h-11 items-center rounded-xl px-3"
					:class="{ 'bg-primary text-primary-foreground': route.path === item.to }"
					:to="item.to"
				>
					{{ item.label }}
				</NuxtLink>
			</nav>
		</div>
	</header>
</template>
