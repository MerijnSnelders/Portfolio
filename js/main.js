import { projects, TECH } from './projects.js';
import { initLang, setLang, getLang, t, onLangChange, copy, skills } from './i18n.js';
import { initTerminal } from './terminal.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const mainContent = $('#main-content');
const detailRoot = $('#project-detail');
const mobileQuery = window.matchMedia('(max-width: 767px)');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// ---------- helpers ----------
const icon = (name, extra = '') =>
    `<span class="icon" style="--icon:url(icons/${name}.svg);${extra}" aria-hidden="true"></span>`;

const pick = (field) => field[getLang()] ?? field.nl;

const chip = (label, iconName) =>
    `<span class="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full font-medium text-sm inline-flex items-center gap-2">${iconName ? icon(iconName) : ''}${label}</span>`;

const videoSrc = (id, kind) => `videos/${id}-${kind}.mp4`;
const posterSrc = (id, kind) => `images/${id}-${kind}.jpg`;

function safePlay(video) {
    const p = video.play();
    if (p) p.catch(() => { /* autoplay can be blocked; the poster stays visible */ });
}

// ---------- personal copy ----------
function renderCopy() {
    const text = copy[getLang()];
    $('#hero-lead').textContent = text.heroLead;
    $('#about-p1').textContent = text.aboutP1;
    $('#about-p2').textContent = text.aboutP2;
}

// ---------- skills ----------
function renderSkills() {
    $('#skills-root').innerHTML = skills.map((group) => `
        <div>
            <h4 class="text-lg font-semibold text-blue-600 mb-3">${t(group.titleKey)}</h4>
            <div class="flex flex-wrap gap-2">${group.items.map((s) => chip(s.label, s.icon)).join('')}</div>
        </div>`).join('');
}

// ---------- projects overview ----------
let swiper = null;

function renderProjects() {
    const root = $('#projects-root');
    const tabs = projects.map((p, i) => `
        <button class="project-tab ${i === 0 ? 'active' : ''}" data-project-id="${p.id}" aria-pressed="${i === 0}">${p.name}</button>`).join('');

    const videos = projects.map((p, i) => `
        <video class="project-video ${i === 0 ? 'active' : ''}" data-id="${p.id}" loop muted playsinline preload="auto"
               poster="${posterSrc(p.id, 'desktop')}" aria-label="${p.name}">
            <source src="${videoSrc(p.id, 'desktop')}" type="video/mp4">
        </video>`).join('');

    const slides = projects.map((p) => `
        <div class="swiper-slide">
            <div class="mobile-frame">
                <div class="mobile-notch"></div>
                <div class="mobile-screen" data-open="${p.id}" role="button" tabindex="0" aria-label="${t('projectDetails')}: ${p.name}">
                    <video loop muted playsinline preload="auto" poster="${posterSrc(p.id, 'mobile')}" data-id="${p.id}">
                        <source src="${videoSrc(p.id, 'mobile')}" type="video/mp4">
                    </video>
                </div>
            </div>
            <div class="mt-6 px-4">
                <h3 class="text-xl font-bold text-slate-900">${p.name}</h3>
                <p class="text-xs uppercase tracking-wide text-blue-600 font-semibold mt-1">${pick(p.context)}</p>
                <p class="mt-2 text-sm text-gray-600 max-w-sm mx-auto">${pick(p.summary)}</p>
                <a href="#project/${p.id}" class="mt-4 inline-flex items-center gap-1 text-blue-600 font-medium hover:underline">${t('projectDetails')} ${icon('lucide-arrow-right')}</a>
            </div>
        </div>`).join('');

    const first = projects[0];
    root.innerHTML = `
        <div class="hidden lg:block mt-16 text-center" id="desktop-viewer">
            <div class="laptop-frame" data-open="${first.id}" role="button" tabindex="0" aria-label="${t('projectDetails')}">
                <div class="laptop-screen">${videos}</div>
                <div class="laptop-base"></div>
            </div>
            <div class="flex justify-center gap-4 mt-8" role="group">${tabs}</div>
            <div class="mt-6 px-4">
                <h3 id="desktop-title" class="text-2xl font-bold text-slate-900"></h3>
                <p id="desktop-context" class="text-xs uppercase tracking-wide text-blue-600 font-semibold mt-1"></p>
                <p id="desktop-desc" class="mt-2 text-gray-600 max-w-lg mx-auto"></p>
                <a id="desktop-link" href="#project/${first.id}" class="mt-4 inline-flex items-center gap-1 text-blue-600 font-medium hover:underline"></a>
            </div>
        </div>
        <div class="lg:hidden mobile-swiper-container swiper mt-10" id="mobile-viewer">
            <div class="swiper-wrapper">${slides}</div>
            <div class="swiper-button-next" aria-label="${t('projectNext')}"></div>
            <div class="swiper-button-prev" aria-label="${t('projectPrev')}"></div>
        </div>`;

    setupDesktopViewer();
    setupMobileViewer();
    fillDesktopInfo(first.id);
}

let activeDesktopId = projects[0].id;

