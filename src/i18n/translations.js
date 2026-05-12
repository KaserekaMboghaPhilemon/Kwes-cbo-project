// =============================================================================
//  KWES — Global Translation Map
// -----------------------------------------------------------------------------
//  ONE flat dictionary per language. Every visible string on the site
//  (Nav, Hero, Programs, Products, About, Footer, Buttons, Headers) is
//  stored here so `useLanguage().t("key")` switches the whole site at once.
//
//  Layout protection: All strings are crafted to be of similar visual
//  weight; combined with `min-h` constraints in components, this yields
//  Zero-Layout-Shift translation.
// =============================================================================

const en = {
  // ---- NAV ----
  "nav.home": "Home",
  "nav.about": "About",
  "nav.programs": "Programs",
  "nav.impact": "Impact",
  "nav.news": "News",
  "nav.partnership": "Partnership",
  "nav.contact": "Contact",
  "nav.gallery": "Gallery",
  "nav.vocationalHub": "Vocational Hub",

  // ---- BUTTONS ----
  "btn.donate": "Donate",
  "btn.donateNow": "Donate Now",
  "btn.learnMore": "Learn More",
  "btn.explorePrograms": "Explore Programs",
  "btn.support": "Support Our Work",
  "btn.partner": "Partner With Us",
  "btn.readMore": "Read More",
  "btn.getInvolved": "Get Involved",
  "btn.contactUs": "Contact Us",

  // ---- HEADER / BRAND ----
  "header.brand": "KAKUMA WOMEN",
  "header.tagline": "Empowerment & Self-Reliance",

  // ---- HERO ----
  "hero.badge": "Kakuma Women Empowerment Society — CBO",
  "hero.title.lead": "Building Sustainable Futures for",
  "hero.title.accent": "Women and Youth",
  "hero.title.tail": "in Kakuma",
  "hero.subtitle":
    "We equip women and youth with practical skills, resources and opportunities to achieve economic independence and strengthen community resilience.",

  // ---- PROBLEM / SOLUTION ----
  "ps.eyebrow": "Why We Exist",
  "ps.title": "From struggle to sustainable strength",
  "ps.subtitle":
    "Rural families face limited income, poor access to training and fragile food systems. We turn that around with practical programs that pay back daily.",
  "ps.challenge.title": "The Challenge",
  "ps.challenge.body":
    "Many households rely on a single, unstable income source — leaving children, education and nutrition vulnerable.",
  "ps.approach.title": "Our Approach",
  "ps.approach.body":
    "We co-design enterprise programs with the community — poultry, eggs, training — built to scale locally.",
  "ps.outcome.title": "The Outcome",
  "ps.outcome.body":
    "Daily cash flow, dignified work, school fees paid on time, and a generation of skilled young leaders.",

  // ---- PROGRAMS ----
  "programs.eyebrow": "What We Do",
  "programs.title": "Programs that change daily life",
  "programs.poultry.title": "Poultry Farming",
  "programs.poultry.desc":
    "Sustainable kienyeji chicken farming generating daily income for rural families.",
  "programs.eggs.title": "Egg Supply Chain",
  "programs.eggs.desc":
    "Reliable distribution to schools, shops and local markets across the region.",
  "programs.skills.title": "Skills Training",
  "programs.skills.desc":
    "Equipping youth and women with literacy and vocational skills that last.",

  // ---- IMPACT STATS ----
  "impact.lives": "Lives Impacted",
  "impact.income": "Income Growth",
  "impact.partners": "Active Partners",

  // ---- FOOTER ----
  "footer.about":
    "Empowering women in Kakuma through sustainable livelihoods and community development.",
  "footer.quickLinks": "Quick Links",
  "footer.contact": "Contact",
  "footer.rights": "All rights reserved.",
  "footer.address": "Kakuma, Kenya",

  // ---- LANG / THEME ----
  "lang.label": "Language",
  "lang.choose": "Choose language",
  "theme.toggle": "Toggle theme",
  "theme.light": "Light mode",
  "theme.dark": "Dark mode",
  "menu.open": "Open menu",
  "menu.tooltip": "Find more pages here!",
  "menu.close": "Close menu",
};

