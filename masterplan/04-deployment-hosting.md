# Masterplan: Deployment & Hosting

Dit document beschrijft hoe Qreatify het Freestyle-platform kan gebruiken voor het implementeren van applicaties en het beheren van domeinnamen voor gebruikers.

## 1. Deployment van Applicaties

Freestyle is ontworpen om verschillende soorten webapplicaties te hosten. Voor Qreatify, dat zich richt op mobiele apps, is de documentatie over Expo het meest relevant.

### Expo Web Deployment
Hoewel Expo primair voor native mobiele apps is, kan het ook een webversie van de app compileren. Freestyle kan deze webversie hosten, wat perfect is voor de live-previews in de Qreatify-interface.

**Belangrijkste Kenmerken:**
- **Build on Freestyle:** Je kunt de broncode van het Expo-project direct naar Freestyle sturen, en Freestyle zal het build-proces voor je uitvoeren. Dit vereist de `build: true` optie in de deploy-configuratie.
- **Static Hosting:** Expo-apps worden standaard gecompileerd tot statische bestanden (HTML, JS, CSS). Freestyle kan deze bestanden serveren met een eenvoudige serverconfiguratie.
- **Server-Side Rendering (SSR):** Freestyle ondersteunt ook Expo-apps die gebruikmaken van server-side rendering en API-routes, wat meer geavanceerde functionaliteit mogelijk maakt.

### Toepassing voor Qreatify:
- **Live Previews:** De primaire toepassing is het hosten van de web-versie van de door de AI gegenereerde Expo-app. Dit is wat de gebruiker ziet in het 70%-paneel van de chat-interface.
- **Productie-apps:** Hoewel het eindproduct een native mobiele app is, kan Qreatify als extra dienst ook een webversie van de app voor de gebruiker hosten op een productie-URL.

## 2. Domeinbeheer

Freestyle biedt een complete oplossing voor het beheren van domeinnamen, zowel voor je eigen platform als voor je gebruikers.

### Belangrijkste Kenmerken:
- **Domeinverificatie:** Gebruikers kunnen bewijzen dat ze eigenaar zijn van een domein door een `TXT`-record toe te voegen aan hun DNS-instellingen.
- **Automatische Certificaten:** Eenmaal geverifieerd, zorgt Freestyle automatisch voor SSL-certificaten voor het hoofddomein en alle subdomeinen.
- **Deployen naar (Sub)domeinen:** Na verificatie kan Qreatify applicaties implementeren op het hoofddomein van de gebruiker (bv. `mijnapp.com`) of op subdomeinen (bv. `preview.mijnapp.com`).

### Strategische Toepassing voor Qreatify:
- **Custom Preview URLs:** In plaats van een standaard `*.style.dev` domein, kunnen gebruikers een eigen domein koppelen voor hun live-previews. Bijvoorbeeld, `jouw-project.qreatify.app`.
- **White-labeling & Productie-hosting:** Dit is een potentiële **monetization**-mogelijkheid. Qreatify kan een premium feature aanbieden waarbij gebruikers hun voltooide app (de webversie) kunnen publiceren op hun eigen domeinnaam, volledig beheerd via Qreatify.
- **Self-service:** De API's van Freestyle maken het mogelijk om het hele proces van domeinverificatie en -koppeling te automatiseren binnen de Qreatify-interface, zonder dat de gebruiker het Qreatify-platform hoeft te verlaten.

### Implementatiestappen:
1. **Bouw een Domeinbeheer-UI:** Creëer een sectie in de gebruikersinstellingen van Qreatify waar gebruikers een domein kunnen toevoegen.
2. **Implementeer Verificatie-flow:** Gebruik de Freestyle API om een verificatiecode te genereren en geef de gebruiker de instructies om de `TXT`-record in te stellen.
3. **Koppel aan Projecten:** Eenmaal geverifieerd, geef gebruikers de optie om een domein of subdomein te koppelen aan een specifiek project.
4. **Deploy naar Domein:** Gebruik de `domains` parameter in de `.deployWeb()`-call van de Freestyle SDK om de app naar het gekozen domein te implementeren.

**Referenties:**
- [Freestyle Doc: Deploying Expo Projects](/web/frameworks/expo)
- [Freestyle Doc: Verify a Custom Domain](/web/domains)
