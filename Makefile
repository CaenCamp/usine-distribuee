.PHONY: install start stop

CURRENT_UID=$(shell id -u):$(shell id -g)
export CURRENT_UID
export NODE_ENV ?= development

DC_DEV := docker-compose -p usine-distribuee
DOCKER_ADMIN := docker run --rm -v ${PWD}/apps/admin:/admin -u=${CURRENT_UID} -w /admin node:13.11.0

help: ## Display available commands
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# =====================================================================
# Initialization ======================================================
# =====================================================================

install: ## Install all js deps
	@${DC_DEV} run --rm --no-deps api bash -ci 'yarn'
	@${DC_DEV} run --rm --no-deps admin bash -ci 'yarn'

# =====================================================================
# Operating recipies ==================================================
# =====================================================================

start: ## Start all service in containers
	${DC_DEV} up -d

stop: ## Stop all containers
	${DC_DEV} down

logs: ## Display all logs
	${DC_DEV} logs -f

logs-api: ## Display api logs
	${DC_DEV} logs -f api

logs-db: ## Display postgres logs
	${DC_DEV} logs -f postgres

logs-admin: ## Display admin logs
	${DC_DEV} logs -f admin

connect-api: ## Start cli in api container
	${DC_DEV} exec api bash

connect-admin: ## Start cli in admin container
	${DC_DEV} exec admin bash

# =====================================================================
# DATABASE ============================================================
# =====================================================================

migrate-create: ## Create a new migration file, ie make migrate-create name=whatever-title
	$(DC_DEV) exec api bash -ci 'yarn migrate:create -- ${name}'

migrate-latest: ## Apply Migrations up to the last one
	$(DC_DEV) exec api bash -ci 'yarn migrate:latest'

migrate-rollback: ## Apply Migrations down to last state
	$(DC_DEV) exec api bash -ci 'yarn migrate:rollback'

migrate-down: ## Apply Migrations down one step
	$(DC_DEV) exec api bash -ci 'yarn migrate:down'

migrate-up: ## Apply Migrations up one step
	$(DC_DEV) exec api bash -ci 'yarn migrate:up'

migrate-list: ## Apply Migrations list
	$(DC_DEV) exec api bash -ci 'yarn migrate:list'

create-admin: ## Create a new administrator user_account in database
	$(DC_DEV) exec api bash -ci 'node ./cli/create-admin.js'

# =====================================================================
# Deploy ==============================================================
# =====================================================================

prepare-deploy: ## Prepare app for production
	${DOCKER_ADMIN} yarn build
	rm -rf apps/api/admin
	mkdir -p apps/api/admin
	cp -R apps/admin/build/* apps/api/admin/