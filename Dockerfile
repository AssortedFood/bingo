# Build the React client
FROM node:18 AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

# Build the server and bundle the client build
FROM node:18
WORKDIR /app/server
# Copy the entire server folder from the project root into /app/server
COPY ./server/ ./
RUN npm install
# Copy the built client into server/client/build (adjust if your server expects a different path)
COPY --from=client-build /app/client/build ./client/build
EXPOSE 5000
CMD ["node", "server.js"]
