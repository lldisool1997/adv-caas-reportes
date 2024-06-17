# Usa una imagen base de Node.js
FROM node:14-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia los archivos de la aplicación Angular
COPY ./app ./app

# Instala el servidor HTTP para servir los archivos estáticos
RUN npm install -g http-server

# Expone el puerto en el que correrá la aplicación
EXPOSE 4250

# Comando por defecto para correr el servidor HTTP
CMD ["http-server", "app", "-p", "4250"]