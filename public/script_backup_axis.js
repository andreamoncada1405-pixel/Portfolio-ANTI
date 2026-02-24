// --- THEME LOGIC ---
function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcons(next);
}

function updateThemeIcons(theme) {
    const sun = document.getElementById('icon-sun');
    const moon = document.getElementById('icon-moon');
    if (theme === 'dark') {
        sun.classList.remove('hidden');
        moon.classList.add('hidden');
    } else {
        sun.classList.add('hidden');
        moon.classList.remove('hidden');
    }
}

// Initialize Theme
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcons(savedTheme);


// --- MODAL LOGIC ---
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }
}

function closeModal(event) {
    if (event.target.classList.contains('modal-backdrop')) {
        closeModalForce();
    }
}

function closeModalForce() {
    document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
    document.body.classList.remove('modal-open');
}

// --- TRANSLATIONS (Shortened for brevity but functionality remains) ---
const methodologyPhases = [
    {
        id: 0,
        title: "Anticipation",
        label: "Sécuriser",
        category: "méthodologie",
        type: "linear",
        content: ["Définir la méthodologie", "Design de la question", "Enrichissement du CdC", "Kick off/équipe projet"],
        decision: ["Définir les critères de succès", "Elargir le sujet", "Expliciter la méthode", "ROI", "Cartographie des acteurs", "Ecosystème projet"]
    },
    {
        id: 1,
        title: "Intuitions",
        label: "Découvertes",
        category: "enquête terrain",
        type: "divergent",
        content: ["Interview", "Ethnographie/Observation", "Documentation/data", "État de l'art"],
        decision: ["Nouveau critère dans le CdC", "Poser les Symptômes et causes racines", "Rapport d'étonnement", "Cartographie d'expérience", "Veille chiffrée & tendance"]
    },
    {
        id: 2,
        title: "Nouveau CdC",
        label: "Audace",
        category: "création",
        type: "convergent",
        content: ["Co-création/workshop", "Créativité/variation", "Justesse du dosage créatif", "Portefeuille d'idée"],
        decision: ["Hiérarchiser les idées", "Zone de risque tech/business", "Définir les critères de POC", "Business model", "Story-Board"]
    },
    {
        id: 3,
        title: "Certitudes",
        label: "Mesurer",
        category: "tests/POC",
        type: "divergent",
        content: ["Def Zones d'incertitude des AVP", "Variations / nuances", "Audace/ Agilité/ Adaptabilité", "Portefeuille d'idées"],
        decision: ["Mesure objective de la performance", "Comparaison des variations", "Pousser l'exploration", "Data-vision de comparaison"]
    },
    {
        id: 4,
        title: "Faisabilité",
        label: "Convergence",
        category: "finalisation",
        type: "convergent",
        content: ["Compromis qualité", "Technique/Economique/Process/Marketing", "Portefeuille d'idée"],
        decision: ["Maitrise des coûts", "Maitrise du planning", "Data-vision de comparaison", "RACI"]
    },
    {
        id: 5,
        title: "Succès",
        label: "Aboutir",
        category: "suivi",
        type: "linear",
        content: ["AMO", "AMX", "Suivi dev Tech", "Communication", "Lancement/RS"],
        decision: []
    }
];