function fillDesktopInfo(id) {
    const p = projects.find((x) => x.id === id);
    activeDesktopId = id;
    $('#desktop-title').textContent = p.name;
    $('#desktop-context').textContent = pick(p.context);
    $('#desktop-desc').textContent = pick(p.summary);
    const link = $('#desktop-link');
    link.setAttribute('href', `#project/${id}`);
    link.innerHTML = `${t('projectDetails')} ${icon('lucide-arrow-right')}`;
    $('.laptop-frame').dataset.open = id;
}

function setupDesktopViewer() {
    const tabs = $$('#desktop-viewer .project-tab');
    const vids = $$('#desktop-viewer .project-video');

    function select(id) {
        tabs.forEach((tab) => {
            const on = tab.dataset.projectId === id;
            tab.classList.toggle('active', on);
            tab.setAttribute('aria-pressed', String(on));
        });
        vids.forEach((v) => {
            const on = v.dataset.id === id;
            v.classList.toggle('active', on);
            if (on) { v.currentTime = 0; safePlay(v); } else { v.pause(); }
        });
        fillDesktopInfo(id);
    }
    tabs.forEach((tab) => tab.addEventListener('click', () => select(tab.dataset.projectId)));

    // Only the visible video plays; all of them are already downloaded in the background.
    const first = vids.find((v) => v.classList.contains('active'));
    const observer = new IntersectionObserver(([entry]) => {
        const active = vids.find((v) => v.classList.contains('active'));
        if (!active) return;
        if (entry.isIntersecting && !reduceMotion.matches) safePlay(active); else active.pause();
    }, { threshold: 0.25 });
    observer.observe($('#desktop-viewer'));
    if (first && reduceMotion.matches) first.pause();
}

function setupMobileViewer() {
    const container = $('#mobile-viewer');
    const playActive = (sw) => {
        sw.slides.forEach((slide, i) => {
            const v = $('video', slide);
            if (!v) return;
            if (i === sw.activeIndex && !reduceMotion.matches) { v.currentTime = 0; safePlay(v); } else { v.pause(); }
        });
    };
    swiper = new Swiper(container, {
        centeredSlides: true,
        slidesPerView: 1,
        rewind: true,
        grabCursor: true,
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        on: { init: playActive, slideChange: playActive },
    });
    // Pause when the carousel scrolls out of view
    new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) $$('video', container).forEach((v) => v.pause());
        else if (swiper) playActive(swiper);
    }, { threshold: 0.2 }).observe(container);
}

// Opening a project by clicking/pressing on a device screen
document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-open]');
    if (el) location.hash = `#project/${el.dataset.open}`;
});
document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-open]')) {
        e.preventDefault();
        location.hash = `#project/${e.target.dataset.open}`;
    }
});

// ---------- project detail page ----------
function renderDetail(id) {
    const index = projects.findIndex((p) => p.id === id);
    const p = projects[index];
    const mobile = mobileQuery.matches;
    const kind = mobile ? 'mobile' : 'desktop';
    const prev = projects[(index - 1 + projects.length) % projects.length];
    const next = projects[(index + 1) % projects.length];

    const links = p.links?.length
        ? p.links.map((l) => `<a class="inline-flex items-center gap-2 text-blue-600 hover:underline font-medium" href="${l.href}" target="_blank" rel="noopener noreferrer">${icon('github')} ${pick(l.label)}</a>`).join('<br>')
        : `<p class="text-sm text-gray-500">${t('projectNoLinks')}</p>`;

    detailRoot.innerHTML = `
        <div class="max-w-4xl mx-auto">
            <a href="#projects" class="inline-flex items-center gap-2 mb-8 text-blue-600 hover:underline font-medium"><span class="icon" style="--icon:url(icons/lucide-arrow-right.svg);transform:scaleX(-1)"></span>${t('projectBack')}</a>
            <p class="text-sm uppercase tracking-wide text-blue-600 font-semibold">${pick(p.context)}</p>
            <h1 class="mt-1 text-4xl md:text-5xl font-extrabold text-slate-900">${p.name}</h1>
            <p class="mt-4 text-xl text-gray-600">${pick(p.tagline)}</p>

            <video id="detail-video" class="detail-video ${mobile ? 'max-w-xs mx-auto block' : ''}" autoplay loop muted playsinline preload="auto" poster="${posterSrc(p.id, kind)}">
                <source src="${videoSrc(p.id, kind)}" type="video/mp4">
                ${t('videoFallback')}
            </video>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mt-14">
                <div class="md:col-span-2 space-y-4 text-lg text-gray-700 leading-relaxed">
                    ${pick(p.body).map((para) => `<p>${para}</p>`).join('')}
                </div>
                <aside class="bg-slate-50 p-6 rounded-lg border border-gray-200 space-y-6 self-start">
                    <div>
                        <h2 class="text-lg font-semibold text-blue-600 mb-3">${t('projectRole')}</h2>
                        <div class="flex flex-wrap gap-2">${pick(p.roles).map((r) => chip(r)).join('')}</div>
                    </div>
                    <div>
                        <h2 class="text-lg font-semibold text-blue-600 mb-3">${t('projectTech')}</h2>
                        <div class="flex flex-wrap gap-2">${p.tech.map((k) => chip(TECH[k].label, TECH[k].icon)).join('')}</div>
                    </div>
                    <div>
                        <h2 class="text-lg font-semibold text-blue-600 mb-3">${t('projectLinks')}</h2>
                        ${links}
                    </div>
                </aside>
            </div>

            <nav class="mt-16 pt-8 border-t border-slate-200 flex justify-between gap-4 text-sm" aria-label="Projects">
                <a class="text-blue-600 hover:underline" href="#project/${prev.id}">&larr; ${prev.name}</a>
                <a class="text-blue-600 hover:underline text-right" href="#project/${next.id}">${next.name} &rarr;</a>
            </nav>
        </div>`;
}

