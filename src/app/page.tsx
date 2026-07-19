'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const BASE_PATH = process.env.NODE_ENV === 'production' ? '/Economy' : '';

// =============================================
// ICON MAPPING - Flaticon UIicons (Comprehensive)
// =============================================
const iconMap = {
  // Vision & Mission
  vision: 'fi fi-rr-eye',
  mission: 'fi fi-rr-target',
  
  // Objectives (9 items) - Each MUST have an icon
  crown: 'fi fi-rr-crown',
  bulb: 'fi fi-rr-lightbulb',
  chart: 'fi fi-rr-chart-line-up',
  handshake: 'fi fi-rr-handshake',
  book: 'fi fi-rr-book-alt',
  rocket: 'fi fi-rr-rocket',
  bolt: 'fi fi-rr-bolt',
  leaf: 'fi fi-rr-leaf',
  target: 'fi fi-rr-target',
  
  // About Features (4 items)
  comment: 'fi fi-rr-comment-quote',
  star: 'fi fi-rr-star',
  stats: 'fi fi-rr-chart-pie',
  trophy: 'fi fi-rr-trophy',
  
  // Target Audiences (9 items) - Each MUST have an icon
  businessman: 'fi fi-rr-briefcase',
  investor: 'fi fi-rr-chart-line-up',
  entrepreneur: 'fi fi-rr-rocket-lunch',
  executive: 'fi fi-rr-user-tie',
  decisionMaker: 'fi fi-rr-flag',
  government: 'fi fi-rr-building',
  media: 'fi fi-rr-newspaper',
  student: 'fi fi-rr-graduation-cap',
  enthusiast: 'fi fi-rr-user',
  
  // Sectors (16 items) - Each MUST have an icon
  industry: 'fi fi-rr-factory',
  energy: 'fi fi-rr-battery-full',
  mining: 'fi fi-rr-digging',
  agriculture: 'fi fi-rr-wheat',
  technology: 'fi fi-rr-microchip',
  logistics: 'fi fi-rr-truck',
  realEstate: 'fi fi-rr-building',
  tourism: 'fi fi-rr-suitcase',
  health: 'fi fi-rr-heart-pulse',
  education: 'fi fi-rr-book-alt',
  finance: 'fi fi-rr-coins',
  insurance: 'fi fi-rr-shield-check',
  telecom: 'fi fi-rr-signal-alt-3',
  trade: 'fi fi-rr-shopping-cart',
  foodSecurity: 'fi fi-rr-leaf',
  digitalEconomy: 'fi fi-rr-circle-nodes',
  
  // Production Elements (6 items) - Each MUST have an icon
  camera: 'fi fi-rr-camera',
  director: 'fi fi-rr-clapperboard',
  report: 'fi fi-rr-document',
  infographic: 'fi fi-rr-chart-bar',
  audio: 'fi fi-rr-microphone',
  music: 'fi fi-rr-music',
  
  // Publishing Plan (6 items) - Each MUST have an icon
  videoBroadcast: 'fi fi-rr-video-camera',
  shortClip: 'fi fi-rr-scissors',
  guestContent: 'fi fi-rr-user-guest',
  pressCoverage: 'fi fi-rr-newspaper',
  digitalCampaign: 'fi fi-rr-mobile-button',
  quote: 'fi fi-rr-quote-right',
  
  // Sponsorship Opportunities (6 items) - Each MUST have an icon
  mediaTV: 'fi fi-rr-tv',
  branding: 'fi fi-rr-palette',
  digitalPresence: 'fi fi-rr-globe',
  audience: 'fi fi-rr-users',
  publishingPlan: 'fi fi-rr-share',
  nationalContent: 'fi fi-rr-medal',
  
  // Contact & Footer (All MUST have icons)
  location: 'fi fi-rr-map-pin',
  phone: 'fi fi-rr-phone-call',
  email: 'fi fi-rr-envelope',
  building: 'fi fi-rr-building-columns',
  logo: 'fi fi-rr-building-columns',
  
  // Social Media (4 items) - All MUST have icons
  twitter: 'fi fi-rr-twitter',
  linkedin: 'fi fi-rr-linkedin',
  instagram: 'fi fi-rr-instagram',
  youtube: 'fi fi-rr-youtube',
  
  // Timeline Icons (10 axes) - Each MUST have an icon
  timelineFounding: 'fi fi-rr-rocket',
  timelineChallenges: 'fi fi-rr-shield-alt',
  timelineSuccess: 'fi fi-rr-trophy',
  timelineLeadership: 'fi fi-rr-user-tie',
  timelineInvestment: 'fi fi-rr-chart-pie',
  timelineTalent: 'fi fi-rr-graduation-cap',
  timelineInnovation: 'fi fi-rr-lightbulb',
  timelineSocial: 'fi fi-rr-heart-handshake',
  timelineFuture: 'fi fi-rr-compass',
  timelineVision2030: 'fi fi-rr-flag',
}

