FROM node:20
ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

COPY prisma ./prisma/

RUN yarn install --frozen-lockfile

COPY . .

RUN npm i -g @nestjs/cli

RUN npm run build

EXPOSE 3000

CMD ["npm","run", "start:prod"]