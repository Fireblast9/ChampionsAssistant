# ChampionsAssistant

[![pipeline](https://github.com/fireblast9/ChampionsAssistant/actions/workflows/docker-image.yml/badge.svg)](https://github.com/fireblast9/ChampionsAssistant/actions/workflows/docker-image.yml)

## ℹ️ Description

This is a website to help calculate matchups in Pokémon Champions, made with Next.js.

The frontend is exposed at <https://calc.soulsbros.ch>.

### Dependencies

- MongoDB database for data persistency

## 🏡 Local development

### ⚙️ Prerequisites

- Node.js 25
- Docker

### 🔧 Installation

```bash
# install dependencies
npm install

# bootstrap local configuration
cp .env.example .env.local
```

Then adapt the values in the `.env.local` file depending on which external services you need (see "Dependencies" section).

### 🚀 Run locally

```bash
# start DB
docker compose up mongodb -d

# start frontend
npm run dev
```

Then open your browser and head to <http://localhost:3000>
