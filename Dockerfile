FROM node:20.5.0-alpine3.17

WORKDIR /usr/src/app 

COPY package*.json ./

RUN apk update && apk add git && apk add busybox-extras && apk add --no-cache openssh 

RUN git config --global http.sslverify false 
RUN export GIT_SSL_NO_VERIFY=true


RUN echo " Microservice NODE Version:" && node --version
RUN echo " Microservice NPM Version:" && npm --version

COPY . .


RUN npm install 

RUN npm install prettier -g 

EXPOSE 3000

CMD [ "npm", "start" ]
