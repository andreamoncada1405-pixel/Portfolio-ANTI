
// --- HORIZONTAL RULER (SCROLLYTELLING) RENDERER ---
function renderMethodologyTimeline() {
    const track = document.getElementById('methodology-track');
    // The section id in HTML is 'method' (not 'method-scroller')
    const scrollerSection = document.getElementById('method-scroller') || document.getElementById('method');
    const progressBar = document.getElementById('method-progress');

    if (!track || !scrollerSection) return;

    track.innerHTML = '';

    // --- 1. RENDER PHASE BLOCKS ---
    // We create a wide flex container. 
    // Each phase is a block of fixed width (e.g., 600px).
    // Total Width = numPhases * phaseWidth.

    // Adaptive Phase Width based on Screen
    const windowWidth = window.innerWidth;
    let phaseWidth = 600;
    if (windowWidth < 1440) phaseWidth = 500;
    if (windowWidth < 1024) phaseWidth = 400;
    if (windowWidth < 768) phaseWidth = 350;

    // Adaptive content margins & visual height for mobile/tablet
    const isMobile = windowWidth < 1024;
    const topPct = 15;
    const botPct = isMobile ? 10 : 15;
    const visualH = isMobile ? 200 : 300;
    const blockH = isMobile ? (windowWidth < 768 ? 350 : 400) : null;

    // initialOffset: on mobile Phase 0 must be centred at the red cursor.
    // The track's left edge is at left:50% (CSS). Phase 0 spans 0→phaseWidth
    // within the track, so its centre is at left:50% + phaseWidth/2.
    // We need Phase 0 centre = 50% → offset the track left by -phaseWidth/2.
    // On desktop the description occupies the left half, so offset stays 0.
    const initialOffset = isMobile ? -(phaseWidth / 2) : 0;

    methodologyPhases.forEach((phase, index) => {
        const isLast = index === methodologyPhases.length - 1;

        // Phase Block — data-phase used for scroll-based activation
        const block = document.createElement('div');
        block.className = 'relative flex-shrink-0 flex flex-col justify-center items-center group select-none';
        block.dataset.phase = index;
        block.style.width = `${phaseWidth}px`;
        // Fixed height on mobile so items-center on the track puts them at 50vh;
        // desktop keeps 100% (fills the full sticky-viewport height).
        block.style.height = blockH ? `${blockH}px` : '100%';

        // --- A. Top Content (Tasks/Explanation) ---
        const topContent = document.createElement('div');
        // Use inline style for the vertical position so we can adjust per breakpoint
        topContent.className = 'absolute w-full px-8 opacity-40 group-hover:opacity-100 transition-opacity duration-500';
        topContent.style.top = `${topPct}%`;

        topContent.innerHTML = `
            <div class="border-l-2 border-gray-200 dark:border-zinc-800 pl-4">
               <span class="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">Phase ${phase.id}</span>
               <h3 class="text-2xl font-bold text-black dark:text-white mb-3">${phase.title}</h3>
               <ul class="space-y-1">
                 ${phase.content.slice(0, 3).map(t => `<li class="text-xs text-gray-500 leading-tight">• ${t}</li>`).join('')}
               </ul>
            </div>
        `;

        // --- B. Central Visual (Double Diamond Wave) ---
        const visualContainer = document.createElement('div');
        visualContainer.className = 'w-full relative flex items-center';
        visualContainer.style.height = `${visualH}px`;

        // Ruler Ticks Background
        const rulerBg = document.createElement('div');
        rulerBg.className = 'absolute top-1/2 left-0 w-full border-t border-gray-300 dark:border-zinc-700 h-10';
        // Add ticks via CSS linear-gradient later or simple JS loop? simpler:
        rulerBg.innerHTML = `
            <div class="w-full h-full flex justify-between items-start pt-0">
                ${Array.from({ length: 20 }).map(() => `<div class="w-px h-2 bg-gray-300 dark:bg-zinc-800"></div>`).join('')}
            </div>
        `;

        // SVG Shape
        // Logic: Continuous Wave.
        // StartY and EndY depend on phase flow.
        // Center is h/2.

        let pathData = '';
        const midY = 150; // h=300

        // 0 (Anticipation): Flat Rect (Thin)
        // 1 (Intuitions): Diverge (Thin -> Wide)
        // 2 (Nouveau CdC): Converge (Wide -> Thin)
        // 3 (Certitudes): Diverge
        // 4 (Faisabilité): Converge
        // 5 (Succès): Flat (Thin)

        let startH = 20; let endH = 20;

        if (index === 0) { startH = 40; endH = 40; } // Rect
        if (index === 1) { startH = 40; endH = 280; } // Open
        if (index === 2) { startH = 280; endH = 40; } // Close
        if (index === 3) { startH = 40; endH = 280; } // Open
        if (index === 4) { startH = 280; endH = 40; } // Close
        if (index === 5) { startH = 40; endH = 40; } // Flat

        const pt1 = `${0},${midY - startH / 2}`;
        const pt2 = `${phaseWidth},${midY - endH / 2}`;
        const pt3 = `${phaseWidth},${midY + endH / 2}`;
        const pt4 = `${0},${midY + startH / 2}`;

        // Use Curves for Fluidity
        pathData = `M ${pt1} C ${phaseWidth / 2},${midY - startH / 2} ${phaseWidth / 2},${midY - endH / 2} ${pt2} L ${pt3} C ${phaseWidth / 2},${midY + endH / 2} ${phaseWidth / 2},${midY + startH / 2} ${pt4} Z`;

        const svg = `
            <svg viewBox="0 0 ${phaseWidth} 300" class="absolute top-0 left-0 w-full h-full overflow-visible">
                <defs>
                     <linearGradient id="grad-${index}" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:black;Stop-opacity:0.05" />
                        <stop offset="50%" style="stop-color:blue;stop-opacity:0.1" />
                        <stop offset="100%" style="stop-color:black;stop-opacity:0.05" />
                    </linearGradient>
                </defs>
                <path d="${pathData}" fill="currentColor" class="text-gray-100 dark:text-zinc-900 stroke-gray-300 dark:stroke-zinc-700 hover:fill-blue-50 dark:hover:fill-blue-900/10 transition-colors duration-300" stroke-width="1" />
                
                <!-- Label Pill Centered -->
                <foreignObject x="${phaseWidth / 2 - 50}" y="${midY - 15}" width="100" height="30">
                     <div class="flex items-center justify-center h-full">
                        <span class="text-[10px] uppercase font-bold bg-white dark:bg-black border border-gray-200 dark:border-zinc-700 px-3 py-1 rounded-full shadow-sm z-20 whitespace-nowrap">
                            ${phase.label}
                        </span>
                     </div>
                </foreignObject>
            </svg>
        `;

        visualContainer.innerHTML = svg; // rulerBg is separate, maybe insert ruler BG first
        visualContainer.insertBefore(rulerBg, visualContainer.firstChild);


        // --- C. Bottom Content (Decisions) ---
        const bottomContent = document.createElement('div');
        bottomContent.className = 'absolute w-full px-8 pt-4 flex flex-col items-center opacity-40 group-hover:opacity-100 transition-opacity duration-500';
        bottomContent.style.bottom = `${botPct}%`;

        // Only show decision if it exists (usually at the END of the phase, i.e., at the right edge?) 
        // Or in the middle? Double Diamond decisions are usually the "Knot".
        // Let's place it at the *right edge* of the block, overlapping with the next.

        if (!isLast) {
            const decisionC = document.createElement('div');
            decisionC.className = 'absolute -right-6 top-1/2 -translate-y-1/2 w-12 flex flex-col items-center z-30';
            decisionC.innerHTML = `
                <div class="w-3 h-3 bg-black dark:bg-white rounded-full border-4 border-white dark:border-black shadow-lg mb-2"></div>
                <div class="bg-black dark:bg-white text-white dark:text-black text-[9px] font-bold uppercase px-2 py-0.5 rounded leading-none">Decision</div>
             `;
            // Tooltip for decision content?
            const decTooltip = document.createElement('div');
            decTooltip.className = 'absolute top-10 w-48 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 p-3 rounded shadow-xl text-left invisible opacity-0 lg:group-hover:visible lg:group-hover:opacity-100 transition-all';
            decTooltip.innerHTML = `
                <p class="text-[9px] uppercase text-blue-500 font-bold mb-1">Critères</p>
                <ul class="space-y-1">
                     ${(phase.decision || []).map(d => `<li class="text-[9px] text-gray-500">- ${d}</li>`).join('')}
                </ul>
             `;
            decisionC.appendChild(decTooltip);

            // Append to BLOCK, positioned absolute right
            // Wait, bottomContent is centered. Let's append decisionC to the BLOCK directly.
            block.appendChild(decisionC);
        }

        block.appendChild(topContent);
        block.appendChild(visualContainer);
        block.appendChild(bottomContent);
        track.appendChild(block);
    });

    // --- 2. SCROLL LISTENER ---
    // We attach the calculation to the window scroll
    // But we need to know when #method-scroller is in view.

    function updateScroll() {
        if (!scrollerSection) return;

        const rect = scrollerSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const totalDist = scrollerSection.offsetHeight - viewportHeight;

        // How far have we scrolled INTO the section?
        // rect.top starts at viewport height (entering) --> goes to 0 (sticky start) --> goes negative (scrolling)
        // Sticky logic: content is fixed top-0 WHILE rect.top is <= 0 AND rect.bottom >= viewportHeight.

        // Progress: 0 when rect.top == 0. 1 when rect.bottom == viewportHeight.
        let progress = 0;

        if (rect.top <= 0) {
            progress = Math.abs(rect.top) / totalDist;
        }

        // Clamp
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;

        // Update Progress Bar
        if (progressBar) progressBar.style.width = `${progress * 100}%`;

        // Translate Track
        // Translate X: Move left.
        // Total track width = numPhases * phaseWidth.
        // Viewport center is at 50vw. We want phase 0 centered at start? 
        // Let's say we scroll through the whole track length.

        const trackWidth = methodologyPhases.length * phaseWidth;

        // ── Horizontal scroll progress ───────────────────────────────────────
        // On mobile, the vertical scroll first clears the description spacer (60vh).
        // The schema perfectly centers vertically when the section has scrolled exactly 60vh 
        // (because the sticky div is 100vh tall and sticks at top:0).
        // We ensure horizontal scroll stays strictly at 0 until 60vh, PLUS a 20vh dwell 
        // so the user sees it resting in the center before it starts moving left.
        let hScrollProgress = progress;
        if (window.innerWidth < 1024) {
            const viewportH = window.innerHeight;
            const spacerH = viewportH * 0.60;   // exactly the 60vh spacer from HTML
            const dwellH = viewportH * 0.20;    // 20vh resting time
            const horizStart = spacerH + dwellH;

            // Pixels the section top has scrolled past the viewport top
            const sectionRect = scrollerSection.getBoundingClientRect();
            const scrolledInSec = -sectionRect.top;

            const totalDist = scrollerSection.offsetHeight - viewportH;

            // Only progress horizontally if we've scrolled past the start point
            const effectiveScroll = Math.max(0, scrolledInSec - horizStart);
            const maxHorizScroll = Math.max(1, totalDist - horizStart);

            hScrollProgress = Math.min(1, effectiveScroll / maxHorizScroll);
        }

        const currentTranslate = hScrollProgress * (trackWidth - window.innerWidth + 200);
        track.style.transform = `translateX(${initialOffset - currentTranslate}px)`;

        // ── Phase activation highlight (mobile only) ────────────────────────
        if (window.innerWidth < 1024) {
            const vpCenterX = window.innerWidth / 2;
            let closestBlock = null;
            let closestDist = Infinity;
            track.querySelectorAll('[data-phase]').forEach(b => {
                const r = b.getBoundingClientRect();
                const dist = Math.abs(vpCenterX - (r.left + r.width / 2));
                if (dist < closestDist) { closestDist = dist; closestBlock = b; }
            });
            track.querySelectorAll('[data-phase]').forEach(b => {
                b.classList.toggle('phase-active', b === closestBlock);
            });
        }
    }

    window.addEventListener('scroll', updateScroll);
    window.addEventListener('resize', updateScroll);
    // Init
    updateScroll();
}