const sw = {
  "nav.home": "Nyumbani",
  "nav.about": "Kuhusu",
  "nav.programs": "Programu",
  "nav.impact": "Athari",
  "nav.news": "Habari",
  "nav.partnership": "Ushirikiano",
  "nav.contact": "Wasiliana",
  "nav.gallery": "Picha",
  "nav.vocationalHub": "Kituo cha Ufundi",
  "btn.donate": "Changia",
  "btn.donateNow": "Changia Sasa",
  "btn.learnMore": "Jifunze Zaidi",
  "btn.explorePrograms": "Chunguza Programu",
  "btn.support": "Saidia Kazi Yetu",
  "btn.partner": "Shirikiana Nasi",
  "btn.readMore": "Soma Zaidi",
  "btn.getInvolved": "Jiunge Nasi",
  "btn.contactUs": "Wasiliana Nasi",
  "header.brand": "KAKUMA WOMEN",
  "header.tagline": "Uwezeshaji na Kujitegemea",
  "hero.badge": "Jumuiya ya Uwezeshaji wa Wanawake Kakuma — CBO",
  "hero.title.lead": "Tunajenga Mustakabali Endelevu kwa",
  "hero.title.accent": "Wanawake na Vijana",
  "hero.title.tail": "huko Kakuma",
  "hero.subtitle":
    "Tunawapa wanawake na vijana ujuzi, rasilimali na fursa za kufikia uhuru wa kiuchumi na kuimarisha jamii.",
  "ps.eyebrow": "Kwa Nini Tupo",
  "ps.title": "Kutoka taabu hadi nguvu endelevu",
  "ps.subtitle":
    "Familia za vijijini zinakabili kipato kidogo, ukosefu wa mafunzo na mfumo dhaifu wa chakula. Tunabadilisha hilo kwa programu zinazolipa kila siku.",
  "ps.challenge.title": "Changamoto",
  "ps.challenge.body":
    "Familia nyingi hutegemea chanzo kimoja cha mapato kisicho thabiti — jambo linaloathiri watoto, elimu na lishe.",
  "ps.approach.title": "Mbinu Yetu",
  "ps.approach.body":
    "Tunabuni programu pamoja na jamii — kuku, mayai, mafunzo — zinazoweza kukua kienyeji.",
  "ps.outcome.title": "Matokeo",
  "ps.outcome.body":
    "Kipato cha kila siku, kazi yenye heshima, ada za shule kwa wakati, na kizazi cha viongozi wenye ujuzi.",
  "programs.eyebrow": "Tunachofanya",
  "programs.title": "Programu zinazobadilisha maisha ya kila siku",
  "programs.poultry.title": "Ufugaji wa Kuku",
  "programs.poultry.desc":
    "Ufugaji endelevu wa kuku wa kienyeji unaoleta kipato cha kila siku kwa familia.",
  "programs.eggs.title": "Mnyororo wa Usambazaji wa Mayai",
  "programs.eggs.desc":
    "Usambazaji wa uhakika kwa shule, maduka na masoko ya ndani.",
  "programs.skills.title": "Mafunzo ya Ujuzi",
  "programs.skills.desc":
    "Kuwapa vijana na wanawake stadi za kusoma na ujuzi wa kazi.",
  "impact.lives": "Maisha Yaliyobadilika",
  "impact.income": "Ukuaji wa Kipato",
  "impact.partners": "Wadau Hai",
  "footer.about":
    "Tunawawezesha wanawake Kakuma kupitia maisha endelevu na maendeleo ya jamii.",
  "footer.quickLinks": "Viungo vya Haraka",
  "footer.contact": "Mawasiliano",
  "footer.rights": "Haki zote zimehifadhiwa.",
  "footer.address": "Kakuma, Kenya",
  "lang.label": "Lugha",
  "lang.choose": "Chagua lugha",
  "theme.toggle": "Badilisha mandhari",
  "theme.light": "Hali nyepesi",
  "theme.dark": "Hali nyeusi",
  "menu.open": "Fungua menyu",
  "menu.tooltip": "Pata kurasa zaidi hapa!",
  "menu.close": "Funga menyu",
};

