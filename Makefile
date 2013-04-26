SHELL = /bin/sh
NPM   = npm
NODE  = node
MODULE = ./node_modules/.bin/

install:
	$(NPM) install
test: lint build spec
fulltest: clean install test
clean:
	rm -rf node_modules
lint:
	$(MODULE)jshint mimer.js lib/*
build:
	@echo "Creating web file"
	$(MODULE)browserify -r ./mimer.js > dist/mimer.js
	@echo "Creating minified version"
	$(MODULE)uglifyjs --comments '/mimer/' dist/mimer.js -o dist/mimer.min.js
spec:
	@echo "Running test suite..."
	$(NODE) test/run.js
.PHONY: test fulltest clean lint build
