generate-json:
	nest build
	node dist/utils/parse-excel.js
.PHONY: generate-json

run-project:
	docker-compose -f docker-compose-dev.yml up --build
.PHONY: run-project
