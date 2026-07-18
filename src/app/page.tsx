'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import type { Vector3 } from 'three'

// ===== Three.js Particle Background Component =====
function ParticleField({ count = 3000 }: { count?: number }) {
  const ref = useRef<any>(null)
  const [positions] = useState(() => 
    Float32Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 15)
  )

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15
      ref.current.rotation.y -= delta / 20
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#D4AF37"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  )
}

// ===== Wave Mesh Background =====
function WaveMesh() {
  const meshRef = useRef<any>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      const geometry = meshRef.current.geometry
      const positions = geometry.attributes.position.array
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]
        positions[i + 2] = Math.sin(x * 0.5 + state.clock.elapsedTime) * 0.3 + 
                           Math.cos(y * 0.5 + state.clock.elapsedTime * 0.8) * 0.3
      }
      
      geometry.attributes.position.needsUpdate = true
    }
  })
  
  return (
    <mesh ref={meshRef} position={[0, 0, -3]} rotation={[-Math.PI / 4, 0, 0]}>
      <planeGeometry args={[20, 20, 50, 50]} />
      <meshBasicMaterial color="#1E9BD7" wireframe transparent opacity={0.15} />
    </mesh>
  )
}

// ===== Hero Scene Component =====
function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <ParticleField />
      <WaveMesh />
    </>
  )
}

