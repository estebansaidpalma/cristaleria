/**
 * ESTEBAN PALMA - CRISTALERÍA, DRYWALL & SEGURIDAD ELECTRÓNICA
 * Main Application Logic & Interactive Features
 */

// Global Configuration
const WHATSAPP_PHONE = '584144354565';
const YOUTUBE_URL = 'https://www.youtube.com/@cristaleriaestebanpalma';

// Comprehensive Gallery Dataset (All paths verified on disk)
const galleryItems = [
  // ================= DRYWALL & CIELOS RASOS =================
  {
    id: 1,
    src: 'img/IMG-20240713-WA0018.jpeg',
    category: 'drywall',
    categoryLabel: 'Drywall & Cielos Rasos',
    title: 'Cielo Raso Decorativo con Luz Indirecta',
    desc: 'Diseño arquitectónico con fosa perimetral para iluminación LED cálida en techo residencial.',
    badge: '🧱 Drywall'
  },
  {
    id: 2,
    src: 'img/IMG-20240713-WA0022.jpeg',
    category: 'drywall',
    categoryLabel: 'Drywall & Cielos Rasos',
    title: 'Estructuración y Enmasillado de Techo Drywall',
    desc: 'Fase de juntas encintadas y acabado liso nivel 5 listo para pintura.',
    badge: '🧱 Drywall'
  },
  {
    id: 3,
    src: 'img/IMG-20241019-WA0017.jpeg',
    category: 'drywall',
    categoryLabel: 'Drywall & Cielos Rasos',
    title: 'Tabiquería y Falso Techo Comercial',
    desc: 'Separación de ambientes y aislamiento en local comercial con estructura galvanizada.',
    badge: '🧱 Drywall'
  },
  {
    id: 4,
    src: 'img/IMG-20250522-WA0032.jpeg',
    category: 'drywall',
    categoryLabel: 'Drywall & Cielos Rasos',
    title: 'Detalle de Moldura y Techo Flotante',
    desc: 'Remodelación integral de techo suspendido con acabados de alta precisión.',
    badge: '🧱 Drywall'
  },
  {
    id: 5,
    src: 'img/IMG-20261002-WA0140.jpg',
    category: 'drywall',
    categoryLabel: 'Drywall & Cielos Rasos',
    title: 'Remodelación de Techo con Nichos LED',
    desc: 'Cielo raso moderno con nichos embutidos para spots de iluminación puntual.',
    badge: '🧱 Drywall'
  },
  {
    id: 6,
    src: 'img/IMG-20261002-WA0187.jpg',
    category: 'drywall',
    categoryLabel: 'Drywall & Cielos Rasos',
    title: 'Acabado Final de Cielo Raso Pintado',
    desc: 'Superficie perfectamente uniforme y nivelada con iluminación empotrada.',
    badge: '🧱 Drywall'
  },
  {
    id: 7,
    src: 'img/IMG-20261002-WA0149.jpg',
    category: 'drywall',
    categoryLabel: 'Drywall & Cielos Rasos',
    title: 'Estructura Metálica para Techo Suspendido',
    desc: 'Perfiles principales y omegas fijados con rigurosos estándares de nivelación.',
    badge: '🧱 Drywall'
  },
  {
    id: 8,
    src: 'img/IMG-20261002-WA0150.jpg',
    category: 'drywall',
    categoryLabel: 'Drywall & Cielos Rasos',
    title: 'Placas de Drywall Instaladas',
    desc: 'Colocación precisa de láminas de yeso para sala de estar moderna.',
    badge: '🧱 Drywall'
  },
  {
    id: 9,
    src: 'img/IMG-20261002-WA0152.jpg',
    category: 'drywall',
    categoryLabel: 'Drywall & Cielos Rasos',
    title: 'Aislamiento y Enmasillado en Drywall',
    desc: 'Tratamiento de juntas con cinta de papel microperforada y pasta profesional.',
    badge: '🧱 Drywall'
  },
  {
    id: 10,
    src: 'img/IMG_20240715_101012.jpg',
    category: 'drywall',
    categoryLabel: 'Drywall & Cielos Rasos',
    title: 'Diseño de Cielo Raso Multidimensional',
    desc: 'Niveles escalonados para crear profundidad visual en áreas sociales.',
    badge: '🧱 Drywall'
  },
  {
    id: 11,
    src: 'img/IMG_20240715_101033.jpg',
    category: 'drywall',
    categoryLabel: 'Drywall & Cielos Rasos',
    title: 'Detalle de Esquinas y Remates Drywall',
    desc: 'Colocación de esquineros metálicos para ángulos rectos impecables.',
    badge: '🧱 Drywall'
  },
  {
    id: 12,
    src: 'img/IMG_20240715_101133.jpg',
    category: 'drywall',
    categoryLabel: 'Drywall & Cielos Rasos',
    title: 'Techo Comercial con Cortes para Luminarias',
    desc: 'Preparación de perforaciones para lámparas circulares LED de alta potencia.',
    badge: '🧱 Drywall'
  },

  // ================= VIDRIOS Y VENTANAS COMERCIALES =================
  {
    id: 13,
    src: 'assets/hero_cristaleria.jpg',
    category: 'vidrios-ventanas',
    categoryLabel: 'Vidrios & Fachadas Comerciales',
    title: 'Fachada Comercial de Cristal Templado',
    desc: 'Vitrinas panorámicas de alta gama con perfiles negros y máxima transparencia.',
    badge: '🏢 Fachadas'
  },
  {
    id: 14,
    src: 'img/IMG-20261002-WA0166.jpg',
    category: 'vidrios-ventanas',
    categoryLabel: 'Vidrios & Fachadas Comerciales',
    title: 'Fachada Comercial Farma Compras',
    desc: 'Cerramiento integral en vidrio de seguridad y perfilería de aluminio para local de alta afluencia.',
    badge: '🏢 Fachadas'
  },
  {
    id: 15,
    src: 'img/IMG-20261002-WA0031.jpg',
    category: 'vidrios-ventanas',
    categoryLabel: 'Vidrios & Fachadas Comerciales',
    title: 'Ventana Panorámica Residencial',
    desc: 'Ventanal corredizo con marco de aluminio adonizado y cristal reflectivo para aislamiento térmico.',
    badge: '🏢 Ventanas'
  },
  {
    id: 16,
    src: 'img/IMG-20231206-WA0001.jpeg',
    category: 'vidrios-ventanas',
    categoryLabel: 'Vidrios & Fachadas Comerciales',
    title: 'Instalación de Vidrio Templado con Herrajes',
    desc: 'Montaje de paneles de cristal con herrajes de acero y sellado perimetral contra agua y viento.',
    badge: '🏢 Cristalería'
  },
  {
    id: 17,
    src: 'img/IMG-20261002-WA0032.jpg',
    category: 'vidrios-ventanas',
    categoryLabel: 'Vidrios & Fachadas Comerciales',
    title: 'Ventanas Corredizas con Vidrio de Seguridad',
    desc: 'Deslizamiento ultra suave sobre rodamientos de precisión y felpa hermética.',
    badge: '🏢 Ventanas'
  },
  {
    id: 18,
    src: 'img/IMG-20261002-WA0044.jpg',
    category: 'vidrios-ventanas',
    categoryLabel: 'Vidrios & Fachadas Comerciales',
    title: 'Vitrinas y Cerramientos de Cristal para Tiendas',
    desc: 'Exhibición comercial elegante con máxima protección e impacto visual.',
    badge: '🏢 Vitrinas'
  },
  {
    id: 19,
    src: 'img/IMG-20261002-WA0046.jpg',
    category: 'vidrios-ventanas',
    categoryLabel: 'Vidrios & Fachadas Comerciales',
    title: 'Puertas de Cristal Templado con Freno Hidráulico',
    desc: 'Acceso comercial seguro con manillones de acero inoxidable cepillado y cerradura de piso.',
    badge: '🏢 Puertas'
  },
  {
    id: 20,
    src: 'img/IMG-20261002-WA0053.jpg',
    category: 'vidrios-ventanas',
    categoryLabel: 'Vidrios & Fachadas Comerciales',
    title: 'División de Oficinas en Vidrio Acústico',
    desc: 'Ambientes corporativos luminosos y modernos que optimizan la concentración.',
    badge: '🏢 Divisiones'
  },
  {
    id: 21,
    src: 'img/IMG-20261002-WA0167.jpg',
    category: 'vidrios-ventanas',
    categoryLabel: 'Vidrios & Fachadas Comerciales',
    title: 'Fachada Acristalada Comercial Continua',
    desc: 'Paneles de cristal de piso a techo para máxima entrada de luz natural.',
    badge: '🏢 Fachadas'
  },

  // ================= PUERTAS DE BAÑO & ESPEJOS =================
  {
    id: 22,
    src: 'img/IMG_20251115_172309.jpg',
    category: 'banos',
    categoryLabel: 'Puertas de Baño & Espejos',
    title: 'Puerta de Baño en Vidrio Templado Premium',
    desc: 'Sistema corredizo suspendido de lujo con riel de acero inoxidable y cristal de 8mm.',
    badge: '🚿 Baños'
  },
  {
    id: 23,
    src: 'img/IMG-20261002-WA0069.jpg',
    category: 'banos',
    categoryLabel: 'Puertas de Baño & Espejos',
    title: 'Puerta de Ducha Batiente con Bisagras de Acero',
    desc: 'Bisagras de apertura 90° de alto tráfico y empaque magnético hermético.',
    badge: '🚿 Baños'
  },
  {
    id: 24,
    src: 'img/IMG-20261002-WA0070.jpg',
    category: 'banos',
    categoryLabel: 'Puertas de Baño & Espejos',
    title: 'Mampara Fija y Corrediza para Ducha',
    desc: 'Diseño minimalista para fácil limpieza, durabilidad y máxima higiene.',
    badge: '🚿 Baños'
  },
  {
    id: 25,
    src: 'img/IMG-20261002-WA0071.jpg',
    category: 'banos',
    categoryLabel: 'Puertas de Baño & Espejos',
    title: 'Puerta de Baño Esmerilada / Arenada',
    desc: 'Privacidad y sofisticación con diseño satinado en franjas o completo.',
    badge: '🚿 Baños'
  },
  {
    id: 26,
    src: 'img/IMG-20261002-WA0072.jpg',
    category: 'banos',
    categoryLabel: 'Puertas de Baño & Espejos',
    title: 'Cerramiento de Ducha en Esquina (Cabina)',
    desc: 'Aprovechamiento total del espacio con mamparas angulares selladas a prueba de fugas.',
    badge: '🚿 Baños'
  },
  {
    id: 27,
    src: 'img/IMG-20261002-WA0073.jpg',
    category: 'banos',
    categoryLabel: 'Puertas de Baño & Espejos',
    title: 'Herrajes y Tiradores en Acero Inoxidable',
    desc: 'Accesorios 100% resistentes a la humedad, químicos de limpieza y óxido.',
    badge: '🚿 Herrajes'
  },

  // ================= ESTRUCTURAS Y ALUMINIO =================
  {
    id: 28,
    src: 'img/IMG-20261002-WA0011.jpg',
    category: 'aluminio',
    categoryLabel: 'Estructuras & Aluminio',
    title: 'Pérgola y Techo Estructural en Aluminio',
    desc: 'Estructura ligera de alta resistencia con acabado electrostático horneado.',
    badge: '🏗️ Estructuras'
  },
  {
    id: 29,
    src: 'img/IMG-20261002-WA0012.jpg',
    category: 'aluminio',
    categoryLabel: 'Estructuras & Aluminio',
    title: 'Cerramiento y Celosía en Aluminio',
    desc: 'Ventilación natural continua y control de radiación solar para terrazas y patios.',
    badge: '🏗️ Celosías'
  },
  {
    id: 30,
    src: 'img/IMG-20261002-WA0085.jpg',
    category: 'aluminio',
    categoryLabel: 'Estructuras & Aluminio',
    title: 'Portón y Reja de Seguridad en Aluminio',
    desc: 'Diseño arquitectónico moderno de bajo mantenimiento que nunca se oxida.',
    badge: '🏗️ Portones'
  },
  {
    id: 31,
    src: 'img/IMG-20261002-WA0106.jpg',
    category: 'aluminio',
    categoryLabel: 'Estructuras & Aluminio',
    title: 'Marco Estructural para Fachada Pesada',
    desc: 'Perfiles tubulares reforzados para sustentación de cargas de viento y peso de cristal.',
    badge: '🏗️ Marcos'
  },
  {
    id: 32,
    src: 'img/IMG-20261002-WA0122.jpg',
    category: 'aluminio',
    categoryLabel: 'Estructuras & Aluminio',
    title: 'Barandas y Pasamanos de Aluminio',
    desc: 'Protección para escaleras y balcones con diseño contemporáneo.',
    badge: '🏗️ Barandas'
  },
  {
    id: 33,
    src: 'img/IMG-20261002-WA0141.jpg',
    category: 'aluminio',
    categoryLabel: 'Estructuras & Aluminio',
    title: 'Estructura de Aluminio a Medida en Taller',
    desc: 'Fabricación y corte con tolerancias exactas para ensamble perfecto en obra.',
    badge: '🏗️ Taller'
  },

  // ================= CÁMARAS DE SEGURIDAD Y CCTV =================
  {
    id: 34,
    src: 'assets/hero_camaras.jpg',
    category: 'camaras',
    categoryLabel: 'Cámaras & Seguridad CCTV',
    title: 'Centro de Monitoreo y Vigilancia Profesional',
    desc: 'Sistemas integrales CCTV con monitoreo multipantalla y grabación continua en DVR/NVR.',
    badge: '📹 Seguridad CCTV'
  },
  {
    id: 35,
    src: 'assets/cctv_exterior_bullet.jpg',
    category: 'camaras',
    categoryLabel: 'Cámaras & Seguridad CCTV',
    title: 'Cámara Exterior Tubo HD con Visión Nocturna',
    desc: 'Cámara antivandálica e impermeable (IP67) con infrarrojo inteligente para vigilancia 24/7.',
    badge: '📹 Seguridad CCTV'
  },
  {
    id: 36,
    src: 'assets/cctv_mobile_monitor.jpg',
    category: 'camaras',
    categoryLabel: 'Cámaras & Seguridad CCTV',
    title: 'Monitoreo Remoto en Smartphone en Tiempo Real',
    desc: 'Visualiza todas tus cámaras en vivo desde cualquier parte del mundo a través de tu teléfono móvil.',
    badge: '📹 App Móvil'
  },
  {
    id: 37,
    src: 'img/IMG_20260922_171947.jpg',
    category: 'camaras',
    categoryLabel: 'Cámaras & Seguridad CCTV',
    title: 'Instalación de Rack de Comunicaciones 4U ML6404S',
    desc: 'Montaje de rack de pared reforzado con HVR/DVR, switch de red PoE y fuente de poder centralizada.',
    badge: '📹 Racks & Equipos'
  },
  {
    id: 38,
    src: 'img/IMG_20260922_182846.jpg',
    category: 'camaras',
    categoryLabel: 'Cámaras & Seguridad CCTV',
    title: 'Puesta en Marcha y Monitoreo Multi-Cámara en Vivo',
    desc: 'Prueba en vivo con pantalla de control dividida en 4 cuadrantes con video nítido en tiempo real.',
    badge: '📹 Monitoreo en Vivo'
  },
  {
    id: 39,
    src: 'img/IMG_20260922_171956.jpg',
    category: 'camaras',
    categoryLabel: 'Cámaras & Seguridad CCTV',
    title: 'Instalación de Cámara Domo para Interiores',
    desc: 'Cámara domo con lente gran angular montada estéticamente en techo para cobertura total.',
    badge: '📹 Domo HD'
  },
  {
    id: 40,
    src: 'img/IMG_20260922_120201.jpg',
    category: 'camaras',
    categoryLabel: 'Cámaras & Seguridad CCTV',
    title: 'Preparación de Gabinete y Rack de Seguridad',
    desc: 'Fijación de estructura metálica reforzada para resguardar los equipos de grabación.',
    badge: '📹 Racks & Equipos'
  },
  {
    id: 41,
    src: 'img/IMG_20260922_132431.jpg',
    category: 'camaras',
    categoryLabel: 'Cámaras & Seguridad CCTV',
    title: 'Cableado Estructurado y Ponchado UTP Profesional',
    desc: 'Canalización oculta y conectores de alta calidad para evitar pérdidas de señal o ruido.',
    badge: '📹 Cableado'
  },
  {
    id: 42,
    src: 'img/IMG_20260922_132445.jpg',
    category: 'camaras',
    categoryLabel: 'Cámaras & Seguridad CCTV',
    title: 'Conectorización de Baluns y Alimentación DC',
    desc: 'Instalación de video baluns pasivos y conectores DC con aislamiento profesional.',
    badge: '📹 Conectores'
  },
  {
    id: 43,
    src: 'img/IMG_20260922_154010.jpg',
    category: 'camaras',
    categoryLabel: 'Cámaras & Seguridad CCTV',
    title: 'Montaje de Pantalla de Monitoreo CCTV en Pared',
    desc: 'Instalación de monitor de seguridad en soporte de pared con cableado ordenado.',
    badge: '📹 Pantallas'
  },
  {
    id: 44,
    src: 'img/IMG_20260922_171952.jpg',
    category: 'camaras',
    categoryLabel: 'Cámaras & Seguridad CCTV',
    title: 'Organización Interna de Rack y Disipación Térmica',
    desc: 'Distribución térmica adecuada y peinado de cables dentro del rack de seguridad.',
    badge: '📹 Racks & Equipos'
  },

  // ================= VIDEOS DE OBRAS EN VIVO =================
  {
    id: 45,
    src: 'img/VID-20231202-WA0000.mp4',
    category: 'videos',
    categoryLabel: 'Videos de Obras',
    title: 'Video en Obra: Acabado y Calidad de Instalación',
    desc: 'Demostración en video del resultado final y funcionamiento de instalación de cristalería.',
    badge: '🎥 Video Real',
    isVideo: true
  },
  {
    id: 46,
    src: 'img/VID-20231202-WA0030.mp4',
    category: 'videos',
    categoryLabel: 'Videos de Obras',
    title: 'Video en Obra: Prueba de Mecanismo y Ajuste',
    desc: 'Revisión en video del suave deslizamiento y fijación estructural del proyecto.',
    badge: '🎥 Video Real',
    isVideo: true
  }
];

