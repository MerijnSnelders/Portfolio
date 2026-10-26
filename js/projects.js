// All project content lives here. To add a project: add one object to this list and drop
// its videos/poster in /videos and /images (<id>-desktop.mp4, <id>-mobile.mp4, <id>-desktop.jpg, <id>-mobile.jpg).
// `tech` entries are keys of TECH below. `links` is optional; only public links belong here.

export const TECH = {
    java: { label: 'Java (Spring)', icon: 'openjdk' },
    springboot: { label: 'Spring Boot', icon: 'springboot' },
    react: { label: 'React', icon: 'react' },
    typescript: { label: 'TypeScript', icon: 'typescript' },
    docker: { label: 'Docker', icon: 'docker' },
    flyway: { label: 'Flyway', icon: 'flyway' },
    csharp: { label: 'C# / Razor Pages', icon: 'csharp' },
    sql: { label: 'SQL', icon: 'lucide-database' },
    javascript: { label: 'JavaScript', icon: 'javascript' },
    html: { label: 'HTML', icon: 'html5' },
    gitlab: { label: 'GitLab', icon: 'gitlab' },
    websockets: { label: 'WebSockets' },
    oauth: { label: 'OAuth 2.0' },
    ocr: { label: 'OCR' },
    winforms: { label: 'Windows Forms' },
    unity: { label: 'Unity', icon: 'unity' },
    csharpgame: { label: 'C#', icon: 'csharp' },
};

