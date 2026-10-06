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
					content:
						"Search live sneaker releases and compare resale listings across popular marketplaces.",
				},
			],
			htmlAttrs: { lang: "en" },
			link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
		},
	},
});