// State variables
let currentCategory = 'all';
let currentItems = [];
let itemsPerPage = 9;
let displayedCount = 0;
let currentLightboxIndex = -1;

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
  initFilterTabs();
  initGallery();
  initLightbox();
  initQuoteForm();
  initFAQ();
  initNavigation();
  initBackToTop();
  updateCategoryCounts();
});

// Update filter counts dynamically
function updateCategoryCounts() {
  const counts = {
    all: galleryItems.length,
    drywall: galleryItems.filter(i => i.category === 'drywall').length,
    'vidrios-ventanas': galleryItems.filter(i => i.category === 'vidrios-ventanas').length,
    banos: galleryItems.filter(i => i.category === 'banos').length,
    aluminio: galleryItems.filter(i => i.category === 'aluminio').length,
    camaras: galleryItems.filter(i => i.category === 'camaras').length,
    videos: galleryItems.filter(i => i.category === 'videos').length
  };

  document.querySelectorAll('.filter-btn').forEach(btn => {
    const cat = btn.getAttribute('data-filter');
    const badge = btn.querySelector('.filter-count');
    if (badge && counts[cat] !== undefined) {
      badge.textContent = counts[cat];
    }
  });
}

// Initialize Filter Tabs
function initFilterTabs() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter');
      displayedCount = 0;
      renderGallery();
    });
  });
}