export const projects = [
    {
        id: 'hattricket',
        name: 'Hattricket',
        context: { nl: 'Fontys ICT-project', en: 'Fontys ICT project' },
        tagline: {
            nl: 'Voetbaltickets kopen met een stoelenkaart die live meebeweegt.',
            en: 'Buying football tickets with a seat map that updates live.',
        },
        summary: {
            nl: 'Een real-time webapplicatie voor voetbaltickets die externe wedstrijddata combineert met stoelreservering.',
            en: 'A real-time web app for football tickets that combines external match data with seat reservation.',
        },
        body: {
            nl: [
                'Hattricket is een full-stack applicatie voor het kopen van voetbaltickets. De kernuitdaging: dynamische data van een externe wedstrijd-API verwerken en tegelijk voorkomen dat twee mensen dezelfde stoel boeken.',
                'De backend draait op Java Spring en regelt de logica en de beveiligde inlog met Google (OAuth 2.0). De frontend is gebouwd met React en TypeScript (Vite). Via WebSockets wordt een stoel direct voor iedereen gemarkeerd zodra iemand hem kiest. De hele applicatie draait in Docker en de database wordt beheerd met Flyway-migraties.',
            ],
            en: [
                'Hattricket is a full-stack application for buying football tickets. The core challenge: processing dynamic data from an external match API while making sure two people can never book the same seat.',
                'The backend runs on Java Spring and handles the logic and secure Google sign-in (OAuth 2.0). The frontend is built with React and TypeScript (Vite). WebSockets mark a seat for everyone the moment someone selects it. The whole application runs in Docker and the database is versioned with Flyway migrations.',
            ],
        },
        roles: { nl: ['Full-stack developer'], en: ['Full-stack developer'] },
        tech: ['java', 'react', 'typescript', 'websockets', 'oauth', 'docker', 'flyway'],
        links: [
            { label: { nl: 'Backend op GitHub', en: 'Backend on GitHub' }, href: 'https://github.com/MerijnSnelders/hattrickets_backend' },
            { label: { nl: 'Frontend op GitHub', en: 'Frontend on GitHub' }, href: 'https://github.com/MerijnSnelders/hattrickets_frontend' },
        ],
    },
    {
        id: 'breakingpoint',
        name: 'BreakingPoint',
        context: { nl: 'Fontys ICT duo-project', en: 'Fontys ICT duo project' },
        landscape: true,
        tagline: {
            nl: 'Een platformgame die je zo zwaar maakt dat je wilt stoppen. Lukt het toch?',
            en: 'A platformer built to make you want to quit. Can you finish it anyway?',
        },
        summary: {
            nl: 'Een 2D rage-bait platformer in Unity. Haal het einde van elk level zonder te rage-quitten, en speel hem gewoon in je browser.',
            en: 'A 2D rage-bait platformer in Unity. Reach the end of every level without rage-quitting, and play it right in your browser.',
        },
        body: {
            nl: [
                'BreakingPoint is een 2D rage-bait platformer: het doel is het einde van elk level halen zonder te rage-quitten. Het motto van het spel is "als jij stopt, winnen wij". We maakten het met z\'n tweeën in Unity en C#, met meerdere levels, checkpoints, een menu, sounddesign en een trailer.',
                'Ik maakte de achtergrond, een deel van de levels en de animaties en besturing van het personage. Krasen deed het grootste deel van het leveldesign, het geluid, het menu en de checkpoints.',
            ],
            en: [
                'BreakingPoint is a 2D rage-bait platformer: the goal is to reach the end of each level without rage-quitting. The game\'s motto is "if you quit, we win". We made it as a duo in Unity and C#, with multiple levels, checkpoints, a menu, sound design and a trailer.',
                'I made the background, part of the levels and the character animations and controls. Krasen did most of the level design, the sound, the menu and the checkpoints.',
            ],
        },
        roles: {
            nl: ['Achtergrond', 'Animaties en besturing', 'Deel van het leveldesign'],
            en: ['Background', 'Animations and controls', 'Part of the level design'],
        },
        tech: ['unity', 'csharpgame'],
        with: [{ name: 'krasen67', href: 'https://github.com/krasen67' }],
        play: {
            // itch.io blocks hotlinking html-classic.itch.zone directly, so use its official embed route (upload id)
            src: 'https://itch.io/embed-upload/15536610?color=0f172a',
            page: 'https://krasen78.itch.io/dungeon-game',
            width: 1300,
            height: 740,
        },
        links: [
            { label: { nl: 'Code op GitHub', en: 'Code on GitHub' }, href: 'https://github.com/MerijnSnelders/BreakingPoint' },
        ],
    },
    {
        id: 'sioux',
        name: 'Digitaal Pakketbeheer',
        context: { nl: 'Groepsproject voor Sioux', en: 'Group project for Sioux' },
        tagline: {
            nl: 'Van handmatige pakketlijstjes naar een scan en klaar.',
            en: 'From manual parcel lists to scan and done.',
        },
        summary: {
            nl: 'Een webapplicatie voor het geautomatiseerd registreren van pakketten, met OCR die labels uitleest.',
            en: 'A web application that registers parcels automatically, with OCR that reads the labels.',
        },
        body: {
            nl: [
                'Voor Sioux Technologies bouwden we met ons projectteam een dashboard dat de handmatige registratie van in- en uitgaande kantoorpakketten vervangt. Secretaresses kunnen pakketten snel en foutloos registreren en medewerkers kunnen ze traceerbaar ophalen. De oplossing bestaat uit een Java Spring backend en een React/TypeScript frontend.',
                'Mijn grootste bijdrage was de OCR-functionaliteit in de frontend: die leest de gegevens van het fysieke label en vult ze in. Daarnaast bouwde ik meerdere React-componenten van het dashboard, werkte ik mee aan de backend-logica en was ik scrum master van het team.',
            ],
            en: [
                'For Sioux Technologies, our project team built a dashboard that replaces the manual registration of incoming and outgoing office parcels. Secretaries can register parcels quickly and without mistakes, and employees can collect them with a clear trail. The solution consists of a Java Spring backend and a React/TypeScript frontend.',
                'My biggest contribution was the OCR functionality in the frontend, which reads the data from the physical label and fills it in. I also built several React components of the dashboard, worked on the backend logic and was the scrum master of the team.',
            ],
        },
        roles: {
            nl: ['Full-stack developer', 'Scrum master', 'OCR in de frontend'],
            en: ['Full-stack developer', 'Scrum master', 'OCR in the frontend'],
        },
        tech: ['java', 'react', 'typescript', 'ocr', 'gitlab'],
        links: [],
    },
    {
        id: 'cinemavault',
        name: 'CinemaVault',
        context: { nl: 'Fontys ICT-project', en: 'Fontys ICT project' },
        tagline: {
            nl: 'Je kijklijst, reviews en tips die bij je smaak passen.',
            en: 'Your watchlist, reviews and tips that match your taste.',
        },
        summary: {
            nl: 'Een film- en serieplatform met kijklijst, reviews en aanbevelingen, plus een desktop-app voor moderatie.',
            en: 'A movie and series platform with watchlist, reviews and recommendations, plus a desktop app for moderation.',
        },
        body: {
            nl: [
                'CinemaVault is een C# webapplicatie (Razor Pages) voor films en series. Gebruikers houden een kijklijst bij, schrijven reviews en krijgen aanbevelingen op basis van hun eigen voorkeuren en genres. Alle data staat in een SQL-database.',
                'Bij het platform hoort ook een Windows Forms-applicatie waarmee de beheerders films en series toevoegen, ongepaste reviews markeren en gebruikers kunnen bannen.',
            ],
            en: [
                'CinemaVault is a C# web application (Razor Pages) for movies and series. Users keep a watchlist, write reviews and get recommendations based on their own preferences and genres. All data lives in a SQL database.',
                'The platform also comes with a Windows Forms application that lets the owners add movies and series, flag inappropriate reviews and ban users.',
            ],
        },
        roles: { nl: ['Full-stack developer'], en: ['Full-stack developer'] },
        tech: ['csharp', 'winforms', 'sql', 'html', 'javascript'],
        links: [
            { label: { nl: 'Code op GitHub', en: 'Code on GitHub' }, href: 'https://github.com/MerijnSnelders/Cinemavault' },
        ],
    },
];
