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
// --- MODAL LOGIC ---
function openModal(modalId) {
    // 1. Try to find a standard modal (by ID) - e.g. References
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.classList.add('modal-open');

        // Trigger scaling for Reyou if it's the target
        if (modalId === 'modal-reyou') {
            setTimeout(updateReyouScale, 100);
        }

        // Reset contact form if opening the contact modal
        if (modalId === 'modal-contact' && typeof resetContactForm === 'function') {
            resetContactForm();
        }
        return;
    }

    // 2. Try to find a Project Cell in the Master Modal
    const targetCell = document.querySelector(`.project-grid-cell[data-project="${modalId}"]`);
    if (targetCell) {
        const masterModal = document.getElementById('projects-master-modal');

        if (masterModal) {
            masterModal.classList.add('active');
            document.body.classList.add('modal-open');

            // Scroll the viewport to the specific cell
            // Using auto behavior for instant snap to the correct project
            targetCell.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });

            // Trigger scaling if needed (using the logic generic to reyou)
            if (modalId === 'modal-reyou') {
                setTimeout(updateReyouScale, 300); // Slightly longer delay to allow visibility transition
            }

            // Initialize Altarea Scroll Logic
            if (modalId === 'modal-altarea') {
                setTimeout(initAltareaScrollLogic, 100);
            }

            // Trigger bubble pop for Marseille and Group Atlantic prototypes
            if (modalId === 'modal-kciope' || modalId === 'modal-interop') {
                const prototypeBadge = targetCell.querySelector('.prototype-badge');
                if (prototypeBadge) {
                    setTimeout(() => {
                        if (!prototypeBadge.classList.contains('pop')) {
                            prototypeBadge.classList.add('pop');
                            setTimeout(() => {
                                prototypeBadge.classList.add('hidden');
                            }, 500); // Match animation duration
                        }
                    }, 7000); // 7 seconds
                }
            }

            // Update Master Close Button Position
            setTimeout(updateMasterCloseButton, 50);
        }
    }
}

function closeModal(event) {
    // Close if clicking outside the modal-window (the actual card content)
    const modalWindow = event.target.closest('.modal-window');
    const closeButton = event.target.closest('.master-close-btn');

    // If we didn't click inside a modal-window and didn't click the close button
    if (!modalWindow && !closeButton) {
        closeModalForce();
    }
}

function closeModalForce() {
    // Close both types of modals
    document.querySelectorAll('.modal-backdrop, .projects-master-modal').forEach(m => m.classList.remove('active'));
    document.body.classList.remove('modal-open');

    // Reset bubble state so it reappears next time (for ALL badges)
    document.querySelectorAll('.prototype-badge').forEach(badge => {
        badge.classList.remove('pop', 'hidden');
    });
}

/* --- FIGMA-STYLE SCALING FOR REYOU --- */
function updateReyouScale() {
    const container = document.querySelector('.reyou-preview-container');
    const scaler = document.getElementById('reyou-scaler');
    if (!container || !scaler) return;

    const baseWidth = 1360; // Virtual width for Figma-like scaling
    const baseHeight = 850; // Virtual height for Figma-like scaling

    const padding = 60; // Buffer space
    const targetW = container.offsetWidth - padding;
    const targetH = container.offsetHeight - padding;

    const scaleX = targetW / baseWidth;
    const scaleY = targetH / baseHeight;

    const finalScale = Math.min(scaleX, scaleY, 1);
    scaler.style.transform = `scale(${finalScale})`;
}



window.addEventListener('resize', () => {
    updateReyouScale();
});

// --- TRANSLATIONS (Shortened for brevity but functionality remains) ---
const methodologyPhases = [
    {
        id: 0,
        title: "Anticipation",
        label: "Sécuriser",
        category: "méthodologie",
        type: "linear",
        content: ["Définir la méthodologie", "Design de la question", "Enrichissement du CdC", "Kick off/équipe projet"],
        decision: []
    },
    {
        id: 1,
        title: "Intuitions",
        label: "Découvertes",
        category: "enquête terrain",
        type: "divergent",
        content: ["Interview", "Ethnographie/Observation", "Documentation/data", "État de l'art"],
        decision: [
            "Définir les critères de succès <br>& mesures du projet",
            "Elargir le sujet,",
            "Expliciter la méthode",
            "Le risque à ne pas faire le projet",
            "ROI",
            "Cartographie des acteurs/parties prenantes",
            "Ecosystème projet"
        ]
    },
    {
        id: 2,
        title: "Nouveau CdC",
        label: "Audace",
        category: "création",
        type: "convergent",
        content: ["Co-création/workshop", "Créativité/variation", "Justesse du dosage creatif", "Portefeuille d'idée"],
        decision: [
            "Nouveau critère dans le CdC = qualité et innovation",
            "Poser les Symptômes et les causes racines",
            "Rapport d'étonnement",
            "Cartographie d'expérience usager / collaborateur",
            "Veille chiffrée / Data & évolution",
            "Veille tendance / évolution chiffrée"
        ]
    },
    {
        id: 3,
        title: "Certitudes",
        label: "Mesurer",
        category: "tests/POC",
        type: "divergent",
        content: ["Def Zones d'incertitude des AVP", "Variations / nuances", "Audace/ Agilité/ Adaptabilité", "Portefeuille d'idées"],
        decision: [
            "Hiérarchiser les idées ou AVP sur critères",
            "Zone de risque tech / Commercial / Marketing / Social",
            "Définir les critères de performance pour POC",
            "Business model",
            "Carto d'impacts",
            "Story-Board",
            "Sketch / 3D / motion"
        ]
    },
    {
        id: 4,
        title: "Faisabilité",
        label: "Convergence",
        category: "finalisation",
        type: "convergent",
        content: ["Compromis qualité", "Technique/Economique/Process/Marketing", "Portefeuille d'idée"],
        decision: [
            "Mesure objective de la performance des tests",
            "Comparaison des variations",
            "Pousser l'exploration et accueillir l'imprévu",
            "Data-vision de comparaison des tests (araignée de performance, etc...)"
        ]
    },
    {
        id: 5,
        title: "Succès",
        label: "Aboutir",
        category: "concrétiser",
        type: "linear",
        content: ["Lancement industriel", "Lancement Marketing", "Diffusion culturelle"],
        decision: ["Maitrise des coûts", "Maitrise du planning", "Data-vision de comparaison", "RACI"]
    }
];

