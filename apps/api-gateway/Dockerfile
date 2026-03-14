FROM docker.io/node:20-alpine

ARG APP_VERSION

ENV HOST=0.0.0.0
ENV NODE_ENV=production
ENV PORT=3000
ENV APP_NAME=api-gateway
ENV APP_VERSION=$APP_VERSION

WORKDIR /app

RUN corepack enable
RUN addgroup --system api-gateway && \
    adduser --system --ingroup api-gateway api-gateway

COPY dist/apps/api-gateway api-gateway

RUN chown -R api-gateway:api-gateway .

RUN cd api-gateway && pnpm install && pnpm add tslib pino-loki pino-pretty

EXPOSE 3000

CMD [ "node", "api-gateway" ]