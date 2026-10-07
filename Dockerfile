# syntax=docker/dockerfile:1

FROM node:24.21.0-bookworm-slim@sha256:d6aa754f16b3197301076f047b5def2f02ea1dbbc2ca920407d46d7ec7f87b20 AS build

WORKDIR /app
ENV NUXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .
RUN npm run build

FROM node:24.21.0-bookworm-slim@sha256:d6aa754f16b3197301076f047b5def2f02ea1dbbc2ca920407d46d7ec7f87b20 AS runtime

WORKDIR /app
ENV NODE_ENV=production \
  NITRO_HOST=0.0.0.0 \
  NITRO_PORT=3000

RUN apt-get update \
  && apt-get install --yes --no-install-recommends curl \
  && rm -rf /var/lib/apt/lists/*

COPY --from=build --chown=node:node /app/.output ./.output

USER node
EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=10 \
  CMD curl --fail --silent --show-error http://127.0.0.1:3000/api/health > /dev/null

CMD ["node", ".output/server/index.mjs"]