const fr = {
  "nav.home": "Accueil",
  "nav.about": "À propos",
  "nav.programs": "Programmes",
  "nav.impact": "Impact",
  "nav.news": "Actualités",
  "nav.partnership": "Partenariat",
  "nav.contact": "Contact",
  "nav.gallery": "Galerie",
  "nav.vocationalHub": "Pôle Professionnel",
  "btn.donate": "Faire un don",
  "btn.donateNow": "Donner maintenant",
  "btn.learnMore": "En savoir plus",
  "btn.explorePrograms": "Voir les programmes",
  "btn.support": "Soutenir notre action",
  "btn.partner": "Devenir partenaire",
  "btn.readMore": "Lire la suite",
  "btn.getInvolved": "S'impliquer",
  "btn.contactUs": "Nous contacter",
  "header.brand": "KAKUMA WOMEN",
  "header.tagline": "Autonomisation et autonomie",
  "hero.badge": "Société d'Autonomisation des Femmes de Kakuma — CBO",
  "hero.title.lead": "Bâtir un avenir durable pour",
  "hero.title.accent": "les femmes et les jeunes",
  "hero.title.tail": "à Kakuma",
  "hero.subtitle":
    "Nous donnons aux femmes et aux jeunes les compétences, les ressources et les opportunités pour atteindre l'indépendance économique et renforcer la communauté.",
  "ps.eyebrow": "Notre raison d'être",
  "ps.title": "De la lutte à la force durable",
  "ps.subtitle":
    "Les familles rurales ont peu de revenus, peu d'accès à la formation et un système alimentaire fragile. Nous renversons cela avec des programmes qui rapportent chaque jour.",
  "ps.challenge.title": "Le défi",
  "ps.challenge.body":
    "De nombreux foyers dépendent d'une seule source de revenu instable — au détriment des enfants, de l'éducation et de la nutrition.",
  "ps.approach.title": "Notre approche",
  "ps.approach.body":
    "Nous co-construisons des programmes — volaille, œufs, formation — qui se développent localement.",
  "ps.outcome.title": "Le résultat",
  "ps.outcome.body":
    "Revenu quotidien, travail digne, frais de scolarité payés à temps et une génération de jeunes leaders qualifiés.",
  "programs.eyebrow": "Ce que nous faisons",
  "programs.title": "Des programmes qui changent le quotidien",
  "programs.poultry.title": "Élevage de volaille",
  "programs.poultry.desc":
    "Élevage durable de poulets locaux générant un revenu quotidien pour les familles.",
  "programs.eggs.title": "Filière des œufs",
  "programs.eggs.desc":
    "Distribution fiable aux écoles, boutiques et marchés locaux.",
  "programs.skills.title": "Formation professionnelle",
  "programs.skills.desc":
    "Donner aux jeunes et aux femmes des compétences durables.",
  "impact.lives": "Vies impactées",
  "impact.income": "Croissance des revenus",
  "impact.partners": "Partenaires actifs",
  "footer.about":
    "Autonomiser les femmes de Kakuma grâce à des moyens de subsistance durables.",
  "footer.quickLinks": "Liens rapides",
  "footer.contact": "Contact",
  "footer.rights": "Tous droits réservés.",
  "footer.address": "Kakuma, Kenya",
  "lang.label": "Langue",
  "lang.choose": "Choisir la langue",
  "theme.toggle": "Changer de thème",
  "theme.light": "Mode clair",
  "theme.dark": "Mode sombre",
  "menu.open": "Ouvrir le menu",
  "menu.tooltip": "Trouvez plus de pages ici !",
  "menu.close": "Fermer le menu",
};

