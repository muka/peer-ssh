FROM node

ADD . /app
WORKDIR /app
RUN npm i

ENTRYPOINT [ "./node_modules/.bin/parcel", "public/index.html" ]