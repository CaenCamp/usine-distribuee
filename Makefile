.PHONY: install start stop

CURRENT_UID=$(id -u):$(id -g)
export CURRENT_UID ?= $(shell id -u):$(shell id -g)
export NODE_ENV ?= development

DC_DEV := docker-compose -p usine-distribuee

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
