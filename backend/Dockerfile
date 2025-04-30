FROM node:18 

WORKDIR /app

COPY package*.json ./

RUN npm ci --quiet 
# ci signifie clear install 

COPY . . 

EXPOSE 3000

USER node

CMD [ "node","app.js" ]