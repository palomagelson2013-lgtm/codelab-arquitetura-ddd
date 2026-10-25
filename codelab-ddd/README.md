# CodeLab – Arquitetura Hexagonal + DDD

Repositório da **Questão 1** da Avaliação N2 – Projeto e Arquitetura de Software.

Este repositório contém **apenas a organização arquitetural** (sem o código-fonte completo do projeto Web original).  
O domínio de aplicação é o **CodeLab**: plataforma social de desafios de programação.

## Domínio de Aplicação

O CodeLab é uma plataforma web social voltada para desenvolvedores, na qual usuários autenticados podem publicar desafios de programação (com título, descrição, nível de dificuldade e imagem de capa), interagir por meio de curtidas e comentários, visualizar um feed de desafios, buscar usuários e desafios, e manter um perfil público com contadores de desafios, seguidores e publicações. O sistema atual é composto por um backend Node.js (Express + Sequelize/MySQL) e um frontend separado.

## Arquitetura Hexagonal (Ports & Adapters) + DDD

A arquitetura foi reorganizada em camadas orientadas ao domínio, isolando regras de negócio de detalhes de infraestrutura.

```
codelab-ddd/
├── domain/                      # Núcleo – regras de negócio puras (sem dependências externas)
│   ├── entities/                # Entidades: User, Challenge, Comment, Like
│   ├── value-objects/           # Value Objects: Email, Username, Difficulty, PasswordHash
│   ├── aggregates/              # Aggregates roots (ex.: ChallengeAggregate)
│   ├── repositories/            # Interfaces (ports) de repositório
│   ├── events/                  # Domain Events (ChallengeCreated, ChallengeLiked, UserRegistered...)
│   └── services/                # Domain Services (quando a lógica não cabe em uma entidade)
│
├── application/                 # Casos de uso (Application Services)
│   ├── use-cases/               # RegisterUser, LoginUser, CreateChallenge, ToggleLike...
│   ├── dto/                     # Data Transfer Objects de entrada/saída
│   └── ports/                   # Ports de saída (interfaces para messaging, storage, etc.)
│
├── infrastructure/              # Adaptadores de saída (implementações concretas)
│   ├── persistence/sequelize/   # Implementações dos repositórios + models Sequelize
│   ├── messaging/               # Publisher/Consumer (RabbitMQ / Redis / etc.)
│   ├── storage/                 # Upload de imagens (local ou S3)
│   └── auth/                    # JWT, bcrypt
│
├── adapters/                    # Adaptadores de entrada
│   ├── http/                    # Controllers, Routes, Middlewares Express
│   └── messaging/               # Consumers de eventos (quando necessário)
│
└── shared/                      # Utilitários transversais (erros, tipos, etc.)
```

### Princípios aplicados

- **Domain** não conhece Express, Sequelize, fs, bcrypt ou qualquer framework.
- **Application** orquestra casos de uso e depende apenas de interfaces (ports).
- **Infrastructure** implementa as interfaces definidas no domínio/aplicação.
- **Adapters** traduzem HTTP (ou mensagens) em chamadas a use-cases.

### Domain Events previstos (base para a Questão 2)

| Evento                  | Quando ocorre                          | Possíveis consumidores                  |
|-------------------------|----------------------------------------|-----------------------------------------|
| `UserRegistered`        | Novo usuário cadastrado                | Email de boas-vindas, analytics         |
| `ChallengeCreated`      | Novo desafio publicado                 | Notificar seguidores, indexação busca   |
| `ChallengeLiked`        | Curtida adicionada/removida            | Atualizar contadores, feed em tempo real|
| `CommentCreated`        | Novo comentário                        | Notificar autor do desafio              |
| `ProfileUpdated`        | Perfil alterado                        | Invalidar cache de perfil               |

Esses eventos permitem desacoplar módulos e introduzir a camada de mensageria da Questão 2.

---

**Observação:** Este repositório contém apenas a estrutura e a documentação da arquitetura DDD/Hexagonal. O código-fonte completo do projeto Web original permanece no repositório de Programação Web.
