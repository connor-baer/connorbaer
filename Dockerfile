# ---- Base Node ----
FROM node:10 AS base

# Create app directory
WORKDIR /app

# ---- Dependencies ----
FROM base AS devDependencies

COPY package.json ./
COPY yarn.lock ./

# Install app dependencies including 'devDependencies'
RUN yarn

# ---- Copy Files/Build ----
FROM devDependencies AS build

# Create app directory
WORKDIR /app

# Add all files
COPY . .

# Build static files
RUN yarn build

# --- Install with Alpine ----
FROM mhart/alpine-node:10 as dependencies

# Create app directory
WORKDIR /app

COPY --from=devDependencies /app/package.json ./
COPY --from=devDependencies /app/yarn.lock ./

# Install app dependencies
RUN yarn --production

# --- Release with Alpine base ----
FROM mhart/alpine-node:base-10

# Create app directory
WORKDIR /app

# Install app dependencies
COPY --from=dependencies ./app/node_modules ./node_modules/
COPY --from=dependencies ./app/package.json ./package.json
COPY --from=build ./app/server ./server/
COPY --from=build ./app/src/.next ./src/.next/
COPY --from=build ./app/src/static ./src/static/
COPY --from=build ./app/src/scripts ./src/scripts/
COPY --from=build ./app/now.json ./now.json
COPY --from=build ./app/next.config.js ./next.config.js

EXPOSE 3000

# Define env variables
ARG STATIC_URL
ENV STATIC_URL=${STATIC_URL}
ENV NODE_ENV=production

# Start the app
CMD ["node", "server/index.js"]