// ---------- routing: #project/<id> shows a detail page, any other hash shows the single page ----------
let savedScroll = 0;

function route() {
    const hash = decodeURIComponent(location.hash || '');
    const match = hash.match(/^#project\/([\w-]+)$/);
    const project = match && projects.find((p) => p.id === match[1]);

    if (project) {
        if (detailRoot.classList.contains('hidden')) savedScroll = window.scrollY;
        $$('video').forEach((v) => v.pause());
        mainContent.classList.add('hidden');
        detailRoot.classList.remove('hidden');
        renderDetail(project.id);
        window.scrollTo(0, 0);
        detailRoot.dataset.project = project.id;
        document.title = `${project.name} | Merijn Snelders`;
        return;
    }

    const wasDetail = !detailRoot.classList.contains('hidden');
    detailRoot.classList.add('hidden');
    detailRoot.innerHTML = '';
    delete detailRoot.dataset.project;
    mainContent.classList.remove('hidden');
    document.title = t('docTitle');
    if (wasDetail) {
        // Browser back (empty hash) returns to where the visitor was; a link goes to its section
        const el = hash ? document.getElementById(hash.slice(1)) : null;
        if (el) el.scrollIntoView({ behavior: 'auto' });
        else window.scrollTo(0, savedScroll);
        if (typeof AOS !== 'undefined') AOS.refresh();
        const active = $$('#desktop-viewer .project-video').find((v) => v.classList.contains('active'));
        if (active) safePlay(active);
        if (swiper) swiper.update();
    }
    closeMobileMenu();
}

// ---------- mobile menu ----------
const menuBtn = $('#menu-btn');
const mobileMenu = $('#mobile-menu');
function setMenu(open) {
    mobileMenu.classList.toggle('hidden', !open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', t(open ? 'menuClose' : 'menuOpen'));
    $('#menu-icon').style.setProperty('--icon', `url(icons/${open ? 'lucide-x' : 'lucide-menu'}.svg)`);
}
function closeMobileMenu() { setMenu(false); }
menuBtn.addEventListener('click', () => setMenu(mobileMenu.classList.contains('hidden')));
$$('#mobile-menu a, #mobile-menu button').forEach((a) => a.addEventListener('click', closeMobileMenu));

// Hash links to the same hash do not fire hashchange; make the logo/home links always scroll
document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href').startsWith('#project/')) return;
    if (a.getAttribute('href') === location.hash && !detailRoot.classList.contains('hidden')) route();
});

// ---------- language ----------
$$('.lang-btn').forEach((btn) => btn.addEventListener('click', () => setLang(btn.dataset.lang)));

onLangChange(() => {
    renderCopy();
    renderSkills();
    const wasActive = activeDesktopId;
    const hadDetail = detailRoot.dataset.project;
    renderProjects();
    // restore the selected tab after re-rendering
    const tab = $(`#desktop-viewer .project-tab[data-project-id="${wasActive}"]`);
    if (tab) tab.click();
    if (hadDetail) {
        renderDetail(hadDetail);
        document.title = `${projects.find((p) => p.id === hadDetail).name} | Merijn Snelders`;
    }
    setMenu(!mobileMenu.classList.contains('hidden'));
    if (typeof AOS !== 'undefined') AOS.refresh();
});

// ---------- boot ----------
$('#year').textContent = new Date().getFullYear();
if (typeof AOS !== 'undefined') {
    AOS.init({ offset: 80, duration: 600, easing: 'ease-in-out', once: true, disable: () => reduceMotion.matches });
}

// Hero glow that follows the mouse (only for devices with a real pointer)
const hero = $('#home');
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    hero.addEventListener('mousemove', (e) => {
        const r = hero.getBoundingClientRect();
        hero.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
        hero.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
    });
    hero.addEventListener('mouseleave', () => {
        hero.style.setProperty('--mouse-x', '-1000px');
        hero.style.setProperty('--mouse-y', '-1000px');
    });
}

initLang(); // fires onLangChange, which renders copy, skills and projects
window.addEventListener('hashchange', () => route());
route();

// The detail page picks desktop or phone video, so redo it when the viewport class flips
mobileQuery.addEventListener('change', () => { if (detailRoot.dataset.project) renderDetail(detailRoot.dataset.project); });

initTerminal({
    openProject: (id) => { location.hash = `#project/${id}`; },
    goTo: (id) => { location.hash = `#${id}`; },
});
