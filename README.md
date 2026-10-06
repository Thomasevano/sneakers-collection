# Sneakers Collection

A responsive Nuxt sneaker catalog for searching releases and comparing current
resale listings.

## Stack

- Nuxt 4
- Vue 3
- Tailwind CSS 4
- TypeScript
- Nuxt Color Mode

## Data

Server routes normalize public GOAT and Flight Club storefront search results.
StockX is linked as a direct style-code lookup because its public storefront
does not expose a stable price feed. Collection, favorite, and wanted-list
features are planned and are not implemented yet.

## Development

Install dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Check types and create a production build:

```bash
npm run typecheck
npm run build
```

## License

MIT