// Filter and render gallery cards
function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (!grid) return;

  if (currentCategory === 'all') {
    currentItems = [...galleryItems];
  } else {
    currentItems = galleryItems.filter(item => item.category === currentCategory);
  }

  // Clear grid if starting from first batch
  if (displayedCount === 0) {
    grid.innerHTML = '';
  }

  const nextBatch = currentItems.slice(displayedCount, displayedCount + itemsPerPage);
  
  nextBatch.forEach((item, index) => {
    const globalIdx = displayedCount + index;
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.setAttribute('data-id', item.id);
    card.setAttribute('data-index', globalIdx);

    const isVid = item.isVideo === true;
    const mediaHTML = isVid
      ? `<video preload="metadata" muted playsinline poster="img/IMG-20231206-WA0001.jpeg">
           <source src="${item.src}" type="video/mp4">
         </video>
         <span class="gallery-video-indicator">▶ Video</span>`
      : `<img src="${item.src}" alt="${item.title}" loading="lazy" />`;

    card.innerHTML = `
      <div class="gallery-thumb-wrap">
        ${mediaHTML}
        <span class="gallery-badge">${item.badge}</span>
        <div class="gallery-overlay-hover">
          <div class="zoom-icon-btn">🔍</div>
        </div>
      </div>
      <div class="gallery-card-body">
        <h4 class="gallery-card-title">${item.title}</h4>
        <p class="gallery-card-desc">${item.desc}</p>
        <div class="gallery-card-footer">
          <a href="#" class="quote-work-btn" data-title="${encodeURIComponent(item.title)}">
            💬 Cotizar este trabajo
          </a>
          <span class="view-details-txt">Ver detalle ↗</span>
        </div>
      </div>
    `;

    // Click on card opens lightbox
    card.addEventListener('click', (e) => {
      // If clicked specifically on the WhatsApp quote button, open WhatsApp
      if (e.target.closest('.quote-work-btn')) {
        e.preventDefault();
        e.stopPropagation();
        openWhatsAppQuote(item.title, item.categoryLabel);
        return;
      }
      openLightbox(globalIdx);
    });

    grid.appendChild(card);
  });

  displayedCount += nextBatch.length;

  // Toggle Load More button
  if (loadMoreBtn) {
    if (displayedCount >= currentItems.length) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'inline-flex';
      loadMoreBtn.innerHTML = `Ver más trabajos (${currentItems.length - displayedCount} restantes)`;
    }
  }
}

