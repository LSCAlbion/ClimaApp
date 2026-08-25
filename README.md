# 🌦️ ClimaApp — Previsão do Tempo em Tempo Real

Uma aplicação full-stack moderna para consulta meteorológica em tempo real, construída sob o padrão arquitetural **Backend for Frontend (BFF)** com cache em memória, conteinerização Docker, pipeline de CI e cobertura completa de testes automatizados.

---

## 🚀 Links em Produção

* **Aplicação Web (Vercel):** [https://clima-app-ruby-delta.vercel.app/](https://clima-app-ruby-delta.vercel.app/)
* **Documentação da API / Swagger (Render):** [https://climaapp-5es2.onrender.com](https://climaapp-5es2.onrender.com)

---

## 🛠️ Tecnologias Utilizadas

### Frontend
* **React 19** com **TypeScript** e **Vite**
* **Tailwind CSS v4** (Estilização moderna e responsiva)
* **Lucide React** (Ícones de condições climáticas)
* **Context API** (Gerenciamento global de unidades: °C / °F)
* **HTML5 Geolocation API** & **LocalStorage** (Persistência do histórico recente)

### Backend (BFF)
* **Node.js** com **Express** e **TypeScript**
* **Open-Meteo API** (Geocodificação e dados meteorológicos sem necessidade de API key)
* **Node-Cache** (Cache em memória com TTL de 10 minutos para otimizar consumo e latência)
* **Swagger UI & OpenAPI 3.0** (Documentação interativa das rotas da API)

### Qualidade & DevOps
* **Vitest & Supertest** (Testes unitários e de integração HTTP)
* **GitHub Actions** (Pipeline de CI automatizado com jobs paralelos)
* **Docker & Docker Compose** (Multi-stage builds com Nginx Alpine e Node Alpine)

---

## 🏛️ Arquitetura do Sistema

```
┌────────────────────────────────────────────────────────┐
│               Frontend (React + Vite)                  │
│  - Tailwind CSS v4          - Context API (°C / °F)    │
│  - Geolocation API          - LocalStorage History     │
└──────────────────────────┬─────────────────────────────┘
                           │
                     (HTTP / REST)
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│            Backend BFF (Express + TypeScript)          │
│  - Validação de Parâmetros  - Documentação Swagger UI  │
└──────────────┬───────────────────────────┬─────────────┘
               │ (Cache Miss)              │ (Cache Hit)
               ▼                           ▼
┌──────────────────────────────┐   ┌─────────────────────┐
│    Open-Meteo REST API       │   │  Node-Cache (Mem)   │
│  - Geocoding & Weather Data  │   │  - TTL: 10 minutos  │
└──────────────────────────────┘   └─────────────────────┘
```

---

## 💻 Como Rodar o Projeto Localmente

### Pré-requisitos
* [Node.js](https://nodejs.org/) (versão 20 ou superior)
* [Git](https://git-scm.com/)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) *(opcional, se optar por rodar em contêineres)*

---

### Opção 1: Execução com Docker Compose (Recomendado)

Esta opção inicializa o Frontend e o Backend simultaneamente em contêineres isolados com um único comando:

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/LSCAlbion/ClimaApp.git](https://github.com/LSCAlbion/ClimaApp.git)
   cd ClimaApp
   ```

2. **Suba os contêineres:**
   ```bash
   docker compose up --build
   ```

3. **Acesse as aplicações:**
   * **Frontend:** `http://localhost`
   * **Backend / Swagger:** `http://localhost:3333/api/docs`
   * **Health Check:** `http://localhost:3333/health`

---

### Opção 2: Execução Manual (Sem Docker)

Abra dois terminais separados para rodar os serviços:

#### Terminal 1 — Backend (BFF):
```bash
cd weather-backend
npm install
npm run dev
```
> O backend iniciará em `http://localhost:3333`

#### Terminal 2 — Frontend:
```bash
cd weather-frontend
npm install
npm run dev
```
> O frontend iniciará em `http://localhost:5173`

---

## 🧪 Executando os Testes Automatizados

Os testes cobrem a camada de serviços (regras de negócio e cache) e as rotas HTTP do controller:

```bash
cd weather-backend
npm test
```

Para rodar em modo contínuo (*watch*):
```bash
cd weather-backend
npm run test:watch
```

---

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.