const translations = {
    'fr': {
        'nav_work': 'Projets', 'nav_profile': 'Profil', 'nav_contact': 'Contact', 'nav_method': 'Méthode', 'nav_cv': 'CV',
        'nav_logo_title': 'Designer Systémique & Stratégiste de l\'Innovation',
        'meta_at': 'chez',
        'hero_title': 'Innovation<br>Systémique.',
        'hero_subtitle': 'La rencontre entre Design & Business Strategy',
        'story_text': 'Je transforme la complexité en opportunité stratégique. En tant que Systemic Designer, je conçois des écosystèmes complets où la créativité devient un levier de production de valeur. Admis au Mastère Spécialisé de l\'<a href="https://em-lyon.com/" target="_blank" class="underline hover:opacity-70 transition">EM Lyon</a>, je recherche une alternance pour structurer vos projets complexes.',
        'section_work': 'Projets Sélectionnés',
        'label_problem': 'La Problématique', 'label_goal': 'L\'Objectif', 'label_solution': 'La Solution',
        'about_education': 'Éducation', 'about_current': 'Poste Actuel', 'about_focus': 'Expertise', 'about_frameworks': 'Frameworks',
        'about_focus_1': 'Mngmt de l\'Innovation', 'about_focus_2': 'Design Systémique',
        'about_frameworks_1': 'Méthodes UX', 'about_frameworks_2': 'Design Thinking',

        // MODAL UI
        'preview_label': 'Explorez le prototype',
        'click_to_interact': 'Cliquez pour interagir',
        'preview_label_interactive': 'Aperçu Interactif',
        'preview_label_platform': 'Aperçu Plateforme Live',
        'preview_label_prototype': 'Prototype Interactif',
        'preview_label_presentation': 'Présentation Interactif',
        'open_site_label': 'Ouvrir le site ↗',
        'open_fullscreen_label': 'Ouvrir en plein écran ↗',

        // K-CIOPE
        'p0_title': 'ALR3 - Adoptez le R3flexe', 'p0_desc': 'UX/UI Designer • 2024-2026', 'p0_title_full': 'ALR3 - Adoptez le R3flexe', 'p0_problem': 'Moderniser la gestion des incidents (voirie, propreté) pour les agents de terrain et les citoyens, remplaçant des processus obsolètes.', 'p0_goal': 'Fluidifier la remontée d\'information et optimiser l\'intervention des services publics via une UX mobile-first.', 'p0_solution': 'Prototypage haute-fidélité pour validation rapide par les parties prenantes avant développement (Agile).',
        'p0_main_desc': 'Vecteur clé de la transition écologique, l\'application devait dépasser sa fonction utilitaire pour devenir un véritable moteur d\'engagement. Cette refonte a métamorphosé un outil technique complexe en un compagnon du quotidien, fluide et intuitif, démocratisant l\'accès aux éco-gestes pour l\'ensemble des habitants de la Métropole.',
        'p0_achievements': '• Audit UX et analyse des usages (Analytics)<br>• Animation d\'ateliers de co-conception métier<br>• Refonte de l\'architecture de l\'information<br>• Création du système visuel et UI Design<br>• Prototypage interactif haute-fidélité (Figma)',
        'p0_context_desc': 'Navigation complexe and faible adoption. Transformation d\'un outil administratif en expérience citoyenne fluide, alignant service public et standards UX modernes.',

        'nav_complete_title': 'Navigation Complète',
        'nav_complete_alr3': 'Explorez le prototype →',
        'nav_complete_rockease': 'Explorez le site →',
        'label_achievements': 'Réalisations',
        'label_context': 'Contexte',
        'label_client': 'Collaboration',
        'label_role_date': 'Role & Date',

        // CONTACT FORM
        'contact_reach_out': 'Prenez Contact',
        'contact_title': 'Parlons innovation.',
        'contact_placeholder_name': 'Nom',
        'contact_placeholder_company': 'Entreprise',
        'contact_placeholder_role': 'Rôle',
        'contact_placeholder_email': 'Email',
        'contact_placeholder_message': 'Votre Message',
        'contact_send_btn': 'Envoyer le Message',
        'contact_success_label': 'MESSAGE REÇU',
        'contact_success_title': 'Merci !',
        'contact_success_desc': 'Votre message a bien été reçu. Je reviendrai vers vous très prochainement.',

        // SYNERGIE
        'p_synergie_title': 'Synergie', 'p_synergie_subtitle': 'Transformation Digitale', 'p_synergie_desc': 'UX/UI Designer • 2025', 'p_synergie_title_full': 'Synergie',
        'p_synergie_main_desc': 'Dans une guerre des talents compétitive, l\'expérience numérique est la première vitrine de la marque employeur. Ce projet visait à fluidifier radicalement le parcours d\'inscription pour maximiser la conversion.',
        'p_synergie_achievements': '• Scénarisation des parcours (User Flows)<br>• Design de l\'Onboarding progressif<br>• Modélisation du Dashboard Candidat<br>• Création d\'un Design System unifié',
        'p_synergie_context_desc': 'Réseau international (17 pays). Projet "Apollo" : conception d\'un tunnel d\'acquisition progressif pour réduire l\'abandon et centraliser les candidatures.',

        // MAKE / AI
        'p_make_title': 'Automatisation & IA DesignOps', 'p_make_desc': 'Make • Workflow AI', 'p_make_title_full': 'Optimisation des Flux avec l\'IA et le No-Code',
        'p_make_problem': 'Les équipes créatives passent trop de temps sur des tâches répétitives à faible valeur ajoutée (saisie de données, gestion d\'assets, reporting).',
        'p_make_goal': 'Implémenter des workflows "No-Code" (Make) connectés à des agents IA pour automatiser ces processus et libérer du temps créatif.',
        'p_make_solution': 'Création de connecteurs intelligents entre outils design (Figma), bases de données (Airtable) et IA pour une génération et organisation automatisée.',

        // VAMOS
        'p_vamos_title': 'Vamos Bikes', 'p_vamos_subtitle': 'Marketplace B2B', 'p_vamos_desc': 'UX/UI Designer • 2024',
        'p_vamos_title_full': 'Vamos Bikes',
        'p_vamos_main_desc': 'Plus qu\'une vitrine, le site est ici le premier vendeur. Cette refonte intégrale (End-to-End) fusionne immersion lifestyle et clarté technique. L\'objectif : rassurer l\'utilisateur sur ce produit premium et fluidifier le parcours, de la découverte émotionnelle jusqu\'à l\'achat confiant.',
        'p_vamos_achievements': '• Audit UX et stratégie e-commerce<br>• Refonte de l\'identité visuelle (UI) & Branding<br>• Conception "Mobile First" et Responsive<br>• Optimisation du tunnel d\'achat<br>• Prototypage haute-fidélité complet',
        'p_vamos_context_desc': 'Un site existant vieillissant qui ne reflétait pas la qualité premium des vélos, créant un frein psychologique à l\'achat sur un marché concurrentiel. Solution : Une expérience d\'achat moderne qui valorise le produit.',
        'p3_title': 'Stratégie Luxe & 3D', 'p3_desc': 'Phase Création • Jumeau Numérique',

        // ROCKEASE
        'p_rockease_title': 'Rockease', 'p_rockease_desc': 'UI Designer • 2025',
        'p_rockease_title_full': 'Rockease',
        'p_rockease_problem_desc': 'Optimiser l\'approvisionnement en granulats pour les chantiers, un processus traditionnellement manuel et fragmenté.',
        'p_rockease_strategy_desc': 'Conception d\'une marketplace B2B intuitive permettant de commander et suivre les livraisons en temps réel.',
        'p_rockease_result_desc': 'Une plateforme centralisée qui réduit les coûts logistiques et simplifie la vie des conducteurs de travaux.',
        'p_rockease_main_desc': 'Au sein de la Digital Factory, l\'enjeu était de réduire le "Time-to-Market" sans sacrifier la qualité visuelle. Mon rôle hybride a permis de combler le fossé entre design et développement. En traduisant directement les concepts graphiques en solutions Webflow modulaires, nous avons créé une plateforme robuste, évolutive et parfaitement fidèle à l\'identité de marque du groupe.',
        'p_rockease_achievements': '• Co-conception des interfaces<br>• Développement et intégration Webflow<br>• Architecture CMS & Collections<br>• Gestion du Responsive Design',
        'p_rockease_context_desc': 'Marketplace B2B pour la commande de matériaux de construction. Réduction du "Time-to-Market" tout en maintenant une qualité visuelle premium et une fidélité parfaite à l\'identité de marque Colas.',

        // AGIRC
        'p_agirc_title': 'Agirc-Arrco', 'p_agirc_desc': 'UX Researcher & Analyst • 2025',
        'p_agirc_title_full': 'Agirc-Arrco',
        'p_agirc_main_desc': 'Intervention ciblée pour valider la refonte de l\'espace B2B Agirc-Arrco. Mise à l\'épreuve des nouveaux parcours via des tests utilisateurs en situation réelle et analyse des données de navigation pour identifier objectivement les bloquants.',
        'p_agirc_achievements': '• Recrutement et tests avec experts (RH/Paie)<br>• Analyse comportementale en situation<br>• Consolidation des données<br>• Rapport de recommandations UX',
        'p_agirc_context_desc': 'Pour réussir la refonte d\'un portail aussi complexe, l\'intuition ne suffisait pas. Mon rôle a été d\'apporter une validation factuelle en confrontant les maquettes à la réalité du terrain.',

        // ELBA / HELENA RUBINSTEIN
        'p_elba_title': 'Helena Rubinstein',
        'p_elba_subtitle': 'LUXURY PACKAGING & ECO-DESIGN',
        'p_elba_desc': 'Systemic Product Designer • 2023',
        'p_elba_main_desc': 'Développement d\'une édition limitée pour le marché chinois de l\'iconique crème Re-Plasty, à l\'occasion du Nouvel An Lunaire. Le projet résout le paradoxe entre luxe célébratif et responsabilité environnementale, transformant un produit saisonnier en un objet durable.',
        'p_elba_achievements': '• Analyse sémiotique des codes culturels chinois et des rituels du luxe<br>• Éco-conception du système "Refill" pour prolonger le cycle de vie du packaging<br>• Développement graphique et matière (finition or) cohérent avec l\'héritage de la marque<br>• Rendu 3D photoréaliste pour la valorisation du concept',
        'p_elba_context_desc': 'Le Nouvel An Lunaire est la période commerciale la plus critique pour le marché chinois, dominé par des packagings cérémoniels "jetables". Cette solution de recharge éco-responsable permet de respecter la tradition du don tout en introduisant un nouveau standard de durabilité.',

        // REYOU
        'p_reyou_title': 'REYOU', 'p_reyou_desc': 'Systemic & UX/UI Designer • 2026', 'p_reyou_title_full': 'REYOU',
        'p_reyou_subtitle': 'ÉCONOMIE CIRCULAIRE & RETAIL DIGITAL',
        'p_reyou_main_desc': 'Développement d\'un showroom numérique interactif pour valoriser le mobilier de bureau de seconde main (réemploi). Le projet digitalise l\'espace physique (Coworking "Le Périscope"), permettant aux clients B2B d\'explorer et d\'acheter le stock directement dans un contexte d\'usage réel. Une solution qui lève les freins psychologiques liés à l\'occasion, transformant un inventaire statique en expérience immersive.',
        'p_reyou_achievements': '• Conception de la stratégie "Phygital"<br>• UX/UI Design de l\'interface interactive<br>• Modélisation et rendu stratégique<br>• Intégration de la génération de leads',
        'p_reyou_context_desc': 'Le marché du mobilier reconditionné souffre souvent d\'un déficit d\'image. Le défi était de prouver que le mobilier de réemploi peut soutenir des espaces de travail modernes et premium. L\'intuition a été de ne pas vendre la pièce seule, mais le \"set\" contextualisé.',

        // AI EXPERTISE
        'section_ai_expertise': 'Expertise IA',
        'ai_expertise_title': 'Workflow IA & Automatisation',
        'ai_expertise_desc': 'Optimisation des flux créatifs par l\'IA. Je conçois des systèmes qui automatisent les tâches répétitives pour libérer le potentiel créatif des équipes.',


        // ALTAREA
        'p_altarea_title': 'ALTAREA', 'p_altarea_desc': 'Product & Systemic Designer • 2024',
        'p_altarea_title_full': 'ALTAREA',
        'p_altarea_subtitle': 'Urbanisme & Adaptation Climatique',
        'p_altarea_main_desc': 'Développement d\'une solution systémique pour atténuer les îlots de chaleur urbains (ICU). En combinant canopée végétale et structure innovante, le projet collecte l\'eau de pluie et génère une ombre salvatrice, transformant la place publique en un refuge climatique actif et poétique.',
        'p_altarea_achievements': '• Recherche et analyse du microclimat urbain<br>• Stratégie UX pour espaces en conditions extrêmes<br>• Conception intégrale du système (mobilier urbain)<br>• Modélisation 3D et rendu photoréaliste',
        'p_altarea_context_desc': 'Les canicules rendent les espaces ouverts invivables. L\'approche traditionnelle du mobilier urbain est insuffisante face à l\'urgence climatique. Le défi : dépasser le "verdissement" esthétique pour une solution fonctionnelle qui réduit la température ressentie et préserve la vie sociale.',

        // GROUP ATLANTIC
        'p_interop_title': 'Groupe Atlantic',
        'p_interop_subtitle': 'Référentiel Interopérabilité',
        'p_interop_desc': 'UX/UI Designer - 2025',
        'p_interop_title_full': 'Groupe Atlantic',
        'p_interop_main_desc': 'Conception d\'un outil interne de vérification d\'interopérabilité des produits connectés. Simplification d\'une base de données technique complexe pour la rendre exploitable par les équipes support.',
        'p_interop_achievements': '• Recherche utilisateur (Besoin Support)<br>• UI Design & Système visuel<br>• Simplification de données complexes<br>• Conception du moteur de recherche<br>• Prototypage haute-fidélité',
        'p_interop_context_desc': 'Face à la complexité croissante des écosystèmes connectés, les équipes support ont besoin de réponses immédiates. Ce projet a consisté à dompter une base de données technique aride pour en faire un outil de consultation intuitif.',
        'preview_label_interop': 'Aperçu Référentiel',

        'footer_desc': 'Disponible pour l\'alternance', 'cta_talk': 'Me Contacter',
        // Methodology
        'method_scroll_explore': 'Défilez pour explorer',
        'method_process': 'Processus',
        'method_title': 'Design & Decide',
        'method_intro_1': 'Diverger pour explorer. Converger pour décider.',
        'method_intro_2': 'Le passage du besoin initial au résultat final ne doit pas être laissé au hasard. Ce cadre systémique alterne créativité et rigueur analytique.',
        'method_intro_3': 'Le résultat : nous éliminons les suppositions. Rien n\'est développé sans avoir été préalablement validé par les données et l\'expérience utilisateur. C\'est le pont entre l\'intuition et la faisabilité.',
        'method_cdc': 'CdC',
        'method_prob': 'problématique',
        'method_decision': 'Outil de Décision',
        'methodology': [
            {
                title: "Anticipation", label: "Sécuriser", category: "méthodologie",
                content: ["Définir la méthodologie", "Design de la question", "Enrichissement du CdC", "Kick off / équipe projet"],
                decision: []
            },
            {
                title: "Intuitions", label: "Découvertes", category: "enquête terrain",
                content: ["Interview", "Ethnographie / Observation", "Documentation / data", "État de l'art"],
                decision: ["Définir les critères de succès <br>& mesures du projet", "Élargir le sujet", "Expliciter la méthode", "ROI", "Cartographie des acteurs / parties prenantes", "Écosystème projet"]
            },
            {
                title: "Nouveau CdC", label: "Audace", category: "création",
                content: ["Co-création / workshop", "Créativité / variation", "Justesse du dosage créatif", "Portefeuille d'idée"],
                decision: ["Nouveau critère dans le CdC = qualité et innovation", "Poser les symptômes et les causes racines", "Rapport d'étonnement", "Cartographie d'expérience usager / collaborateur", "Veille chiffrée / Data & évolution", "Veille tendance / évolution chiffrée"]
            },
            {
                title: "Certitudes", label: "Mesurer", category: "tests/POC",
                content: ["Déf Zones d'incertitude des AVP", "Variations / nuances", "Audace / Agilité / Adaptabilité", "Portefeuille d'idées"],
                decision: ["Hiérarchiser les idées ou AVP basés sur des critères", "Zone de risque tech / Commercial / Marketing / Social", "Définir les critères de performance pour le POC", "Business model", "Carto d'impacts", "Story-Board", "Sketch / 3D / motion"]
            },
            {
                title: "Faisabilité", label: "Convergence", category: "finalisation",
                content: ["Compromis qualité", "Technique/Économique/Process/Marketing", "Portefeuille d'idées"],
                decision: [
                    "Mesure objective de la performance des tests",
                    "Comparaison des variations",
                    "Pousser l'exploration et accueillir l'imprévu",
                    "Data-vision de comparaison des tests (araignée de performance, etc...)"
                ]
            },
            {
                title: "Succès", label: "Aboutir", category: "concrétiser",
                content: ["Lancement industriel", "Lancement Marketing", "Diffusion culturelle"],
                decision: ["Maîtrise des coûts", "Maîtrise du planning", "Data-vision de comparaison", "RACI"]
            }
        ]
    },
    'en': {
        'nav_work': 'Work', 'nav_profile': 'Profile', 'nav_contact': 'Contact', 'nav_method': 'Method', 'nav_cv': 'CV',
        'nav_logo_title': 'Systemic Designer & Innovation Strategist',
        'meta_at': 'at',
        'hero_title': 'Systemic<br>Innovation.',
        'hero_subtitle': 'Where Design meets Business Strategy',
        'story_text': 'I transform complexity into strategic opportunity. As a Systemic Designer, I build ecosystems where creativity becomes a lever for value production. Joining <a href="https://em-lyon.com/" target="_blank" class="underline hover:opacity-70 transition">EM Lyon</a> to bridge the gap between design intelligence and business strategy.',
        'section_work': 'Selected Works',
        'label_problem': 'The Problem', 'label_goal': 'The Goal', 'label_solution': 'The Solution',
        'about_education': 'Education', 'about_current': 'Current Position', 'about_focus': 'Focus', 'about_frameworks': 'Frameworks',
        'about_focus_1': 'Innovation Mgmt', 'about_focus_2': 'Systemic Design',
        'about_frameworks_1': 'UX Methods', 'about_frameworks_2': 'Design Thinking',

        // MODAL UI
        'preview_label': 'Explore prototype',
        'click_to_interact': 'Click to interact',
        'preview_label_interactive': 'Interactive Preview',
        'preview_label_platform': 'Live Platform Preview',
        'preview_label_prototype': 'Interactive Prototype',
        'preview_label_presentation': 'Interactive Presentation',
        'open_site_label': 'Open Site ↗',
        'open_fullscreen_label': 'Open Fullscreen ↗',

        // K-CIOPE
        'p0_title': 'ALR3 - Adoptez le R3flexe', 'p0_desc': 'UX/UI Designer • 2024-2026', 'p0_title_full': 'ALR3 - Adoptez le R3flexe',
        'p0_problem': 'Modernizing incident management (roads, waste) for field agents, replacing obsolete processes.', 'p0_goal': 'Streamline information flow and optimize public service interventions.', 'p0_solution': 'High-fidelity prototyping for rapid stakeholder validation before development (Agile).',
        'p0_main_desc': 'A key driver of ecological transition, the app needed to exceed its utilitarian function to become a true engine of engagement. This redesign transformed a complex technical tool into a daily companion, fluid and intuitive, democratizing access to eco-gestures for all residents of the Metropolis.',
        'p0_achievements': '• UX Audit and usage analysis (Analytics)<br>• Facilitation of business co-design workshops<br>• Information architecture redesign<br>• Creation of visual system and UI Design<br>• High-fidelity interactive prototyping (Figma)',
        'p0_context_desc': 'Complex navigation and low adoption. Transforming an administrative tool into a seamless citizen experience, aligning public service with modern UX standards.',

        'nav_complete_title': 'Full Navigation',
        'nav_complete_alr3': 'Explore the prototype →',
        'nav_complete_rockease': 'Explore the site →',
        'label_achievements': 'Achievements',
        'label_context': 'Context',
        'label_client': 'Collaboration',
        'label_role_date': 'Role & Date',

        // CONTACT FORM
        'contact_reach_out': 'Reach Out',
        'contact_title': 'Let\'s talk innovation.',
        'contact_placeholder_name': 'Name',
        'contact_placeholder_company': 'Company',
        'contact_placeholder_role': 'Role',
        'contact_placeholder_email': 'Email',
        'contact_placeholder_message': 'Your Message',
        'contact_send_btn': 'Send Message',
        'contact_success_label': 'MESSAGE RECEIVED',
        'contact_success_title': 'Thank you!',
        'contact_success_desc': 'Your message has been received. I\'ll get back to you very soon.',

        // SYNERGIE
        'p_synergie_title': 'Synergie',
        'p_synergie_subtitle': 'Digital Transformation',
        'p_synergie_desc': 'UX/UI Designer • 2025',
        'p_synergie_title_full': 'Synergie',
        'p_synergie_main_desc': 'In a competitive talent war, digital experience is the first window of the employer brand. This project aimed to radically streamline the registration journey to maximize conversion.',
        'p_synergie_achievements': '• User Flow Scenarios<br>• Progressive Onboarding Design<br>• Candidate Dashboard Modeling<br>• Unified Design System Creation',
        'p_synergie_context_desc': 'International network (17 countries). Project \"Apollo\": designing a progressive acquisition tunnel to reduce drop-off and centralize applications.',
        'p_make_title': 'DesignOps Automation & IA', 'p_make_desc': 'Make • Workflow AI', 'p_make_title_full': 'Workflow Optimization with AI & No-Code',
        'p_make_problem': 'Creative teams spend too much time on repetitive, low-value tasks.', 'p_make_goal': 'Implement \"No-Code\" workflows (Make) connected to AI agents.', 'p_make_solution': 'Creation of intelligent connectors between design tools and IA.',
        // VAMOS
        'p_vamos_title': 'Vamos Bikes',
        'p_vamos_subtitle': 'B2B Marketplace',
        'p_vamos_desc': 'UX/UI Designer • 2024',
        'p_vamos_title_full': 'Vamos Bikes',
        'p_vamos_main_desc': 'More than a showcase, the site is the primary salesperson. This end-to-end redesign merges lifestyle immersion with technical clarity. The goal: reassure the user about this premium product and streamline the journey, from emotional discovery to confident purchase.',
        'p_vamos_achievements': '• UX Audit & E-commerce Strategy<br>• Visual Identity Redesign (UI) & Branding<br>• \"Mobile First\" & Responsive Design<br>• Purchase Funnel Optimization<br>• High-Fidelity Prototyping',
        'p_vamos_context_desc': 'An aging existing site that did not reflect the premium quality of the bikes, creating a psychological barrier to purchase in a competitive market. Solution: A modern shopping experience that highlights the product.',
        'p3_title': 'Luxury Strategy & 3D', 'p3_desc': 'Creation Phase • Digital Twin',

        // ROCKEASE
        'p_rockease_title': 'Rockease', 'p_rockease_desc': 'UI Designer • 2025',
        'p_rockease_title_full': 'Rockease',
        'p_rockease_problem_desc': 'Optimizing aggregate procurement for construction sites, a traditionally manual and fragmented process.',
        'p_rockease_strategy_desc': 'Designing an intuitive B2B marketplace to order and track deliveries in real-time.',
        'p_rockease_result_desc': 'A centralized platform that reduces logistical costs and simplifies the work of site managers.',
        'p_rockease_main_desc': 'Within the Digital Factory, the challenge was to reduce \"Time-to-Market\" without sacrificing visual quality. My hybrid role bridged the gap between design and development. By directly translating graphic concepts into modular Webflow solutions, we created a robust, scalable platform perfectly faithful to the group\'s brand identity.',
        'p_rockease_achievements': '• Interface Co-design<br>• Webflow Development & Integration<br>• CMS Architecture & Collections<br>• Responsive Design Management',
        'p_rockease_context_desc': 'B2B Marketplace for ordering construction materials. Reducing \"Time-to-Market\" while maintaining premium visual quality and perfect fidelity to Colas brand identity.',

        // AGIRC
        'p_agirc_title': 'Agirc-Arrco', 'p_agirc_desc': 'UX Researcher & Analyst • 2025',
        'p_agirc_title_full': 'Agirc-Arrco',
        'p_agirc_main_desc': 'Targeted intervention to validate the redesign of the B2B Agirc-Arrco space. Putting new journeys to the test through real-world user tests and analyzing navigation data to objectively identify blockers.',
        'p_agirc_achievements': '• Recruitment and testing with experts (HR / Payroll)<br>• Behavioral analysis in situ<br>• Data consolidation<br>• UX recommendation report',
        'p_agirc_context_desc': 'To succeed in the redesign of such a complex portal, intuition was not enough. My role was to provide factual validation by confronting the mockups with reality on the ground.',

        // ELBA / HELENA RUBINSTEIN
        'p_elba_title': 'Helena Rubinstein',
        'p_elba_subtitle': 'LUXURY PACKAGING & ECO-DESIGN',
        'p_elba_desc': 'Systemic Product Designer • 2023',
        'p_elba_main_desc': 'Development of a limited edition for the Chinese market of the iconic Re-Plasty cream, for the Lunar New Year. The project resolves the paradox between celebratory luxury and environmental responsibility, transforming a seasonal product into a long-lasting object.',
        'p_elba_achievements': '• Semiotic analysis of Chinese cultural codes and luxury rituals<br>• Eco-design of the \"Refill\" system to extend the packaging life cycle<br>• Graphic and material development (gold finishing) consistent with brand heritage<br>• Photorealistic 3D rendering for concept enhancement',
        'p_elba_context_desc': 'Lunar New Year is the most critical commercial moment for the Chinese market, dominated by \"disposable\" ceremonial packaging. This eco-responsible refill solution respects the tradition of gift-giving while introducing a new standard of durable sustainability.',

        // REYOU
        'p_reyou_title': 'REYOU', 'p_reyou_desc': 'Systemic & UX/UI Designer • 2026', 'p_reyou_title_full': 'REYOU',
        'p_reyou_subtitle': 'CIRCULAR ECONOMY & DIGITAL RETAIL',
        'p_reyou_main_desc': 'Development of an interactive digital showroom to showcase second-hand office furniture. The project digitizes the physical space (Coworking \"Le Périscope\"), allowing B2B clients to explore and purchase stock directly from a real-use context. A solution that removes the psychological barrier of used goods, transforming a static inventory into an immersive experience.',
        'p_reyou_achievements': '• Phygital Strategy Conception<br>• UX/UI Design of interactive interface<br>• Strategic modeling and rendering<br>• Integrated lead generation',
        'p_reyou_context_desc': 'The refurbished furniture market often suffers from an image deficit. The challenge was to demonstrate that reclaimed furniture can support modern, premium workspaces. The insight was not to sell the single piece, but the contextualized \"set\".',

        // AI EXPERTISE
        'section_ai_expertise': 'AI Expertise',
        'ai_expertise_title': 'AI Workflow & Automation',
        'ai_expertise_desc': 'Optimizing creative workflows with AI. I design systems that automate repetitive tasks to unlock the creative potential of teams.',


        // ALTAREA
        'p_altarea_title': 'ALTAREA', 'p_altarea_desc': 'Product & Systemic Designer • 2024',
        'p_altarea_title_full': 'ALTAREA',
        'p_altarea_subtitle': 'Urbanism & Climate Adaptation',
        'p_altarea_main_desc': 'Development of a systemic solution to mitigate Urban Heat Islands (UHI). By combining a green canopy with an innovative structure, the project collects rainwater and provides much-needed shade, transforming the city square into an active and poetic climate shelter.',
        'p_altarea_achievements': '• Urban microclimate research & analysis<br>• UX strategy for extreme environments<br>• Integral system design (urban furniture)<br>• 3D modeling & photorealistic rendering',
        'p_altarea_context_desc': 'Heatwaves make open spaces unlivable. Traditional urban furniture is insufficient in the face of the climate emergency. The challenge: going beyond aesthetic \"greening\" to design a functional solution that lowers perceived temperature and ensures social continuity.',

        // GROUP ATLANTIC
        'p_interop_title': 'Groupe Atlantic',
        'p_interop_subtitle': 'Interoperability Repository',
        'p_interop_desc': 'UX/UI Designer - 2025',
        'p_interop_title_full': 'Groupe Atlantic',
        'p_interop_main_desc': 'Design of an internal tool for verifying the interoperability of connected products. Simplification of a complex technical database to make it usable by support teams.',
        'p_interop_achievements': '• User Research (Support Needs)<br>• UI Design & Visual System<br>• Complex Data Simplification<br>• Search Engine Design<br>• High-Fidelity Prototyping',
        'p_interop_context_desc': 'Faced with the increasing complexity of connected ecosystems, support teams need immediate answers. This project involved taming a dry technical database to turn it into an intuitive consultation tool.',
        'preview_label_interop': 'Repository Preview',

        'footer_desc': 'Open to Opportunities', 'cta_talk': 'Get in Touch',
        // Methodology
        'method_scroll_explore': 'Scroll to Explore',
        'method_process': 'Process',
        'method_title': 'Design & Decide',
        'method_intro_1': 'Diverge to explore. Converge to decide.',
        'method_intro_2': 'The journey from initial need to final result must not be left to chance. This systemic framework alternates between creativity and analytical rigor.',
        'method_intro_3': 'The result: we eliminate guesswork. Nothing is built without first being validated by data and user experience. It is the bridge between intuition and feasibility.',
        'method_cdc': 'Brief',
        'method_prob': 'problem statement',
        'method_decision': 'Decision Tool',
        'methodology': [
            {
                title: "Anticipation", label: "Secure", category: "methodology",
                content: ["Define methodology", "Problem-design / Framing", "Scope enrichment", "Team kick-off"],
                decision: []
            },
            {
                title: "Intuitions", label: "Discoveries", category: "field research",
                content: ["Interviews", "Ethnography / Observation", "Documentation / Data", "State of the art"],
                decision: ["Define success criteria <br>& project metrics", "Broaden the subject", "Define the method", "ROI", "Stakeholder mapping", "Project ecosystem"]
            },
            {
                title: "New Brief", label: "Audacity", category: "creation",
                content: ["Co-creation / Workshop", "Creative variation", "Appropriate creative dosage", "Idea portfolio"],
                decision: ["New success criteria = quality and innovation", "Identify symptoms vs root causes", "Amazement report", "User / Employee experience mapping", "Data monitoring & evolution", "Trend monitoring / quantified evolution"]
            },
            {
                title: "Certitudes", label: "Measure", category: "tests/POC",
                content: ["Identify uncertainty zones (MVP)", "Variation / nuance", "Audacity / Agility / Adaptability", "Idea portfolio"],
                decision: ["Prioritize ideas or AVP based on criteria", "Risk zones (Tech / Commercial / Marketing / Social)", "Define performance criteria for POC", "Business model", "Impact mapping", "Storyboarding", "Sketch / 3D / Motion"]
            },
            {
                title: "Feasibility", label: "Convergence", category: "finalisation",
                content: ["Quality compromise", "Technical / Economic / Process / Marketing", "Idea portfolio"],
                decision: ["Objective performance measurement (tests)", "Comparison of variations", "Encourage exploration & welcome the unexpected", "Data-vision / Test comparison (Spider chart, etc...)"]
            },
            {
                title: "Success", label: "Achieve", category: "realization",
                content: ["Industrial launch", "Marketing launch", "Cultural diffusion"],
                decision: ["Cost control", "Timeline control", "Data-vision comparison", "RACI"]
            }
        ]
    },
    'it': {
        'nav_work': 'Progetti', 'nav_profile': 'Profilo', 'nav_contact': 'Contatti', 'nav_method': 'Metodo', 'nav_cv': 'CV',
        'nav_logo_title': 'Systemic Designer & Strategist dell\'Innovazione',
        'meta_at': 'presso',
        'hero_title': 'Innovazione<br>Sistemica.',
        'hero_subtitle': 'L\'incontro tra Design & Business Strategy',
        'story_text': 'Trasformo la complessità in opportunità strategica. Come Systemic Designer, concepisco interi ecosistemi dove la creatività diventa un asset strategico d\'impresa. Prossimo specializzando all\'<a href="https://em-lyon.com/" target="_blank" class="underline hover:opacity-70 transition">EM Lyon</a> in gestione strategica dell\'innovazione, cerco un\'alternanza per strutturare i vostri progetti complessi.',
        'section_work': 'Progetti Selezionati',
        'label_problem': 'La Domanda', 'label_goal': 'L\'Obiettivo', 'label_solution': 'La Soluzione',
        'about_education': 'Educazione', 'about_current': 'Posizione Attuale', 'about_focus': 'Focus', 'about_frameworks': 'Frameworks',
        'about_focus_1': 'Mngmt Innovazione', 'about_focus_2': 'Design Sistemico',
        'about_frameworks_1': 'Metodi UX', 'about_frameworks_2': 'Design Thinking',

        // MODAL UI
        'preview_label': 'Esplora il prototipo',
        'click_to_interact': 'Clicca per interagire',
        'preview_label_interactive': 'Anteprima Interattiva',
        'preview_label_platform': 'Anteprima Piattaforma Live',
        'preview_label_prototype': 'Prototipo Interattivo',
        'preview_label_presentation': 'Presentazione Interattiva',
        'open_site_label': 'Apri il sito ↗',
        'open_fullscreen_label': 'Apri a tutto schermo ↗',

        // K-CIOPE
        'p0_title': 'ALR3 - Adoptez le R3flexe', 'p0_desc': 'UX/UI Designer • 2024-2026', 'p0_title_full': 'ALR3 - Adoptez le R3flexe',
        'p0_problem': 'Modernizzare la gestione degli incidenti per gli agenti sul campo.', 'p0_goal': 'Fluidificare il flusso di informazioni e ottimizzare gli interventi.', 'p0_solution': 'Prototypazione ad alta fedeltà per validazione rapida.',
        'p0_main_desc': 'Vettore chiave della transizione ecologica, l\'applicazione doveva superare la sua funzione utilitaristica per diventare un vero motore di coinvolgimento. Questo restyling ha trasformato un complesso strumento tecnico in un compagno quotidiano, fluido e intuitivo, democratizzando l\'accesso agli eco-gesti per tutti i residenti della Metropoli.',
        'p0_achievements': '• Audit UX e analisi degli usi (Analytics)<br>• Facilitazione di workshop di co-design<br>• Riprogettazione dell\'architettura dell\'informazione<br>• Creazione del sistema visivo e UI Design<br>• Prototypazione interattiva ad alta fedeltà (Figma)',
        'p0_context_desc': 'Navigazione complessa e bassa adozione. Trasformazione di uno strumento amministrativo in un\'esperienza cittadina fluida, allineando il servizio pubblico agli standard UX moderni.',

        'nav_complete_title': 'Navigazione Completa',
        'nav_complete_alr3': 'Esplora il prototipo →',
        'nav_complete_rockease': 'Esplora il sito →',
        'label_achievements': 'Risultati',
        'label_context': 'Contesto',
        'label_client': 'Collaborazione',
        'label_role_date': 'Ruolo & Data',

        // CONTACT FORM
        'contact_reach_out': 'Contattami',
        'contact_title': 'Parliamo di innovazione.',
        'contact_placeholder_name': 'Nome',
        'contact_placeholder_company': 'Azienda',
        'contact_placeholder_role': 'Ruolo',
        'contact_placeholder_email': 'Email',
        'contact_placeholder_message': 'Il Tuo Messaggio',
        'contact_send_btn': 'Invia Messaggio',
        'contact_success_label': 'MESSAGGIO RICEVUTO',
        'contact_success_title': 'Grazie!',
        'contact_success_desc': 'Il tuo messaggio è stato ricevuto. Ti risponderò molto presto.',

        // SYNERGIE
        'p_synergie_title': 'Synergie', 'p_synergie_subtitle': 'Trasformazione Digitale', 'p_synergie_desc': 'UX/UI Designer • 2025', 'p_synergie_title_full': 'Synergie',
        'p_synergie_main_desc': 'Nel contesto della "War for Talent", l\'esperienza digitale è diventare il primo biglietto da visita dell\'Employer Brand. Questo progetto mirava a fluidificare radicalmente il percorso di iscrizione per massimizzare la conversione.',
        'p_synergie_achievements': '• Scenarizzazione dei percorsi (User Flows)<br>• Design dell\'Onboarding progressivo<br>• Modellazione della Dashboard Candidato<br>• Creazione di un Design System unificato',
        'p_synergie_context_desc': 'Rete internazionale (17 paesi). Progetto "Apollo": progettazione di un tunnel di acquisizione progressivo per ridurre l\'abbandono e centralizzare le candidature.',
        'p_make_title': 'Automazione DesignOps & IA', 'p_make_desc': 'Make • Workflow AI', 'p_make_title_full': 'Ottimizzazione Workflow con IA e No-Code',
        'p_make_problem': 'I team creativi passano troppo tempo in attività ripetitive.', 'p_make_goal': 'Implementare flussi di lavoro "No-Code" connessi ad agenti IA.', 'p_make_solution': 'Creazione di connettori intelligenti tra strumenti di design e IA.',
        // VAMOS
        'p_vamos_title': 'Vamos Bikes', 'p_vamos_subtitle': 'Marketplace B2B', 'p_vamos_desc': 'UX/UI Designer • 2024',
        'p_vamos_title_full': 'Vamos Bikes',
        'p_vamos_main_desc': 'Riprogettazione End-to-End che fonde immersione lifestyle e chiarezza tecnica. L\'obiettivo: fluidificare il percorso, dalla scoperta emotiva all\'acquisto fiducioso.',
        'p_vamos_achievements': '• Audit UX e strategia e-commerce<br>• Redesign dell\'identità visiva (UI) & Branding<br>• Progettazione "Mobile First" e Responsive<br>• Ottimizzazione del tunnel di acquisto<br>• Prototypazione ad alta fedeltà completa',
        'p_vamos_context_desc': 'Un sito esistente invecchiato che non rifletteva la qualità premium delle bici, creando un freno psicologico all\'acquisto in un mercato competitivo. Soluzione: Un\'esperienza di acquisto moderna che valorizza il prodotto.',
        'p3_title': 'Strategia Luxury & 3D', 'p3_desc': 'Fase Creazione • Gemello Digitale',

        // ROCKEASE
        'p_rockease_title': 'Rockease', 'p_rockease_desc': 'UI Designer • 2025',
        'p_rockease_title_full': 'Rockease',
        'p_rockease_problem_desc': 'Ottimizzare l\'approvvigionamento di inerti per i cantieri, un processo tradizionalmente manuale e frammentato.',
        'p_rockease_strategy_desc': 'Progettazione di un marketplace B2B intuitivo che consente di ordinare e tracciare le consegne in tempo reale.',
        'p_rockease_result_desc': 'Una piattaforma centralizzata che riduce i costi logistici e semplifica la vita dei direttori di cantiere.',
        'p_rockease_main_desc': 'All\'interno della Digital Factory, la sfida era ridurre il "Time-to-Market" senza sacrificare la qualità visiva. Il mio ruolo ibrido ha colmato il divario tra design e sviluppo. Traducendo direttamente i concetti grafici in soluzioni Webflow modulari, abbiamo creato una piattaforma robusta, scalabile e perfettamente fedele all\'identità del brand.',
        'p_rockease_achievements': '• Co-design dell\'interfaccia<br>• Sviluppo e integrazione Webflow<br>• Architettura CMS & Collections<br>• Gestione del Responsive Design',
        'p_rockease_context_desc': 'Marketplace B2B per l\'ordine di materiali da costruzione. Riduzione del "Time-to-Market" mantenendo una qualità visiva premium e una fedeltà perfetta all\'identità del marchio Colas.',

        // AGIRC
        'p_agirc_title': 'Agirc-Arrco', 'p_agirc_desc': 'UX Researcher & Analyst • 2025',
        'p_agirc_title_full': 'Agirc-Arrco',
        'p_agirc_main_desc': 'Intervento mirato per convalidare il redesign dell\'area B2B Agirc-Arrco. Test dei nuovi percorsi con utenti reali e analisi dei dati di navigazione per identificare oggettivamente i blocchi.',
        'p_agirc_achievements': '• Reclutamento e test con esperti (RU/Paghe)<br>• Analisi comportamentale in loco<br>• Consolidamento dei dati<br>• Rapporto di raccomandazioni UX',
        'p_agirc_context_desc': 'Per riuscire nel restyling di un portale così complesso, l\'intuizione non bastava. Il mio ruolo è stato quello di fornire una convalida fattuale confrontando i mockup con la realtà sul campo.',

        // ELBA / HELENA RUBINSTEIN
        'p_elba_title': 'Helena Rubinstein',
        'p_elba_subtitle': 'LUXURY PACKAGING & ECO-DESIGN',
        'p_elba_desc': 'Systemic Product Designer • 2023',
        'p_elba_main_desc': 'Sviluppo di un\'edizione limitata per il mercato cinese dell\'iconica crema Re-Plasty, in occasione del Capodanno Lunare. Il progetto risolve il paradosso tra lusso celebrativo e responsabilità ambientale, trasformando un prodotto stagionale in un oggetto duraturo.',
        'p_elba_achievements': '• Analisi semiotica dei codici culturali cinesi e dei rituali del lusso<br>• Eco-design del sistema "Refill" per estendere il ciclo di vita del packaging<br>• Sviluppo grafico e materico (gold finishing) coerente con il brand heritage<br>• Rendering 3D fotorealistico per la valorizzazione del concept',
        'p_elba_context_desc': 'Il Capodanno Lunare è il momento commerciale più critico per il mercato cinese, dominato da packaging cerimoniali "usa e getta". Questa ricarica eco-responsabile permette di rispettare la tradizione del dono introducendo un nuovo standard di sostenibilità.',

        // REYOU
        'p_reyou_title': 'REYOU', 'p_reyou_desc': 'Systemic & UX/UI Designer • 2026', 'p_reyou_title_full': 'REYOU',
        'p_reyou_subtitle': 'ECONOMIA CIRCOLARE & RETAIL DIGITALE',
        'p_reyou_main_desc': 'Showroom interattivo per il riuso di mobili d\'ufficio. Digitalizza lo spazio fisico (Coworking "Le Périscope") permettendo ai clienti B2B di acquistare lo stock in un contesto reale, superando la barriera dell\'usato tramite un\'esperienza immersiva.',
        'p_reyou_achievements': '• Concezione della strategia "Phygital"<br>• UX/UI Design per l\'interfaccia interattiva<br>• Modellazione e rendering strategico per elevare la percezione dell\'usato<br>• Lead generation integrata',
        'p_reyou_context_desc': 'Il mercato dei mobili ricondizionati soffre spesso di un deficit di immagine. La sfida è stata dimostrare che gli arredi di recupero possono sostenere uffici moderni e premium. L\'intuizione è stata non vendere il singolo pezzo, ma il \"set\" contestualizzato.',

        // AI EXPERTISE
        'section_ai_expertise': 'Expertise IA',
        'ai_expertise_title': 'Workflow IA & Automazione',
        'ai_expertise_desc': 'Ottimizzazione dei flussi creativi tramite l\'IA. Progetto sistemi che automatizzano i compiti ripetitivi per liberare il potenziale creativo dei team.',


        // ALTAREA
        'p_altarea_title': 'ALTAREA', 'p_altarea_desc': 'Product & Systemic Designer • 2024',
        'p_altarea_title_full': 'ALTAREA',
        'p_altarea_subtitle': 'Urbanistica & Adattamento Climatico',
        'p_altarea_main_desc': 'Sviluppo di una soluzione sistemica per mitigare le isole di calore urbane (ICU). Integrando una chioma vegetale e una struttura innovativa, il progetto raccoglie l\'acqua piovana e genera un\'ombra salvifica, trasformando la piazza pubblica in un rifugio climatico attivo e poetico.',
        'p_altarea_achievements': '• Ricerca e analisi del microclima urbano<br>• Strategia UX per spazi in condizioni estreme<br>• Concezione integrale del sistema (arredo urbano)<br>• Modellazione 3D e rendering fotorealistico',
        'p_altarea_context_desc': 'Le ondate di calore rendono gli spazi aperti invivibili. L\'approccio tradizionale all\'arredo urbano è insufficiente di fronte all\'emergenza climatica. La sfida: superare il "verdismo" estetico per una soluzione funzionale che riduca la temperatura percepita e preservi la vita sociale.',

        // GROUP ATLANTIC
        'p_interop_title': 'Groupe Atlantic',
        'p_interop_subtitle': 'Referenziale Interoperabilità',
        'p_interop_desc': 'UX/UI Designer - 2025',
        'p_interop_title_full': 'Groupe Atlantic',
        'p_interop_main_desc': 'Progettazione di uno strumento interno per la verifica dell\'interoperabilità dei prodotti connessi. Semplificazione di un database tecnico complesso per renderlo utilizzabile dai team di supporto.',
        'p_interop_achievements': '• Ricerca Utente (Bisogni Supporto)<br>• UI Design & Sistema Visivo<br>• Semplificazione dati complessi<br>• Progettazione motore di ricerca<br>• Prototipazione ad alta fedeltà',
        'p_interop_context_desc': 'Di fronte alla crescente complessità degli ecosistemi connessi, i team di supporto hanno bisogno di risposte immediate. Questo progetto ha consistito nel domare un database tecnico arido per trasformarlo in uno strumento di consultazione intuitivo.',
        'preview_label_interop': 'Anteprima Referenziale',

        'footer_desc': 'Parliamo insieme', 'cta_talk': 'Contattami',
        // Methodology
        'method_scroll_explore': 'Scorri per esplorare',
        'method_process': 'Processo',
        'method_title': 'Design & Decide',
        'method_intro_1': 'Divergere per esplorare. Convergere per decidere.',
        'method_intro_2': 'Il passaggio dal bisogno iniziale al risultato finale non deve essere lasciato al caso. Questo framework sistemico alterna creatività e rigore analitico.',
        'method_intro_3': 'Il risultato: eliminiamo le supposizioni. Niente viene sviluppato senza essere stato prima validato dai dati e dall\'esperienza utente. È il ponte tra intuizione e fattibilità.',
        'method_cdc': 'Brief',
        'method_prob': 'problematica',
        'method_decision': 'Strumento Decisionale',
        'methodology': [
            {
                title: "Anticipazione", label: "Mettere in sicurezza", category: "metodologia",
                content: ["Definire la metodologia", "Design della domanda", "Arricchimento del Brief", "Kick off / team progetto"],
                decision: []
            },
            {
                title: "Intuizioni", label: "Scoperte", category: "indagine sul campo",
                content: ["Interviste", "Etnografia / Osservazione", "Documentazione / Data", "Stato dell'arte"],
                decision: ["Definire i criteri di successo <br>& misure del progetto", "Espandere il soggetto", "Esplicitare il metodo", "ROI", "Mappatura degli stakeholder", "Ecosistema progetto"]
            },
            {
                title: "Riformulazione Problematica", label: "Audacia", category: "creazione",
                content: ["Co-creazione / workshop", "Creatività / variazione", "Equilibrio del dosaggio creativo", "Portafoglio di idee"],
                decision: ["Nuovo criterio nella problematica = qualità e innovazione", "Definire i sintomi e le cause profonde", "Report di stupore", "Mappatura esperienza utente / collaboratore", "Monitoraggio dati ed evoluzione", "Analisi trend / evoluzione quantitativa"]
            },
            {
                title: "Certezze", label: "Misurare", category: "test / POC",
                content: ["Definire zone di incertezza (AVP)", "Variazioni / sfumature", "Audacia / Agilità / Adattabilità", "Portafoglio di idee"],
                decision: ["Gerarchizzare le idee o AVP su criteri", "Zone di rischio (Tech / Marketing / Sociale)", "Definire i criteri di performance per POC", "Business model", "Mappa degli impatti", "Story-Board", "Sketch / 3D / motion"]
            },
            {
                title: "Fattibilità", label: "Convergenza", category: "finalizzazione",
                content: ["Compromesso qualità", "Tecnico / Economico / Processo / Marketing", "Portafoglio di idee"],
                decision: [
                    "Misura obiettiva della performance dei test",
                    "Confronto delle variazioni",
                    "Incoraggiare l'esplorazione e accogliere l'imprevisto",
                    "Data-vision di confronto dei test (spider chart, ecc...)"
                ]
            },
            {
                title: "Successo", label: "Raggiungere", category: "concretizzare",
                content: ["Lancio industriale", "Lancio Marketing", "Diffusione culturale"],
                decision: ["Controllo costi", "Controllo tempi", "Data-vision di confronto", "RACI"]
            }
        ]
    }
};

