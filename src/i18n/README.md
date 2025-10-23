# Sistema de Tradução / Translation System

## Como usar / How to use

### 1. Importar o hook useLanguage em qualquer componente:

```tsx
import { useLanguage } from "@/i18n/LanguageContext";

function MeuComponente() {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <div>
      <h1>{t.hero.title}</h1>
      <p>{t.hero.subtitle}</p>
    </div>
  );
}
```

### 2. Estrutura das traduções

As traduções estão organizadas por seção em `src/i18n/translations.ts`:

- `t.nav.*` - Navegação
- `t.hero.*` - Seção Hero
- `t.objetivos.*` - Seção Objetivos
- `t.veiculos.*` - Seção Veículos
- `t.transmissoes.*` - Seção Transmissões
- `t.dados.*` - Seção Dados
- `t.parcerias.*` - Seção Parcerias
- `t.contato.*` - Seção Contato
- `t.footer.*` - Rodapé
- `t.common.*` - Textos comuns

### 3. Idiomas disponíveis

- `pt` - Português (Brasil) 🇧🇷
- `en` - English (USA) 🇺🇸
- `es` - Español 🇪🇸

### 4. Trocar idioma programaticamente

```tsx
const { setLanguage } = useLanguage();

// Trocar para inglês
setLanguage("en");

// Trocar para espanhol
setLanguage("es");

// Trocar para português
setLanguage("pt");
```

### 5. Obter idioma atual

```tsx
const { language } = useLanguage();

console.log(language); // "pt", "en" ou "es"
```

### 6. Adicionar novas traduções

Edite o arquivo `src/i18n/translations.ts` e adicione as novas chaves em todos os idiomas:

```typescript
export const translations = {
  pt: {
    minhaSecao: {
      titulo: "Meu Título",
      descricao: "Minha Descrição",
    },
  },
  en: {
    minhaSecao: {
      titulo: "My Title",
      descricao: "My Description",
    },
  },
  es: {
    minhaSecao: {
      titulo: "Mi Título",
      descricao: "Mi Descripción",
    },
  },
};
```

## Exemplo completo

```tsx
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";

function ExemploComponente() {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <div>
      <h1>{t.hero.title}</h1>
      <p>{t.hero.subtitle}</p>
      
      <Button onClick={() => setLanguage("en")}>
        English
      </Button>
      
      <Button onClick={() => setLanguage("pt")}>
        Português
      </Button>
      
      <Button onClick={() => setLanguage("es")}>
        Español
      </Button>
      
      <p>Idioma atual: {language}</p>
    </div>
  );
}
```

## Persistência

O idioma selecionado é salvo automaticamente no `localStorage` e restaurado quando o usuário retorna ao site.
