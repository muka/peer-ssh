FROM node

ADD . /app
WORKDIR /app
RUN npm i

ENTRYPOINT [ "./node_modules/.bin/parcel", \
 "--hmr-host", "0.0.0.0", \
 "--hmr-port", "43093", \
 "example/index.html" \
]