// =============================================
// TRANSLATIONS - ARABIC & ENGLISH
// =============================================
const translations = {
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'عن البرنامج',
      vision: 'الرؤية',
      objectives: 'الأهداف',
      episodes: 'محاور الحلقات',
      sponsorship: 'فرص الرعاية',
      contact: 'تواصل معنا',
    },
    hero: {
      badge: 'برنامج إعلامي سعودي',
      title: 'قادة',
      titleHighlight: 'الاقتصاد',
      subtitle: 'منصة إعلامية تُبرز دور القطاع الخاص في تحقيق مستهدفات رؤية السعودية 2030',
      cta1: 'محاور الحلقة',
      cta2: 'كن راعياً / تواصل معنا',
      scroll: 'اكتشف المزيد',
    },
    about: {
      badge: 'نبذة عن البرنامج',
      title: 'نحو اقتصاد متنوع ومستدام',
      p1: 'يشهد الاقتصادي السعودي تحولاً تاريخياً غير مسبوق يهدف إلى تنويع مصادر الدخل وتقليل الاعتماد على النفط. وفي قلب هذا التحول، يأتي دور القطاع الخاص كمحرك أساسي للنمو والابتكار.',
      p2: 'من هنا، يأتي برنامج "قادة الاقتصاد" ليكون منصة إعلامية رائدة تسلط الضوء على قصص النجاح والريادة في عالم الأعمال السعودي، مستضيفاً أبرز الشخصيات المؤثرة في مختلف القطاعات.',
      feature1: 'حوار عميق وجاد',
      feature2: 'شخصيات مؤثرة',
      feature3: 'رؤى اقتصادية',
      feature4: 'قصص نجاح ملهمة',
      statEpisodes: 'حلقة',
      statSectors: 'قطاع',
      statGuests: 'ضيف',
      statViewers: 'مشاهد',
    },
    vm: {
      badge: 'الرؤية والرسالة',
      visionTitle: 'الرؤية',
      visionText: 'أن نكون المنصة الإعلامية الأولى والأكثر تأثيراً في إبراز دور القيادات الاقتصادية السعودية، ونساهم في تعزيز ثقافة ريادة الأعمال والاستثمار المحلي.',
      missionTitle: 'الرسالة',
      missionText: 'إنتاج محتوى إعلامي نوعي يعكس إنجازات القيادات الاقتصادية الوطنية في مختلف القطاعات، ونسلط الضوء على دورهم في تحقيق مستهدفات رؤية 2030.',
    },
    objectives: {
      badge: 'أهداف البرنامج',
      title: '9 أهداف استراتيجية نسعى لتحقيقها',
      items: [
        { icon: 'crown', title: 'إبراز القيادات الفاعلة', desc: 'في القطاع الخاص' },
        { icon: 'star', title: 'تسليط الضوء على قصص', desc: 'النجاح السعودي' },
        { icon: 'chart', title: 'دعم توجهات الاستثمار', desc: 'والأعمال' },
        { icon: 'handshake', title: 'تعزيز الروابط بين', desc: 'رجال الأعمال' },
        { icon: 'book', title: 'نشر الثقافة الاقتصادية', desc: 'للمجتمع' },
        { icon: 'rocket', title: 'تحفيز الشباب', desc: 'والكفاءات' },
        { icon: 'bolt', title: 'تسريع التحولات', desc: 'التنموية' },
        { icon: 'leaf', title: 'نشر الوعي', desc: 'بالمسؤولية' },
        { icon: 'target', title: 'إبراز المسارات', desc: 'التنموية' },
      ],
    },
    timeline: {
      badge: 'محاور الحلقة',
      title: 'رحلة شاملة في 10 محاور رئيسية',
      subtitle: 'يتناول البرنامج في كل حلقة جوانب متعددة من حياة الضيف، من رحلة التأسيس إلى المساهمة في رؤية 2030.',
      items: [
        { text: 'رحلة التأسيس', icon: 'timelineFounding' },
        { text: 'أبرز التحديات', icon: 'timelineChallenges' },
        { text: 'عوامل النجاح', icon: 'timelineSuccess' },
        { text: 'القيادة والإدارة', icon: 'timelineLeadership' },
        { text: 'الاستثمار والتوسع', icon: 'timelineInvestment' },
        { text: 'تنمية الكفاءات', icon: 'timelineTalent' },
        { text: 'الابتكار والتحول', icon: 'timelineInnovation' },
        { text: 'المسؤولية الاجتماعية', icon: 'timelineSocial' },
        { text: 'الخطط المستقبلية', icon: 'timelineFuture' },
        { text: 'المساهمة في رؤية 2030', icon: 'timelineVision2030' },
      ],
    },
    targets: {
      badge: 'الفئات والقطاعات المستهدفة',
      audiencesTitle: 'الفئات المستهدفة',
      sectorsTitle: 'القطاعات المستهدفة',
      audiences: [
        { text: 'رجال أعمال', icon: 'businessman' },
        { text: 'المستثمرون', icon: 'investor' },
        { text: 'رواد أعمال', icon: 'entrepreneur' },
        { text: 'قيادات تنفيذية', icon: 'executive' },
        { text: 'صناع قرار', icon: 'decisionMaker' },
        { text: 'جهات حكومية', icon: 'government' },
        { text: 'إعلام اقتصادي', icon: 'media' },
        { text: 'طلاب جامعات', icon: 'student' },
        { text: 'مهتمون بالاقتصاد', icon: 'enthusiast' },
      ],
      sectors: [
        { text: 'الصناعة', size: 'large', icon: 'industry' },
        { text: 'الطاقة', size: 'medium', icon: 'energy' },
        { text: 'التعدين', size: 'small', icon: 'mining' },
        { text: 'الزراعة', size: 'medium', icon: 'agriculture' },
        { text: 'التقنية', size: 'large', icon: 'technology' },
        { text: 'اللوجستيات', size: 'medium', icon: 'logistics' },
        { text: 'العقار', size: 'small', icon: 'realEstate' },
        { text: 'السياحة', size: 'medium', icon: 'tourism' },
        { text: 'الصحة', size: 'large', icon: 'health' },
        { text: 'التعليم', size: 'small', icon: 'education' },
        { text: 'التمويل', size: 'medium', icon: 'finance' },
        { text: 'التأمين', size: 'small', icon: 'insurance' },
        { text: 'الاتصالات', size: 'medium', icon: 'telecom' },
        { text: 'التجارة', size: 'large', icon: 'trade' },
        { text: 'الأمن الغذائي', size: 'medium', icon: 'foodSecurity' },
        { text: 'الاقتصاد الرقمي', size: 'large', icon: 'digitalEconomy' },
      ],
    },
    nationalValue: {
      title: 'القيمة الوطنية للبرنامج',
      p1: 'يسهم برنامج "قادة الاقتصاد" في تعزيز',
      highlight: 'الهوية الاقتصادية للمملكة',
      p2: '، ويبرز كيانات رائدة في التطور والنمو، ويضيف للإعلاميات الوطنية في الشأن الاقتصادي فخراً لهوية الاقتصاد السعودي.',
    },
    production: {
      badge: 'عناصر الإنتاج وخطة النشر',
      productionTitle: 'عناصر الإنتاج',
      publishingTitle: 'خطة النشر',
      productionItems: [
        { text: 'تصوير احترافي', icon: 'camera' },
        { text: 'إخراج فني متقن', icon: 'director' },
        { text: 'تقارير ميدانية', icon: 'report' },
        { text: 'إنفوجرافيك', icon: 'infographic' },
        { text: 'تعليق صوتي', icon: 'audio' },
        { text: 'موسيقى تصويرية', icon: 'music' },
      ],
      publishingItems: [
        { text: 'بث فيديو الحلقات', icon: 'videoBroadcast' },
        { text: 'مقاطع قصيرة', icon: 'shortClip' },
        { text: 'محتوى خاص بالضيف', icon: 'guestContent' },
        { text: 'تغطية صحفية', icon: 'pressCoverage' },
        { text: 'حملات رقمية', icon: 'digitalCampaign' },
        { text: 'اقتباسات مميزة', icon: 'quote' },
      ],
    },
    sponsorship: {
      badge: 'فرص الرعاية',
      title: '6 فرص ذهبية للرعاة والشركاء',
      items: [
        { icon: 'mediaTV', title: 'الظهور الإعلامي', desc: 'تواجد علامتك التجارية أمام جمهور واسع ومتخصص من خلال ظهورها في جميع حلقات البرنامج.', popular: false },
        { icon: 'branding', title: 'تعزيز الهوية المؤسسية', desc: 'ربط اسم مؤسستك بمحتوى وطني نوعي يعكس القيم والمبادئ التي تؤمن بها.', popular: false },
        { icon: 'digitalPresence', title: 'الحضور الرقمي', desc: 'تواجد فعال على جميع المنصات الرقمية مع محتوى خاص يبرز دوركم.', popular: true },
        { icon: 'audience', title: 'الوصول لجمهور متخصص', desc: 'الوصول المباشر لصناع القرار ورجال الأعمال والمستثمرين.', popular: false },
        { icon: 'publishingPlan', title: 'الاستفادة من خطة النشر', desc: 'التواجد في حملات تسويقية متكاملة تشمل جميع القنوات.', popular: false },
        { icon: 'nationalContent', title: 'الارتباط بمحتوى وطني نوعي', desc: 'المشاركة في مشروع وطني يساهم في تحقيق رؤية 2030.', popular: false },
      ],
    },
    whyUs: {
      badge: 'لماذا قادة الاقتصاد؟',
      quotePart1: 'لأن كل تقدم مرهون بإسهاماتنا سوياً، لأننا من خلال هذا البرنامج نعمد إلى جمع أصحاب العزم والهمم، لأن المحتوى الاقتصادي الذي سيروى',
      quoteHighlight: 'يُبلور مكاسب Economies',
      quotePart2: 'وإعلامياتها.',
    },
    contact: {
      title: 'تواصل معنا',
      subtitle: 'نحن سعداء بتواصلكم معنا',
      name: 'الاسم الكامل',
      organization: 'الجهة / الشركة',
      email: 'البريد الإلكتروني',
      message: 'رسالتك',
      submit: 'إرسال الرسالة',
      companyTitle: 'شركة رام الجزيرة',
      companySubtitle: 'للإنتاج الإعلامي',
      address: 'الرياض - المعذر الشمالي - تقاطع طريق الملك فهد مع موسى بن النصير',
      phone: '+966 59 0401 777',
      email: 'ram@ram-est.com',
      copyright: '© 2024 قادة الاقتصاد - جميع الحقوق محفوظة | شركة رام الجزيرة للإنتاج الإعلامي',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      vision: 'Vision',
      objectives: 'Objectives',
      episodes: 'Episodes',
      sponsorship: 'Sponsorship',
      contact: 'Contact',
    },
    hero: {
      badge: 'Saudi Media Program',
      title: 'Economy',
      titleHighlight: 'Leaders',
      subtitle: 'A media platform highlighting the private sector role in achieving Saudi Vision 2030 goals',
      cta1: 'Episode Themes',
      cta2: 'Become a Sponsor / Contact Us',
      scroll: 'Discover More',
    },
    about: {
      badge: 'About The Program',
      title: 'Towards a Diverse & Sustainable Economy',
      p1: 'The Saudi economy is witnessing an unprecedented historical transformation aimed at diversifying income sources and reducing dependence on oil. At the heart of this transformation comes the role of the private sector as a fundamental driver of growth and innovation.',
      p2: 'Hence, "Economy Leaders" program comes to be a leading media platform that highlights success stories and leadership in the Saudi business world, hosting the most influential figures in various sectors.',
      feature1: 'Deep Dialogue',
      feature2: 'Influential Figures',
      feature3: 'Economic Insights',
      feature4: 'Inspiring Stories',
      statEpisodes: 'Episodes',
      statSectors: 'Sectors',
      statGuests: 'Guests',
      statViewers: 'Viewers',
    },
    vm: {
      badge: 'Vision & Mission',
      visionTitle: 'Vision',
      visionText: 'To be the most impactful media platform in showcasing Saudi economic leadership, contributing to promoting entrepreneurship and local investment culture.',
      missionTitle: 'Mission',
      missionText: 'Producing quality media content reflecting national economic leaders\' achievements across all sectors, highlighting their role in achieving Vision 2030 goals.',
    },
    objectives: {
      badge: 'Program Objectives',
      title: '9 Strategic Goals We Aim to Achieve',
      items: [
        { icon: 'crown', title: 'Highlight Active Leaders', desc: 'In Private Sector' },
        { icon: 'star', title: 'Spotlight Success Stories', desc: 'Saudi Success' },
        { icon: 'chart', title: 'Support Investment Trends', desc: '& Business' },
        { icon: 'handshake', title: 'Strengthen Links Between', desc: 'Businessmen' },
        { icon: 'book', title: 'Spread Economic Culture', desc: 'To Society' },
        { icon: 'rocket', title: 'Empower Youth', desc: '& Talents' },
        { icon: 'bolt', title: 'Accelerate Development', desc: 'Transformations' },
        { icon: 'leaf', title: 'Raise Awareness', desc: 'Of Responsibility' },
        { icon: 'target', title: 'Highlight Development', desc: 'Pathways' },
      ],
    },
    timeline: {
      badge: 'Episode Themes',
      title: 'A Comprehensive Journey in 10 Main Themes',
      subtitle: 'Each episode covers multiple aspects of the guest\'s journey, from founding to Vision 2030 contribution.',
      items: [
        { text: 'Founding Journey', icon: 'timelineFounding' },
        { text: 'Key Challenges', icon: 'timelineChallenges' },
        { text: 'Success Factors', icon: 'timelineSuccess' },
        { text: 'Leadership & Management', icon: 'timelineLeadership' },
        { text: 'Investment & Expansion', icon: 'timelineInvestment' },
        { text: 'Talent Development', icon: 'timelineTalent' },
        { text: 'Innovation & Transformation', icon: 'timelineInnovation' },
        { text: 'Social Responsibility', icon: 'timelineSocial' },
        { text: 'Future Plans', icon: 'timelineFuture' },
        { text: 'Contribution to Vision 2030', icon: 'timelineVision2030' },
      ],
    },
    targets: {
      badge: 'Target Audiences & Sectors',
      audiencesTitle: 'Target Audiences',
      sectorsTitle: 'Target Sectors',
      audiences: [
        { text: 'Businessmen', icon: 'businessman' },
        { text: 'Investors', icon: 'investor' },
        { text: 'Entrepreneurs', icon: 'entrepreneur' },
        { text: 'Executives', icon: 'executive' },
        { text: 'Decision Makers', icon: 'decisionMaker' },
        { text: 'Government Bodies', icon: 'government' },
        { text: 'Economic Media', icon: 'media' },
        { text: 'University Students', icon: 'student' },
        { text: 'Economy Enthusiasts', icon: 'enthusiast' },
      ],
      sectors: [
        { text: 'Industry', size: 'large', icon: 'industry' },
        { text: 'Energy', size: 'medium', icon: 'energy' },
        { text: 'Mining', size: 'small', icon: 'mining' },
        { text: 'Agriculture', size: 'medium', icon: 'agriculture' },
        { text: 'Technology', size: 'large', icon: 'technology' },
        { text: 'Logistics', size: 'medium', icon: 'logistics' },
        { text: 'Real Estate', size: 'small', icon: 'realEstate' },
        { text: 'Tourism', size: 'medium', icon: 'tourism' },
        { text: 'Healthcare', size: 'large', icon: 'health' },
        { text: 'Education', size: 'small', icon: 'education' },
        { text: 'Finance', size: 'medium', icon: 'finance' },
        { text: 'Insurance', size: 'small', icon: 'insurance' },
        { text: 'Telecom', size: 'medium', icon: 'telecom' },
        { text: 'Trade', size: 'large', icon: 'trade' },
        { text: 'Food Security', size: 'medium', icon: 'foodSecurity' },
        { text: 'Digital Economy', size: 'large', icon: 'digitalEconomy' },
      ],
    },
    nationalValue: {
      title: 'National Value of the Program',
      p1: '"Economy Leaders" program contributes to enhancing the',
      highlight: 'National Economic Identity',
      p2: ', highlighting pioneering entities in development and growth, adding pride to Saudi economy identity.',
    },
    production: {
      badge: 'Production Elements & Publishing Plan',
      productionTitle: 'Production Elements',
      publishingTitle: 'Publishing Plan',
      productionItems: [
        { text: 'Professional Photography', icon: 'camera' },
        { text: 'Technical Direction', icon: 'director' },
        { text: 'Field Reports', icon: 'report' },
        { text: 'Infographics', icon: 'infographic' },
        { text: 'Audio Commentary', icon: 'audio' },
        { text: 'Soundtrack Music', icon: 'music' },
      ],
      publishingItems: [
        { text: 'Video Episode Broadcast', icon: 'videoBroadcast' },
        { text: 'Short Clips', icon: 'shortClip' },
        { text: 'Guest-Specific Content', icon: 'guestContent' },
        { text: 'Press Coverage', icon: 'pressCoverage' },
        { text: 'Digital Campaigns', icon: 'digitalCampaign' },
        { text: 'Featured Quotes', icon: 'quote' },
      ],
    },
    sponsorship: {
      badge: 'Sponsorship Opportunities',
      title: '6 Golden Opportunities for Sponsors & Partners',
      items: [
        { icon: 'mediaTV', title: 'Media Exposure', desc: 'Your brand presence before a wide and specialized audience through all program episodes.', popular: false },
        { icon: 'branding', title: 'Corporate Identity Enhancement', desc: 'Link your institution name with quality national content reflecting your values.', popular: false },
        { icon: 'digitalPresence', title: 'Digital Presence', desc: 'Effective presence on all digital platforms with special content highlighting your role.', popular: true },
        { icon: 'audience', title: 'Access to Specialized Audience', desc: 'Direct access to decision makers, businessmen and investors.', popular: false },
        { icon: 'publishingPlan', title: 'Benefit from Publishing Plan', desc: 'Presence in integrated marketing campaigns covering all channels.', popular: false },
        { icon: 'nationalContent', title: 'Association with Quality National Content', desc: 'Participation in a national project contributing to Vision 2030.', popular: false },
      ],
    },
    whyUs: {
      badge: 'Why Economy Leaders?',
      quotePart1: 'Because every progress depends on our contributions together, because through this program we aim to gather determined people, because the economic content that will be told',
      quoteHighlight: 'crystallizes gains of economies',
      quotePart2: 'and their media.',
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'We are happy to hear from you',
      name: 'Full Name',
      organization: 'Organization / Company',
      email: 'Email Address',
      message: 'Your Message',
      submit: 'Send Message',
      companyTitle: 'Ram Al-Jazeerah Company',
      companySubtitle: 'For Media Production',
      address: 'Riyadh - Al-Muamzar North - Intersection of King Fahd Road with Musa bin Nusair',
      phone: '+966 59 0401 777',
      email: 'ram@ram-est.com',
      copyright: '© 2024 Economy Leaders - All Rights Reserved | Ram Al-Jazeerah Media Production',
    },
  },
}

