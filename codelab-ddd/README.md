# CodeLab – Arquitetura DDD / Hexagonal

Reorganização arquitetural do projeto **CodeLab** (plataforma social de desafios de programação)
para **Domain-Driven Design + Arquitetura Hexagonal (Ports & Adapters)**, com camada de mensageria orientada a eventos.

> Trabalho da disciplina Projeto e Arquitetura de Software – Católica SC – Avaliação N2.
> Estudante: Gelson de Lara

## Bounded Contexts

| Contexto | Módulos originais | Responsabilidade |
|---|---|---|
| Identity & Profile | user | Cadastro, autenticação, perfil, seguidores |
| Challenges | challenge | Publicação e gestão de desafios |
| Social Interactions | like, comment | Curtidas e comentários |
| Search | search | Consulta de usuários e desafios |
| Notifications | (novo) | Notificações por eventos |

## Estrutura

```
codelab-ddd/
├── README.md
├── domain/            # Regras de negócio puras
│   ├── entities/      # User, Challenge, Comment, Like (raízes de aggregate)
│   ├── value-objects/ # Email, Username, PasswordHash, Difficulty
│   ├── repositories/  # Interfaces (ports) dos repositórios
│   └── events/        # Domain Events
├── application/       # Casos de uso e ports
│   ├── use-cases/
│   └── ports/         # IEventPublisher, IStorageService, IPasswordHasher
├── infrastructure/    # Adaptadores de saída
│   ├── persistence/
│   ├── messaging/     # RabbitMQEventPublisher
│   ├── storage/
│   └── auth/
├── adapters/          # Adaptadores de entrada
│   ├── http/
│   └── messaging/     # Consumers
└── shared/
```

## Regra de dependência

Adapters → Application → Domain. O Domain não importa Express, Sequelize, fs ou bcrypt.

## Mensageria

- Broker: RabbitMQ, exchange `codelab.events` (topic).
- Eventos: UserRegistered, ChallengeCreated, ChallengeDeleted, ChallengeLiked, CommentCreated.
- Confiabilidade: ack manual, retry com backoff, DLQ, idempotência (`processed_events`) e Outbox.