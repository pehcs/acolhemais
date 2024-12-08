FROM debian:bullseye

# Instalações básicas
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Instala Node.js e npm
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest \
    && node -v \
    && npm -v

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package.json ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/

# Instala dependências globais e para backend/frontend
RUN npm install --verbose
RUN cd ./frontend && npm install react-router-dom --verbose

# Copia o restante do código
COPY . .

# Gera artefatos do Prisma para o backend
RUN cd ./backend && npx prisma generate

# Expõe as portas
EXPOSE 3000 3001

# Comando de inicialização
CMD [ "sh" , "-c", "npm run dev" ]