const translations = {
    'fr': {
        'nav_work': 'Projets', 'nav_profile': 'Profil', 'nav_contact': 'Contact',
        'meta_at': 'chez',
        'hero_title': 'Innovation<br>Systémique.',
        'hero_subtitle': 'Le pont entre Design Global & Business Strategy',
        'story_text': 'Je ne crée pas seulement des images, je conçois des <span class="font-normal" style="color: var(--text-main)">écosystèmes</span>. En tant que Global Designer en transition vers le Management de l\'Innovation, j\'utilise la créativité pour réduire le risque d\'entreprise.',
        'section_work': 'Projets Sélectionnés',
        'label_problem': 'La Problématique', 'label_goal': 'L\'Objectif', 'label_solution': 'La Solution',

        // K-CIOPE
        'p0_title': 'Transformation Numérique', 'p0_desc': 'UI Designer • 2025-2026', 'p0_title_full': 'Métropole de Marseille', 'p0_problem': 'Moderniser la gestion des incidents (voirie, propreté) pour les agents de terrain et les citoyens, remplaçant des processus obsolètes.', 'p0_goal': 'Fluidifier la remontée d\'information et optimiser l\'intervention des services publics via une UX mobile-first.', 'p0_solution': 'Prototypage haute-fidélité pour validation rapide par les parties prenantes avant développement (Agile).',

        // MAKE / AI
        'p_make_title': 'Automatisation & IA DesignOps', 'p_make_desc': 'Make • Workflow AI', 'p_make_title_full': 'Optimisation des Flux avec l\'IA et le No-Code',
        'p_make_problem': 'Les équipes créatives passent trop de temps sur des tâches répétitives à faible valeur ajoutée (saisie de données, gestion d\'assets, reporting).',
        'p_make_goal': 'Implémenter des workflows "No-Code" (Make) connectés à des agents IA pour automatiser ces processus et libérer du temps créatif.',
        'p_make_solution': 'Création de connecteurs intelligents entre outils design (Figma), bases de données (Airtable) et IA pour une génération et organisation automatisée.',

        'p2_title': 'E-commerce Lifestyle', 'p2_desc': 'Phase Livraison • Video First UI',
        'p2_problem': 'Défi', 'p2_problem_desc': 'Le marché des vélos électriques est saturé. Vamos Bikes avait besoin de se démarquer non pas par les specs techniques, mais par le lifestyle.',
        'p2_strategy': 'Approche', 'p2_strategy_desc': 'Une stratégie "Video First". Intégrer du contenu vidéo dynamique directement dans l\'expérience d\'achat pour immerger l\'utilisateur.',
        'p2_result': 'Résultat', 'p2_result_desc': 'Une augmentation significative de l\'engagement et des conversions grâce à une narration visuelle forte.',
        'p3_title': 'Stratégie Luxe & 3D', 'p3_desc': 'Phase Création • Jumeau Numérique',
        'footer_desc': 'Disponible pour l\'alternance', 'cta_talk': 'Me Contacter'
    },
    'en': {
        'nav_work': 'Work', 'nav_profile': 'Profile', 'nav_contact': 'Contact',
        'meta_at': 'at',
        'hero_title': 'Systemic<br>Innovation.',
        'hero_subtitle': 'Bridging Design & Business Strategy',
        'story_text': 'I don\'t just design visuals, I design <span class="font-normal" style="color: var(--text-main)">ecosystems</span>. As a Global Designer moving into Innovation Management, I use creativity to mitigate business risk and validate ideas.',
        'section_work': 'Selected Works',
        'label_problem': 'The Problem', 'label_goal': 'The Goal', 'label_solution': 'The Solution',
        'p0_title': 'Public Digital Transformation', 'p0_desc': 'UI Designer • 2025-2026', 'p0_title_full': 'Metropolis of Marseille',
        'p0_problem': 'Modernizing incident management (roads, waste) for field agents, replacing obsolete processes.', 'p0_goal': 'Streamline information flow and optimize public service interventions.', 'p0_solution': 'High-fidelity prototyping for rapid stakeholder validation before development (Agile).',
        'p_make_title': 'DesignOps Automation & AI', 'p_make_desc': 'Make • Workflow AI', 'p_make_title_full': 'Workflow Optimization with AI & No-Code',
        'p_make_problem': 'Creative teams spend too much time on repetitive, low-value tasks.', 'p_make_goal': 'Implement "No-Code" workflows (Make) connected to AI agents.', 'p_make_solution': 'Creation of intelligent connectors between design tools and AI.',
        'p2_title': 'Lifestyle E-commerce', 'p2_desc': 'Delivery Phase • Video First UI',
        'p2_problem': 'Challenge', 'p2_problem_desc': 'The e-bike market is saturated. Vamos Bikes needed to stand out not through specs, but through lifestyle.',
        'p2_strategy': 'Approach', 'p2_strategy_desc': 'A "Video First" strategy. Integrating dynamic video content directly into the shopping experience to immerse the user.',
        'p2_result': 'Result', 'p2_result_desc': 'A significant increase in engagement and conversions driven by strong visual storytelling.',
        'p3_title': 'Luxury Strategy & 3D', 'p3_desc': 'Creation Phase • Digital Twin',
        'footer_desc': 'Open to Opportunities', 'cta_talk': 'Get in Touch'
    },
    'it': {
        'nav_work': 'Progetti', 'nav_profile': 'Profilo', 'nav_contact': 'Contatti',
        'meta_at': 'presso',
        'hero_title': 'Innovazione<br>Sistemica.',
        'hero_subtitle': 'Il ponte tra Global Design & Business Strategy',
        'story_text': 'Non creo solo immagini, progetto <span class="font-normal" style="color: var(--text-main)">ecosistemi</span>. Come Global Designer verso l\'Innovation Management, uso la creatività per ridurre il rischio d\'impresa.',
        'section_work': 'Progetti Selezionati',
        'label_problem': 'La Domanda', 'label_goal': 'L\'Obiettivo', 'label_solution': 'La Soluzione',
        'p0_title': 'Trasformazione Digitale P.A.', 'p0_desc': 'UI Designer • 2025-2026', 'p0_title_full': 'Metropoli di Marsiglia',
        'p0_problem': 'Modernizzare la gestione degli incidenti per gli agenti sul campo.', 'p0_goal': 'Fluidificare il flusso di informazioni e ottimizzare gli interventi.', 'p0_solution': 'Prototipazione ad alta fedeltà per validazione rapida.',
        'p_make_title': 'Automazione DesignOps & IA', 'p_make_desc': 'Make • Workflow AI', 'p_make_title_full': 'Ottimizzazione Workflow con IA e No-Code',
        'p_make_problem': 'I team creativi passano troppo tempo in attività ripetitive.', 'p_make_goal': 'Implementare flussi di lavoro "No-Code" connessi ad agenti IA.', 'p_make_solution': 'Creazione di connettori intelligenti tra strumenti di design e IA.',
        'p2_title': 'E-commerce Lifestyle', 'p2_desc': 'Fase Delivery • Video First UI',
        'p2_problem': 'Sfida', 'p2_problem_desc': 'Il mercato delle e-bike è saturo. Vamos Bikes doveva distinguersi non per le specifiche, ma per il lifestyle.',
        'p2_strategy': 'Approccio', 'p2_strategy_desc': 'Una strategia "Video First". Integrare contenuti video dinamici direttamente nell\'esperienza di acquisto per immergere l\'utente.',
        'p2_result': 'Risultato', 'p2_result_desc': 'Un aumento significativo del coinvolgimento e delle conversioni grazie a una forte narrazione visiva.',
        'p3_title': 'Strategia Luxury & 3D', 'p3_desc': 'Fase Creazione • Gemello Digitale',
        'footer_desc': 'Disponibile per nuove sfide', 'cta_talk': 'Contattami'
    }
};

