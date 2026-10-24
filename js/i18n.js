// Static page text. Elements opt in with data-i18n="key" (textContent), data-i18n-html="key" (innerHTML)
// or data-i18n-attr="attr:key" (e.g. aria-label:menuOpen). Project text lives in projects.js.

const STORAGE_KEY = 'lang';
const SUPPORTED = ['nl', 'en'];

export const strings = {
    nl: {
        docTitle: 'Merijn Snelders | Junior Software Developer',
        docDescription: 'Portfolio van Merijn Snelders, derdejaars ICT-student aan Fontys uit Nuenen. Full-stack projecten met Java, React en C#. Beschikbaar voor een startersfunctie.',
        skip: 'Naar de inhoud',
        navHome: 'Home',
        navProjects: 'Projecten',
        navAbout: 'Over mij',
        navContact: 'Contact',
        menuOpen: 'Menu openen',
        menuClose: 'Menu sluiten',
        terminalOpen: 'Open terminal',
        terminalClose: 'Sluit terminal',
        langSwitch: 'Taal',

        heroGreeting: 'Hoi, ik ben',
        heroRole: 'Junior software developer uit Nuenen',
        heroCtaProjects: 'Bekijk mijn werk',
        heroCtaContact: 'Neem contact op',
        factLocation: 'Nuenen / Eindhoven',
        factStudy: '3e jaar ICT aan Fontys',
        factAvailable: 'Direct beschikbaar',
        photoAlt: 'Merijn Snelders',

        projectsTitle: 'Projecten',
        projectsIntro: 'Drie projecten waar ik trots op ben. Klik op een scherm voor de details.',
        projectDetails: 'Bekijk projectdetails',
        projectBack: 'Terug naar alle projecten',
        projectRole: 'Mijn rol',
        projectTech: 'Technologie',
        projectLinks: 'Code',
        projectPrev: 'Vorig project',
        projectNext: 'Volgend project',
        projectNoLinks: 'Geen openbare code beschikbaar.',
        videoFallback: 'Je browser kan deze video niet afspelen.',

        aboutTitle: 'Over mij',
        skillsTitle: 'Vaardigheden',
        skillsLanguages: 'Talen',
        skillsFrameworks: 'Frameworks en bibliotheken',
        skillsTools: 'Tools en platformen',

        contactTitle: 'Contact',
        contactIntro: 'Zoek je een starter in je team of wil je gewoon even kennismaken? Stuur me een mail of vind me online.',
        contactMail: 'E-mail',
        contactLinkedin: 'LinkedIn',
        contactGithub: 'GitHub',

        footer: 'Gebouwd door Merijn Snelders.',
        notFoundTitle: 'Deze pagina bestaat niet',
        notFoundText: 'Misschien is de link verouderd. Ga terug naar de homepage.',
        notFoundBack: 'Naar de homepage',

        // Terminal
        tWelcome: 'Welkom bij de terminal van Merijn! Typ <span class="command-prompt">help</span> voor een lijst met commando\'s.',
        tHelp: [
            'Beschikbare commando\'s:',
            '  <span class="command-prompt">help</span>          Toont deze lijst.',
            '  <span class="command-prompt">about</span>         Een korte introductie.',
            '  <span class="command-prompt">skills</span>        Mijn vaardigheden.',
            '  <span class="command-prompt">projects</span>      Mijn projecten.',
            '  <span class="command-prompt">contact</span>       Scrollt naar het contact.',
            '  <span class="command-prompt">open [naam]</span>   Opent een link (linkedin, github) of project.',
            '  <span class="command-prompt">lang [nl|en]</span>  Wisselt de taal.',
            '  <span class="command-prompt">ronaldo</span>       Een speciale boodschap.',
            '  <span class="command-prompt">clear</span>         Maakt de terminal leeg.',
            '  <span class="command-prompt">close</span>         Sluit de terminal.',
        ],
        tProjects: 'Mijn projecten:',
        tOpenHint: 'typ \'open {id}\'',
        tOpenUsage: 'Gebruik: open [naam] (bv. \'open linkedin\' of \'open hattricket\')',
        tOpening: '{name} wordt geopend...',
        tOpenError: 'Fout: kan \'{arg}\' niet openen.',
        tUnknown: 'Onbekend commando: {cmd}. Typ \'help\' voor een lijst.',
        tContact: 'Scrollen naar contact...',
        tClosing: 'Terminal wordt gesloten...',
        tLangSet: 'Taal gewisseld naar Nederlands.',
        tLangUsage: 'Gebruik: lang nl of lang en',
        tQuote: '"In my mind, I am always the best" - Ronaldo',
    },
    en: {
        docTitle: 'Merijn Snelders | Junior Software Developer',
        docDescription: 'Portfolio of Merijn Snelders, third-year ICT student at Fontys from Nuenen, the Netherlands. Full-stack projects with Java, React and C#. Available for a starter position.',
        skip: 'Skip to content',
        navHome: 'Home',
        navProjects: 'Projects',
        navAbout: 'About me',
        navContact: 'Contact',
        menuOpen: 'Open menu',
        menuClose: 'Close menu',
        terminalOpen: 'Open terminal',
        terminalClose: 'Close terminal',
        langSwitch: 'Language',

        heroGreeting: 'Hi, I\'m',
        heroRole: 'Junior software developer from Nuenen, NL',
        heroCtaProjects: 'See my work',
        heroCtaContact: 'Get in touch',
        factLocation: 'Nuenen / Eindhoven',
        factStudy: '3rd-year ICT at Fontys',
        factAvailable: 'Available now',
        photoAlt: 'Merijn Snelders',

        projectsTitle: 'Projects',
        projectsIntro: 'Three projects I\'m proud of. Click a screen for the details.',
        projectDetails: 'View project details',
        projectBack: 'Back to all projects',
        projectRole: 'My role',
        projectTech: 'Technology',
        projectLinks: 'Code',
        projectPrev: 'Previous project',
        projectNext: 'Next project',
        projectNoLinks: 'No public code available.',
        videoFallback: 'Your browser can\'t play this video.',

        aboutTitle: 'About me',
        skillsTitle: 'Skills',
        skillsLanguages: 'Languages',
        skillsFrameworks: 'Frameworks and libraries',
        skillsTools: 'Tools and platforms',

        contactTitle: 'Contact',
        contactIntro: 'Looking for a starter in your team, or just want to say hi? Send me an email or find me online.',
        contactMail: 'Email',
        contactLinkedin: 'LinkedIn',
        contactGithub: 'GitHub',

        footer: 'Built by Merijn Snelders.',
        notFoundTitle: 'This page doesn\'t exist',
        notFoundText: 'The link may be out of date. Head back to the homepage.',
        notFoundBack: 'Back to the homepage',

        tWelcome: 'Welcome to Merijn\'s terminal! Type <span class="command-prompt">help</span> for a list of commands.',
        tHelp: [
            'Available commands:',
            '  <span class="command-prompt">help</span>          Shows this list.',
            '  <span class="command-prompt">about</span>         A short introduction.',
            '  <span class="command-prompt">skills</span>        My skills.',
            '  <span class="command-prompt">projects</span>      My projects.',
            '  <span class="command-prompt">contact</span>       Scrolls to the contact section.',
            '  <span class="command-prompt">open [name]</span>   Opens a link (linkedin, github) or project.',
            '  <span class="command-prompt">lang [nl|en]</span>  Switches the language.',
            '  <span class="command-prompt">ronaldo</span>       A special message.',
            '  <span class="command-prompt">clear</span>         Clears the terminal.',
            '  <span class="command-prompt">close</span>         Closes the terminal.',
        ],
        tProjects: 'My projects:',
        tOpenHint: 'type \'open {id}\'',
        tOpenUsage: 'Usage: open [name] (e.g. \'open linkedin\' or \'open hattricket\')',
        tOpening: 'Opening {name}...',
        tOpenError: 'Error: can\'t open \'{arg}\'.',
        tUnknown: 'Unknown command: {cmd}. Type \'help\' for a list.',
        tContact: 'Scrolling to contact...',
        tClosing: 'Closing terminal...',
        tLangSet: 'Language switched to English.',
        tLangUsage: 'Usage: lang nl or lang en',
        tQuote: '"In my mind, I am always the best" - Ronaldo',
    },
};

