# Masterplan: Uitvoeringsomgevingen

Dit document behandelt de verschillende manieren waarop code kan worden uitgevoerd en beheerd op het Freestyle-platform. Dit is de kern van de "werkbank" van de Qreatify AI-agent.

## 1. Dev Servers

Dev Servers zijn direct beschikbare, kortstondige ontwikkelomgevingen die gekoppeld zijn aan een Git-repository. Ze zijn de primaire omgeving waar de AI aan code werkt.

### Belangrijkste Kenmerken:
- **Direct Beschikbaar:** Dev servers starten extreem snel, mede dankzij een geavanceerd caching-mechanisme.
- **Git-gekoppeld:** Ze zijn altijd gesynchroniseerd met een specifieke branch van een Git-repo. De Git-repo is de "source of truth".
- **Auto-waking:** Als een server inactief is, wordt hij in slaapstand gezet. Bij een nieuw verzoek (bv. een API-call van de AI) wordt hij automatisch en direct weer wakker.
- **Ingebouwde Tools:** Ze komen met een web-terminal, een web-versie van VSCode en een beheerde Git-identiteit, waardoor de AI direct commits kan pushen.
- **Niet-persistent:** De lokale staat van een dev server is niet gegarandeerd persistent. Dit is geen probleem, omdat alle belangrijke wijzigingen direct naar Git worden gepusht.

### Toepassing voor Qreatify:
- Dit is de **standaard werkomgeving** voor elk Qreatify-project. Wanneer een gebruiker een app bouwt, wordt er op de achtergrond een Dev Server opgestart die gekoppeld is aan hun (GitHub) repository.
- De preview-URL die de gebruiker in de rechterkolom ziet, is direct afkomstig van deze Dev Server.
- De AI-agent gebruikt de MCP-interface van de Dev Server om bestanden te lezen, te schrijven en commando's (zoals `npm install`) uit te voeren.

## 2. VM Forking

Dit is een unieke en extreem krachtige feature van Freestyle. Het stelt ons in staat om een volledige, actieve VM (inclusief geheugen en lopende processen) vrijwel onmiddellijk te kopiëren.

### Belangrijkste Kenmerken:
- **Instant Kopiëren:** Dankzij een "Copy on Write" systeem duurt het forken van een VM milliseconden.
- **Volledige Staat:** De fork is een perfecte replica van het origineel op het moment van forken.
- **Isolatie:** Wijzigingen in een geforkte VM hebben geen invloed op het origineel.

### Strategische Toepassing voor Qreatify:
- **Experimentele Features (Branches):** Wanneer de AI een nieuwe feature probeert te bouwen, kan dit op een fork van de hoofd-VM gebeuren. De gebruiker kan de voortgang zien op een aparte preview-URL. Als het experiment mislukt, wordt de fork gewoon weggegooid. Als het slaagt, kunnen de wijzigingen (via Git) worden gemerged.
- **Parallelle Ideeën (A/B-testen):** Als de AI meerdere oplossingen voor een probleem heeft, kan het de VM forken voor elke oplossing en ze parallel uitwerken. Qreatify zou de gebruiker dan kunnen laten kiezen welke versie hij/zij het beste vindt.
- **"Undo" Functionaliteit:** We kunnen een snapshot (fork) maken voordat de AI een grote wijziging doorvoert. Als de gebruiker niet tevreden is, kunnen we direct terugkeren naar de staat van vóór de wijziging.

## 3. Serverless Code Execution

Dit is bedoeld voor het snel en eenmalig uitvoeren van kleine stukjes TypeScript-code, zonder dat er een volledige VM of Dev Server voor nodig is.

### Belangrijkste Kenmerken:
- **Extreem Snel:** Gemiddelde uitvoeringstijd is <150ms.
- **Geen VM Overhead:** Gebruikt dezelfde isolatietechnologie als browser-tabs.
- **Arbitraire NPM-packages:** Je kunt on-the-fly NPM-packages specificeren die nodig zijn voor de uitvoering.
- **Staatloos:** De staat wordt niet bewaard na uitvoering.

### Toepassing voor Qreatify:
- **Validatie en Analyse:** Voor kleine, snelle taken die geen volledige projectcontext nodig hebben. Bijvoorbeeld:
    - Het valideren van een door de gebruiker opgegeven API-sleutel.
    - Het uitvoeren van een klein script om data uit een externe API op te halen.
    - Het snel analyseren van een stukje code dat de gebruiker in de chat plakt, zonder de Dev Server te hoeven gebruiken.
- **Pre-processing:** Voordat een groot AI-traject wordt gestart, kunnen we serverless functies gebruiken om de initiële prompt van de gebruiker te analyseren en te verrijken.

**Referenties:**
- [Freestyle Doc: Dev Servers Overview](/dev-servers/index)
- [Freestyle Doc: VM Forking](/vms/index/forking)
- [Freestyle Doc: Serverless Code Execution Overview](/code-execution/overview)
