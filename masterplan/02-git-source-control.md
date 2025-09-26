# Masterplan: Git & Broncodebeheer

Dit document beschrijft de geavanceerde Git-mogelijkheden van Freestyle, waaronder de Git Objects API en GitHub Sync, en de strategische waarde ervan voor Qreatify.

## 1. GitHub Synchronization

Freestyle biedt een naadloze, bidirectionele synchronisatie met GitHub. Dit is een krachtige feature die het beste van twee werelden combineert.

### Belangrijkste Kenmerken:
- **Automatische Sync:** Wijzigingen die naar Freestyle of naar de gekoppelde GitHub-repository worden gepusht, worden automatisch met elkaar gesynchroniseerd.
- **Samenwerking:** Gebruikers kunnen hun bestaande GitHub-workflow (inclusief pull requests, issues, etc.) blijven gebruiken, terwijl de applicatie draait op de infrastructuur van Freestyle.
- **Conflictbeheer:** Het systeem detecteert wanneer branches uiteenlopen en zal nooit automatisch data overschrijven. Conflicten moeten handmatig worden opgelost.

### Toepassing voor Qreatify:
- **"Bring Your Own Repo":** Dit is een cruciale feature voor Qreatify. We kunnen gebruikers toestaan om een bestaande of nieuwe GitHub-repository te koppelen aan hun Qreatify-project.
- **Transparantie en Eigendom:** De gebruiker heeft altijd de volledige code in eigen beheer in hun eigen GitHub-account. Qreatify fungeert als de "AI-ontwikkelaar" die commits naar hun repository pusht.
- **Workflow-integratie:** Wijzigingen die de AI van Qreatify maakt, zijn zichtbaar als commits in de GitHub-repository. Gebruikers kunnen hierop reageren, issues aanmaken, of zelfs zelf code aanpassen en terug pushen.

### Implementatiestappen:
1. **GitHub App Aanmaken:** Volg de Freestyle-documentatie om een eigen GitHub App voor Qreatify aan te maken.
2. **Koppelingsproces:** Bouw een UI-flow waarin gebruikers Qreatify's GitHub App kunnen installeren op hun repositories.
3. **API-integratie:** Gebruik de Freestyle SDK/API om de Freestyle Git Repo die voor een gebruiker wordt aangemaakt, te koppelen aan hun geselecteerde GitHub-repository.

## 2. Git Objects API

Deze low-level API geeft programmatische toegang tot de interne structuur van een Git-repository die op Freestyle wordt gehost.

### Belangrijkste Kenmerken:
- **Toegang tot Git-objecten:** Je kunt direct blobs (bestandsinhoud), trees (mappenstructuur), commits en tags opvragen.
- **Analyse van Code:** De API maakt het mogelijk om de code van een project te analyseren zonder het project te hoeven clonen of een volledige dev server te starten.
- **Inhoud Inspecteren:** Lees de inhoud van specifieke bestanden op basis van een commit-hash.

### Toepassing voor Qreatify:
- **AI-inzicht verbeteren:** De AI-agent kan deze API gebruiken om snel de structuur en inhoud van een project te begrijpen. Bijvoorbeeld, om `package.json` te lezen en de gebruikte technologieën te identificeren.
- **"Project herstellen" of "Rollback":** We kunnen een feature bouwen waarmee gebruikers hun project kunnen terugzetten naar een vorige commit. De Git Objects API kan worden gebruikt om de commit-geschiedenis te visualiseren.
- **Code-analyse Tools:** Qreatify zou extra diensten kunnen aanbieden, zoals het analyseren van de codekwaliteit of het identificeren van verouderde afhankelijkheden, door de bestanden via deze API te scannen.

### Conclusie:
Door de Git-features van Freestyle te omarmen, kan Qreatify zich positioneren als een transparant en ontwikkelaar-vriendelijk platform. Gebruikers behouden de volledige controle en eigendom over hun code op GitHub, terwijl de AI van Qreatify fungeert als een geïntegreerde partner in hun ontwikkelproces.

**Referenties:**
- [Freestyle Doc: GitHub Synchronization](/git/github-sync)
- [Freestyle Doc: The Git Objects API](/git/git-objects-api)
