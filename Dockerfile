FROM node:6.9.4

EXPOSE 3000
CMD [ "npm", "run", "start" ]

WORKDIR /src/app

# Install app dependencies
COPY package.json .
RUN npm install

COPY public ./public
COPY src ./src