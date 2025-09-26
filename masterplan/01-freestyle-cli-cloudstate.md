# Masterplan: Freestyle CLI & Cloudstate

Dit document beschrijft de mogelijkheden van de Freestyle CLI en de Cloudstate JavaScript-database, en hoe deze kunnen worden ingezet om het Qreatify-platform te verbeteren.

## 1. Freestyle CLI (`freestyle-sh`)

De Freestyle CLI is de primaire command-line tool om te communiceren met het Freestyle-platform. Hoewel de documentatie suggereert dat de CLI en Cloudstate nauw verweven zijn, dient de CLI als het toegangspunt voor diverse platformfunctionaliteiten.

### Belangrijkste Functies:
- **Deployment:** `npx freestyle deploy --web [entrypoint] --domain [domain]` wordt gebruikt om webapplicaties (zoals Next.js of Expo for web) te implementeren.
- **Interactie met Cloudstate:** De CLI wordt gebruikt om Cloudstate-klassen lokaal uit te voeren (`cloudstate run`) en te serveren (`cloudstate serve`), waardoor methoden als HTTP-eindpunten worden blootgesteld.
- **Beheer:** Hoewel niet expliciet in de zoekresultaten, is het aannemelijk dat de CLI ook wordt gebruikt voor het beheren van projecten, domeinen en andere Freestyle-resources.

### Toepassing voor Qreatify:
- De CLI kan het `deploy.sh` script vereenvoudigen en standaardiseren.
- Het biedt een directe manier om backend-logica, gedefinieerd in Cloudstate-klassen, te testen en te implementeren.

## 2. Cloudstate (JavaScript Database)

Cloudstate is een revolutionaire JavaScript-database runtime die de noodzaak voor traditionele databases (zoals PostgreSQL) en ORM's (zoals Drizzle) potentieel kan elimineren.

### Belangrijkste Kenmerken:
- **Persistentie via Decorators:** Door simpelweg een `@cloudstate` decorator aan een TypeScript-klasse toe te voegen, worden de eigenschappen van die klasse persistent. De staat van de objecten wordt beheerd door Freestyle.
- **Geen SQL Nodig:** Alle data-interacties gebeuren via TypeScript-methoden.
- **Automatische API-generatie:** Methoden in een Cloudstate-klasse worden automatisch beschikbaar als HTTP-eindpunten.
- **Frontend-integratie:** Met een `useCloud`-hook (voor React) kan de frontend direct en op een type-veilige manier communiceren met de backend-klassen.

### Voorbeeld:
```typescript
import { cloudstate } from "freestyle-sh";

@cloudstate
export class AppProject {
  static id = "project-id"; // Kan dynamisch zijn
  
  name: string;
  description: string;
  framework: string;
  gitRepoUrl: string;

  constructor(name: string, description: string, framework: string) {
    this.name = name;
    this.description = description;
    this.framework = framework;
    this.gitRepoUrl = ""; // Wordt later ingesteld
  }

  updateDescription(newDescription: string) {
    this.description = newDescription;
  }

  setGitRepo(url: string) {
    this.gitRepoUrl = url;
  }
}
```

### Strategische Voordelen voor Qreatify:
- **Vereenvoudigde Stack:** We kunnen mogelijk de PostgreSQL-database en Drizzle ORM volledig vervangen door Cloudstate. Dit vermindert de complexiteit, het aantal afhankelijkheden en potentiële foutbronnen.
- **Snellere Ontwikkeling:** Het definiëren van datamodellen en API's gebeurt in één enkele TypeScript-klasse, wat de ontwikkelsnelheid aanzienlijk kan verhogen.
- **Type Safety End-to-End:** Omdat zowel de "backend" (Cloudstate) als de frontend (React) TypeScript gebruiken, is er volledige type-veiligheid over de hele stack.

### Volgende Stappen:
1. **Experimenteren:** Zet een klein proefproject op om de mogelijkheden en beperkingen van Cloudstate te verkennen.
2. **Migratieplan:** Evalueer de haalbaarheid van het migreren van de bestaande PostgreSQL/Drizzle-data naar Cloudstate-objecten.
3. **Prestatieanalyse:** Test de prestaties van Cloudstate voor de use case van Qreatify.

**Referenties:**
- [Cloudstate GitHub Repository](https://github.com/freestyle-sh/cloudstate)
