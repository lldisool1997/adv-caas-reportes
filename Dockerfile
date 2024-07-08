# Etapa 1: Construir la aplicación Angular
FROM node:alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --force

COPY . .

RUN npm run build --prod

# Etapa 2: Configurar Nginx y copiar los archivos de build
FROM nginx:alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Copiar el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]