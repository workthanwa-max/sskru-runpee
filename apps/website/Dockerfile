FROM docker.io/node:20-alpine
WORKDIR /app
ENV PORT 4200

COPY apps/website/.next/standalone .
COPY apps/website/public apps/website/public
COPY apps/website/.next/static apps/website/.next/static

EXPOSE 4200
ENTRYPOINT ["node", "apps/website/server.js"]