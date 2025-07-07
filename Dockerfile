# Etapa 1: Imagem base
FROM node:18

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todos os arquivos para dentro do container
COPY . .

# Expõe a porta da API
EXPOSE ${PORT:-3000}

# Comando para iniciar o app com ts-node-dev
CMD ["npm", "run", "dev"]
