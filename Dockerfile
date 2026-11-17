FROM node:22-alpine
WORKDIR /app
COPY server/package.json ./package.json
RUN npm install --omit=dev
COPY server/src ./src
COPY web ./web
ENV NODE_ENV=production PORT=8080
EXPOSE 8080
CMD ["npm","start"]