function setLanguage(lang) {
    document.querySelectorAll('[data-key]').forEach(elem => {
        const key = elem.getAttribute('data-key');
        if (translations[lang][key]) {
            if (elem.tagName === 'INPUT' || elem.tagName === 'TEXTAREA') {
                elem.setAttribute('placeholder', translations[lang][key]);
            } else {
                elem.innerHTML = translations[lang][key];
            }
        }
    });
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${lang}`).classList.add('active');
    localStorage.setItem('preferredLang', lang);

    // Update methodology timeline
    renderMethodologyTimeline(lang);
}
const savedLang = localStorage.getItem('preferredLang') || 'fr';
setLanguage(savedLang);

// --- 3D GLOBE ---
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];
const BASE_RADIUS = 250; let DOT_COUNT = 1000; const DOT_SIZE = 1.2;
let rotationY = 0; let rotationX = 0; let scrollY = 0;
let morphToStar = 0;
let starTargetPos = { x: 0, y: 0 };

function resize() { width = window.innerWidth; height = window.innerHeight; canvas.width = width; canvas.height = height; }
window.addEventListener('resize', resize);
window.addEventListener('scroll', () => { scrollY = window.scrollY; });
resize();

// Helper to sample points from text in a structured grid
function getTextPoints(text, font, size) {
    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d');
    offCanvas.width = 600; offCanvas.height = 300;
    offCtx.fillStyle = 'white';
    offCtx.font = `900 ${size}px "Inter", "Arial Black", sans-serif`;
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.fillText(text, offCanvas.width / 2, offCanvas.height / 2);

    const imageData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
    const data = imageData.data;
    const points = [];
    const step = 4; // Grid step for perfect order

    for (let y = 0; y < offCanvas.height; y += step) {
        for (let x = 0; x < offCanvas.width; x += step) {
            const alpha = data[(y * offCanvas.width + x) * 4 + 3];
            if (alpha > 200) {
                points.push({ x: x - offCanvas.width / 2, y: y - offCanvas.height / 2 });
            }
        }
    }
    return points;
}

function initParticles() {
    particles = [];
    // Get high-density points
    const textPoints = getTextPoints('IA', 'Inter', 140);

    // Ensure we have exactly 3 full layers of particles
    if (textPoints.length > 0) {
        DOT_COUNT = textPoints.length * 3;
    }

    for (let i = 0; i < DOT_COUNT; i++) {
        const phi = Math.acos(-1 + (2 * i) / DOT_COUNT);
        const theta_sph = Math.sqrt(DOT_COUNT * Math.PI) * phi;

        let tx, ty, tz;
        if (textPoints.length > 0) {
            const ptIdx = i % textPoints.length;
            const layerIdx = Math.floor(i / textPoints.length);
            const pt = textPoints[ptIdx];

            tx = pt.x * 2.2;
            ty = pt.y * 2.2;
            const totalLayers = Math.ceil(DOT_COUNT / textPoints.length);
            // Symmetrically center the layers around Z=0
            tz = (layerIdx - (totalLayers - 1) / 2) * 10;
        } else {
            tx = 0; ty = 0; tz = 0;
        }

        particles.push({
            origX: BASE_RADIUS * Math.cos(theta_sph) * Math.sin(phi),
            origY: BASE_RADIUS * Math.sin(theta_sph) * Math.sin(phi),
            origZ: BASE_RADIUS * Math.cos(phi),
            driftX: (Math.random() - 0.5) * 1200, driftY: (Math.random() - 0.5) * 1200, driftZ: (Math.random() - 0.5) * 1200,
            targetX: tx, targetY: ty, targetZ: tz
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    rotationY += 0.002;
    const cx = width / 2; const cy = height / 2;

    // Scrollytelling factors
    let scrollFactor = Math.min(scrollY / (window.innerHeight * 1.2), 1);
    const ease = scrollFactor * scrollFactor * (3 - 2 * scrollFactor);

    // AI Star Morph factor - scroll driven
    const aiSection = document.getElementById('ai-expertise');
    let targetMorph = 0;
    if (aiSection) {
        const rect = aiSection.getBoundingClientRect();
        // Morph based on the section's top entering the lower part of the screen
        // This 'anticipates' the creation while the headers are still visible
        // Anticipated morphing timing
        const startTrigger = height * 0.9;
        const endTrigger = height * 0.4;

        if (rect.top < startTrigger) {
            targetMorph = (startTrigger - rect.top) / (startTrigger - endTrigger);
            targetMorph = Math.max(0, Math.min(1, targetMorph));
            targetMorph = Math.pow(targetMorph, 1.5);
        }

        // Smooth interpolation
        morphToStar += (targetMorph - morphToStar) * 0.12;

        // Get target screen position
        const targetEl = document.getElementById('ai-star-target');
        if (targetEl) {
            const tRect = targetEl.getBoundingClientRect();
            starTargetPos.x = tRect.left + tRect.width / 2;
            starTargetPos.y = tRect.top + tRect.height / 2;
        }
    }

    const currentScale = 1 + (ease * 1.5) - (morphToStar * 0.8);
    const explosionFactor = ease * (1 - morphToStar);
    const globalAlpha = Math.max(1 - (ease * 0.7), 0.3) + (morphToStar * 0.7);
    const pulse = 1.0; // Pulse removed as requested

    // Get current theme particle color
    const rootStyle = getComputedStyle(document.documentElement);
    const colorRaw = rootStyle.getPropertyValue('--particle-color').trim();

    let projected = particles.map(p => {
        // Morphing logic: Sphere/Explosion -> Star
        let bx = p.origX + (p.driftX * explosionFactor);
        let by = p.origY + (p.driftY * explosionFactor);
        let bz = p.origZ + (p.driftZ * explosionFactor);

        let finalX = bx * (1 - morphToStar) + p.targetX * morphToStar * pulse;
        let finalY = by * (1 - morphToStar) + p.targetY * morphToStar * pulse;
        let finalZ = bz * (1 - morphToStar) + p.targetZ * morphToStar;

        // Apply rotation to globe AND text (Visual update: continuous rotation + Scroll Control)
        const rotY = rotationY + (scrollY * 0.003);

        let x1 = finalX * Math.cos(rotY) - finalZ * Math.sin(rotY);
        let z1 = finalZ * Math.cos(rotY) + finalX * Math.sin(rotY);

        const tiltVal = 0.2 * (1 - morphToStar) + (0.05 * morphToStar); // Slight constant tilt for 3D look
        let y2 = finalY * Math.cos(tiltVal) - z1 * Math.sin(tiltVal);
        let z2 = z1 * Math.cos(tiltVal) + finalY * Math.sin(tiltVal);

        // Center position shifts towards the AI target
        const screenCX = cx * (1 - morphToStar) + starTargetPos.x * morphToStar;
        const screenCY = cy * (1 - morphToStar) + starTargetPos.y * morphToStar;

        return { x: x1, y: y2, z: z2, scx: screenCX, scy: screenCY };
    });

    projected.sort((a, b) => a.z - b.z);
    projected.forEach(p => {
        const fov = 400 + (ease * 200);
        const scale = fov / (fov + p.z);

        // Adaptive dot size: growing to fill gaps but reduced for sharpness
        // Matched to the grid style of the hero sphere (less blurry)
        const currentDotSize = DOT_SIZE * scale * (1 + morphToStar * 1.8);

        const x2d = (p.x * scale * currentScale) + p.scx;
        const y2d = (p.y * scale * currentScale) + p.scy;

        let alpha = (scale - 0.5) * 1.5 * globalAlpha;

        // Remove transparency for the morphed text as requested (Opaque dots)
        if (morphToStar > 0.8) {
            alpha = 1.0;
        }

        if (alpha > 1) alpha = 1; if (alpha < 0) alpha = 0;

        if (alpha > 0) {
            ctx.fillStyle = `rgba(${colorRaw}, ${alpha})`;
            ctx.beginPath();
            ctx.arc(x2d, y2d, currentDotSize, 0, Math.PI * 2);
            ctx.fill();
        }
    });
    requestAnimationFrame(animate);
}

// Intersection Observer for AI Section
const aiObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        isAIActive = entry.isIntersecting;
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    const aiSection = document.getElementById('ai-expertise');
    if (aiSection) aiObserver.observe(aiSection);
});
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
function renderMethodologyTimeline(lang = 'fr') {
    const track = document.getElementById('methodology-track');
    const scrollerSection = document.getElementById('method');

    if (!track || !scrollerSection) return;

    track.innerHTML = '';

    // Get localized version of phases
    const localizedPhases = methodologyPhases.map((p, idx) => ({
        ...p,
        ...translations[lang].methodology[idx]
    }));

    // Config
    // Adaptive Phase Width based on Screen
    const windowWidth = window.innerWidth;
    let phaseWidth = 600;
    if (windowWidth < 1440) phaseWidth = 500;
    if (windowWidth < 1024) phaseWidth = 400;
    if (windowWidth < 768) phaseWidth = 350;

    const h = 400; // Visual Height

    // Store block references to update them efficiently
    const blockElements = [];

    localizedPhases.forEach((phase, index) => {
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
            <div class="border-l-2 border-gray-300 dark:border-zinc-600 pl-6" style="height: calc(35vh + ${startH / 2}px + 48px); margin-left: -1px;">
               <span class="text-[10px] font-bold uppercase tracking-widest text-dynamic-sub block mb-2">Phase ${phase.id}</span>
               <h3 class="text-2xl font-bold mb-3 text-dynamic-main">${phase.title}</h3>
               <ul class="space-y-1">
                 ${phase.content.map(t => `
                    <li class="text-[11px] text-dynamic-sub leading-tight flex items-start">
                        <span class="mr-2 opacity-50 text-[14px] leading-none select-none">•</span>
                        <span>${t}</span>
                    </li>`).join('')}
               </ul>
               
               ${phase.category ? `
               <div class="mt-4">
                  <span class="bg-black dark:bg-white text-white dark:text-black px-3 py-1 text-[10px] font-bold uppercase rounded shadow-sm inline-block">${phase.category}</span>
               </div>` : ''}
            </div>
        `;

        // --- B. Central Visual (Double Diamond Wave) ---
        const visualContainer = document.createElement('div');
        // Synchronize with dots/cursor: Top at Center + 48px, then centered vertically (-50%)
        visualContainer.className = 'w-full h-[300px] absolute top-[calc(50%+3rem)] left-0 -translate-y-1/2 flex items-center';

        // Ruler Ticks
        const rulerBg = document.createElement('div');
        rulerBg.className = 'absolute top-1/2 left-0 w-full border-t border-gray-300 dark:border-zinc-500 h-10 pointer-events-none';
        rulerBg.innerHTML = `
            <div class="w-full h-full flex justify-between items-start pt-0">
                ${Array.from({ length: 40 }).map(() => `<div class="w-px h-2 bg-gray-300 dark:bg-zinc-500"></div>`).join('')}
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
                <!-- No Fill, only Stroke -->
                <path d="${fillPathData}" fill="none" class="phase-shape transition-colors duration-300" stroke="none" />
                
                <!-- Stroke only (Top/Bottom Curves, No Fill) -->
                <path d="${strokePathData}" fill="none" class="stroke-gray-300 dark:stroke-zinc-400 transition-colors duration-300" stroke-width="1" vector-effect="non-scaling-stroke" />
                
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


        // --- C. Decision Dot (Axis Point) ---
        if (index > 0) {
            const decisionC = document.createElement('div');
            // Sync with visualContainer: same absolute center and offset
            decisionC.className = 'absolute left-0 top-[calc(50%+3rem)] -translate-y-1/2 -translate-x-1/2 w-12 flex flex-col items-center z-50 transition-opacity duration-300 phase-decision';
            decisionC.innerHTML = `
                <div class="w-3 h-3 bg-white dark:bg-black rounded-full border-4 border-gray-300 dark:border-zinc-700 transition-colors duration-300 dot relative z-10"></div>
            `;
            block.appendChild(decisionC);
        }

        // --- D. Bottom Content (Decisions - Header-Anchored Style) ---
        const bottomContent = document.createElement('div');
        // Positioned precisely at the dot axis
        bottomContent.className = 'phase-content absolute top-[calc(50%+3rem)] left-0 w-full pr-8 opacity-0 transition-all duration-500 transform translate-y-2 text-left z-0';

        // Render ONLY if decision content exists
        if (phase.decision && phase.decision.length > 0) {
            // Title Offset: 50px for narrow (index 1,3,5), 170px for wide (index 2,4)
            // Note: startH is 0 for narrow transition phases usually, but let's use index logic for clarity
            const isWide = (index === 2 || index === 4);
            const titleOffset = isWide ? 170 : 50;

            bottomContent.innerHTML = `
                <div class="border-l-2 border-red-500 dark:border-red-400 pl-6 responsive-decision-content" 
                     style="margin-left: -1px; padding-top: ${titleOffset}px;">
                    <div class="max-w-[280px]">
                        <h4 class="text-[10px] uppercase font-bold text-red-500 mb-2 tracking-widest">${translations[lang].method_decision}</h4>
                        <ul class="space-y-1">
                            ${phase.decision.map(d => `
                                <li class="text-[11px] text-dynamic-sub leading-snug flex items-start">
                                    <span class="mr-2 text-red-500 text-[14px] leading-none select-none">•</span>
                                    <span>${d}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            `;
        }

        // --- CdC Box (Phase 0 only) ---
        if (index === 0) {
            const cdcBox = document.createElement('div');
            // --- CdC Box (Rounded Block Design) ---
            cdcBox.className = 'absolute top-1/2 left-0 -translate-x-full -translate-y-1/2 flex flex-col justify-center items-center z-40 pl-16 border-r border-transparent dark:border-white/20';

            // Apply background color dynamically to ensure overwrite
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            cdcBox.style.backgroundColor = currentTheme === 'dark' ? '#F5F5F5' : '#37373F';

            // Match the height of the opening (startH is 280 for index 0)
            cdcBox.style.height = `${startH}px`;
            cdcBox.style.width = '200px';
            // Make it round on the left (Semi-circle)
            cdcBox.style.borderTopLeftRadius = `${startH / 2}px`;
            cdcBox.style.borderBottomLeftRadius = `${startH / 2}px`;

            cdcBox.innerHTML = `
                <div class="text-center transform -translate-x-6">
                    <span class="text-2xl font-bold ${currentTheme === 'dark' ? 'text-[#111111]' : 'text-white'} block" data-key="method_cdc">${translations[lang].method_cdc}</span>
                    <span class="text-xs ${currentTheme === 'dark' ? 'text-[#444444]' : 'text-blue-100'} block mt-1" data-key="method_prob">${translations[lang].method_prob}</span>
                </div>
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

        const trackWidth = methodologyPhases.length * phaseWidth;

        // --- TWO-PHASE SCROLL SYSTEM (SCAN THEN WALL) ---
        // 1. PHASE 1: Scan Content (Cursor pinned at 50vw, Content translates)
        // 2. PHASE 2: Scan Wall (Content pinned at max, Cursor moves to right edge)

        // Offset starting point to account for pl-[10vw] (0.1 * windowWidth)
        const contentStartOffset = window.innerWidth * 0.1;

        // Max translation to bring content end to 100vw
        const maxContentTranslate = trackWidth - (window.innerWidth * 0.4);
        const cursorTravelDist = window.innerWidth * 0.5; // From 50vw to 100vw

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
            // PHASE 2: Hit Wall (Pin Content, Move Cursor)
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

                el.bottomContent.classList.remove('opacity-0', 'translate-y-2');
                el.bottomContent.classList.add('opacity-100', 'translate-y-0');

                el.pill.classList.remove('text-gray-400', 'border-gray-200', 'dark:border-zinc-700');
                el.pill.classList.add('text-black', 'dark:text-white', 'scale-110');

                el.shape.classList.add('text-blue-100/50', 'dark:text-blue-500/20');

                if (el.decision) el.decision.classList.add('opacity-100');
                if (el.dot) {
                    el.dot.classList.remove('border-gray-300', 'dark:border-zinc-700');
                    el.dot.classList.add('border-black', 'dark:border-white', 'scale-125');
                }

            } else {
                // Inactive State
                el.topContent.classList.add('opacity-30', 'translate-y-2');
                el.topContent.classList.remove('opacity-100', 'translate-y-0');

                el.bottomContent.classList.add('opacity-0', 'translate-y-2');
                el.bottomContent.classList.remove('opacity-100', 'translate-y-0');

                el.pill.classList.add('text-gray-400', 'border-gray-200', 'dark:border-zinc-700');
                el.pill.classList.remove('text-black', 'dark:text-white', 'scale-110');

                el.shape.classList.remove('text-blue-50', 'dark:text-purple-900/20');

                if (el.decision) el.decision.classList.remove('opacity-100');
                if (el.dot) {
                    el.dot.classList.add('border-gray-300', 'dark:border-zinc-700');
                    el.dot.classList.remove('border-black', 'dark:border-white', 'scale-125');
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
    renderMethodologyTimeline(savedLang);

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

    // Video hover control for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const video = card.querySelector('video');
        if (video) {
            // Ensure video doesn't play automatically on load if not hovered
            video.pause();

            card.addEventListener('mouseenter', () => {
                video.play().catch(e => {
                    // Autoplay policy might block play() if no user interaction yet
                    console.log("Video play pending interaction");
                });
            });

            card.addEventListener('mouseleave', () => {
                video.pause();
            });
        }
    });
});

// --- ALTAREA SCROLL LOGIC ---
function initAltareaScrollLogic() {
    const container = document.getElementById('visual-altarea');
    const arrow = container ? container.querySelector('.scroll-indicator-overlay') : null;

    if (!container || !arrow) return;

    // Remove existing listeners to avoid creating multiples if reopened
    const newArrow = arrow.cloneNode(true);
    arrow.parentNode.replaceChild(newArrow, arrow);

    // Add Scroll Listener to Container
    const updateArrowState = () => {
        const isNearBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 50;
        const isAtTop = container.scrollTop === 0;

        if (isNearBottom) {
            newArrow.classList.add('rotate-180');
        } else if (isAtTop) {
            newArrow.classList.remove('rotate-180');
        }
    };

    container.removeEventListener('scroll', updateArrowState); // Safety removal
    container.addEventListener('scroll', updateArrowState);

    // Initial check
    updateArrowState();

    // Add Click Listener
    newArrow.addEventListener('click', () => {
        const isRotated = newArrow.classList.contains('rotate-180');
        if (isRotated) {
            // Scroll to Top
            container.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Scroll to Bottom
            container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
        }
    });
}

// --- BUBBLE ANIMATION OBSERVER ---
function initBubbleObserver() {
    // Wait for the viewport to be available, or just target it directly if it exists
    const viewport = document.querySelector('.projects-grid-viewport');

    const observerOptions = {
        root: viewport, // Observe within the scrolling viewport
        threshold: 0.6 // Trigger when 60% of the cell is visible
    };

    const bubbleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const badge = entry.target.querySelector('.prototype-badge');
            if (!badge) return;

            if (entry.isIntersecting) {
                // Reset to allow re-pop
                badge.classList.remove('pop');
                badge.classList.remove('hidden');

                // Small delay to ensure reset is processed
                setTimeout(() => {
                    badge.classList.add('pop');
                }, 5000);

            } else {
                // Remove pop when out of view so it can trigger again
                badge.classList.remove('pop');
                badge.classList.remove('hidden');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-grid-cell').forEach(cell => {
        bubbleObserver.observe(cell);
    });
}

// --- MASTER MODAL CLOSE BUTTON DYNAMIC POSITION ---
function updateMasterCloseButton() {
    const viewport = document.querySelector('.projects-grid-viewport');
    const closeBtn = document.querySelector('.master-close-btn');
    if (!viewport || !closeBtn) return;

    const scrollLeft = viewport.scrollLeft;
    const viewportWidth = viewport.clientWidth;
    const totalWidth = viewport.scrollWidth;

    // Thresholds: roughly 1/3 of the scrollable range
    // Left: scrollLeft is near 0
    // Center: scrollLeft is in the middle
    // Right: scrollLeft is at the end

    // Using a more robust percentage-based logic
    const scrollPercent = scrollLeft / (totalWidth - viewportWidth);

    closeBtn.classList.remove('pos-left', 'pos-right', 'pos-hidden');

    if (scrollPercent < 0.2) {
        // First Column
        closeBtn.classList.add('pos-left');
    } else if (scrollPercent > 0.8) {
        // Last Column
        closeBtn.classList.add('pos-right');
    } else {
        // Middle Column
        closeBtn.classList.add('pos-hidden');
    }
}

function initMasterModalScrollLogic() {
    const viewport = document.querySelector('.projects-grid-viewport');
    if (viewport) {
        viewport.addEventListener('scroll', updateMasterCloseButton);
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initBubbleObserver();
    initMasterModalScrollLogic();
});

// Also call immediately in case DOM is already ready (often the case with defer)
initBubbleObserver();
initMasterModalScrollLogic();

// --- SCROLL INDICATOR LOGIC ---

// --- DUAL SCROLL INDICATOR LOGIC ---
function initScrollIndicators() {
    const wrappers = document.querySelectorAll('.modal-content-wrapper');

    wrappers.forEach(wrapper => {
        const textSide = wrapper.querySelector('.text-side');
        const isStacked = wrapper.classList.contains('layout-stacked');
        const scrollParent = isStacked ? wrapper.closest('.modal-window') : textSide;

        if (!textSide || !scrollParent) return;

        // --- 1. Vertical Indicator ---
        let vIndicator = wrapper.querySelector('.scroll-indicator-vertical');
        if (!vIndicator) {
            vIndicator = document.createElement('div');
            vIndicator.className = 'scroll-indicator scroll-indicator-vertical';
            vIndicator.innerHTML = `
                <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
                </svg>`;

            // PLACEMENT LOGIC:
            if (isStacked) {
                // Stacked: Append to textSide so it sits at the bottom of the text block
                textSide.appendChild(vIndicator);
            } else {
                // Split: Append to wrapper so it stays fixed relative to the screen/modal bottom
                wrapper.appendChild(vIndicator);
            }
        }

        // --- 2. Horizontal Indicator (for Points Grid) ---
        let hIndicator = wrapper.querySelector('.scroll-indicator-horizontal');
        if (!hIndicator) {
            hIndicator = document.createElement('div');
            hIndicator.className = 'scroll-indicator scroll-indicator-horizontal';
            hIndicator.innerHTML = `
                <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M13 7l5 5-5 5M6 7l5 5-5 5"/>
                </svg>`;

            // PLACEMENT LOGIC:
            // Always append to textSide as it relates to the grid inside textSide
            textSide.appendChild(hIndicator);
        }

        const pointsGrid = wrapper.querySelector('.modal-points-grid');

        // CHECK FUNCTION
        function checkScrolls() {
            const threshold = 15; // Only show fade/indicators if actual overflow > 15px

            // Current state check
            const isScrollHidden = window.getComputedStyle(scrollParent).overflowY === 'hidden';

            // 1. DYNAMIC MASKING (Fade effect)
            // Vertical mask: Apply only if scrollable AND has meaningful overflow
            if (!isScrollHidden && (scrollParent.scrollHeight - scrollParent.clientHeight > threshold)) {
                textSide.classList.add('has-mask-v');
            } else {
                textSide.classList.remove('has-mask-v');
            }

            // Horizontal mask: Apply to points grid if horizontal overflow > threshold
            if (pointsGrid) {
                if (pointsGrid.scrollWidth - pointsGrid.clientWidth > threshold) {
                    pointsGrid.classList.add('has-mask-h');
                } else {
                    pointsGrid.classList.remove('has-mask-h');
                }
            }

            // 2. INDICATOR VISIBILITY (Small arrows)
            if (isStacked) {
                // Stacked (Synergie, Vamos, Agirc): Always hide vertical per request
                vIndicator.classList.remove('visible');

                if (pointsGrid && Math.ceil(pointsGrid.scrollWidth) > Math.ceil(pointsGrid.clientWidth) + 20) {
                    hIndicator.classList.add('visible');
                } else {
                    hIndicator.classList.remove('visible');
                }
            } else {
                // Split (ALR3, etc.): Show vertical only if it actually overflows
                if (Math.ceil(scrollParent.scrollHeight) > Math.ceil(scrollParent.clientHeight) + 20) {
                    vIndicator.classList.add('visible');
                } else {
                    vIndicator.classList.remove('visible');
                }
                hIndicator.classList.remove('visible');
            }
        }

        // SCROLL LISTENERS
        scrollParent.addEventListener('scroll', () => {
            if (scrollParent.scrollTop > 30) {
                vIndicator.classList.remove('visible');
            }
        });

        if (pointsGrid) {
            pointsGrid.addEventListener('scroll', () => {
                if (pointsGrid.scrollLeft > 20) {
                    hIndicator.classList.remove('visible');
                }
            });
        }

        // Initial Checks & Resize
        setTimeout(checkScrolls, 500);
        window.addEventListener('resize', checkScrolls);
        document.body.addEventListener('click', () => {
            setTimeout(checkScrolls, 300);
            setTimeout(checkScrolls, 800);
        });
    });
}


// --- KEYBOARD NAVIGATION FOR PROJECTS ---
const projectIds = [
    'modal-kciope', // ALR3
    'modal-rockease',
    'modal-synergie',
    'modal-vamos',
    'modal-agirc',
    'modal-altarea',
    'modal-reyou',
    'modal-elba', // Helena Rubinstein
    'modal-interop' // Groupe Atlantic
];

let currentProjectIndex = -1;

function navigateToProject(direction) {
    const masterModal = document.getElementById('projects-master-modal');
    if (!masterModal || !masterModal.classList.contains('active')) return;

    // Find current index if not already tracked
    if (currentProjectIndex === -1) {
        // Find which project is currently most visible or centered? 
        // Simple approach: find the data-project from the scroll position or keep track of the last opened
        // For now, let's assume we start from 0 if untracked
        currentProjectIndex = 0;
    }

    currentProjectIndex += direction;

    // Loop around
    if (currentProjectIndex < 0) currentProjectIndex = projectIds.length - 1;
    if (currentProjectIndex >= projectIds.length) currentProjectIndex = 0;

    const nextProjectId = projectIds[currentProjectIndex];
    openModal(nextProjectId);
}

// Global Keyboard Listener
window.addEventListener('keydown', (e) => {
    const masterModal = document.getElementById('projects-master-modal');
    if (!masterModal || !masterModal.classList.contains('active')) return;

    const COLS = 3; // The project grid has 3 columns

    if (e.key === 'ArrowRight') {
        navigateToProject(1);
    } else if (e.key === 'ArrowLeft') {
        navigateToProject(-1);
    } else if (e.key === 'ArrowDown') {
        navigateToProject(COLS); // Physically below
    } else if (e.key === 'ArrowUp') {
        navigateToProject(-COLS); // Physically above
    } else if (e.key === 'Escape') {
        closeModalForce();
    }
});

// Update current index whenever a modal is opened normally (by click)
const originalOpenModal = openModal;
window.openModal = function (modalId) {
    const idx = projectIds.indexOf(modalId);
    if (idx !== -1) {
        currentProjectIndex = idx;
    }
    originalOpenModal(modalId);
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initScrollIndicators();
});