function setLanguage(lang) {
    document.querySelectorAll('[data-key]').forEach(elem => {
        const key = elem.getAttribute('data-key');
        if (translations[lang][key]) elem.innerHTML = translations[lang][key];
    });
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${lang}`).classList.add('active');
    localStorage.setItem('preferredLang', lang);
}
const savedLang = localStorage.getItem('preferredLang') || 'fr';
setLanguage(savedLang);

// --- 3D GLOBE ---
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];
const BASE_RADIUS = 250; const DOT_COUNT = 700; const DOT_SIZE = 1.2;
let rotationY = 0; let scrollY = 0;

function resize() { width = window.innerWidth; height = window.innerHeight; canvas.width = width; canvas.height = height; }
window.addEventListener('resize', resize);
window.addEventListener('scroll', () => { scrollY = window.scrollY; });
resize();

function initParticles() {
    particles = [];
    for (let i = 0; i < DOT_COUNT; i++) {
        const phi = Math.acos(-1 + (2 * i) / DOT_COUNT);
        const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;
        particles.push({
            origX: BASE_RADIUS * Math.cos(theta) * Math.sin(phi),
            origY: BASE_RADIUS * Math.sin(theta) * Math.sin(phi),
            origZ: BASE_RADIUS * Math.cos(phi),
            driftX: (Math.random() - 0.5) * 600, driftY: (Math.random() - 0.5) * 600, driftZ: (Math.random() - 0.5) * 600
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    rotationY += 0.002;
    const cx = width / 2; const cy = height / 2;
    let scrollFactor = Math.min(scrollY / (window.innerHeight * 1.2), 1);
    const ease = scrollFactor * scrollFactor * (3 - 2 * scrollFactor);
    const currentScale = 1 + (ease * 1.5);
    const explosionFactor = ease; const globalAlpha = 1 - (ease * 0.7);

    // Get current theme particle color
    const rootStyle = getComputedStyle(document.documentElement);
    const colorRaw = rootStyle.getPropertyValue('--particle-color').trim();

    let projected = particles.map(p => {
        let x = p.origX + (p.driftX * explosionFactor); let y = p.origY + (p.driftY * explosionFactor); let z = p.origZ + (p.driftZ * explosionFactor);
        const rot = rotationY + (ease * 0.5);
        let x1 = x * Math.cos(rot) - z * Math.sin(rot); let z1 = z * Math.cos(rot) + x * Math.sin(rot);
        let y2 = y * Math.cos(0.2) - z1 * Math.sin(0.2); let z2 = z1 * Math.cos(0.2) + y * Math.sin(0.2);
        return { x: x1, y: y2, z: z2 };
    });
    projected.sort((a, b) => a.z - b.z);
    projected.forEach(p => {
        const fov = 400 + (ease * 200); const scale = fov / (fov + p.z);
        const x2d = (p.x * scale * currentScale) + cx; const y2d = (p.y * scale * currentScale) + cy;
        let alpha = (scale - 0.5) * 1.5 * globalAlpha; if (alpha > 1) alpha = 1; if (alpha < 0) alpha = 0;
        if (alpha > 0) {
            // Use Dynamic Color Variable
            ctx.fillStyle = `rgba(${colorRaw}, ${alpha})`;
            ctx.beginPath(); ctx.arc(x2d, y2d, DOT_SIZE * scale, 0, Math.PI * 2); ctx.fill();
        }
    });
    requestAnimationFrame(animate);
}
initParticles(); animate();

// --- ACCESSIBILITY IMPROVEMENTS ---
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('keydown', (e) => {
            // Check for both 'Enter' and 'Space'
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); // Stop scrolling for Space
                e.stopPropagation();
                card.click();
            }
        });
    });
});



// --- METHODOLOGY TIMELINE RENDERER (DOUBLE DIAMOND) ---

// --- HORIZONTAL RULER (SCROLLYTELLING) RENDERER ---
function renderMethodologyTimeline() {
    const track = document.getElementById('methodology-track');
    const scrollerSection = document.getElementById('method-scroller');

    if (!track || !scrollerSection) return;

    track.innerHTML = '';

    // Config
    const phaseWidth = 600; // px
    const h = 400; // Visual Height

    // Store block references to update them efficiently
    const blockElements = [];

    methodologyPhases.forEach((phase, index) => {
        const isLast = index === methodologyPhases.length - 1;

        // Phase Block
        const block = document.createElement('div');
        block.className = 'relative flex-shrink-0 flex flex-col justify-center items-center group select-none transition-opacity duration-500';
        block.style.width = `${phaseWidth}px`;
        block.style.height = '100%';

        // Note: opacity-40 by default. Active/Hover will set to 100.
        // We use a specific class 'phase-content' to target the opacity change

        // --- Calculate Shape Height Logic (Moved Up) ---
        let startH = 20; let endH = 20;
        if (index === 0) { startH = 280; endH = 40; }
        else if (index === 1) { startH = 40; endH = 280; }
        else if (index === 2) { startH = 280; endH = 40; }
        else if (index === 3) { startH = 40; endH = 280; }
        else if (index === 4) { startH = 280; endH = 40; }
        else if (index === 5) { startH = 40; endH = 280; }


        // --- A. Top Content (Tasks/Explanation) ---
        const topContent = document.createElement('div');
        // Align to start (left-0), padding removed to fix gap.
        topContent.className = 'phase-content absolute top-[15%] left-0 w-full pr-8 opacity-30 transition-all duration-500 transform translate-y-2 text-left';

        topContent.innerHTML = `
            <div class="border-l border-gray-300 dark:border-zinc-700 pl-4" style="height: calc(35vh + ${startH / 2}px + 48px); margin-left: -0.5px;">
               <span class="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Phase ${phase.id}</span>
               <h3 class="text-2xl font-bold text-black mb-3 text-dynamic-main">${phase.title}</h3>
               <ul class="space-y-1">
                 ${phase.content.map(t => `<li class="text-xs text-gray-500 leading-tight">• ${t}</li>`).join('')}
               </ul>
               
               ${phase.category ? `
               <div class="mt-4">
                  <span class="bg-black text-white px-3 py-1 text-[10px] font-bold uppercase rounded shadow-sm inline-block">${phase.category}</span>
               </div>` : ''}
            </div>
        `;

        // --- B. Central Visual (Double Diamond Wave) ---
        const visualContainer = document.createElement('div');
        // Synchronize with dots/cursor: Top at Center + 48px, then centered vertically (-50%)
        visualContainer.className = 'w-full h-[300px] absolute top-[calc(50%+3rem)] left-0 -translate-y-1/2 flex items-center';

        // Ruler Ticks
        const rulerBg = document.createElement('div');
        rulerBg.className = 'absolute top-1/2 left-0 w-full border-t border-gray-300 dark:border-zinc-800 h-10';
        rulerBg.innerHTML = `
            <div class="w-full h-full flex justify-between items-start pt-0">
                ${Array.from({ length: 20 }).map(() => `<div class="w-px h-2 bg-gray-200 dark:bg-zinc-800"></div>`).join('')}
            </div>
        `;

        // Shape Logic (Same as before)
        let midY = 150;

        // Coordinates for Fill (Exact 0 to Width for seamless background)
        const f_pt1 = `${0},${midY - startH / 2}`;
        const f_pt2 = `${phaseWidth},${midY - endH / 2}`;
        const f_pt3 = `${phaseWidth},${midY + endH / 2}`;
        const f_pt4 = `${0},${midY + startH / 2}`;

        const fillPathData = `M ${f_pt1} C ${phaseWidth / 2},${midY - startH / 2} ${phaseWidth / 2},${midY - endH / 2} ${f_pt2} L ${f_pt3} C ${phaseWidth / 2},${midY + endH / 2} ${phaseWidth / 2},${midY + startH / 2} ${f_pt4} Z`;

        // Coordinates for Stroke (0 and Width to close gap)
        const s_pt1 = `${0},${midY - startH / 2}`;
        const s_pt2 = `${phaseWidth},${midY - endH / 2}`;
        const s_pt3 = `${phaseWidth},${midY + endH / 2}`;
        const s_pt4 = `${0},${midY + startH / 2}`;

        // Stroke Path: Two separate open curves (Top and Bottom) to avoid vertical borders
        const strokePathData = `M ${s_pt1} C ${phaseWidth / 2},${midY - startH / 2} ${phaseWidth / 2},${midY - endH / 2} ${s_pt2} M ${s_pt4} C ${phaseWidth / 2},${midY + startH / 2} ${phaseWidth / 2},${midY + endH / 2} ${s_pt3}`;

        const svg = `
            <svg viewBox="0 0 ${phaseWidth} 300" class="absolute top-0 left-0 w-full h-full overflow-visible">
                <!-- Fill only (No Stroke) -->
                <path d="${fillPathData}" fill="currentColor" class="text-gray-50 dark:text-white dark:opacity-10 transition-colors duration-300 phase-shape" stroke="none" />
                
                <!-- Stroke only (Top/Bottom Curves, No Fill) -->
                <path d="${strokePathData}" fill="none" class="stroke-gray-300 dark:stroke-zinc-700 transition-colors duration-300" stroke-width="1" vector-effect="non-scaling-stroke" />
                
            </svg>
        `;

        visualContainer.innerHTML = svg;
        visualContainer.appendChild(rulerBg);

        // --- Label Chip (Moved out of SVG for Z-Index Overlay) ---
        const labelDiv = document.createElement('div');
        labelDiv.className = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[40px] flex items-center justify-center z-10 pointer-events-none';
        labelDiv.innerHTML = `
            <span class="phase-pill text-[10px] uppercase font-bold bg-white dark:bg-black px-3 py-1 rounded-full shadow-sm z-20 whitespace-nowrap transition-all duration-300">
                ${phase.label}
            </span>
        `;
        visualContainer.appendChild(labelDiv);


        // --- C. Bottom Content (Decisions) ---
        const bottomContent = document.createElement('div');
        bottomContent.className = 'phase-content absolute bottom-[15%] w-full px-8 pt-4 flex flex-col items-center opacity-30 transition-all duration-500 transform -translate-y-2';

        if (index > 0) {
            const decisionC = document.createElement('div');
            // Sync with visualContainer: same absolute center and offset
            decisionC.className = 'absolute left-0 top-[calc(50%+3rem)] -translate-y-1/2 -translate-x-1/2 w-12 flex flex-col items-center z-50 transition-opacity duration-300 phase-decision';
            decisionC.innerHTML = `
                <div class="w-3 h-3 bg-white dark:bg-black rounded-full border-4 border-gray-300 dark:border-zinc-700 transition-colors duration-300 dot relative z-10"></div>
                
                <!-- "Axis-Aligned Signature" Decision Block -->
                <div class="decision-card absolute top-full left-1/2 mt-2 pl-6 border-l-2 border-red-500 bg-white/10 dark:bg-black/20 backdrop-blur-md shadow-sm w-[260px] opacity-0 translate-y-2 transition-all duration-500 pointer-events-none z-0">
                    <h4 class="text-[10px] uppercase font-bold text-red-500 mb-2 tracking-widest">DÉCISION</h4>
                    <ul class="space-y-1.5">
                        ${phase.decision.map(d => `
                            <li class="text-[11px] text-gray-700 dark:text-zinc-300 leading-snug flex items-start">
                                <span class="mr-2 text-gray-400">•</span>
                                <span>${d}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
            block.appendChild(decisionC);
        }

        // --- CdC Box (Phase 0 only) ---
        if (index === 0) {
            const cdcBox = document.createElement('div');
            // --- CdC Box (Rounded Block Design) ---
            cdcBox.className = 'absolute top-1/2 left-0 -translate-x-full -translate-y-1/2 flex flex-col justify-center items-center z-40 pl-16';
            // Match the height of the opening (startH is 280 for index 0)
            cdcBox.style.height = `${startH}px`;
            cdcBox.style.width = '200px';
            cdcBox.style.backgroundColor = '#37373F';
            // Make it round on the left (Semi-circle)
            cdcBox.style.borderTopLeftRadius = `${startH / 2}px`;
            cdcBox.style.borderBottomLeftRadius = `${startH / 2}px`;

            cdcBox.innerHTML = `
                <span class="text-2xl font-bold text-white mb-1">CdC</span>
                <span class="text-sm text-gray-300 font-light">problématique</span>
            `;
            visualContainer.appendChild(cdcBox);
        }



        block.appendChild(visualContainer);
        block.appendChild(topContent);
        block.appendChild(bottomContent);
        track.appendChild(block);

        blockElements.push({
            element: block,
            topContent: topContent,
            bottomContent: bottomContent,
            pill: block.querySelector('.phase-pill'),
            shape: block.querySelector('.phase-shape'),
            decision: block.querySelector('.phase-decision'),
            dot: block.querySelector('.dot')
        });
    });

    // --- 2. SCROLL LISTENER & ACTIVE STATE ---

    function updateScroll() {
        if (!scrollerSection) return;

        const rect = scrollerSection.getBoundingClientRect();
        const totalDist = scrollerSection.offsetHeight - window.innerHeight;

        let progress = 0;
        if (rect.top <= 0) {
            progress = Math.abs(rect.top) / totalDist;
        }
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;



        // --- SCROLL LOGIC V4 (Pin & Scan) ---
        // Requirement: 
        // 1. Content scrolls until Visual Right Edge aligns with Screen Right Edge (100vw).
        // 2. Content Pins.
        // 3. Cursor moves from Center (50vw) to Screen Right (100vw).

        const trackWidth = methodologyPhases.length * phaseWidth; // 3600px

        // Track Visual Start = Container (50vw) + Padding (10vw) = 60vw.
        // Track Visual End (initially) = 60vw + trackWidth.
        // We want Track Visual End to move to 100vw.
        // (60vw + trackWidth) - translate = 100vw.
        // translate = trackWidth - 40vw.

        const maxContentTranslate = trackWidth - (window.innerWidth * 0.4);

        // Cursor Travel: 50vw to 100vw = 50vw.
        const cursorTravelDist = window.innerWidth * 0.5;

        // Total Virtual Scroll
        const totalVirtualScroll = maxContentTranslate + cursorTravelDist;
        const currentVirtualX = progress * totalVirtualScroll;

        const track = document.getElementById('methodology-track');
        const cursor = document.getElementById('timeline-cursor');

        let actualTranslate = 0;
        let cursorLeft = window.innerWidth * 0.5; // Default Center = 50vw

        if (currentVirtualX <= maxContentTranslate) {
            // PHASE 1: Scroll Content
            actualTranslate = currentVirtualX;
            cursorLeft = window.innerWidth * 0.5;
        } else {
            // PHASE 2: Pin Content, Move Cursor
            actualTranslate = maxContentTranslate;
            const cursorExcess = currentVirtualX - maxContentTranslate;
            cursorLeft = (window.innerWidth * 0.5) + cursorExcess;
        }

        // Apply Transforms
        track.style.transform = `translateX(-${actualTranslate}px)`;
        if (cursor) cursor.style.left = `${cursorLeft}px`;

        // --- ACTIVE STATE LOGIC ---
        // We need to map the Cursor Visual X back to the Track coordinate space.
        // Track Visual Start = 60vw - actualTranslate.
        // Cursor Visual X = cursorLeft.
        // Cursor relative to Track Start = cursorLeft - (60vw - actualTranslate).
        // = cursorLeft - 60vw + actualTranslate.
        // Wait, standard paddingLeft constant is 10vw? No, visual start is 60vw.

        // Let's use pixels:
        const trackVisualStart = (window.innerWidth * 0.6) - actualTranslate;
        const cursorRelativeToTrack = cursorLeft - trackVisualStart;

        // Find which phase covers this X
        let activeIndex = Math.floor(cursorRelativeToTrack / phaseWidth);
        if (activeIndex < 0) activeIndex = 0;
        if (activeIndex >= methodologyPhases.length) activeIndex = methodologyPhases.length - 1;

        // Apply Active Styles
        blockElements.forEach((el, idx) => {
            const isActive = idx === activeIndex;

            if (isActive) {
                // Active State
                el.topContent.classList.remove('opacity-30', 'translate-y-2');
                el.topContent.classList.add('opacity-100', 'translate-y-0');

                el.bottomContent.classList.remove('opacity-30', '-translate-y-2');
                el.bottomContent.classList.add('opacity-100', 'translate-y-0');

                el.pill.classList.remove('text-gray-400', 'border-gray-200', 'dark:border-zinc-700');
                el.pill.classList.add('text-black', 'dark:text-white', 'scale-110');

                el.shape.classList.add('text-blue-50', 'dark:text-purple-900/20');

                if (el.decision) el.decision.classList.add('opacity-100');
                if (el.dot) {
                    el.dot.classList.remove('border-gray-300', 'dark:border-zinc-700');
                    el.dot.classList.add('border-black', 'dark:border-white', 'scale-125');
                }

                const card = el.element.querySelector('.decision-card');
                if (card) {
                    card.classList.remove('opacity-0', 'translate-y-2', 'pointer-events-none');
                    card.classList.add('opacity-100', 'translate-y-0');
                }

            } else {
                // Inactive State
                el.topContent.classList.add('opacity-30', 'translate-y-2');
                el.topContent.classList.remove('opacity-100', 'translate-y-0');

                el.bottomContent.classList.add('opacity-30', '-translate-y-2');
                el.bottomContent.classList.remove('opacity-100', 'translate-y-0');

                el.pill.classList.add('text-gray-400', 'border-gray-200', 'dark:border-zinc-700');
                el.pill.classList.remove('text-black', 'dark:text-white', 'scale-110');

                el.shape.classList.remove('text-blue-50', 'dark:text-purple-900/20');

                if (el.decision) el.decision.classList.remove('opacity-100');
                if (el.dot) {
                    el.dot.classList.add('border-gray-300', 'dark:border-zinc-700');
                    el.dot.classList.remove('border-black', 'dark:border-white', 'scale-125');
                }

                const card = el.element.querySelector('.decision-card');
                if (card) {
                    card.classList.add('opacity-0', 'translate-y-2', 'pointer-events-none');
                    card.classList.remove('opacity-100', 'translate-y-0');
                }
            }
        });
    }

    window.addEventListener('scroll', updateScroll);
    window.addEventListener('resize', updateScroll);
    updateScroll();
}
// Ensure it runs after DOM Load
document.addEventListener('DOMContentLoaded', () => {
    // Initial Render
    renderMethodologyTimeline();

    // --- Back to Top Button Logic (Show on Scroll, Hide on Idle) ---
    const backToTopBtn = document.getElementById('back-to-top');
    let scrollTimeout;

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                // Show button
                backToTopBtn.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');

                // Reset Hide Timer
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    // Hide after 2.5s of inactivity
                    backToTopBtn.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
                }, 2500);
            } else {
                // Always hide if near top
                backToTopBtn.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
                clearTimeout(scrollTimeout);
            }
        });

        // Keep visible if hovering (UX improvement)
        backToTopBtn.addEventListener('mouseenter', () => {
            clearTimeout(scrollTimeout);
            backToTopBtn.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
        });

        backToTopBtn.addEventListener('mouseleave', () => {
            scrollTimeout = setTimeout(() => {
                backToTopBtn.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
            }, 1000);
        });
    }
});
