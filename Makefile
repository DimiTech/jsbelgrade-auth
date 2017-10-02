.PHONY: logs, stop
.SILENT:

up:
	docker-compose up --build -d

logs:
	docker-compose logs -f

stop:
	docker-compose stop

down:
	docker-compose down --remove-orphans

