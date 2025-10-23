# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Security

#### Vite 7.1.11 Upgrade - Correção de Vulnerabilidade de Segurança

**Data**: 2025-10-23

**Motivação**: Correção de vulnerabilidade moderada no esbuild (CVE GHSA-67mh-4wv8-2f99) que permitia que qualquer website enviasse requisições ao servidor de desenvolvimento e lesse as respostas.

##### Dependências Atualizadas

- **Vite**: 5.4.21 → 7.1.11 (upgrade de 2 versões principais)
- **esbuild**: 0.21.5 → >0.24.2 (via Vite, correção de segurança)
- **@vitejs/plugin-react-swc**: 3.11.0 → 4.1.0 (compatibilidade com Vite 7)

##### Mudanças de Configuração

**vite.config.ts**:
- Nenhuma mudança necessária - configuração existente compatível com Vite 7
- Plugins mantidos: @vitejs/plugin-react-swc, vite-plugin-svgr, lovable-tagger
- Configuração do servidor mantida (porta 8080, host "::")

**Requisitos de Ambiente**:
- **Node.js**: Requisito mínimo atualizado de 18+ para 20.19+ ou 22.12+
- **Ambiente testado**: Node.js v22.20.0, npm 10.9.3

##### Breaking Changes Identificadas

**Vite 6 → 7**:
1. **Requisito de Node.js**: Agora requer Node.js 20.19+ ou 22.12+
2. **Browser Target**: Atualizado para navegadores mais modernos
   - Chrome: 87 → 107
   - Firefox: 78 → 104
   - Safari: 14 → 16
3. **Build Target**: Removido suporte para 'modules', substituído por 'baseline-widely-available'
4. **Sass Legacy API**: Removido completamente (não afeta este projeto)

**Impacto no Projeto**: Nenhum breaking change afetou a funcionalidade existente.

##### Verificações Realizadas

**✅ Servidor de Desenvolvimento**:
- `npm run dev` - Servidor inicia corretamente na porta 8080
- Hot Module Replacement (HMR) funcionando
- Todas as rotas testadas: `/`, `/bg-test`, página 404

**✅ Build de Produção**:
- `npm run build` - Compilação bem-sucedida
- `npm run build:dev` - Build de desenvolvimento bem-sucedida
- `npm run preview` - Preview funcionando corretamente
- Pasta `dist/` gerada sem erros

**✅ Funcionalidades da Aplicação**:
- Renderização de todas as páginas sem erros no console
- Importação e renderização de SVGs (Hero, Navbar, ícones)
- Internacionalização (PT/EN/ES) funcionando
- Persistência de idioma no localStorage
- Animações Framer Motion funcionando
- Efeitos baseados em scroll
- Comportamento responsivo em diferentes viewports

**✅ Qualidade de Código**:
- `npm run lint` - ESLint executado sem novos erros
- Nenhum problema de linting introduzido pelo upgrade

**✅ Segurança**:
- `npm audit` - Zero vulnerabilidades moderadas ou superiores
- esbuild atualizado para versão >0.24.2
- Vulnerabilidade CVE GHSA-67mh-4wv8-2f99 resolvida

##### Compatibilidade de Plugins

- **@vitejs/plugin-react-swc**: Atualizado para v4.1.0, totalmente compatível com Vite 7
- **vite-plugin-svgr**: v4.5.0 mantido, compatível com Vite 7
- **lovable-tagger**: v1.1.11 mantido, sem conflitos

##### Notas de Migração

1. **Sem mudanças no código da aplicação**: Todo o código React, TypeScript e Tailwind permanece inalterado
2. **Sem mudanças na estrutura de arquivos**: Estrutura do projeto mantida
3. **Sem mudanças nas configurações**: vite.config.ts, tsconfig.json e outras configurações não precisaram de ajustes
4. **Compatibilidade total**: Todas as funcionalidades existentes continuam funcionando como esperado

##### Passos de Verificação Executados

1. ✅ Verificação de ambiente (Node.js v22.20.0)
2. ✅ Atualização do Vite para 7.1.11
3. ✅ Atualização de plugins compatíveis
4. ✅ Resolução de conflitos de peer dependencies
5. ✅ Teste do servidor de desenvolvimento
6. ✅ Teste de todas as rotas da aplicação
7. ✅ Teste de importação e renderização de SVGs
8. ✅ Teste de funcionalidade de internacionalização
9. ✅ Teste de animações e interações
10. ✅ Teste de builds (produção e desenvolvimento)
11. ✅ Teste de preview do build
12. ✅ Validação de linting
13. ✅ Auditoria de segurança

##### Referências

- [Vite 7 Migration Guide](https://vite.dev/guide/migration.html)
- [Vite 6 Migration Guide](https://vite.dev/guide/migration-from-v5.html)
- [CVE GHSA-67mh-4wv8-2f99](https://github.com/advisories/GHSA-67mh-4wv8-2f99)
- [esbuild Security Advisory](https://github.com/evanw/esbuild/security/advisories)

---

