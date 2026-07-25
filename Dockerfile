FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@11.9.0 --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts
COPY . .
RUN pnpm run build:nas

FROM nginx:1.27-alpine
LABEL org.opencontainers.image.source="https://github.com/ismethr/3swiki"
LABEL org.opencontainers.image.description="GEO·OPEN 资源环境开放教材"
COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -q --spider http://127.0.0.1/ || exit 1