function initGallery() {
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      renderGallery();
    });
  }
  renderGallery();
}

// Lightbox Logic
function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  const quoteBtn = document.getElementById('lightboxQuoteBtn');

  if (!modal) return;

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => navigateLightbox(-1));
  nextBtn.addEventListener('click', () => navigateLightbox(1));

  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  // Quote button inside lightbox
  if (quoteBtn) {
    quoteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentLightboxIndex >= 0 && currentLightboxIndex < currentItems.length) {
        const item = currentItems[currentLightboxIndex];
        openWhatsAppQuote(item.title, item.categoryLabel);
      }
    });
  }
}

function openLightbox(index) {
  const modal = document.getElementById('lightboxModal');
  const container = document.getElementById('lightboxMediaContainer');
  const titleElem = document.getElementById('lightboxTitle');
  const descElem = document.getElementById('lightboxDesc');
  const badgeElem = document.getElementById('lightboxBadge');

  if (!modal || index < 0 || index >= currentItems.length) return;

  currentLightboxIndex = index;
  const item = currentItems[index];

  container.innerHTML = '';

  if (item.isVideo) {
    const video = document.createElement('video');
    video.src = item.src;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    container.appendChild(video);
  } else {
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.title;
    container.appendChild(img);
  }

  titleElem.textContent = item.title;
  descElem.textContent = item.desc;
  badgeElem.textContent = item.badge + ' • ' + item.categoryLabel;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  const container = document.getElementById('lightboxMediaContainer');
  if (!modal) return;

  // Stop video playback if any
  const video = container.querySelector('video');
  if (video) video.pause();

  modal.classList.remove('active');
  document.body.style.overflow = '';
  currentLightboxIndex = -1;
}

