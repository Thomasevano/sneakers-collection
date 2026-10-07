# Deployment

## Coolify

Deploy the application with its multi-stage `Dockerfile`. The runtime image contains only the Nuxt production output and its runtime dependencies.

Configure the Coolify application with:

- Build Pack: **Dockerfile**
- Dockerfile location: `Dockerfile` (relative to the base directory)
- Base directory: `/`
- Exposed port: `3000`
- Healthcheck: enable Coolify's HTTP healthcheck with method `GET` and path `/api/health`
- Advanced: disable **Inject Build Args to Dockerfile**

Remove custom Railpack build and start commands. The image starts the Nitro server with `node .output/server/index.mjs`.

Configure StockX credentials only in Coolify's runtime environment variables:

- Existing token: `NUXT_STOCKX_API_KEY` and `NUXT_STOCKX_ACCESS_TOKEN`
- Automatic token renewal: `NUXT_STOCKX_API_KEY`, `NUXT_STOCKX_CLIENT_ID`, `NUXT_STOCKX_CLIENT_SECRET`, and `NUXT_STOCKX_REFRESH_TOKEN`

Do not expose these values as build arguments or commit them to the repository.
