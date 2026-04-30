# Champions Assistant

## Setup

```bash
# install dependencies
npm i

# bootstrap local configuration
cp .env.example .env.local

```

## Run locally

You're going to need a MongoDB instance. You can use the included `docker-compose.yml` to bring one up with Docker:

```bash
# start DB
docker compose up mongodb -d

# start frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