const es = {
  "nav.home": "Inicio",
  "nav.about": "Nosotros",
  "nav.programs": "Programas",
  "nav.impact": "Impacto",
  "nav.news": "Noticias",
  "nav.partnership": "Asociación",
  "nav.contact": "Contacto",
  "nav.gallery": "Galería",
  "nav.vocationalHub": "Centro Vocacional",
  "btn.donate": "Donar",
  "btn.donateNow": "Donar ahora",
  "btn.learnMore": "Saber más",
  "btn.explorePrograms": "Ver programas",
  "btn.support": "Apoyar nuestra labor",
  "btn.partner": "Ser socio",
  "btn.readMore": "Leer más",
  "btn.getInvolved": "Participar",
  "btn.contactUs": "Contáctanos",
  "header.brand": "KAKUMA WOMEN",
  "header.tagline": "Empoderamiento y autonomía",
  "hero.badge": "Sociedad de Empoderamiento de Mujeres de Kakuma — CBO",
  "hero.title.lead": "Construyendo futuros sostenibles para",
  "hero.title.accent": "mujeres y jóvenes",
  "hero.title.tail": "en Kakuma",
  "hero.subtitle":
    "Dotamos a mujeres y jóvenes de habilidades, recursos y oportunidades para lograr independencia económica y fortalecer la comunidad.",
  "ps.eyebrow": "Por qué existimos",
  "ps.title": "De la lucha a una fuerza sostenible",
  "ps.subtitle":
    "Las familias rurales enfrentan ingresos limitados y sistemas alimentarios frágiles. Lo cambiamos con programas que rinden a diario.",
  "ps.challenge.title": "El reto",
  "ps.challenge.body":
    "Muchos hogares dependen de una sola fuente inestable de ingresos, afectando a niños, educación y nutrición.",
  "ps.approach.title": "Nuestro enfoque",
  "ps.approach.body":
    "Co-diseñamos programas con la comunidad — avicultura, huevos, formación — escalables localmente.",
  "ps.outcome.title": "El resultado",
  "ps.outcome.body":
    "Flujo diario de ingresos, trabajo digno, cuotas escolares al día y jóvenes líderes capacitados.",
  "programs.eyebrow": "Lo que hacemos",
  "programs.title": "Programas que cambian la vida diaria",
  "programs.poultry.title": "Avicultura",
  "programs.poultry.desc":
    "Cría sostenible de gallinas locales que genera ingresos diarios.",
  "programs.eggs.title": "Cadena de suministro de huevos",
  "programs.eggs.desc":
    "Distribución fiable a escuelas, tiendas y mercados locales.",
  "programs.skills.title": "Formación en habilidades",
  "programs.skills.desc":
    "Dotamos a jóvenes y mujeres de alfabetización y oficios duraderos.",
  "impact.lives": "Vidas impactadas",
  "impact.income": "Crecimiento de ingresos",
  "impact.partners": "Socios activos",
  "footer.about":
    "Empoderando a las mujeres de Kakuma con medios de vida sostenibles.",
  "footer.quickLinks": "Enlaces rápidos",
  "footer.contact": "Contacto",
  "footer.rights": "Todos los derechos reservados.",
  "footer.address": "Kakuma, Kenia",
  "lang.label": "Idioma",
  "lang.choose": "Elegir idioma",
  "theme.toggle": "Cambiar tema",
  "theme.light": "Modo claro",
  "theme.dark": "Modo oscuro",
  "menu.open": "Abrir menú",
  "menu.tooltip": "¡Encuentra más páginas aquí!",
  "menu.close": "Cerrar menú",
};

