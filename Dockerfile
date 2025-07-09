# Etapa 1: Construir a aplicação Angular
FROM node:18 AS build

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar os arquivos de configuração e dependências
COPY package*.json ./

# Instalar as dependências da aplicação
RUN npm install

# Copiar o restante dos arquivos da aplicação
COPY . .

# Construir a aplicação Angular para produção
RUN npm run build --prod

# Etapa 2: Servir a aplicação com Nginx
FROM nginx:alpine

# Copiar a configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar os arquivos de build do Angular para o diretório de conteúdo estático do Nginx
COPY --from=build /app/dist/buscante /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80

# Iniciar o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