// =============================================
// SPOTLIGHT CARD COMPONENT (with subtle glow effect)
// =============================================
function SpotlightCard({ children, className = '', popular = false }: { 
  children: React.ReactNode; 
  className?: string;
  popular?: boolean;
}) {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    // Very subtle position tracking - reduced sensitivity
    setPosition({ 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    })
  }

  const handleMouseEnter = () => {
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <div
      ref={divRef}
      className={`spotlight-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Popular Badge */}
      {popular && (
        <div className="popular-badge">
          <i className="fi fi-rr-star"></i>
          <span>الأكثر طلباً</span>
        </div>
      )}
      
      {/* Spotlight Effect - Very subtle glow */}
      <div
        className="spotlight-effect"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(201, 162, 39, 0.04), transparent 50%)`,
        }}
      />
      {children}
    </div>
  )
}

// =============================================
// STATS COUNTER COMPONENT
// =============================================
function StatsCounter({ lang }: { lang: 'ar' | 'en' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [counts, setCounts] = useState({ episodes: 0, sectors: 0, guests: 0, viewers: 0 })
  const [progress, setProgress] = useState({ episodes: 0, sectors: 0, guests: 0, viewers: 0 })

  const targetCounts = { episodes: 20, sectors: 16, guests: 50, viewers: 500000 }

  useEffect(() => {
    if (isInView) {
      const duration = 2200
      const steps = 65
      const interval = duration / steps

      let step = 0
      const timer = setInterval(() => {
        step++
        const progressVal = step / steps
        const easeOut = 1 - Math.pow(1 - progressVal, 3)

        setCounts({
          episodes: Math.round(targetCounts.episodes * easeOut),
          sectors: Math.round(targetCounts.sectors * easeOut),
          guests: Math.round(targetCounts.guests * easeOut),
          viewers: Math.round(targetCounts.viewers * easeOut),
        })

        setProgress({
          episodes: progressVal * 100,
          sectors: progressVal * 100,
          guests: progressVal * 100,
          viewers: progressVal * 100,
        })

        if (step >= steps) clearInterval(timer)
      }, interval)

      return () => clearInterval(timer)
    }
  }, [isInView])

  const t = translations[lang]

  return (
    <section ref={ref} className="stats-section">
      <div className="stats-grid">
        <motion.div 
          className="stat-item"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="stat-number">{counts.episodes}+</div>
          <div className="stat-progress-line">
            <div className="stat-progress-fill" style={{ width: `${progress.episodes}%` }}></div>
          </div>
          <div className="stat-label">{t.about.statEpisodes}</div>
        </motion.div>
        <motion.div 
          className="stat-item"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.12 }}
        >
          <div className="stat-number">{counts.sectors}</div>
          <div className="stat-progress-line">
            <div className="stat-progress-fill" style={{ width: `${progress.sectors}%` }}></div>
          </div>
          <div className="stat-label">{t.about.statSectors}</div>
        </motion.div>
        <motion.div 
          className="stat-item"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.24 }}
        >
          <div className="stat-number">{counts.guests}+</div>
          <div className="stat-progress-line">
            <div className="stat-progress-fill" style={{ width: `${progress.guests}%` }}></div>
          </div>
          <div className="stat-label">{t.about.statGuests}</div>
        </motion.div>
        <motion.div 
          className="stat-item"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.36 }}
        >
          <div className="stat-label">{t.about.statViewers}</div>
          <div className="stat-number">{counts.viewers.toLocaleString()}+</div>
          <div className="stat-progress-line">
            <div className="stat-progress-fill" style={{ width: `${progress.viewers}%` }}></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// =============================================