const ar = {
  "nav.home": "الرئيسية",
  "nav.about": "من نحن",
  "nav.programs": "البرامج",
  "nav.impact": "الأثر",
  "nav.news": "الأخبار",
  "nav.partnership": "الشراكة",
  "nav.contact": "اتصل بنا",
  "nav.gallery": "المعرض",
  "nav.vocationalHub": "مركز التدريب المهني",
  "btn.donate": "تبرع",
  "btn.donateNow": "تبرع الآن",
  "btn.learnMore": "اعرف المزيد",
  "btn.explorePrograms": "استكشف البرامج",
  "btn.support": "ادعم عملنا",
  "btn.partner": "كن شريكاً",
  "btn.readMore": "اقرأ المزيد",
  "btn.getInvolved": "شارك معنا",
  "btn.contactUs": "تواصل معنا",
  "header.brand": "كاكوما ويمن",
  "header.tagline": "التمكين والاعتماد على الذات",
  "hero.badge": "جمعية تمكين نساء كاكوما — منظمة مجتمعية",
  "hero.title.lead": "نبني مستقبلاً مستداماً",
  "hero.title.accent": "للنساء والشباب",
  "hero.title.tail": "في كاكوما",
  "hero.subtitle":
    "نزود النساء والشباب بالمهارات والموارد والفرص لتحقيق الاستقلال الاقتصادي وتعزيز المجتمع.",
  "ps.eyebrow": "لماذا نوجد",
  "ps.title": "من المعاناة إلى القوة المستدامة",
  "ps.subtitle":
    "تواجه الأسر الريفية دخلاً محدوداً ونظماً غذائية هشة. نحن نغير ذلك ببرامج تُثمر يومياً.",
  "ps.challenge.title": "التحدي",
  "ps.challenge.body":
    "تعتمد أسر كثيرة على مصدر دخل وحيد وغير مستقر، مما يضر بالأطفال والتعليم والتغذية.",
  "ps.approach.title": "منهجنا",
  "ps.approach.body":
    "نصمم البرامج بالشراكة مع المجتمع — دواجن، بيض، تدريب — قابلة للتوسع محلياً.",
  "ps.outcome.title": "النتيجة",
  "ps.outcome.body":
    "دخل يومي، عمل كريم، رسوم مدرسية في موعدها، وجيل من القادة الشباب المؤهلين.",
  "programs.eyebrow": "ماذا نفعل",
  "programs.title": "برامج تغيّر الحياة اليومية",
  "programs.poultry.title": "تربية الدواجن",
  "programs.poultry.desc":
    "تربية مستدامة للدجاج البلدي تدر دخلاً يومياً للأسر.",
  "programs.eggs.title": "سلسلة توريد البيض",
  "programs.eggs.desc": "توزيع موثوق للمدارس والمتاجر والأسواق المحلية.",
  "programs.skills.title": "التدريب على المهارات",
  "programs.skills.desc": "تزويد الشباب والنساء بمهارات تدوم.",
  "impact.lives": "حياة تأثرت",
  "impact.income": "نمو الدخل",
  "impact.partners": "شركاء فاعلون",
  "footer.about":
    "نمكّن نساء كاكوما عبر سُبل عيش مستدامة وتنمية مجتمعية.",
  "footer.quickLinks": "روابط سريعة",
  "footer.contact": "اتصال",
  "footer.rights": "جميع الحقوق محفوظة.",
  "footer.address": "كاكوما، كينيا",
  "lang.label": "اللغة",
  "lang.choose": "اختر اللغة",
  "theme.toggle": "تبديل المظهر",
  "theme.light": "الوضع الفاتح",
  "theme.dark": "الوضع الداكن",
  "menu.open": "فتح القائمة",
  "menu.tooltip": "تجد المزيد من الصفحات هنا!",
  "menu.close": "إغلاق القائمة",
};

const zh = {
  "nav.home": "首页",
  "nav.about": "关于我们",
  "nav.programs": "项目",
  "nav.impact": "影响",
  "nav.news": "新闻",
  "nav.partnership": "合作伙伴",
  "nav.contact": "联系",
  "nav.gallery": "图库",
  "nav.vocationalHub": "职业培训中心",
  "btn.donate": "捐赠",
  "btn.donateNow": "立即捐赠",
  "btn.learnMore": "了解更多",
  "btn.explorePrograms": "查看项目",
  "btn.support": "支持我们",
  "btn.partner": "成为伙伴",
  "btn.readMore": "阅读更多",
  "btn.getInvolved": "参与其中",
  "btn.contactUs": "联系我们",
  "header.brand": "卡库马妇女",
  "header.tagline": "赋权与自立",
  "hero.badge": "卡库马妇女赋权协会 — 社区组织",
  "hero.title.lead": "为以下群体构建可持续未来：",
  "hero.title.accent": "妇女与青年",
  "hero.title.tail": "在卡库马",
  "hero.subtitle":
    "我们为妇女和青年提供实用技能、资源和机会，以实现经济独立并增强社区韧性。",
  "ps.eyebrow": "我们的使命",
  "ps.title": "从困境走向可持续力量",
  "ps.subtitle":
    "农村家庭收入有限、培训不足、粮食系统脆弱。我们用每日见效的项目改变现状。",
  "ps.challenge.title": "挑战",
  "ps.challenge.body":
    "许多家庭依赖单一不稳定的收入来源，影响儿童、教育和营养。",
  "ps.approach.title": "我们的方法",
  "ps.approach.body":
    "我们与社区共同设计项目——养鸡、鸡蛋、培训——可在本地扩展。",
  "ps.outcome.title": "成果",
  "ps.outcome.body":
    "每日现金流、有尊严的工作、按时缴纳学费，以及新一代有技能的青年领袖。",
  "programs.eyebrow": "我们做什么",
  "programs.title": "改变日常生活的项目",
  "programs.poultry.title": "家禽养殖",
  "programs.poultry.desc": "可持续的本地鸡养殖，为家庭带来每日收入。",
  "programs.eggs.title": "鸡蛋供应链",
  "programs.eggs.desc": "可靠地配送至学校、商店和当地市场。",
  "programs.skills.title": "技能培训",
  "programs.skills.desc": "为青年和妇女提供持久的识字与职业技能。",
  "impact.lives": "影响的生命",
  "impact.income": "收入增长",
  "impact.partners": "活跃伙伴",
  "footer.about": "通过可持续生计与社区发展赋权卡库马妇女。",
  "footer.quickLinks": "快速链接",
  "footer.contact": "联系方式",
  "footer.rights": "保留所有权利。",
  "footer.address": "肯尼亚卡库马",
  "lang.label": "语言",
  "lang.choose": "选择语言",
  "theme.toggle": "切换主题",
  "theme.light": "浅色模式",
  "theme.dark": "深色模式",
  "menu.open": "打开菜单",
  "menu.tooltip": "在此查看更多页面！",
  "menu.close": "关闭菜单",
};

