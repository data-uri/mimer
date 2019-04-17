MODULE = ./node_modules/.bin/

build:
	@echo "Creating web file"
	node browser_build.js
	@echo "Creating minified version"
	$(MODULE)uglifyjs --comments '/mimer/' dist/mimer.js -m -o dist/mimer.min.js --source-map url --mangle
.PHONY: build
