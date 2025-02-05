# Build the React client
FROM node:18 AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

# Build the server and bundle the client build
FROM node:18
WORKDIR /app
# Install server dependencies
COPY server/package*.json ./server/
RUN cd server && npm install
# Copy the entire server source code
COPY server/ ./server/
# Copy the built client into the appropriate location for serving static files
COPY --from=client-build /app/client/build ./client/build
EXPOSE 5000
CMD ["node", "server/server.js"]
