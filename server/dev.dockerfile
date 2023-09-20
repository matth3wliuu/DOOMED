FROM node:20.5-alpine

WORKDIR /app
COPY ["./package.json", "./package-lock.json", "/app/"]
RUN npm i
COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]
