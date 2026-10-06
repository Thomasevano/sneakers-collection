<script setup lang="ts">
import { site } from "~/data/site";

const route = useRoute();
const query = ref("");
const searchError = ref("");
const isMenuOpen = ref(false);

function searchSneakers() {
	const value = query.value.trim();

	if (value.length < 2) {
		searchError.value = "Enter at least two characters or a complete style code.";
		return;
	}

	searchError.value = "";
	isMenuOpen.value = false;
	navigateTo({ path: "/search", query: { q: value } });
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
		<div class="mx-auto flex min-h-18 max-w-7xl items-center gap-6 px-5 sm:px-8">
			<NuxtLink
				aria-label="Sneakers Collection home"
				class="flex min-h-11 items-center gap-2"
				to="/"
			>
				<span
					class="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
				>
					<svg
						aria-hidden="true"
						class="size-6"
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						viewBox="0 0 24 24"
					>
						<path d="m15 10.42 4.8-5.07" />
						<path d="M19 18h3" />
						<path
							d="M9.5 22 21.414 9.415A2 2 0 0 0 21.2 6.4l-5.61-4.208A1 1 0 0 0 14 3v2a2 2 0 0 1-1.394 1.906L8.677 8.053A1 1 0 0 0 8 9c-.155 6.393-2.082 9-4 9a2 2 0 0 0 0 4h14"
						/>
					</svg>
				</span>
				<span class="font-semibold text-foreground">{{ site.name }}</span>
			</NuxtLink>

			<nav aria-label="Main navigation" class="hidden items-center gap-5 lg:flex">
				<NuxtLink
					v-for="item in site.navigation"
					:key="item.to"
					:aria-current="route.path === item.to ? 'page' : undefined"
					class="flex min-h-11 items-center text-sm text-muted hover:text-foreground"
					:class="{ 'font-semibold text-foreground': route.path === item.to }"
					:to="item.to"
				>
					{{ item.label }}
				</NuxtLink>
			</nav>

			<div class="ml-auto flex items-center gap-1">
				<form
					class="relative hidden xl:block"
					role="search"
					@submit.prevent="searchSneakers"
				>
					<label class="sr-only" for="desktop-search">Search sneakers</label>
					<input
						id="desktop-search"
						v-model="query"
						:aria-describedby="searchError ? 'desktop-search-error' : undefined"
						:aria-invalid="Boolean(searchError)"
						class="h-10 w-48 rounded-xl border border-line bg-canvas px-3 text-sm"
						placeholder="Search sneakers…"
						type="search"
						@input="searchError = ''"
					/>
					<p
						v-if="searchError"
						id="desktop-search-error"
						class="absolute right-0 top-12 w-64 rounded-xl border border-line bg-background p-3 text-xs text-red-700 shadow-lg dark:text-red-400"
					>
						{{ searchError }}
					</p>
				</form>

				<ThemeSwitch />
				<NuxtLink
					class="hidden min-h-11 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground sm:flex"
					to="/releases"
				>
					Upcoming releases
				</NuxtLink>
				<button
					:aria-expanded="isMenuOpen"
					:aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
					class="flex size-11 items-center justify-center rounded-xl lg:hidden"
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

		<div v-if="isMenuOpen" class="border-t border-line px-5 py-4 lg:hidden">
			<form class="mb-3" role="search" @submit.prevent="searchSneakers">
				<label class="sr-only" for="mobile-search">Search sneakers</label>
				<input
					id="mobile-search"
					v-model="query"
					:aria-describedby="searchError ? 'mobile-search-error' : undefined"
					:aria-invalid="Boolean(searchError)"
					class="h-11 w-full rounded-xl border border-line bg-canvas px-3"
					placeholder="Search sneakers…"
					type="search"
					@input="searchError = ''"
				/>
				<p
					v-if="searchError"
					id="mobile-search-error"
					class="mt-2 text-sm text-red-700 dark:text-red-400"
				>
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
