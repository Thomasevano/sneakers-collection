<template>
	<div class="flex min-h-dvh flex-col bg-background text-foreground">
		<a
			class="fixed left-4 top-4 z-50 -translate-y-24 rounded-xl bg-primary px-4 py-2 font-medium text-primary-foreground focus:translate-y-0"
			href="#main-content"
		>
			Skip to content
		</a>
		<AppHeader />
		<main id="main-content" class="mx-auto w-full max-w-7xl flex-1 px-5 py-12 sm:px-8">
			<slot />
		</main>
		<footer class="border-t border-line px-5 py-6 text-center text-sm text-muted">
			Built with Nuxt.
		</footer>
	</div>
</template>
