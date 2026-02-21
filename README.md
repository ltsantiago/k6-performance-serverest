# k6-performance-serverest

Este repositório contém scripts de performance usando k6 contra a API https://serverest.dev.

Estrutura sugerida:

- `k6/` - scripts e utilitários específicos do k6
  - `k6/scripts/` - scripts de carga
  - `k6/utils/` - config e fixtures

Como rodar

1. Instale o k6: https://k6.io/docs/getting-started/installation
2. Rodar um script exemplo:

```bash
# roda o script de cadastro de produto (usa utilitário de autenticação)
k6 run k6/scripts/cadastroProdutos.js
```

Usar variável de ambiente `BASE_URL` para apontar para outro ambiente:

```bash
BASE_URL=https://meu-servidor k6 run k6/scripts/cadastroProdutos.js
```

Scripts npm convenientes (assumem k6 no PATH):

```bash
npm run k6:cadastro
npm run k6:login
npm run k6:usuarios
```

Próximos passos recomendados:
- Adicionar ESLint/Prettier e um job de CI para lint
- Mover fixtures para `k6/data/` e parametrizar cenários via `__ENV`
- Centralizar retenção de resultados (InfluxDB/Grafana) para análises históricas
