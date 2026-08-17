import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	compatibilityDate: "2026-08-17",
	css: ["~/assets/css/main.css"],
	devtools: { enabled: false },
	modules: ["@nuxtjs/color-mode"],
	colorMode: {
		classSuffix: "",
		preference: "system",
		fallback: "light",
		storageKey: "sneakers-collection-color-mode",
	},
	vite: {
		plugins: [tailwindcss()],
	},
	app: {
		head: {
			title: "Sneakers Collection",
			meta: [
				{
					name: "description",
					content: "A personal sneaker collection.",
				},
			],
			link: [{ rel: "icon", href: "/favicon.ico" }],
		},
	},
});
