.PHONY: dev build start lint typecheck seed docker-up docker-build docker-down clean

# ── Development ──

dev:
	npx next dev --webpack -p 3000

build:
	npx next build --webpack

start:
	npx next start -p 3000

lint:
	npx eslint .

typecheck:
	npx tsc --noEmit

seed:
	npx tsx scripts/seed.ts

# ── Docker ──

docker-build:
	docker compose build

docker-up:
	docker compose up -d

docker-down:
	docker compose down

docker-logs:
	docker compose logs -f app

# ── Cleanup ──

clean:
	rm -rf .next
	rm -rf node_modules
