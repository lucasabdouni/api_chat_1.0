# App

Chat style app.

link frontend em nextJs: 
github.com/lucasabdouni/web-chat-1.0

# Start docker container:

docker compose up -d

# Start Project:

Criar um arquivo .env na pasta raiz do projeto e adicionar as seguintes variaveis:

NODE_ENV=dev
JWT_SECRET=apichatjwt
DATABASE_URL="postgresql://docker:docker@localhost:5432/ap

npm install;
npx prisma migrate dev;
npm run dev:server;

## RFs (Requisitos functionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível o usuário enviar mensagens para o chat publico;
- [x] Deve ser possivel o usuario logado visualizar todas as mensagens;
- [x]  Deve ser possível obter o número de check-ins realizados pelo usuário logado;

## RNs (Regras de negócios)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;

## RNFS (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [X] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] As mensagens deve ser listadas de acordo com sua data;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);