// Personal copy for the hero and the about section.
// TODO(merijn): rewrite these in your own words; they are drafts built from the projects.
export const copy = {
    nl: {
        heroLead: 'Derdejaars ICT-student aan Fontys in Eindhoven. Ik bouw full-stack webapps met Java, React en C# en ben nu beschikbaar voor een startersfunctie.',
        aboutP1: 'Ik ben Merijn, derdejaars ICT-student aan Fontys in Eindhoven en woon in Nuenen. Tijdens mijn studie bouwde ik een ticketapp met realtime stoelselectie, een pakketdashboard voor Sioux met OCR en een filmplatform in C#.',
        aboutP2: 'Ik werk het liefst full-stack: van de database en de API tot de interface. Ik ben nu beschikbaar voor een startersfunctie en praat graag over wat jullie bouwen.',
    },
    en: {
        heroLead: 'Third-year ICT student at Fontys in Eindhoven. I build full-stack web apps with Java, React and C# and I\'m available for a starter position now.',
        aboutP1: 'I\'m Merijn, a third-year ICT student at Fontys in Eindhoven, living in Nuenen. During my studies I built a ticket app with real-time seat selection, a parcel dashboard for Sioux with OCR and a movie platform in C#.',
        aboutP2: 'I prefer working full-stack: from the database and the API to the interface. I\'m available for a starter position now and happy to talk about what you\'re building.',
    },
};