// SCROLL PROGRESS INDICATOR
// =============================================
function ScrollProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPosition = window.scrollY
      const progress = totalHeight > 0 ? (scrollPosition / totalHeight) * 100 : 0
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="scroll-progress-container">
      <div className="scroll-progress-bar" style={{ height: `${scrollProgress}%` }}>
        <div className="scroll-progress-glow"></div>
      </div>
    </div>
  )
}

// =============================================
// TIMELINE PROGRESS DOTS
// =============================================
function TimelineProgressDots({ totalDots = 10 }: { totalDots?: number }) {
  const [activeDot, setActiveDot] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect()
            const containerTop = rect.top
            const scrollY = window.scrollY
            const relativeScroll = scrollY - containerTop + window.innerHeight
            const containerHeight = rect.height
            const dotIndex = Math.min(
              Math.floor((relativeScroll / containerHeight) * totalDots),
              totalDots - 1
            )
            setActiveDot(Math.max(0, dotIndex))
          }
        })
      },
      { threshold: Array.from({ length: totalDots }, (_, i) => i / totalDots) }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [totalDots])

  return (
    <div className="timeline-progress-dots" ref={sectionRef as any}>
      {Array.from({ length: totalDots }).map((_, index) => (
        <button
          key={index}
          className={`timeline-dot ${index === activeDot ? 'active' : ''}`}
          aria-label={`Axis ${index + 1}`}
          onClick={() => {
            const item = document.querySelector(`.timeline-item:nth-child(${index + 1})`)
            item?.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }}
        >
          <span>{index + 1}</span>
        </button>
      ))}
    </div>
  )
}

