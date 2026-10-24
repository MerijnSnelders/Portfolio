import { t, getLang, setLang, onLangChange, copyVariants } from './i18n.js';
import { projects } from './projects.js';
import { ronaldoArt } from './ronaldo.js';

const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export function initTerminal({ openProject, goTo }) {
    const terminal = document.getElementById('terminal');
    const header = document.getElementById('terminal-header');
    const body = document.getElementById('terminal-body');
    const input = document.getElementById('terminal-input');
    const closeBtn = document.getElementById('terminal-close-btn');
    const phone = window.matchMedia('(max-width: 768px)');

    const history = [];
    let historyIndex = 0;
    let busy = false;

    // ----- output -----
    function print(html, cls = 'command-output') {
        const div = document.createElement('div');
        div.className = cls;
        div.innerHTML = html;
        body.appendChild(div);
        body.scrollTop = body.scrollHeight;
    }
    async function printLines(lines, delay = 40) {
        for (const line of lines) {
            print(line);
            await wait(delay);
        }
    }

    // ----- commands -----
    const aboutText = () => {
        const text = copyVariants.a[getLang()];
        return [text.aboutP1, text.aboutP2];
    };

    const commands = {
        help: () => printLines(t('tHelp')),
        about: () => printLines(aboutText()),
        over: () => printLines(aboutText()),
        skills: () => printLines(['Java, C#, JavaScript, TypeScript, HTML, SQL', 'Spring Boot, React, Tailwind CSS', 'Docker, GitLab, GitHub']),
        projects: async () => {
            print(t('tProjects'));
            await printLines(projects.map((p, i) => `  ${i + 1}. <span class="command-prompt">${escapeHtml(p.name)}</span> (${t('tOpenHint', { id: p.id })})`));
        },
        contact: () => {
            goTo('contact');
            print(t('tContact'));
        },
        open: (arg) => {
            if (!arg) return print(t('tOpenUsage'));
            const link = { linkedin: 'linkedin-link', github: 'github-link' }[arg];
            if (link) {
                window.open(document.getElementById(link).href, '_blank', 'noopener,noreferrer');
                return print(t('tOpening', { name: arg }));
            }
            const project = projects.find((p) => p.id === arg || String(projects.indexOf(p) + 1) === arg);
            if (project) {
                print(t('tOpening', { name: project.name }));
                hide();
                return openProject(project.id);
            }
            return print(t('tOpenError', { arg: escapeHtml(arg) }), 'command-error');
        },
        lang: (arg) => {
            if (arg !== 'nl' && arg !== 'en') return print(t('tLangUsage'));
            setLang(arg);
            print(t('tLangSet'));
        },
        ronaldo: async () => {
            const pre = document.createElement('pre');
            pre.style.cssText = 'color:#10b981;line-height:1;margin:0;overflow:hidden;font-size:' + (phone.matches ? '0.5rem' : '0.7rem');
            body.appendChild(pre);
            for (const line of ronaldoArt) {
                pre.textContent += line + '\n';
                body.scrollTop = body.scrollHeight;
                await wait(50);
            }
            print(escapeHtml(t('tQuote')));
        },
        clear: () => { body.innerHTML = ''; },
        close: () => { print(t('tClosing')); hide(); },
    };

    async function run(raw) {
        const line = raw.trim();
        if (!line) return;
        history.push(line);
        historyIndex = history.length;
        print(`<span class="command-prompt">$</span> <span class="user-command">${escapeHtml(line)}</span>`, '');
        const [cmd, ...rest] = line.toLowerCase().split(/\s+/);
        const handler = Object.hasOwn(commands, cmd) ? commands[cmd] : null;
        busy = true;
        try {
            if (handler) await handler(rest.join(' '));
            else print(t('tUnknown', { cmd: escapeHtml(cmd) }), 'command-error');
        } finally {
            busy = false;
        }
    }

    // ----- open / close -----
    function show() {
        terminal.classList.add('open');
        if (!body.hasChildNodes()) print(t('tWelcome'));
        clampToViewport();
        // On phones, focusing right away opens the keyboard; that is what people expect after tapping the icon.
        input.focus({ preventScroll: true });
        updateKeyboardOffset();
    }
    function hide() {
        terminal.classList.remove('open');
        input.blur();
    }
    const toggle = () => (terminal.classList.contains('open') ? hide() : show());

    document.querySelectorAll('.terminal-open').forEach((btn) => btn.addEventListener('click', show));
    closeBtn.addEventListener('click', hide);

    input.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            if (busy) return;
            const value = input.value;
            input.value = '';
            await run(value);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) input.value = history[--historyIndex];
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            historyIndex = Math.min(historyIndex + 1, history.length);
            input.value = history[historyIndex] ?? '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && terminal.classList.contains('open')) { hide(); return; }
        const typing = e.target.closest?.('input, textarea, [contenteditable]');
        if (!typing && (e.key === '~' || e.key === '`')) { e.preventDefault(); toggle(); }
    });

    // Re-show the welcome text in the new language when the terminal is still empty
    onLangChange(() => {
        if (body.children.length === 1) { body.innerHTML = ''; print(t('tWelcome')); }
    });

    // ----- dragging (desktop only; phones get a fixed bottom sheet) -----
    let drag = null;
    header.addEventListener('pointerdown', (e) => {
        if (phone.matches || e.target.closest('button')) return;
        const rect = terminal.getBoundingClientRect();
        drag = { dx: e.clientX - rect.left, dy: e.clientY - rect.top };
        header.setPointerCapture(e.pointerId);
    });
    header.addEventListener('pointermove', (e) => {
        if (!drag) return;
        const maxLeft = window.innerWidth - terminal.offsetWidth;
        const maxTop = window.innerHeight - terminal.offsetHeight;
        terminal.style.left = Math.min(Math.max(0, e.clientX - drag.dx), maxLeft) + 'px';
        terminal.style.top = Math.min(Math.max(0, e.clientY - drag.dy), maxTop) + 'px';
        terminal.style.right = 'auto';
        terminal.style.bottom = 'auto';
    });
    const endDrag = () => { drag = null; };
    header.addEventListener('pointerup', endDrag);
    header.addEventListener('pointercancel', endDrag);

    function clampToViewport() {
        if (phone.matches) {
            // Bottom sheet: forget any position a desktop drag left behind
            ['left', 'top', 'right', 'bottom'].forEach((p) => terminal.style.removeProperty(p));
            return;
        }
        if (!terminal.style.left) return;
        const maxLeft = Math.max(0, window.innerWidth - terminal.offsetWidth);
        const maxTop = Math.max(0, window.innerHeight - terminal.offsetHeight);
        terminal.style.left = Math.min(parseFloat(terminal.style.left), maxLeft) + 'px';
        terminal.style.top = Math.min(parseFloat(terminal.style.top), maxTop) + 'px';
    }

    // ----- on-screen keyboard: lift the sheet above it -----
    function updateKeyboardOffset() {
        const vv = window.visualViewport;
        if (!vv || !phone.matches || !terminal.classList.contains('open')) {
            terminal.style.removeProperty('--kb');
            if (phone.matches) terminal.style.removeProperty('bottom');
            return;
        }
        const keyboard = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
        terminal.style.bottom = keyboard + 'px';
        terminal.style.height = Math.min(480, vv.height * 0.7) + 'px';
    }
    window.visualViewport?.addEventListener('resize', updateKeyboardOffset);
    window.visualViewport?.addEventListener('scroll', updateKeyboardOffset);
    window.addEventListener('resize', () => { clampToViewport(); updateKeyboardOffset(); });
    phone.addEventListener('change', () => {
        ['left', 'top', 'right', 'bottom', 'height'].forEach((p) => terminal.style.removeProperty(p));
    });
}
