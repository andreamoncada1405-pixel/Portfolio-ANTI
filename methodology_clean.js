
// --- METHODOLOGY TIMELINE RENDERER (DOUBLE DIAMOND) ---
function renderMethodologyTimeline() {
    const container = document.getElementById('methodology-timeline');
    if (!container) return;

    // Clear container
    container.innerHTML = '';

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'flex flex-row items-stretch justify-between gap-0 relative min-h-[550px]';
    container.appendChild(wrapper);

    methodologyPhases.forEach((phase, index) => {
        // Phase Container
        const phaseEl = document.createElement('div');
        phaseEl.className = 'flex-1 group relative flex flex-col items-center h-full transition-all duration-300 min-w-[140px]';

        // --- 1. Top Section: Title & Label ---
        const topSection = document.createElement('div');
        topSection.className = 'w-full text-center pb-8 z-30 relative group-hover:-translate-y-1 transition-transform duration-300';

        const phaseIdBox = document.createElement('div');
        phaseIdBox.className = 'text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-medium';
        phaseIdBox.textContent = `Phase ${phase.id}.`;

        const titleBox = document.createElement('h3');
        titleBox.className = 'text-lg md:text-xl font-bold text-dynamic-main mb-1 transition-colors group-hover:text-blue-500 cursor-help';
        titleBox.textContent = phase.title;

        // Tooltip for Content (Tasks)
        const tooltip = document.createElement('div');
        tooltip.className = 'absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-56 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 p-5 rounded-xl shadow-2xl opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 pointer-events-none text-left';

        const taskList = document.createElement('ul');
        taskList.className = 'space-y-2.5';
        phase.content.forEach(task => {
            const li = document.createElement('li');
            li.className = 'text-xs text-dynamic-sub flex items-start gap-2.5 leading-tight';
            li.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 flex-shrink-0"></span> ${task}`;
            taskList.appendChild(li);
        });
        tooltip.appendChild(taskList);

        topSection.appendChild(phaseIdBox);
        topSection.appendChild(titleBox);
        topSection.appendChild(tooltip);

        // --- 2. Middle Section: The SVG Wave Visual ---
        const visualSection = document.createElement('div');
        visualSection.className = 'flex-grow w-full relative flex items-center justify-center py-0 overflow-visible z-10';

        const h = 300; // viewBox height
        const patternId = `hatch-${index}`;

        // Dynamic path logic for strict smooth connections
        let startW = 0.3; let endW = 0.3; // Default Linear

        // Logic mapping based on flow: Div implies Opening, Conv implies Closing.
        // 0 (Anticipation): Linear (Secure) -> 0.3 to 0.3
        // 1 (Intuitions): Divergent (Discover) -> 0.3 to 0.9 (Open)
        // 2 (Nouveau CdC): Convergent (Create) -> 0.9 to 0.3 (Close) - WAIT, image shows "Creation" as BIG bubble.
        // Let's look at the image again. 
        // Phase 1 (Discovery) opens up. Phase 2 (Creation) seems to start wide and stay wide or close slightly?
        // Prompt says: 0:Linear, 1:Divergent, 2:Convergent, 3:Divergent, 4:Convergent, 5:Linear.
        // Standard Double Diamond: Discover(Div) -> Define(Conv) -> Develop(Div) -> Deliver(Conv).
        // Let's stick to the prompt's explicit types which match the double diamond.

        if (index === 0) { startW = 0.3; endW = 0.3; }
        if (index === 1) { startW = 0.3; endW = 1.0; } // Open Wide
        if (index === 2) { startW = 1.0; endW = 0.3; } // Close
        if (index === 3) { startW = 0.3; endW = 1.0; } // Open Wide
        if (index === 4) { startW = 1.0; endW = 0.3; } // Close
        if (index === 5) { startW = 0.3; endW = 0.3; } // Linear

        const topLX = 50 - (startW * 50);
        const topRX = 50 + (startW * 50);
        const botLX = 50 - (endW * 50);
        const botRX = 50 + (endW * 50);
        const h3 = h / 2;

        const pathData = `M ${topLX},0 C ${topLX},${h3} ${botLX},${h3} ${botLX},${h} L ${botRX},${h} C ${botRX},${h3} ${topRX},${h3} ${topRX},0 Z`;

        visualSection.innerHTML = `
            <svg viewBox="0 0 100 ${h}" class="h-full w-full overflow-visible transition-all duration-500 filter drop-shadow-sm group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                <defs>
                    <pattern id="${patternId}" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                        <rect width="1.5" height="3" transform="translate(0,0)" fill="currentColor" class="text-gray-200 dark:text-zinc-800" opacity="0.6"></rect>
                    </pattern>
                </defs>
                
                <!-- Main Shape -->
                <path d="${pathData}" fill="url(#${patternId})" stroke="currentColor" stroke-width="0.5" class="text-gray-300 dark:text-zinc-700 transition-all duration-300 group-hover:stroke-blue-500 group-hover:text-blue-500/10" />
                
                <!-- Center Label (Pill) -->
                <foreignObject x="0" y="${h / 2 - 15}" width="100" height="30">
                    <div class="h-full w-full flex items-center justify-center">
                        <span class="text-[9px] font-bold uppercase tracking-widest bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 px-3 py-1 rounded-full shadow-sm text-dynamic-sub group-hover:text-blue-500 group-hover:border-blue-500 transition-all">
                            ${phase.label}
                        </span>
                    </div>
                </foreignObject>
            </svg>
        `;

        // --- 3. Bottom Section: Decision Points ---
        const bottomSection = document.createElement('div');
        bottomSection.className = 'w-full flex justify-center pt-8 relative min-h-[140px] z-30';

        if (phase.decision && phase.decision.length > 0) {
            // Knot
            const decisionBtn = document.createElement('button');
            decisionBtn.className = 'flex flex-col items-center gap-3 group/decision cursor-pointer focus:outline-none';

            decisionBtn.innerHTML = `
                <div class="w-2 h-8 bg-gradient-to-b from-gray-300 to-transparent dark:from-zinc-700"></div>
                <div class="w-3 h-3 rounded-full bg-white dark:bg-black border-2 border-gray-400 group-hover/decision:border-blue-500 group-hover/decision:bg-blue-500 transition-all shadow-md"></div>
                <span class="text-[9px] font-bold uppercase tracking-widest text-dynamic-sub group-hover/decision:text-blue-500 transition-colors opacity-70 group-hover/decision:opacity-100">Décision</span>
            `;

            // Card
            const decisionCard = document.createElement('div');
            decisionCard.className = 'absolute top-20 w-64 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 p-5 rounded-2xl shadow-2xl opacity-0 invisible translate-y-2 group-hover/decision:opacity-100 group-hover/decision:visible group-hover/decision:translate-y-0 transition-all duration-300 z-50 text-left';

            // "Decision Criteria" Header
            const header = document.createElement('h4');
            header.className = 'text-xs uppercase tracking-widest font-bold text-blue-500 mb-3 border-b border-blue-500/20 pb-2';
            header.textContent = 'Critères de Décision';
            decisionCard.appendChild(header);

            const decisionList = document.createElement('ul');
            decisionList.className = 'space-y-2';
            phase.decision.forEach(dec => {
                const li = document.createElement('li');
                li.className = 'text-xs text-dynamic-sub flex items-start gap-2';
                li.innerHTML = `<span class="text-blue-500 font-bold">›</span> ${dec}`;
                decisionList.appendChild(li);
            });
            decisionCard.appendChild(decisionList);
            decisionBtn.appendChild(decisionCard);
            bottomSection.appendChild(decisionBtn);
        }

        phaseEl.appendChild(topSection);
        phaseEl.appendChild(visualSection);
        phaseEl.appendChild(bottomSection);
        wrapper.appendChild(phaseEl);
    });
}