const pt = {
  "nav.home": "Início",
  "nav.about": "Sobre",
  "nav.programs": "Programas",
  "nav.impact": "Impacto",
  "nav.news": "Notícias",
  "nav.partnership": "Parceria",
  "nav.contact": "Contato",
  "nav.gallery": "Galeria",
  "nav.vocationalHub": "Centro Profissional",
  "btn.donate": "Doar",
  "btn.donateNow": "Doar agora",
  "btn.learnMore": "Saiba mais",
  "btn.explorePrograms": "Ver programas",
  "btn.support": "Apoiar nosso trabalho",
  "btn.partner": "Ser parceiro",
  "btn.readMore": "Ler mais",
  "btn.getInvolved": "Participe",
  "btn.contactUs": "Fale conosco",
  "header.brand": "KAKUMA WOMEN",
  "header.tagline": "Empoderamento e autonomia",
  "hero.badge": "Sociedade de Empoderamento de Mulheres de Kakuma — CBO",
  "hero.title.lead": "Construindo futuros sustentáveis para",
  "hero.title.accent": "mulheres e jovens",
  "hero.title.tail": "em Kakuma",
  "hero.subtitle":
    "Equipamos mulheres e jovens com habilidades, recursos e oportunidades para alcançar independência econômica e fortalecer a comunidade.",
  "ps.eyebrow": "Por que existimos",
  "ps.title": "Da luta à força sustentável",
  "ps.subtitle":
    "Famílias rurais enfrentam renda limitada e sistemas alimentares frágeis. Mudamos isso com programas que rendem todos os dias.",
  "ps.challenge.title": "O desafio",
  "ps.challenge.body":
    "Muitos lares dependem de uma única fonte instável de renda, prejudicando crianças, educação e nutrição.",
  "ps.approach.title": "Nossa abordagem",
  "ps.approach.body":
    "Cocriamos programas com a comunidade — aves, ovos, formação — escaláveis localmente.",
  "ps.outcome.title": "O resultado",
  "ps.outcome.body":
    "Renda diária, trabalho digno, mensalidades em dia e uma geração de jovens líderes capacitados.",
  "programs.eyebrow": "O que fazemos",
  "programs.title": "Programas que mudam o dia a dia",
  "programs.poultry.title": "Avicultura",
  "programs.poultry.desc":
    "Criação sustentável de aves locais que gera renda diária.",
  "programs.eggs.title": "Cadeia de ovos",
  "programs.eggs.desc":
    "Distribuição confiável a escolas, lojas e mercados locais.",
  "programs.skills.title": "Formação de competências",
  "programs.skills.desc":
    "Capacitando jovens e mulheres com habilidades duradouras.",
  "impact.lives": "Vidas impactadas",
  "impact.income": "Crescimento de renda",
  "impact.partners": "Parceiros ativos",
  "footer.about":
    "Empoderando mulheres em Kakuma por meio de meios de vida sustentáveis.",
  "footer.quickLinks": "Links rápidos",
  "footer.contact": "Contato",
  "footer.rights": "Todos os direitos reservados.",
  "footer.address": "Kakuma, Quênia",
  "lang.label": "Idioma",
  "lang.choose": "Escolher idioma",
  "theme.toggle": "Alternar tema",
  "theme.light": "Modo claro",
  "theme.dark": "Modo escuro",
  "menu.open": "Abrir menu",
  "menu.tooltip": "Encontre mais páginas aqui!",
  "menu.close": "Fechar menu",
};

