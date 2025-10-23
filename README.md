<p align="center">
  <img src="public/Assets/LOGO/favicon.svg" alt="Vai Com Live Logo" width="200"/>
</p>

# Vai Com Live - Mídia Kit

Projeto que une games, transmissões ao vivo e estrada. Percorrendo o Brasil produzindo um podcast dinâmico com entrevistas de streamers e gamers.

## 🚀 Como executar o projeto

### Requisitos

- **Node.js**: Versão 20.19+ ou 22.12+ (requerido pelo Vite 7)
- **npm**: Versão 8+ ou superior

Recomendamos usar [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) para gerenciar versões do Node.js.

### Instalação e Execução

```sh
# Clone o repositório
git clone https://github.com/VaiComLive/vai-com-live-kit.git

# Entre no diretório do projeto
cd vai-com-live-kit

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O servidor de desenvolvimento estará disponível em `http://localhost:8080`

## 🛠️ Tecnologias utilizadas

- **Vite 7** - Build tool e dev server ultrarrápido
- **TypeScript 5.8** - Tipagem estática
- **React 18** - Biblioteca UI
- **Tailwind CSS 3.4** - Framework CSS utility-first
- **shadcn-ui** - Componentes UI acessíveis (Radix UI)
- **Framer Motion** - Animações e transições
- **React Router DOM** - Roteamento client-side
- **Internacionalização** - Suporte para PT/EN/ES

## 🌍 Internacionalização

O projeto suporta múltiplos idiomas:
- Português (pt)
- Inglês (en)
- Espanhol (es)

Para mais informações sobre como trabalhar com traduções, consulte o [Guia de Tradução](TRANSLATION_GUIDE.md).

## 📁 Estrutura do projeto

```
vai-com-live-kit/
├── public/
│   └── Assets/          # Imagens e recursos estáticos
├── src/
│   ├── components/      # Componentes React
│   ├── i18n/           # Configuração de internacionalização
│   ├── pages/          # Páginas da aplicação
│   └── main.tsx        # Ponto de entrada
└── README.md
```

## 🔄 Atualizações Recentes

### Vite 7 Migration (Outubro 2025)

O projeto foi atualizado para Vite 7.1.11 para corrigir vulnerabilidades de segurança. Esta atualização:

- ✅ Corrige vulnerabilidade moderada no esbuild (CVE GHSA-67mh-4wv8-2f99)
- ✅ Melhora performance de build e HMR
- ✅ Atualiza requisitos mínimos do Node.js para 20.19+ ou 22.12+
- ✅ Mantém 100% de compatibilidade com código existente

Para mais detalhes sobre as mudanças, consulte o [CHANGELOG.md](CHANGELOG.md).

## 📝 Licença

Este projeto é propriedade da Vai Com Live.
