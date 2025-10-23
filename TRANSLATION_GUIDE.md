# Guia de Implementação de Traduções

## ✅ Sistema de Tradução Implementado

O sistema de tradução está funcionando! Aqui está o que foi feito:

### Arquivos Criados:
1. `src/i18n/translations.ts` - Todas as traduções (PT, EN, ES)
2. `src/i18n/LanguageContext.tsx` - Context API para gerenciar idioma
3. `src/i18n/README.md` - Documentação completa

### Componentes Atualizados:
- ✅ **Navbar** - Totalmente traduzido e funcional
- ✅ **App.tsx** - LanguageProvider adicionado

### Como Aplicar nos Outros Componentes:

## Exemplo: Hero.tsx

**ANTES:**
```tsx
function Hero() {
  return (
    <div>
      <h1>VAI COM LIVE</h1>
      <p>Conectando marcas ao universo gamer</p>
    </div>
  );
}
```

**DEPOIS:**
```tsx
import { useLanguage } from "@/i18n/LanguageContext";

function Hero() {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1>{t.hero.title}</h1>
      <p>{t.hero.subtitle}</p>
    </div>
  );
}
```

## Traduções Disponíveis por Componente:

### Hero
```tsx
const { t } = useLanguage();
t.hero.title          // "VAI COM LIVE" / "GO WITH LIVE"
t.hero.subtitle       // "Conectando marcas..." / "Connecting brands..."
t.hero.cta            // "Conheça o Projeto" / "Learn About the Project"
t.hero.scrollDown     // "Role para baixo" / "Scroll down"
```

### Objetivos
```tsx
t.objetivos.title         // "Objetivos" / "Goals"
t.objetivos.subtitle      // "Nossa missão e visão"
t.objetivos.card1Title    // "Conectar Marcas"
t.objetivos.card1Desc     // Descrição do card 1
// ... e assim por diante
```

### Veículos
```tsx
t.veiculos.title      // "Veículos de Comunicação"
t.veiculos.subtitle   // "Plataformas onde estamos presentes"
t.veiculos.twitch     // "Transmissões ao vivo diárias"
t.veiculos.instagram  // "Conteúdo e interação"
// ...
```

### Transmissões
```tsx
t.transmissoes.title          // "Transmissões"
t.transmissoes.subtitle       // "Conteúdo ao vivo de qualidade"
t.transmissoes.daily          // "Transmissões Diárias"
t.transmissoes.dailyDesc      // Descrição
// ...
```

### Dados
```tsx
t.dados.title             // "Dados e Alcance"
t.dados.subtitle          // "Números que comprovam..."
t.dados.description       // Descrição completa
t.dados.viewers           // "Média nas lives simultâneas"
t.dados.hours             // "De transmissão diária"
t.dados.twitchFollowers   // "Seguidores na twitch"
t.dados.instaFollowers    // "Seguidores no instagram"
t.dados.cta               // "Entrar em Contato"
t.dados.followUs          // "Seguir nas redes:"
// ...
```

### Parcerias
```tsx
t.parcerias.title        // "Parcerias"
t.parcerias.subtitle     // "Empresas que confiam..."
t.parcerias.interested   // "Interessado em parceria?"
t.parcerias.cta          // "Entre em Contato"
```

### Contato
```tsx
t.contato.title              // "Contato"
t.contato.subtitle           // "Vamos conversar..."
t.contato.name               // "Nome"
t.contato.email              // "E-mail"
t.contato.phone              // "Telefone"
t.contato.message            // "Mensagem"
t.contato.send               // "Enviar Mensagem"
t.contato.sending            // "Enviando..."
t.contato.success            // "Mensagem enviada com sucesso!"
t.contato.error              // "Erro ao enviar..."
t.contato.namePlaceholder    // "Seu nome"
t.contato.emailPlaceholder   // "seu@email.com"
// ...
```

### Footer
```tsx
t.footer.rights    // "Todos os direitos reservados."
t.footer.links     // "Links Rápidos"
t.footer.social    // "Redes Sociais"
t.footer.contact   // "Contato"
```

## Passos para Aplicar em Cada Componente:

1. **Adicionar import:**
   ```tsx
   import { useLanguage } from "@/i18n/LanguageContext";
   ```

2. **Usar o hook:**
   ```tsx
   const { t } = useLanguage();
   ```

3. **Substituir textos hardcoded:**
   ```tsx
   // Antes: <h1>Objetivos</h1>
   // Depois: <h1>{t.objetivos.title}</h1>
   ```

4. **Testar:**
   - Abra o site
   - Clique no seletor de idioma no Navbar
   - Verifique se os textos mudam

## Idiomas Suportados:

- 🇧🇷 **Português** (pt) - Padrão
- 🇺🇸 **English** (en)
- 🇪🇸 **Español** (es)

## Funcionalidades:

✅ Troca de idioma em tempo real
✅ Persistência no localStorage
✅ Seletor visual no Navbar (desktop e mobile)
✅ TypeScript com autocomplete
✅ Todas as traduções já prontas

## Próximos Passos:

Para completar a implementação, basta adicionar `const { t } = useLanguage();` e substituir os textos nos seguintes componentes:

- [ ] Hero.tsx
- [ ] Objetivos.tsx
- [ ] Veiculos.tsx
- [ ] Transmissoes.tsx
- [ ] Dados.tsx
- [ ] PitchComparativo.tsx
- [ ] Parcerias.tsx
- [ ] Contato.tsx
- [ ] Footer.tsx

**Todas as traduções já estão prontas em `src/i18n/translations.ts`!**
