FROM docker.io/node:20-alpine
WORKDIR /app
ENV PORT 4200

COPY apps/frontend/.next/standalone .
COPY apps/frontend/public apps/frontend/public
COPY apps/frontend/.next/static apps/frontend/.next/static

EXPOSE 4200
ENTRYPOINT ["node", "apps/frontend/server.js"]