export const skills = [
    { titleKey: 'skillsLanguages', items: [
        { label: 'Java', icon: 'openjdk' },
        { label: 'C#', icon: 'csharp' },
        { label: 'HTML', icon: 'html5' },
        { label: 'JavaScript', icon: 'javascript' },
        { label: 'TypeScript', icon: 'typescript' },
        { label: 'SQL', icon: 'lucide-database' },
    ] },
    { titleKey: 'skillsFrameworks', items: [
        { label: 'Spring Boot', icon: 'springboot' },
        { label: 'React', icon: 'react' },
        { label: 'Tailwind CSS', icon: 'tailwindcss' },
    ] },
    { titleKey: 'skillsTools', items: [
        { label: 'Docker', icon: 'docker' },
        { label: 'GitLab', icon: 'gitlab' },
        { label: 'GitHub', icon: 'github' },
    ] },
];

let current = 'nl';
const listeners = [];

export function getLang() { return current; }
export function t(key, vars = {}) {
    const value = strings[current][key] ?? strings.nl[key] ?? key;
    if (typeof value !== 'string') return value;
    return value.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
}
export function onLangChange(fn) { listeners.push(fn); }

function detect() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (SUPPORTED.includes(saved)) return saved;
    } catch { /* storage can be blocked, fall through to the browser language */ }
    const browser = (navigator.language || 'nl').slice(0, 2).toLowerCase();
    return browser === 'nl' ? 'nl' : browser === 'en' ? 'en' : 'nl';
}

export function applyStatic(root = document) {
    root.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    root.querySelectorAll('[data-i18n-html]').forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
    root.querySelectorAll('[data-i18n-attr]').forEach((el) => {
        el.dataset.i18nAttr.split(';').forEach((pair) => {
            const [attr, key] = pair.split(':');
            el.setAttribute(attr.trim(), t(key.trim()));
        });
    });
}

export function setLang(lang, { persist = true } = {}) {
    if (!SUPPORTED.includes(lang)) return;
    current = lang;
    document.documentElement.lang = lang;
    document.title = t('docTitle');
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('docDescription'));
    document.querySelectorAll('.lang-btn').forEach((btn) => {
        btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });
    applyStatic();
    if (persist) {
        try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* ignore */ }
    }
    listeners.forEach((fn) => fn(lang));
}

export function initLang() {
    setLang(detect(), { persist: false });
}