function navigateLightbox(direction) {
  if (currentLightboxIndex === -1) return;
  let newIndex = currentLightboxIndex + direction;
  if (newIndex < 0) newIndex = currentItems.length - 1;
  if (newIndex >= currentItems.length) newIndex = 0;
  openLightbox(newIndex);
}

// Open WhatsApp with pre-filled quote template
function openWhatsAppQuote(title, category) {
  const message = `Hola Esteban Palma! 👋\n\nEstuve revisando su sitio web y me interesa solicitar un presupuesto formal para un trabajo similar a:\n\n📌 *Proyecto:* ${title}\n📂 *Categoría:* ${category}\n\n¿Podrían indicarme qué datos o medidas necesitan para cotizarme? Muchas gracias!`;
  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// Quote Form (Presupuesto Express)
function initQuoteForm() {
  const form = document.getElementById('quoteForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const service = document.getElementById('quoteService').value;
    const property = document.getElementById('quoteProperty').value;
    const location = document.getElementById('quoteLocation').value.trim();
    const details = document.getElementById('quoteDetails').value.trim();
    const notes = document.getElementById('quoteNotes').value.trim();

    const formattedMessage = 
`*SOLICITUD DE PRESUPUESTO EXPRESS* 📋✨
*Esteban Palma - Soluciones Integrales*
---------------------------------------
🔧 *Servicio requerido:* ${service}
🏠 *Tipo de inmueble:* ${property}
📍 *Ubicación / Ciudad:* ${location || 'No especificada'}
📏 *Medidas o Detalles:* ${details || 'Por definir con el técnico'}
💬 *Comentarios:* ${notes || 'Sin observaciones adicionales'}
---------------------------------------
_Enviado desde el sitio web oficial de Esteban Palma_`;

    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(formattedMessage)}`;
    window.open(url, '_blank');
  });
}

// FAQ Accordion
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (!header) return;
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

// Navigation & Mobile Drawer
function initNavigation() {
  const toggle = document.getElementById('mobileToggle');
  const menu = document.getElementById('navMenu');
  const links = document.querySelectorAll('.nav-link');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
      });
    });
  }

  // Active section spy on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  });
}

// Back to Top button
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 450) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
