# 🌦️ ClimaApp — Previsão do Tempo em Tempo Real

Uma aplicação full-stack moderna para consulta meteorológica em tempo real, construída sob o padrão arquitetural **Backend for Frontend (BFF)** com cache em memória, conteinerização Docker, pipeline de CI e cobertura completa de testes automatizados.

---

## 🚀 Links em Produção

- **Aplicação Web (Vercel):** [https://seu-projeto.vercel.app](https://seu-projeto.vercel.app)
- **Documentação da API / Swagger (Render):** [https://seu-backend.onrender.com/api/docs](https://seu-backend.onrender.com/api/docs)

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19** com **TypeScript** e **Vite**
- **Tailwind CSS v4** (Estilização utilitária moderna)
- **Lucide React** (Ícones climáticos e de navegação)
- **Context API** (Gerenciamento global de unidades: °C / °F)
- **HTML5 Geolocation API** & **LocalStorage** (Persistência do histórico de buscas)

### Backend (BFF)
- **Node.js** com **Express** e **TypeScript**
- **Open-Meteo API** (Geocodificação e dados climáticos)
- **Node-Cache** (Cache em memória com TTL de 10 minutos para otimização de requisições)
- **Swagger UI & OpenAPI 3.0** (Documentação interativa dos endpoints)

### Qualidade & DevOps
- **Vitest & Supertest** (Testes unitários e testes de integração HTTP)
- **GitHub Actions** (Pipeline de CI automatizado para testes e builds paralelos)
- **Docker & Docker Compose** (Multi-stage builds com Nginx Alpine e Node Alpine)

---

## 🏛️ Arquitetura do Sistema

```text
[ React Frontend (Vercel / Nginx) ]
                │
         (HTTP / REST)
                ▼
[ Express BFF (Render / Node.js) ] ── (Hit) ──> [ Memory Cache (10m) ]
                │ (Miss)
                ▼
      [ Open-Meteo API ]

💻 Como Rodar o Projeto Localmente
Opção 1: Via Docker Compose (Recomendado)
Certifique-se de ter o Docker instalado e execute na raiz:

# Sobe o Frontend (porta 80) e o Backend (porta 3333)
docker compose up --build

Acesse o Frontend em: http://localhost

Acesse a API / Swagger em: http://localhost:3333/api/docs

Opção 2: Manualmente
1. Backend:

cd weather-backend
npm install
npm run dev

2. Frontend:

cd weather-frontend
npm install
npm run dev

🧪 Executando os Testes
Para rodar a suíte de testes unitários e de integração no backend:

cd weather-backend
npm test