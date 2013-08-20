run: build
	@node app.js

build: components
	@component build -n geom-console

components: component.json
	@component install --dev

clean:
	rm -fr build components

.PHONY: clean
