
// --- MEGA CARD METHODOLOGY RENDERER ---
function renderMethodologyTimeline() {
    const container = document.getElementById('methodology-timeline');
    if (!container) return;

    // Clear container
    container.innerHTML = '';

    // --- 1. Mega Card Container ---
    // White card with shadow, border radius, roughly matching the aspect ratio of the diagram
    const card = document.createElement('div');
    card.className = 'w-full max-w-[1400px] bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-3xl shadow-2xl relative mx-auto p-8 md:p-12 overflow-hidden';
    card.style.minHeight = '800px';
    container.appendChild(card);

    // Header Section (Design & Decide)
    const cardHeader = document.createElement('div');
    cardHeader.className = 'flex flex-col md:flex-row justify-between items-start mb-16 border-b border-black/10 dark:border-white/10 pb-8';

    // Left: Title
    const headerLeft = document.createElement('div');
    headerLeft.innerHTML = `
        <h2 class="text-4xl md:text-5xl font-bold text-black dark:text-white mb-2 tracking-tight">Design & Decide<sup class="text-sm align-top">®</sup></h2>
        <p class="text-sm uppercase tracking-[0.2em] text-gray-500">Pour le vivant</p>
    `;

    // Right: Subtitle
    const headerRight = document.createElement('div');
    headerRight.className = 'text-right mt-6 md:mt-0';
    headerRight.innerHTML = `
        <h3 class="text-2xl font-bold text-black dark:text-white mb-1">Design Global</h3>
        <p class="text-xs text-gray-500 max-w-xs ml-auto">Maîtrise du process de Design élargi dans une approche systémique</p>
    `;

    cardHeader.appendChild(headerLeft);
    cardHeader.appendChild(headerRight);
    card.appendChild(cardHeader);


    // --- 2. Main Visual Wrapper ---
    const mainWrapper = document.createElement('div');
    mainWrapper.className = 'relative grid grid-cols-6 gap-0 h-[600px] w-full';
    card.appendChild(mainWrapper);

    // --- SVG Pattern Definition ---
    // We create a global SVG definition for the vertical lines pattern
    const svgDefs = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgDefs.setAttribute('width', '0');
    svgDefs.setAttribute('height', '0');
    svgDefs.className = 'absolute';
    svgDefs.innerHTML = `
        <defs>
            <pattern id="v-lines" width="4" height="10" patternUnits="userSpaceOnUse">
                <rect width="1" height="10" fill="currentColor" class="text-gray-300 dark:text-zinc-800 opacity-60"></rect>
            </pattern>
            <pattern id="v-lines-dense" width="2" height="10" patternUnits="userSpaceOnUse">
                <rect width="1" height="10" fill="currentColor" class="text-black dark:text-white opacity-40"></rect>
            </pattern>
        </defs>
    `;
    card.appendChild(svgDefs);


    methodologyPhases.forEach((phase, index) => {
        // Individual Phase Column
        const col = document.createElement('div');
        col.className = 'relative flex flex-col items-center h-full group border-l border-dashed border-gray-200 dark:border-zinc-800 first:border-l-0';

        // --- A. TOP CONTENT (Phase Info + Tasks) ---
        const topContent = document.createElement('div');
        topContent.className = 'h-1/3 w-full p-4 flex flex-col justify-end text-left relative z-20';

        topContent.innerHTML = `
            <div class="mb-4">
                <div class="text-[10px] uppercase font-bold text-gray-400 mb-1">Phase ${phase.id}</div>
                <h4 class="text-lg font-bold text-black dark:text-white leading-none mb-4 group-hover:text-blue-500 transition-colors">${phase.title}</h4>
                <div class="w-full h-px bg-black dark:bg-white mb-4"></div>
                <ul class="space-y-1">
                    ${phase.content.map(t => `<li class="text-[9px] text-gray-500 leading-tight">• ${t}</li>`).join('')}
                </ul>
            </div>
        `;

        // --- B. MIDDLE VISUAL (The Interference Wave) ---
        const visualContainer = document.createElement('div');
        visualContainer.className = 'h-1/3 w-full relative flex items-center justify-center';

        // We simulate the "interference" oval shape using SVG paths.
        // The index determines the shape logic (Opening, Wide, Closing)
        const h = 200; // Visual height
        let pathData = '';

        // Simplified Logic mimicking the "Design & Decide" visual flow:
        // 0 (Anticipation): Small/Thin
        // 1 (Intuitions): Expanding Oval (Left half)
        // 2 (Nouveau CdC): Expanding Oval (Right half) / Connection
        // 3 (Certitudes): Expanding Oval (Left half of 2nd diamond)
        // 4 (Faisabilité): Expanding Oval (Right half of 2nd diamond)
        // 5 (Succès): Expanding (Final)

        // Using a generic ellipse logic for now that spans the width
        pathData = `M 0,${h / 2} Q 50,0 100,${h / 2} Q 50,${h} 0,${h / 2} Z`; // Basic Oval

        // Customizing per phase to mimic the "bubbles":
        // Phase 1+2 form one bubble. Phase 3+4 form another. 
        // We'll use scaling.

        const svgContent = `
            <svg viewBox="0 0 100 ${h}" class="h-full w-full overflow-visible">
                <!-- Vertical Lines Background (The "Stripes") -->
                <rect x="0" y="0" width="100" height="${h}" fill="url(#v-lines)" />
                
                <!-- The "Wave" Overlay (Denser Lines) -->
                <!-- We apply a clipPath or Mask to show the dense lines in the oval shape -->
                <ellipse cx="50" cy="${h / 2}" rx="${index % 2 === 0 ? 30 : 50}" ry="${h / 2 - 10}" 
                    fill="url(#v-lines-dense)" stroke="currentColor" stroke-width="1" 
                    class="text-gray-400 dark:text-zinc-600 transition-all duration-500 group-hover:stroke-blue-500 group-hover:scale-110 origin-center" />
                
                <!-- Label in the middle -->
                <text x="50" y="${h / 2}" dominant-baseline="middle" text-anchor="middle" 
                    class="text-[10px] font-bold uppercase fill-black dark:fill-white font-sans bg-white" 
                    style="text-shadow: 0 0 5px white;">
                    ${phase.label}
                </text>
            </svg>
        `;

        visualContainer.innerHTML = svgContent;


        // --- C. BOTTOM CONTENT (Decisions) ---
        const bottomContent = document.createElement('div');
        bottomContent.className = 'h-1/3 w-full p-4 flex flex-col justify-start text-left relative z-20 pt-6';

        if (phase.decision && phase.decision.length > 0) {
            // Arrow pointing down from visual
            const arrow = document.createElement('div');
            arrow.className = 'absolute -top-3 left-1/2 -translate-x-1/2 w-px h-6 bg-black dark:bg-white';
            const arrowHead = document.createElement('div');
            arrowHead.className = 'absolute -top-3 left-1/2 -translate-x-1/2 translate-y-6 w-2 h-2 border-r border-b border-black dark:border-white rotate-45';

            bottomContent.innerHTML = `
                <h5 class="font-bold text-sm uppercase mb-3 text-black dark:text-white">Décision</h5>
                <ul class="space-y-1">
                     ${phase.decision.slice(0, 4).map(d => `<li class="text-[9px] text-gray-500 leading-tight">- ${d}</li>`).join('')}
                </ul>
            `;
            bottomContent.appendChild(arrow);
            bottomContent.appendChild(arrowHead);
        }

        col.appendChild(topContent);
        col.appendChild(visualContainer);
        col.appendChild(bottomContent);
        mainWrapper.appendChild(col);
    });

    // Bottom decorative arrow (The global timeline arrow)
    const arrowLine = document.createElement('div');
    arrowLine.className = 'absolute bottom-8 left-12 right-12 h-px bg-black dark:bg-white flex items-center justify-end';
    arrowLine.innerHTML = '<div class="w-3 h-3 border-r border-t border-black dark:border-white rotate-45"></div>';
    card.appendChild(arrowLine);
}
