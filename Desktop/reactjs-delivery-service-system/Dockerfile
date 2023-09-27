FROM node:18.12-alpine 

WORKDIR /react-dss


COPY package*.json ./

RUN npm install -g npm@8.19.2

RUN npm config set legacy-peer-deps true
RUN npm install --save react@18.2.0 react-dom@18.2.0 google-maps-react

COPY . .
EXPOSE 3000

RUN npm install -g serve --save

CMD ["npm", "start"]