// ===== Language Translations =====
const translations = {
  ar: {
    // Navbar
    nav: {
      home: 'الرئيسية',
      about: 'عن البرنامج',
      vision: 'الرؤية',
      objectives: 'الأهداف',
      episodes: 'محاور الحلقات',
      sponsorship: 'فرص الرعاية',
      contact: 'تواصل معنا',
    },
    // Hero
    hero: {
      badge: '🇸🇦 برنامج إعلامي سعودي',
      title: 'قادة',
      titleHighlight: 'الاقتصاد',
      subtitle: 'منصة إعلامية تُبرز دور القطاع الخاص في تحقيق مستهدفات رؤية السعودية 2030',
      cta1: 'شاهد الحلقات',
      cta2: 'كن راعياً / تواصل معنا',
      scroll: 'اكتشف المزيد',
    },
    // About
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
    },
    // Vision & Mission
    vm: {
      badge: 'الرؤية والرسالة',
      visionTitle: 'الرؤية',
      visionText: 'أن نكون المنصة الإعلامية الأولى والأكثر تأثيراً في إبراز دور القيادات الاقتصادية السعودية، ونساهم في تعزيز ثقافة ريادة الأعمال والاستثمار المحلي.',
      missionTitle: 'الرسالة',
      missionText: 'إنتاج محتوى إعلامي نوعي يعكس إنجازات القيادات الاقتصادية الوطنية في مختلف القطاعات، ونسلط الضوء على دورهم في تحقيق مستهدفات رؤية 2030.',
    },
    // Objectives
    objectives: {
      badge: 'أهداف البرنامج',
      title: '9 أهداف استراتيجية نسعى لتحقيقها',
      items: [
        { title: 'إبراز القيادات الفاعلة', desc: 'في القطاع الخاص' },
        { title: 'تسليط الضوء على قصص', desc: 'النجاح السعودي' },
        { title: 'دعم توجهات الاستثمار', desc: 'والأعمال' },
        { title: 'تعزيز الروابط بين', desc: 'رجال الأعمال 2030' },
        { title: 'نشر الثقافة الاقتصادية', desc: 'للمجتمع' },
        { title: 'تحفيز الشباب', desc: 'والكفاءات' },
        { title: 'تسريع التحولات', desc: 'التنموية' },
        { title: 'نشر الوعي', desc: 'بالمسؤولية' },
        { title: 'إبراز المسارات', desc: 'التنموية' },
      ],
    },
    // Timeline / Episodes
    timeline: {
      badge: 'محاور الحلقة',
      title: 'رحلة شاملة في 10 محاور رئيسية',
      subtitle: 'يتناول البرنامج في كل حلقة جوانب متعددة من حياة الضيف، ونواصلها؛ وقصص النجاح التي مر بها، وتزويد المشاهد برؤية إعلامية احترافية تُثري المعرفة الاقتصادية.',
      items: [
        'رحلة التأسيس',
        'أبرز التحديات',
        'عوامل النجاح',
        'القيادة والإدارة',
        'الاستثمار والتوسع',
        'تنمية الكفاءات',
        'الابتكار والتحول',
        'المسؤولية الاجتماعية',
        'الخطط المستقبلية',
        'المساهمة في رؤية 2030',
      ],
    },
    // Targets
    targets: {
      badge: 'الفئات والقطاعات المستهدفة',
      audiencesTitle: 'الفئات المستهدفة',
      sectorsTitle: 'القطاعات المستهدفة',
      audiences: [
        'رجال أعمال',
        'المستثمرون',
        'رواد أعمال',
        'قيادات تنفيذية',
        'صناع قرار',
        'جهات حكومية',
        'إعلام اقتصادي',
        'طلاب جامعات',
        'مهتمون بالاقتصاد',
      ],
      sectors: [
        { text: 'الصناعة', size: 'large' },
        { text: 'الطاقة', size: 'medium' },
        { text: 'التعدين', size: 'small' },
        { text: 'الزراعة', size: 'medium' },
        { text: 'التقنية', size: 'large' },
        { text: 'اللوجستيات', size: 'medium' },
        { text: 'العقار', size: 'small' },
        { text: 'السياحة', size: 'medium' },
        { text: 'الصحة', size: 'large' },
        { text: 'التعليم', size: 'small' },
        { text: 'التمويل', size: 'medium' },
        { text: 'التأمين', size: 'small' },
        { text: 'الاتصالات', size: 'medium' },
        { text: 'التجارة', size: 'large' },
        { text: 'الأمن الغذائي', size: 'medium' },
        { text: 'الاقتصاد الرقمي', size: 'large' },
      ],
    },
    // National Value
    nationalValue: {
      title: 'القيمة الوطنية للبرنامج',
      p1: 'يسهم برنامج "قادة الاقتصاد" في تعزيز',
      highlight: 'الهوية الاقتصادية للمملكة',
      p2: '، ويبرز كيانات رائدة في التطور والنمو، ويضيف للإعلاميات الوطنية في الشأن الاقتصادي الذي يعد فخراً لهوية الاقتصاد السعودي ووجهته على الخريطة الإعلامية.',
    },
    // Production
    production: {
      badge: 'عناصر الإنتاج وخطة النشر',
      productionTitle: 'عناصر الإنتاج',
      publishingTitle: 'خطة النشر',
      productionItems: [
        'تصوير احترافي',
        'شرف الطاقم الفني',
        'إعداد محتوى علمي دقيق',
        'تقديمة مميزة',
        'حضور عنصر الإثارة',
        'إعداد التقارير الإخبارية',
      ],
      publishingItems: [
        'تصوير تقرير إعلاني',
        'إجراء عبر الواقع',
        'قصر مباشر',
        'أفلام رسوم متحركة',
        'تغطية موسيقى مناسبة',
        'موسيقى تصويرية مناسبة',
      ],
    },
    // Sponsorship
    sponsorship: {
      badge: 'فرص الرعاية',
      title: '6 فرص ذهبية للرعاة والشركاء',
      items: [
        { icon: '📺', title: 'الظهور الإعلامي', desc: 'تواجد علامتك التجارية أمام جمهور واسع ومتخصص من خلال ظهورها في جميع حلقات البرنامج ومحتواه.' },
        { icon: '🏢', title: 'تعزيز الهوية المؤسسية', desc: 'ربط اسم مؤسستك بمحتوى وطني نوعي يعكس القيم والمبادئ التي تؤمن بها.' },
        { icon: '💻', title: 'الحضور الرقمي', desc: 'تواجد فعال على جميع المنصات الرقمية مع محتوى خاص يبرز دوركم في دعم الاقتصاد.' },
        { icon: '👥', title: 'الوصول لجمهور متخصص', desc: 'الوصول المباشر لصناع القرار ورجال الأعمال والمستثمرين في المملكة.' },
        { icon: '🔗', title: 'الاستفادة من خطة النشر', desc: 'التواجد في حملات تسويقية متكاملة تشمل جميع قنوات التواصل والمنصات الإعلامية.' },
        { icon: '🇸🇦', title: 'الارتباط بمحتوى وطني نوعي', desc: 'المشاركة في مشروع وطني يساهم في تحقيق رؤية 2030 وبناء اقتصاد مزدهر.' },
      ],
    },
    // Why Us
    whyUs: {
      badge: 'لماذا قادة الاقتصاد؟',
      quote: 'لأن كل تقدم مرهون بإسهاماتنا سوياً، لأننا من خلال هذا البرنامج نعمد إلى جمع أصحاب العزم وسواند، لأن المحتوى الاقتصادي الذي سيروى في بيان اقتباسات الاقتصادية الملكة المحلية، بلورة مكاسب الاقتصاديات وإعلامياتها.',
    },
    // Contact
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
      badge: '🇸🇦 Saudi Media Program',
      title: 'Economy',
      titleHighlight: 'Leaders',
      subtitle: 'A media platform highlighting the private sector role in achieving Saudi Vision 2030 goals',
      cta1: 'Watch Episodes',
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
        { title: 'Highlight Active Leaders', desc: 'In Private Sector' },
        { title: 'Spotlight Success Stories', desc: 'Saudi Success' },
        { title: 'Support Investment Trends', desc: '& Business' },
        { title: 'Strengthen Links Between', desc: 'Businessmen 2030' },
        { title: 'Spread Economic Culture', desc: 'To Society' },
        { title: 'Empower Youth', desc: '& Talents' },
        { title: 'Accelerate Development', desc: 'Transformations' },
        { title: 'Raise Awareness', desc: 'Of Responsibility' },
        { title: 'Highlight Development', desc: 'Pathways' },
      ],
    },
    timeline: {
      badge: 'Episode Themes',
      title: 'A Comprehensive Journey in 10 Main Themes',
      subtitle: 'Each episode covers multiple aspects of the guest\'s life, and we continue; and the success stories they went through, providing viewers with professional media perspective that enriches economic knowledge.',
      items: [
        'Founding Journey',
        'Key Challenges',
        'Success Factors',
        'Leadership & Management',
        'Investment & Expansion',
        'Talent Development',
        'Innovation & Transformation',
        'Social Responsibility',
        'Future Plans',
        'Contribution to Vision 2030',
      ],
    },
    targets: {
      badge: 'Target Audiences & Sectors',
      audiencesTitle: 'Target Audiences',
      sectorsTitle: 'Target Sectors',
      audiences: [
        'Businessmen',
        'Investors',
        'Entrepreneurs',
        'Executives',
        'Decision Makers',
        'Government Bodies',
        'Economic Media',
        'University Students',
        'Economy Enthusiasts',
      ],
      sectors: [
        { text: 'Industry', size: 'large' },
        { text: 'Energy', size: 'medium' },
        { text: 'Mining', size: 'small' },
        { text: 'Agriculture', size: 'medium' },
        { text: 'Technology', size: 'large' },
        { text: 'Logistics', size: 'medium' },
        { text: 'Real Estate', size: 'small' },
        { text: 'Tourism', size: 'medium' },
        { text: 'Healthcare', size: 'large' },
        { text: 'Education', size: 'small' },
        { text: 'Finance', size: 'medium' },
        { text: 'Insurance', size: 'small' },
        { text: 'Telecom', size: 'medium' },
        { text: 'Trade', size: 'large' },
        { text: 'Food Security', size: 'medium' },
        { text: 'Digital Economy', size: 'large' },
      ],
    },
    nationalValue: {
      title: 'National Value of the Program',
      p1: '"Economy Leaders" program contributes to enhancing the',
      highlight: 'National Economic Identity',
      p2: ', highlighting pioneering entities in development and growth, adding to national economic media content that reflects pride in Saudi economy identity and direction on the media map.',
    },
    production: {
      badge: 'Production Elements & Publishing Plan',
      productionTitle: 'Production Elements',
      publishingTitle: 'Publishing Plan',
      productionItems: [
        'Professional Photography',
        'Technical Team Honor',
        'Accurate Scientific Content',
        'Special Presentation',
        'Excitement Element',
        'News Reports Preparation',
      ],
      publishingItems: [
        'Ad Report Filming',
        'Via Reality',
        'Direct Palace',
        'Animation Films',
        'Music Coverage',
        'Appropriate Soundtrack',
      ],
    },
    sponsorship: {
      badge: 'Sponsorship Opportunities',
      title: '6 Golden Opportunities for Sponsors & Partners',
      items: [
        { icon: '📺', title: 'Media Exposure', desc: 'Your brand presence before a wide and specialized audience through appearance in all program episodes and content.' },
        { icon: '🏢', title: 'Corporate Identity Enhancement', desc: 'Link your institution name with quality national content reflecting values and principles you believe in.' },
        { icon: '💻', title: 'Digital Presence', desc: 'Effective presence on all digital platforms with special content highlighting your role in supporting economy.' },
        { icon: '👥', title: 'Access to Specialized Audience', desc: 'Direct access to decision makers, businessmen and investors in the Kingdom.' },
        { icon: '🔗', title: 'Benefit from Publishing Plan', desc: 'Presence in integrated marketing campaigns covering all communication channels and media platforms.' },
        { icon: '🇸🇦', title: 'Association with Quality National Content', desc: 'Participation in a national project contributing to achieving Vision 2030 and building a prosperous economy.' },
      ],
    },
    whyUs: {
      badge: 'Why Economy Leaders?',
      quote: 'Because every progress depends on our contributions together, because through this program we aim to gather determined people, because the economic content that will be told crystallizes gains of economies and their media.',
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

// ===== Main Page Component =====
export default function Home() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = translations[lang]

  // Preloader Effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  // Scroll Effect for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth Scroll Function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  // Toggle Language
  const toggleLanguage = () => {
    setLang(prev => prev === 'ar' ? 'en' : 'ar')
  }

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  }

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
  }

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen">
      {/* ===== PRELOADER ===== */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="preloader"
          >
            <div className="preloader-content">
              <div className="preloader-logo">
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
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      >
        <div className="navbar-container">
          <a href="#" className="navbar-logo">
            🏛️ <span>{lang === 'ar' ? 'قادة الاقتصاد' : 'Economy Leaders'}</span>
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
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}>
              ☰
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ===== MOBILE MENU ===== */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)} />
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <span style={{ color: '#D4AF37', fontWeight: 700, fontSize: '1.25rem' }}>
            {lang === 'ar' ? 'قادة الاقتصاد' : 'Economy Leaders'}
          </span>
          <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>✕</button>
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

      {/* ===== HERO SECTION ===== */}
      <section id="hero" className="hero-section">
        <div className="hero-canvas-container">
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </Canvas>
        </div>

        <motion.div 
          className="hero-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {t.hero.badge}
          </motion.div>

          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {t.hero.title} <span className="highlight">{t.hero.titleHighlight}</span>
          </motion.h1>

          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <button className="btn-primary" onClick={() => scrollToSection('episodes')}>
              ▶ {t.hero.cta1}
            </button>
            <button className="btn-secondary" onClick={() => scrollToSection('contact')}>
              ✉ {t.hero.cta2}
            </button>
          </motion.div>
        </motion.div>

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
      <section id="about" className="section about-section">
        <div className="container">
          <motion.div 
            className="about-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="about-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" 
                alt="Saudi Economy" 
                className="about-image"
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
                  <div className="about-feature-icon">💬</div>
                  <span className="about-feature-text">{t.about.feature1}</span>
                </div>
                <div className="about-feature-item">
                  <div className="about-feature-icon">⭐</div>
                  <span className="about-feature-text">{t.about.feature2}</span>
                </div>
                <div className="about-feature-item">
                  <div className="about-feature-icon">📊</div>
                  <span className="about-feature-text">{t.about.feature3}</span>
                </div>
                <div className="about-feature-item">
                  <div className="about-feature-icon">🏆</div>
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
            <h2 className="section-title" style={{ color: 'white' }}>{t.vm.badge}</h2>
          </motion.div>

          <motion.div 
            className="vision-mission-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={scaleIn} className="vm-card">
              <div className="vm-card-icon">👁️</div>
              <h3>{t.vm.visionTitle}</h3>
              <p>{t.vm.visionText}</p>
              <div className="vm-card-decoration"></div>
            </motion.div>

            <motion.div variants={scaleIn} className="vm-card">
              <div className="vm-card-icon">🎯</div>
              <h3>{t.vm.missionTitle}</h3>
              <p>{t.vm.missionText}</p>
              <div className="vm-card-decoration"></div>
            </motion.div>
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
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {t.objectives.items.map((item, index) => (
              <motion.div 
                key={index} 
                variants={scaleIn}
                className="objective-card"
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="objective-card-number">{String(index + 1).padStart(2, '0')}</div>
                <div className="objective-card-icon">🎯</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== TIMELINE / EPISODES SECTION (10 Axes) ===== */}
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
            viewport={{ once: true, margin: "-50px" }}
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
                    <span className="timeline-item-title">{item}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="target-category">
              <h3>👥 {t.targets.audiencesTitle}</h3>
              <div className="audience-cards">
                {t.targets.audiences.map((audience, index) => (
                  <motion.div 
                    key={index}
                    variants={scaleIn}
                    className="audience-card"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="audience-card-icon">👤</div>
                    <span>{audience}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="target-category">
              <h3>🏭 {t.targets.sectorsTitle}</h3>
              <div className="tag-cloud">
                {t.targets.sectors.map((sector, index) => (
                  <motion.span 
                    key={index}
                    variants={scaleIn}
                    className={`tag ${sector.size}`}
                    whileHover={{ scale: 1.1 }}
                  >
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
          src="https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=1400&q=80" 
          alt="Saudi Arabia Economy" 
          className="national-value-bg"
        />
        <div className="national-value-overlay"></div>
        
        <motion.div 
          className="national-value-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
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
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="production-column">
              <h3>🎬 {t.production.productionTitle}</h3>
              <ul className="production-list">
                {t.production.productionItems.map((item, index) => (
                  <motion.li 
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ x: lang === 'ar' ? 10 : -10 }}
                  >
                    <div className="check-icon">✓</div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp} className="production-column">
              <h3>📡 {t.production.publishingTitle}</h3>
              <ul className="production-list">
                {t.production.publishingItems.map((item, index) => (
                  <motion.li 
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ x: lang === 'ar' ? 10 : -10 }}
                  >
                    <div className="check-icon">✓</div>
                    <span>{item}</span>
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
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {t.sponsorship.items.map((item, index) => (
              <motion.div 
                key={index}
                variants={scaleIn}
                className="sponsorship-card"
                whileHover={{ 
                  y: -15, 
                  rotateX: 5,
                  boxShadow: '0 35px 70px rgba(11, 61, 98, 0.2)'
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="sponsorship-card-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
                <div className="sponsorship-card-decoration"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== WHY US QUOTE SECTION ===== */}
      <section id="why-us" className="section quote-section">
        <div className="quote-decoration quote-left">"</div>
        <div className="quote-decoration quote-right">"</div>
        
        <motion.div 
          className="quote-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="section-badge">{t.whyUs.badge}</div>
          <motion.blockquote variants={fadeInUp}>
            {t.whyUs.quote.split('،').map((part, i) => (
              <span key={i}>
                {i === 1 ? <span className="highlight">{part}،</span> : part}{i < 2 && ' '}
              </span>
            ))}
          </motion.blockquote>
        </motion.div>
      </section>

      {/* ===== CONTACT & FOOTER SECTION ===== */}
      <section id="contact" className="section contact-footer-section">
        <div className="container">
          <motion.div 
            className="contact-footer-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Contact Form */}
            <motion.div variants={fadeInUp} className="contact-form-wrapper">
              <h3>📬 {t.contact.title}</h3>
              <p>{t.contact.subtitle}</p>
              
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label>{t.contact.name}</label>
                  <input type="text" placeholder={t.contact.name} />
                </div>
                <div className="form-group">
                  <label>{t.contact.organization}</label>
                  <input type="text" placeholder={t.contact.organization} />
                </div>
                <div className="form-group">
                  <label>{t.contact.email}</label>
                  <input type="email" placeholder={t.contact.email} />
                </div>
                <div className="form-group">
                  <label>{t.contact.message}</label>
                  <textarea placeholder={t.contact.message}></textarea>
                </div>
                <button type="submit" className="btn-submit">
                  {t.contact.submit} →
                </button>
              </form>
            </motion.div>

            {/* Footer Info */}
            <motion.div variants={fadeInUp} className="footer-info">
              <h3>
                🏢 {t.contact.companyTitle} <br/>
                <span>{t.contact.companySubtitle}</span>
              </h3>

              <div className="company-info">
                <div className="company-name">شركة رام الجزيرة للإنتاج الإعلامي</div>
                
                <div className="contact-details">
                  <div className="contact-detail-item">
                    <div className="contact-detail-icon">📍</div>
                    <span>{t.contact.address}</span>
                  </div>
                  <div className="contact-detail-item">
                    <div className="contact-detail-icon">📞</div>
                    <span>{t.contact.phone}</span>
                  </div>
                  <div className="contact-detail-item">
                    <div className="contact-detail-icon">✉️</div>
                    <span>{t.contact.email}</span>
                  </div>
                </div>
              </div>

              <div className="social-links">
                <a href="#" className="social-link" aria-label="Twitter">𝕏</a>
                <a href="#" className="social-link" aria-label="LinkedIn">in</a>
                <a href="#" className="social-link" aria-label="Instagram">📷</a>
                <a href="#" className="social-link" aria-label="YouTube">▶</a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="footer-bottom"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t.contact.copyright}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// ===== Stats Counter Component =====
function StatsCounter({ lang }: { lang: 'ar' | 'en' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [counts, setCounts] = useState({ episodes: 0, sectors: 0, guests: 0, audience: 0 })

  const targetCounts = { episodes: 20, sectors: 16, guests: 50, audience: 500000 }

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const interval = duration / steps

      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps
        const easeOut = 1 - Math.pow(1 - progress, 3)

        setCounts({
          episodes: Math.round(targetCounts.episodes * easeOut),
          sectors: Math.round(targetCounts.sectors * easeOut),
          guests: Math.round(targetCounts.guests * easeOut),
          audience: Math.round(targetCounts.audience * easeOut),
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="stat-number">{counts.episodes}+</div>
          <div className="stat-label">{t.about.statEpisodes}</div>
        </motion.div>
        <motion.div 
          className="stat-item"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="stat-number">{counts.sectors}</div>
          <div className="stat-label">{t.about.statSectors}</div>
        </motion.div>
        <motion.div 
          className="stat-item"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="stat-number">{counts.guests}+</div>
          <div className="stat-label">{t.about.statGuests}</div>
        </motion.div>
        <motion.div 
          className="stat-item"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="stat-label">{lang === 'ar' ? 'مشاهد' : 'Viewers'}</div>
          <div className="stat-number">{counts.audience.toLocaleString()}+</div>
        </motion.div>
      </div>
    </section>
  )
}