// =============================================
// MAIN PAGE COMPONENT
// =============================================
export default function Home() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = translations[lang]

  // Preloader Effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  // Scroll Effect for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth Scroll Function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMobileMenuOpen(false)
    }
  }

  // Toggle Language
  const toggleLanguage = () => {
    setLang(prev => prev === 'ar' ? 'en' : 'ar')
  }

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } }
  }

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14 } }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
  }

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="main-wrapper">
      {/* Noise Texture Overlay */}
      <div className="noise-overlay" aria-hidden="true"></div>
      
      {/* Scroll Progress Indicator */}
      <ScrollProgressIndicator />
      
      {/* ===== PRELOADER ===== */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
            className="preloader"
          >
            <div className="preloader-content">
              <div className="preloader-logo">
                <i className="fi fi-rr-building-columns preloader-icon"></i>
                {lang === 'ar' ? 'قادة الاقتصاد' : 'Economy Leaders'}
              </div>
              <div className="preloader-spinner"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== NAVBAR ===== */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.65, delay: 0.35, ease: "easeOut" }}
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      >
        <div className="navbar-container">
          {/* Official Logo Placeholder - Navbar */}
          <a href="#" className="navbar-logo" onClick={(e) => { e.preventDefault(); scrollToSection('hero') }}>
            <div className="logo-placeholder" aria-label="قادة الاقتصاد">
              <img 
                src={`${BASE_PATH}/logo.svg`} 
                alt="قادة الاقتصاد - Economy Leaders" 
                className="logo-img-navbar"
                onError={(e) => {
                  // Fallback to icon if image not found
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling!.classList.remove('hidden');
                }}
              />
              <i className={`${iconMap.logo} logo-icon-flaticon hidden`}></i>
              <span className="logo-text">{lang === 'ar' ? 'قادة الاقتصاد' : 'Economy Leaders'}<span className="logo-text-highlight"> | </span></span>
            </div>
          </a>

          <ul className="navbar-links">
            <li><a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero') }}>{t.nav.home}</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about') }}>{t.nav.about}</a></li>
            <li><a href="#vision" onClick={(e) => { e.preventDefault(); scrollToSection('vision') }}>{t.nav.vision}</a></li>
            <li><a href="#objectives" onClick={(e) => { e.preventDefault(); scrollToSection('objectives') }}>{t.nav.objectives}</a></li>
            <li><a href="#episodes" onClick={(e) => { e.preventDefault(); scrollToSection('episodes') }}>{t.nav.episodes}</a></li>
            <li><a href="#sponsorship" onClick={(e) => { e.preventDefault(); scrollToSection('sponsorship') }}>{t.nav.sponsorship}</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>{t.nav.contact}</a></li>
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="lang-toggle" onClick={toggleLanguage}>
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
              <i className="fi fi-rr-menu-burger"></i>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ===== MOBILE MENU ===== */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)} />
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <span style={{ color: '#C9A227', fontWeight: 800, fontSize: '1.2rem' }}>
            <i className={`${iconMap.building} `} style={{ marginLeft: '0.5rem' }}></i>
            {lang === 'ar' ? 'قادة الاقتصاد' : 'Economy Leaders'}
          </span>
          <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
            <i className="fi fi-rr-cross-small"></i>
          </button>
        </div>
        <ul className="mobile-menu-links">
          <li><a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero') }}>{t.nav.home}</a></li>
          <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about') }}>{t.nav.about}</a></li>
          <li><a href="#vision" onClick={(e) => { e.preventDefault(); scrollToSection('vision') }}>{t.nav.vision}</a></li>
          <li><a href="#objectives" onClick={(e) => { e.preventDefault(); scrollToSection('objectives') }}>{t.nav.objectives}</a></li>
          <li><a href="#episodes" onClick={(e) => { e.preventDefault(); scrollToSection('episodes') }}>{t.nav.episodes}</a></li>
          <li><a href="#sponsorship" onClick={(e) => { e.preventDefault(); scrollToSection('sponsorship') }}>{t.nav.sponsorship}</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>{t.nav.contact}</a></li>
        </ul>
      </div>

      {/* ===== HERO SECTION (No Three.js - Image Only with Gradient Mask) ===== */}
      <section id="hero" className="hero-section">
        {/* Hero Background Image with Gradient Mask is handled via CSS ::before and ::after */}
        
        {/* Hero Content */}
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.85, delay: 0.45 }}
        >
          <motion.div 
            className="hero-badge animate__animated animate__fadeInDown"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            <i className="fi fi-rr-flag hero-badge-icon"></i>
            {t.hero.badge}
          </motion.div>

          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
          >
            {t.hero.title} <span className="highlight">{t.hero.titleHighlight}</span>
          </motion.h1>

          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15 }}
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <button className="btn-primary animate__animated animate__pulse" onClick={() => scrollToSection('episodes')}>
              <i className="fi fi-rr-play"></i> {t.hero.cta1}
            </button>
            <button className="btn-secondary" onClick={() => scrollToSection('contact')}>
              <i className="fi fi-rr-envelope"></i> {t.hero.cta2}
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about') }}>
            <div className="scroll-mouse">
              <div className="scroll-wheel"></div>
            </div>
            <span>{t.hero.scroll}</span>
          </a>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section id="about" className="section section-light">
        <div className="container">
          <motion.div 
            className="about-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="about-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=850&q=85" 
                alt="Saudi Economy Skyline" 
                className="about-image"
                loading="lazy"
              />
              <div className="about-image-overlay">
                <div className="about-stats-mini">
                  <div className="stat-mini">
                    <div className="stat-mini-number">20+</div>
                    <div className="stat-mini-label">{t.about.statEpisodes}</div>
                  </div>
                  <div className="stat-mini">
                    <div className="stat-mini-number">16</div>
                    <div className="stat-mini-label">{t.about.statSectors}</div>
                  </div>
                  <div className="stat-mini">
                    <div className="stat-mini-number">50+</div>
                    <div className="stat-mini-label">{t.about.statGuests}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="about-text">
              <div className="section-badge">{t.about.badge}</div>
              <h2>{t.about.title}</h2>
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              
              <div className="about-features">
                <div className="about-feature-item">
                  <div className="about-feature-icon"><i className={iconMap.comment}></i></div>
                  <span className="about-feature-text">{t.about.feature1}</span>
                </div>
                <div className="about-feature-item">
                  <div className="about-feature-icon"><i className={iconMap.star}></i></div>
                  <span className="about-feature-text">{t.about.feature2}</span>
                </div>
                <div className="about-feature-item">
                  <div className="about-feature-icon"><i className={iconMap.stats}></i></div>
                  <span className="about-feature-text">{t.about.feature3}</span>
                </div>
                <div className="about-feature-item">
                  <div className="about-feature-icon"><i className={iconMap.trophy}></i></div>
                  <span className="about-feature-text">{t.about.feature4}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== STATS COUNTER SECTION ===== */}
      <StatsCounter lang={lang} />

      {/* ===== VISION & MISSION SECTION ===== */}
      <section id="vision" className="section section-dark">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="section-badge">{t.vm.badge}</div>
            <h2 className="section-title">{t.vm.badge}</h2>
          </motion.div>

          <motion.div 
            className="vision-mission-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainer}
          >
            <SpotlightCard className="vm-card-wrapper">
              <motion.div variants={scaleIn} className="vm-card">
                <div className="vm-card-icon"><i className={iconMap.vision}></i></div>
                <h3>{t.vm.visionTitle}</h3>
                <p>{t.vm.visionText}</p>
                <div className="vm-card-decoration"></div>
              </motion.div>
            </SpotlightCard>

            <SpotlightCard className="vm-card-wrapper">
              <motion.div variants={scaleIn} className="vm-card">
                <div className="vm-card-icon"><i className={iconMap.mission}></i></div>
                <h3>{t.vm.missionTitle}</h3>
                <p>{t.vm.missionText}</p>
                <div className="vm-card-decoration"></div>
              </motion.div>
            </SpotlightCard>
          </motion.div>
        </div>
      </section>

      {/* ===== OBJECTIVES SECTION (9 Objectives) ===== */}
      <section id="objectives" className="section section-light">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="section-badge">{t.objectives.badge}</div>
            <h2 className="section-title">{t.objectives.title}</h2>
          </motion.div>

          <motion.div 
            className="objectives-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            {t.objectives.items.map((item, index) => (
              <SpotlightCard key={index} className="objective-card-wrapper">
                <motion.div 
                  variants={scaleIn}
                  className="objective-card"
                  whileHover={{ scale: 1.04, y: -8 }}
                >
                  <div className="objective-card-number">{String(index + 1).padStart(2, '0')}</div>
                  <div className="objective-card-icon">
                    <i className={iconMap[item.icon as keyof typeof iconMap] || 'fi fi-rr-star'}></i>
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </motion.div>
              </SpotlightCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== TIMELINE / EPISODES SECTION (10 Axes) - Fixed Layout ===== */}
      <section id="episodes" className="section timeline-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="section-badge">{t.timeline.badge}</div>
            <h2 className="section-title">{t.timeline.title}</h2>
            <p className="section-subtitle">{t.timeline.subtitle}</p>
          </motion.div>

          <motion.div 
            className="timeline-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <div className="timeline-line"></div>
            <div className="timeline-grid">
              {t.timeline.items.map((item, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  className="timeline-item"
                >
                  <div className="timeline-item-dot">{String(index + 1).padStart(2, '0')}</div>
                  <div className="timeline-item-content">
                    <i className={`timeline-item-icon ${iconMap[item.icon as keyof typeof iconMap] || 'fi fi-rr-star'}`}></i>
                    <span className="timeline-item-title">{item.text}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Timeline Progress Dots */}
          <TimelineProgressDots totalDots={10} />
        </div>
      </section>

      {/* ===== TARGET AUDIENCES & SECTORS SECTION ===== */}
      <section id="targets" className="section section-light">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="section-badge">{t.targets.badge}</div>
            <h2 className="section-title">{t.targets.badge}</h2>
          </motion.div>

          <motion.div 
            className="targets-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="target-category">
              <h3 className="category-title">
                <i className="fi fi-rr-users category-icon"></i>
                {t.targets.audiencesTitle}
              </h3>
              <div className="audience-cards">
                {t.targets.audiences.map((audience, index) => (
                  <motion.div 
                    key={index}
                    variants={scaleIn}
                    className="audience-card"
                    whileHover={{ scale: 1.05, y: -6 }}
                  >
                    <i className={`audience-card-icon ${iconMap[audience.icon as keyof typeof iconMap] || 'fi fi-rr-user'}`}></i>
                    <span>{audience.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="target-category">
              <h3 className="category-title">
                <i className="fi fi-rr-grid category-icon"></i>
                {t.targets.sectorsTitle}
              </h3>
              <div className="tag-cloud">
                {t.targets.sectors.map((sector, index) => (
                  <motion.span 
                    key={index}
                    variants={scaleIn}
                    className={`tag ${sector.size}`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <i className={`tag-icon ${iconMap[sector.icon as keyof typeof iconMap] || 'fi fi-rr-folder'}`}></i>
                    {sector.text}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== NATIONAL VALUE SECTION ===== */}
      <section id="national-value" className="national-value-section">
        <img 
          src="https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=1500&q=85" 
          alt="Saudi Arabia Kingdom Tower" 
          className="national-value-bg"
          loading="lazy"
        />
        <div className="national-value-overlay"></div>
        
        <motion.div 
          className="national-value-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="national-value-icon-wrapper">
            <i className="fi fi-rr-globe national-value-icon"></i>
          </motion.div>
          <motion.h2 variants={fadeInUp}>{t.nationalValue.title}</motion.h2>
          <motion.p variants={fadeInUp}>
            {t.nationalValue.p1} <span className="national-value-highlight">{t.nationalValue.highlight}</span> {t.nationalValue.p2}
          </motion.p>
        </motion.div>
      </section>

      {/* ===== PRODUCTION ELEMENTS SECTION ===== */}
      <section id="production" className="section section-gray">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="section-badge">{t.production.badge}</div>
            <h2 className="section-title">{t.production.badge}</h2>
          </motion.div>

          <motion.div 
            className="production-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="production-column">
              <h3 className="column-title">
                <i className="fi fi-rr-clapperboard column-icon"></i>
                {t.production.productionTitle}
              </h3>
              <ul className="production-list">
                {t.production.productionItems.map((item, index) => (
                  <motion.li 
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ x: lang === 'ar' ? 10 : -10 }}
                    className="production-list-item"
                  >
                    <div className="check-icon"><i className={iconMap[item.icon as keyof typeof iconMap] || 'fi fi-rr-check'}></i></div>
                    <span>{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp} className="production-column">
              <h3 className="column-title">
                <i className="fi fi-rr-broadcast-tower column-icon"></i>
                {t.production.publishingTitle}
              </h3>
              <ul className="production-list">
                {t.production.publishingItems.map((item, index) => (
                  <motion.li 
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ x: lang === 'ar' ? 10 : -10 }}
                    className="production-list-item"
                  >
                    <div className="check-icon"><i className={iconMap[item.icon as keyof typeof iconMap] || 'fi fi-rr-check'}></i></div>
                    <span>{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== SPONSORSHIP OPPORTUNITIES SECTION (6 Cards) ===== */}
      <section id="sponsorship" className="section sponsorship-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="section-badge">{t.sponsorship.badge}</div>
            <h2 className="section-title">{t.sponsorship.title}</h2>
          </motion.div>

          <motion.div 
            className="sponsorship-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainer}
          >
            {t.sponsorship.items.map((item, index) => (
              <SpotlightCard key={index} popular={item.popular} className="sponsorship-card-wrapper">
                <motion.div 
                  variants={scaleIn}
                  className="sponsorship-card"
                  whileHover={{ 
                    y: -12,
                    rotateX: 3,
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="sponsorship-card-icon">
                    <i className={iconMap[item.icon as keyof typeof iconMap] || 'fi fi-rr-star'}></i>
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                  <div className="sponsorship-card-decoration"></div>
                </motion.div>
              </SpotlightCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== WHY US QUOTE SECTION ===== */}
      <section id="why-us" className="quote-section">
        <div className="quote-decoration quote-left">&ldquo;</div>
        <div className="quote-decoration quote-right">&rdquo;</div>
        
        <motion.div 
          className="quote-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="section-badge">{t.whyUs.badge}</div>
          <motion.blockquote variants={fadeInUp}>
            {t.whyUs.quotePart1}{' '}
            <span className="highlight">{t.whyUs.quoteHighlight}</span>{' '}
            {t.whyUs.quotePart2}
          </motion.blockquote>
        </motion.div>
      </section>

      {/* ===== CONTACT & FOOTER SECTION ===== */}
      <section id="contact" className="contact-footer-section">
        <div className="container">
          <motion.div 
            className="contact-footer-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainer}
          >
            {/* Contact Form */}
            <motion.div variants={fadeInUp} className="contact-form-wrapper">
              <h3 className="form-title">
                <i className={iconMap.email}></i>
                {t.contact.title}
              </h3>
              <p className="form-subtitle">{t.contact.subtitle}</p>
              
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label>{t.contact.name}</label>
                  <input type="text" placeholder={t.contact.name} required />
                </div>
                <div className="form-group">
                  <label>{t.contact.organization}</label>
                  <input type="text" placeholder={t.contact.organization} />
                </div>
                <div className="form-group">
                  <label>{t.contact.email}</label>
                  <input type="email" placeholder={t.contact.email} required />
                </div>
                <div className="form-group">
                  <label>{t.contact.message}</label>
                  <textarea placeholder={t.contact.message} required></textarea>
                </div>
                <button type="submit" className="btn-submit">
                  {t.contact.submit} <i className="fi fi-rr-arrow-left"></i>
                </button>
              </form>
            </motion.div>

            {/* Footer Info */}
            <motion.div variants={fadeInUp} className="footer-info">
              {/* Official Logo Placeholder - Footer */}
              <div className="footer-logo-placeholder" aria-label="شعار قادة الاقتصاد">
                <img 
                  src={`${BASE_PATH}/logo.svg`} 
                  alt="شعار قادة الاقتصاد" 
                  className="logo-img-footer"
                  onError={(e) => {
                    // Fallback to icon if image not found
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling!.classList.remove('hidden');
                  }}
                />
                <i className="fi fi-rr-building-columns footer-logo-icon-fallback hidden"></i>
              </div>
              
              <h3 className="company-title">
                <i className={iconMap.building}></i>
                {t.contact.companyTitle} <br/>
                <span className="company-subtitle">{t.contact.companySubtitle}</span>
              </h3>

              <div className="company-info">
                <div className="company-name">شركة رام الجزيرة للإنتاج الإعلامي</div>
                
                <div className="contact-details">
                  <div className="contact-detail-item">
                    <div className="contact-detail-icon"><i className={iconMap.location}></i></div>
                    <span>{t.contact.address}</span>
                  </div>
                  <div className="contact-detail-item">
                    <div className="contact-detail-icon"><i className={iconMap.phone}></i></div>
                    <span>{t.contact.phone}</span>
                  </div>
                  <div className="contact-detail-item">
                    <div className="contact-detail-icon"><i className={iconMap.email}></i></div>
                    <span>{t.contact.email}</span>
                  </div>
                </div>
              </div>

              <div className="social-links">
                <a href="#" className="social-link" aria-label="Twitter/X">
                  <i className={iconMap.twitter}></i>
                </a>
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <i className={iconMap.linkedin}></i>
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <i className={iconMap.instagram}></i>
                </a>
                <a href="#" className="social-link" aria-label="YouTube">
                  <i className={iconMap.youtube}></i>
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="footer-bottom"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {t.contact.copyright}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
