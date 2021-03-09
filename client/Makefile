
dev:
	./node_modules/.bin/parcel example/index.html
build:
	./node_modules/.bin/parcel build example/index.html

docker/build:
	docker build . -t opny/peer-ssh-client

docker/dev/start:
	docker run --rm -it -d -p 1234:1234 --name peer-ssh-client-dev opny/peer-ssh-client

docker/dev/stop:
	docker kill peer-ssh-client-dev || true