const de = {
  "nav.home": "Start",
  "nav.about": "Über uns",
  "nav.programs": "Programme",
  "nav.impact": "Wirkung",
  "nav.news": "Neuigkeiten",
  "nav.partnership": "Partnerschaft",
  "nav.contact": "Kontakt",
  "nav.gallery": "Galerie",
  "nav.vocationalHub": "Berufszentrum",
  "btn.donate": "Spenden",
  "btn.donateNow": "Jetzt spenden",
  "btn.learnMore": "Mehr erfahren",
  "btn.explorePrograms": "Programme entdecken",
  "btn.support": "Unsere Arbeit unterstützen",
  "btn.partner": "Partner werden",
  "btn.readMore": "Weiterlesen",
  "btn.getInvolved": "Mitmachen",
  "btn.contactUs": "Kontaktieren Sie uns",
  "header.brand": "KAKUMA WOMEN",
  "header.tagline": "Empowerment & Selbstständigkeit",
  "hero.badge": "Kakuma Women Empowerment Society — CBO",
  "hero.title.lead": "Nachhaltige Zukunft für",
  "hero.title.accent": "Frauen und Jugendliche",
  "hero.title.tail": "in Kakuma",
  "hero.subtitle":
    "Wir geben Frauen und Jugendlichen Fähigkeiten, Mittel und Chancen für wirtschaftliche Unabhängigkeit und stärkere Gemeinschaften.",
  "ps.eyebrow": "Warum es uns gibt",
  "ps.title": "Vom Kampf zu nachhaltiger Stärke",
  "ps.subtitle":
    "Ländliche Familien haben wenig Einkommen und fragile Ernährungssysteme. Wir ändern das mit Programmen, die täglich Erträge bringen.",
  "ps.challenge.title": "Die Herausforderung",
  "ps.challenge.body":
    "Viele Haushalte hängen von einer einzigen, instabilen Einkommensquelle ab — zum Nachteil von Kindern und Bildung.",
  "ps.approach.title": "Unser Ansatz",
  "ps.approach.body":
    "Wir entwickeln Programme gemeinsam mit der Gemeinschaft — Geflügel, Eier, Ausbildung — lokal skalierbar.",
  "ps.outcome.title": "Das Ergebnis",
  "ps.outcome.body":
    "Tägliches Einkommen, würdige Arbeit, pünktliches Schulgeld und eine Generation qualifizierter junger Führungskräfte.",
  "programs.eyebrow": "Was wir tun",
  "programs.title": "Programme, die den Alltag verändern",
  "programs.poultry.title": "Geflügelzucht",
  "programs.poultry.desc":
    "Nachhaltige Hühnerhaltung schafft tägliches Einkommen für Familien.",
  "programs.eggs.title": "Eier-Lieferkette",
  "programs.eggs.desc":
    "Zuverlässige Belieferung von Schulen, Läden und lokalen Märkten.",
  "programs.skills.title": "Berufsausbildung",
  "programs.skills.desc":
    "Jugendliche und Frauen erhalten dauerhafte Lese- und Berufskenntnisse.",
  "impact.lives": "Erreichte Menschen",
  "impact.income": "Einkommenswachstum",
  "impact.partners": "Aktive Partner",
  "footer.about":
    "Frauen in Kakuma durch nachhaltige Lebensgrundlagen stärken.",
  "footer.quickLinks": "Schnellzugriff",
  "footer.contact": "Kontakt",
  "footer.rights": "Alle Rechte vorbehalten.",
  "footer.address": "Kakuma, Kenia",
  "lang.label": "Sprache",
  "lang.choose": "Sprache wählen",
  "theme.toggle": "Theme wechseln",
  "theme.light": "Hell-Modus",
  "theme.dark": "Dunkel-Modus",
  "menu.open": "Menü öffnen",
  "menu.tooltip": "Weitere Seiten hier finden!",
  "menu.close": "Menü schließen",
};

export const TRANSLATIONS = {
  en,
  sw,
  fr,
  es,
  ar,
  "zh-CN": zh,
  pt,
  de,
};

export default TRANSLATIONS;
