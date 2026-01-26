
// --- HORIZONTAL RULER (SCROLLYTELLING) RENDERER ---
function renderMethodologyTimeline() {
    const track = document.getElementById('methodology-track');
    const scrollerSection = document.getElementById('method-scroller');
    const progressBar = document.getElementById('method-progress');

    if (!track || !scrollerSection) return;

    track.innerHTML = '';

    // --- 1. RENDER PHASE BLOCKS ---
    // We create a wide flex container. 
    // Each phase is a block of fixed width (e.g., 600px).
    // Total Width = numPhases * phaseWidth.

    const phaseWidth = 600; // px
    const h = 400; // Visual Height

    methodologyPhases.forEach((phase, index) => {
        const isLast = index === methodologyPhases.length - 1;

        // Phase Block
        const block = document.createElement('div');
        block.className = 'relative flex-shrink-0 flex flex-col justify-center items-center group select-none';
        block.style.width = `${phaseWidth}px`;
        block.style.height = '100%';

        // --- A. Top Content (Tasks/Explanation) ---
        const topContent = document.createElement('div');
        topContent.className = 'absolute top-[15%] w-full px-8 opacity-40 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:-translate-y-2';

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
        visualContainer.className = 'w-full h-[300px] relative flex items-center';

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
        bottomContent.className = 'absolute bottom-[15%] w-full px-8 pt-4 flex flex-col items-center opacity-40 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:translate-y-2';

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
        const maxTranslate = trackWidth - (window.innerWidth / 2) + (phaseWidth / 2); // Stop when last phase is center?
        // Actually, let's just scroll cleanly.

        const currentTranslate = progress * (trackWidth - window.innerWidth + 200); // padding

        // Apply transform
        track.style.transform = `translateX(-${currentTranslate}px)`;
    }

    window.addEventListener('scroll', updateScroll);
    window.addEventListener('resize', updateScroll);
    // Init
    updateScroll();
}
