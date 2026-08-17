<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

function toggleTheme() {
	colorMode.preference = isDark.value ? "light" : "dark";
}
</script>

<template>
	<ClientOnly>
		<button
			:aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
			class="flex size-11 items-center justify-center rounded-xl text-muted hover:text-foreground"
			type="button"
			@click="toggleTheme"
		>
			<svg
				v-if="isDark"
				aria-hidden="true"
				class="size-5"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"
					stroke="currentColor"
					stroke-linejoin="round"
					stroke-width="2"
				/>
			</svg>
			<svg
				v-else
				aria-hidden="true"
				class="size-5"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2" />
				<path
					d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-width="2"
				/>
			</svg>
		</button>
		<template #fallback>
			<span aria-hidden="true" class="block size-11" />
		</template>
	</ClientOnly>
</template>
