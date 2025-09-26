# Masterplan: Strategische Features & Volgende Stappen

Dit document schetst hoe we geavanceerde, platform-specifieke features zoals analytics, monetization en settings kunnen bouwen bovenop de kernfunctionaliteiten van Freestyle.

## 1. Analytics

Freestyle heeft geen ingebouwde analytics-dienst, maar we kunnen dit zelf bouwen met behulp van de beschikbare tools.

### Implementatiestrategie:
- **Data-opslag met Cloudstate:** We kunnen een `AnalyticsEvent`-klasse aanmaken in Cloudstate. Elke keer dat een belangrijke gebeurtenis plaatsvindt (bv. een app wordt gebouwd, een gebruiker logt in, een feature wordt toegevoegd), wordt er een nieuw object van deze klasse aangemaakt en opgeslagen.
- **Dataverzameling via Serverless Functions:** Om de hoofdapplicatie niet te vertragen, kunnen belangrijke events worden doorgestuurd naar een serverless functie. Deze functie verwerkt de data en slaat het gestructureerd op in Cloudstate.
- **Dashboard:** De verzamelde data kan worden gevisualiseerd in een admin-dashboard binnen Qreatify.

## 2. Monetization

Monetization is een cruciaal onderdeel. We kunnen een abonnementsmodel (subscription-based) implementeren.

### Implementatiestrategie:
- **Gebruikersmodel in Cloudstate:** Breid het gebruikersmodel (dat we in Cloudstate kunnen bouwen) uit met abonnementsgegevens (bv. `plan: 'free' | 'pro'`, `credits: number`).
- **Integratie met Stripe:** Gebruik de officiële Stripe NPM-package in een **Dev Server** of **Serverless Function** om betalingen te verwerken.
    - **Checkout Sessies:** Maak een checkout-sessie aan wanneer een gebruiker wil upgraden.
    - **Webhooks:** Luister naar webhooks van Stripe (bv. `checkout.session.completed`) om de status van het abonnement in de Cloudstate-database van de gebruiker bij te werken.
- **Features koppelen aan abonnementen:**
    - **Pro-features:** Koppel geavanceerde features aan een "pro"-status. Denk aan:
        - **Custom Domains:** De mogelijkheid om een eigen domeinnaam te koppelen.
        - **Meer AI Credits:** Een hoger aantal "builds" of "edits" per maand.
        - **Geavanceerde Analytics:** Toegang tot een gedetailleerd dashboard over hun app-gebruik.
        - **VM Forking:** De mogelijkheid om experimentele versies van hun app te laten bouwen.

## 3. Settings

Een instellingenpagina is essentieel voor gebruikersbeheer.

### Implementatiestrategie:
- **Data-opslag met Cloudstate:** Alle gebruikersinstellingen (profielinformatie, voorkeuren, gekoppelde accounts zoals GitHub, etc.) worden opgeslagen in een `UserSettings` Cloudstate-klasse.
- **API via Cloudstate:** De methoden om instellingen te lezen en bij te werken (`updateProfile`, `linkGithubAccount`, etc.) worden direct in de Cloudstate-klasse gedefinieerd en zijn automatisch beschikbaar als API-eindpunten.
- **Frontend:** De instellingenpagina in de frontend communiceert direct en type-veilig met de `UserSettings`-klasse via de `useCloud`-hook.

## Conclusie van het Masterplan

Door de unieke en krachtige features van Freestyle te combineren, kunnen we Qreatify bouwen als een robuust, schaalbaar en zeer ontwikkelaar-vriendelijk platform.

**De belangrijkste strategische keuzes zijn:**
1.  **Cloudstate als primaire database:** Dit vereenvoudigt de stack enorm en versnelt de ontwikkeling.
2.  **GitHub Sync voor transparantie:** Gebruikers behouden de volledige controle over hun code, wat vertrouwen wekt.
3.  **VM Forking voor geavanceerde AI-features:** Dit stelt Qreatify in staat om unieke, krachtige AI-mogelijkheden aan te bieden die concurrenten niet hebben.
4.  **Monetization rondom Pro-features:** Creëer een duurzaam businessmodel door te monetizen op de meest waardevolle features zoals custom domains en verhoogd gebruik.

Dit masterplan biedt een solide basis voor de verdere ontwikkeling van het Qreatify-platform.
