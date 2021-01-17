### Build stage
FROM node:12-alpine as builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci
# Convert dependencies to Ivy-compatible
RUN ./node_modules/.bin/ngcc --properties es2015 browser module main --first-only --create-ivy-entry-points

COPY . .

RUN npm run build:prod

COPY pm2-main.json ./dist

### Run stage
FROM node:12-alpine

ENV TZ 'Europe/Kiev'

RUN npm install -g pm2

WORKDIR /app

COPY --from=builder /app/dist ./dist

EXPOSE 3001
#EXPOSE 9228

CMD ["pm2-runtime", "dist/pm2-main.json"]
#CMD ["node", "--inspect=0.0.0.0:9228", "dist/web-admin/server/main.js"]
