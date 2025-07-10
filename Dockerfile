FROM node:lts AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps
RUN npm install -g @angular/cli

COPY . .

RUN ng build --configuration production --base-href buscante

FROM nginx:alpine

COPY --from=build /app/dist/buscante/browser    /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
