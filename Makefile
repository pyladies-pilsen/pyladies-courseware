dev:
	test -d node_modules || yarn install
	yarn dev

start:
	test -d node_modules || yarn install
	yarn build
	yarn start

run-mongod:
	test -d local/mongo-data || mkdir -p local/mongo-data
	mongod --dbpath local/mongo-data
