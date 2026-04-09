# LeadScore AI — Qualificação Inteligente de Leads

> Solução com IA para o processo de vendas.

## 🎯 O Problema

**Vendedores B2B gastam até 67% do tempo com leads que nunca vão comprar.** A qualificação é manual, inconsistente e subjetiva — cada SDR usa critérios diferentes. Resultado: pipeline inflado, previsão de receita imprecisa e tempo desperdiçado.

### De onde vem o problema?

No processo de vendas típico, um SDR (pré-vendedor) faz o primeiro contato com leads que chegam por formulários, WhatsApp ou indicações. Ele precisa avaliar se vale investir tempo naquele lead antes de agendar uma reunião com o vendedor. Essa avaliação é feita com base na conversa, mas sem ferramenta — apenas no "feeling" do SDR.

## 💡 A Solução

**LeadScore AI** analisa transcrições de conversas de vendas usando IA (Google Gemini) e gera automaticamente um **score de qualificação de 0 a 100** baseado no framework BANT:

| Critério | O que avalia | Pontuação |
|----------|-------------|-----------|
| **B**udget | O lead tem orçamento? | 0-25 pts |
| **A**uthority | É o decisor da compra? | 0-25 pts |
| **N**eed | Tem necessidade real? | 0-25 pts |
| **T**imeline | Tem urgência/prazo? | 0-25 pts |

A IA lê a conversa, extrai evidências textuais de cada critério, e classifica o lead como:
- 🔥 **Quente** (≥75) — priorizar imediatamente
- 🟡 **Morno** (40-74) — continuar trabalhando
- ❄️ **Frio** (<40) — não investir tempo agora

### Por que isso importa?

Basta adicionar a transcrição da gravação ou conversa via texto. O sistema usa esses dados para **transformar a informação em ação** — dizendo ao vendedor "esse lead é quente, priorize!". O LeadScore AI preenche exatamente esse gap na qualificação de leads.

## 🧠 Abordagens de IA Utilizadas

| Abordagem | Como usamos |
|-----------|-------------|
| **LLM** (Large Language Model) | Google Gemini analisa a transcrição e extrai sinais BANT |
| **Classificação** | Lead é classificado como hot/warm/cold com base no score |
| **Previsão** | Score 0-100 é uma previsão da qualidade/probabilidade do lead |

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 19 + TypeScript + Vite |
| Backend | Node.js + Express 5 + TypeScript |
| IA | Google Gemini 2.0 Flash API |
| Testes | Jest + Supertest (TDD) |
| Dados | InMemoryStore (POC) |

## 📂 Estrutura do Projeto

```
leadscore-ai/
├── server/                         # Backend
│   └── src/
│       ├── routes/leads.ts         # Endpoints REST
│       ├── services/
│       │   ├── scoring.service.ts  # Cálculo de score e classificação
│       │   └── llm.service.ts      # Integração com Google Gemini
│       ├── store/leads.store.ts    # Armazenamento em memória
│       ├── prompts/qualification.ts # Prompt BANT estruturado
│       ├── data/mock-transcriptions.ts # 5 cenários realistas
│       └── types/index.ts          # Interfaces TypeScript
│
├── client/                         # Frontend
│   └── src/
│       ├── components/             # ScoreGauge, BantBreakdown, LeadCard...
│       ├── pages/                  # Dashboard, LeadDetail, NewAnalysis
│       ├── services/api.ts         # Comunicação com backend
│       └── types/index.ts          # Tipos compartilhados
│
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- Uma API key do Google Gemini ([obter aqui](https://aistudio.google.com/apikey))

### 1. Clone o repositório
```bash
git clone https://github.com/Lucas-Lameira/leadscore-ai.git
cd leadscore-ai
```

### 2. Configure o backend
```bash
cd server
npm install

# Crie o arquivo .env com sua API key
cp .env.example .env
# Edite o .env e adicione sua GEMINI_API_KEY
```

### 3. (Opcional) Rode os testes
```bash
npm test
```
Resultado esperado: **31 testes passando**.

### 4. Inicie o backend
```bash
npm run dev
# → Servidor rodando em http://localhost:3001
```

### 5. Configure e inicie o frontend
```bash
# Em outro terminal:
cd client
npm install
npm run dev
# → App rodando em http://localhost:5173
```

### 6. Use o app
1. Acesse `http://localhost:5173`
2. Clique em **"Nova Análise"**
3. Selecione um dos 5 cenários de exemplo (ou cole sua própria transcrição)
4. Clique em **"Analisar Transcrição"**
5. Veja o score, a análise BANT e a recomendação da IA

## 🧪 Testes (TDD)

O backend foi desenvolvido com TDD (Test-Driven Development):

1. **Red phase**: 31 testes escritos antes da implementação — todos falhando
2. **Green phase**: Lógica implementada — todos passando

```
PASS src/services/scoring.service.test.ts  (8 testes)
  ✓ calculateTotalScore soma os 4 critérios BANT
  ✓ classify classifica hot/warm/cold nos limiares corretos

PASS src/store/leads.store.test.ts         (9 testes)
  ✓ add, getAll (ordenado por score), getById, clear, count

PASS src/routes/leads.test.ts              (14 testes)
  ✓ GET /api/leads — lista vazia e ordenada
  ✓ GET /api/leads/:id — encontrado e 404
  ✓ POST /api/analyze — validação e sucesso
  ✓ GET /api/mock-transcriptions — estrutura e quantidade
```

## 📊 API Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/leads` | Lista todos os leads analisados (ordenados por score) |
| `GET` | `/api/leads/:id` | Detalhe de um lead com análise BANT completa |
| `POST` | `/api/analyze` | Analisa uma transcrição e retorna o lead com score |
| `GET` | `/api/mock-transcriptions` | Lista os 5 cenários de exemplo |
| `GET` | `/health` | Health check do servidor |

## 🔮 O que faria com mais tempo

- **Banco de dados**: trocar InMemoryStore por PostgreSQL ou MongoDB para persistência de dados
- **Análise em batch**: analisar múltiplas transcrições de um mesmo lead para score acumulativo
- **Histórico**: tracking de como o score evolui ao longo das interações
- **Fine-tuning**: calibrar o prompt baseado em dados reais de deals ganhos/perdidos
- **Integração com CRM**: conectar com HubSpot/Pipedrive para puxar dados e atualizar campos automaticamente
- **Autenticação**: JWT + login para múltiplos times de vendas
- **Dashboard analytics**: gráficos de pipeline, distribuição de scores, tendências ao longo do tempo
- **Notificações**: alertas automáticos quando um lead quente é detectado (email, whatsapp)
- **Modelo próprio**: treinar um modelo de classificação customizado com dados históricos da empresa, em vez de depender de LLM genérico.
- **Camada de Validação de campos nas rotas**: Adicionar Middleware com Zod e definição de schemas para campos de request
- **Dividir CSS em arquivos menores**: Separar os arquivos CSS por componentes/paginas e estruturas principais (cores, fontes, etc)
- **Estrutura de logs**: adicionar logs para debug e monitoramento

## 👤 Autor

Lucas — Desenvolvedor Full-stack

---
