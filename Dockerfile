# ---- Base Node ----
FROM node:carbon AS base

# Create app directory
WORKDIR /app

# ---- Dependencies ----
FROM base AS dependencies

COPY package.json ./
COPY yarn.lock ./

# Install app dependencies including 'devDependencies'
RUN yarn

# ---- Copy Files/Build ----
FROM dependencies AS build

# Create app directory
WORKDIR /app

# Add all files
COPY . .

# Build static files
RUN yarn build

# --- Release with Alpine ----
FROM mhart/alpine-node:8

# Create app directory
WORKDIR /app

COPY --from=dependencies /app/package.json ./
COPY --from=dependencies /app/yarn.lock ./

# Install app dependencies
RUN yarn --production
COPY --from=build ./app/server ./server/
COPY --from=build ./app/src/.next ./src/.next/
COPY --from=build ./app/src/static ./src/static/
COPY --from=build ./app/src/scripts ./src/scripts/

EXPOSE 3000

# Start the app
ENV NODE_ENV=production
CMD ["node", "server/index.js"]