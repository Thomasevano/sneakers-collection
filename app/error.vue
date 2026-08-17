<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();

function retry() {
	clearError({ redirect: "/" });
}
</script>

<template>
	<NuxtLayout>
		<section class="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-start justify-center gap-5 px-5 sm:px-8">
			<p class="text-sm font-medium text-primary">Archive unavailable</p>
			<h1 class="text-balance text-4xl font-semibold tracking-tight">
				{{ error.statusCode === 404 ? "That page does not exist." : "That page did not load." }}
			</h1>
			<p class="max-w-lg text-pretty leading-7 text-muted">
				The collection is still here. Return home and try again.
			</p>
			<button
				class="min-h-11 rounded-full bg-primary px-5 font-medium text-primary-foreground"
				type="button"
				@click="retry"
			>
				Return home
			</button>
		</section>
	</NuxtLayout>
</template>
