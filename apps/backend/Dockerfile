FROM docker.io/node:20-alpine

ARG APP_VERSION

ENV HOST=0.0.0.0
ENV NODE_ENV=production
ENV PORT=3000
ENV APP_NAME=backend
ENV APP_VERSION=$APP_VERSION

WORKDIR /app

RUN corepack enable
RUN addgroup --system backend && \
    adduser --system --ingroup backend backend

COPY dist/apps/backend backend

RUN chown -R backend:backend .

RUN cd backend && pnpm install && pnpm add tslib pino-loki pino-pretty

EXPOSE 3000

CMD [ "node", "backend" ]
