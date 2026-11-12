/**
 * CRISTALERÍA ESTEBAN PALMA — GENERADOR OFICIAL DE PRESUPUESTOS (ADMIN)
 * Arquitectura de Seguridad (Web Crypto API), Gestión de Cotizaciones y Exportación
 */

// ==========================================================================
// 1. MÓDULO DE SEGURIDAD CRIPTOGRÁFICA (OPCIÓN 1: WEB CRYPTO API)
// ==========================================================================

const DEFAULT_USER = 'epalma';
const DEFAULT_PASS = 'palma00';
const MASTER_RECOVERY_PIN = '06341345'; // PIN maestro de recuperación (RIF)

const STORAGE_KEY_AUTH = 'epalma_auth_credentials';
const STORAGE_KEY_SESSION = 'epalma_active_session_token';
const STORAGE_KEY_DRAFT = 'epalma_presupuesto_draft_v2';

// Generar Salt aleatorio en hexadecimal
function generateSalt(length = 16) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Derivar Hash seguro usando SHA-256 con Salt
async function hashWithSalt(password, salt) {
  const enc = new TextEncoder();
  const data = enc.encode(password + ':' + salt);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Inicializar credenciales si es la primera vez
async function initSecurityCredentials() {
  const stored = localStorage.getItem(STORAGE_KEY_AUTH);
  if (!stored) {
    const salt = generateSalt();
    const hash = await hashWithSalt(DEFAULT_PASS, salt);
    const authData = {
      username: DEFAULT_USER,
      salt: salt,
      hash: hash,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(authData));
    return authData;
  }
  return JSON.parse(stored);
}

// Validar inicio de sesión
async function verifyLogin(username, password) {
  const authData = await initSecurityCredentials();
  if (username.trim().toLowerCase() !== authData.username.toLowerCase()) {
    return false;
  }
  const testHash = await hashWithSalt(password, authData.salt);
  return testHash === authData.hash;
}

// Cambiar contraseña
async function changePassword(currentPass, newPass) {
  const authData = await initSecurityCredentials();
  const validCurrent = await hashWithSalt(currentPass, authData.salt);
  if (validCurrent !== authData.hash) {
    return { success: false, message: 'La contraseña actual no es correcta.' };
  }
  if (!newPass || newPass.length < 5) {
    return { success: false, message: 'La nueva contraseña debe tener al menos 5 caracteres.' };
  }
  const newSalt = generateSalt();
  const newHash = await hashWithSalt(newPass, newSalt);
  authData.salt = newSalt;
  authData.hash = newHash;
  authData.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(authData));
  return { success: true, message: '¡Contraseña actualizada exitosamente!' };
}

// Restablecer contraseña con PIN Maestro
async function resetPasswordWithPin(pin, optionalNewPass = '') {
  if (pin.trim() !== MASTER_RECOVERY_PIN) {
    return { success: false, message: 'PIN Maestro incorrecto. Verifica e intenta de nuevo.' };
  }
  const passToSet = optionalNewPass && optionalNewPass.length >= 4 ? optionalNewPass : DEFAULT_PASS;
  const newSalt = generateSalt();
  const newHash = await hashWithSalt(passToSet, newSalt);
  const authData = {
    username: DEFAULT_USER,
    salt: newSalt,
    hash: newHash,
    updatedAt: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(authData));
  return { 
    success: true, 
    message: `¡Contraseña restablecida correctamente a: "${passToSet}"!` 
  };
}

// Control de Sesión
function checkSession() {
  const token = sessionStorage.getItem(STORAGE_KEY_SESSION);
  if (token === 'epalma_authorized') {
    unlockApp();
  } else {
    lockApp();
  }
}

function unlockApp() {
  document.body.classList.remove('auth-locked');
  const gate = document.getElementById('authGate');
  const app = document.getElementById('appProtected');
  if (gate) gate.style.display = 'none';
  if (app) app.style.display = 'block';
}

function lockApp() {
  document.body.classList.add('auth-locked');
  sessionStorage.removeItem(STORAGE_KEY_SESSION);
  const gate = document.getElementById('authGate');
  const app = document.getElementById('appProtected');
  if (gate) gate.style.display = 'flex';
  if (app) app.style.display = 'none';
}

// ==========================================================================
// 2. MODALES Y EVENTOS DE SEGURIDAD
// ==========================================================================

function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'flex';
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'none';
}

// Iniciar eventos de autenticación
function initAuthEvents() {
  const loginForm = document.getElementById('loginForm');
  const loginUser = document.getElementById('loginUser');
  const loginPass = document.getElementById('loginPass');
  const loginError = document.getElementById('loginError');
  const btnLogout = document.getElementById('btnLogout');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      loginError.style.display = 'none';
      const user = loginUser.value;
      const pass = loginPass.value;

      const isValid = await verifyLogin(user, pass);
      if (isValid) {
        sessionStorage.setItem(STORAGE_KEY_SESSION, 'epalma_authorized');
        unlockApp();
        loginPass.value = '';
      } else {
        loginError.innerText = 'Usuario o contraseña incorrectos. Verifica tus credenciales.';
        loginError.style.display = 'block';
        loginPass.focus();
      }
    });
  }

  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      if (confirm('¿Deseas cerrar la sesión de presupuestos?')) {
        lockApp();
      }
    });
  }

  // Abrir modal de recuperación
  const btnForgotPass = document.getElementById('btnForgotPass');
  if (btnForgotPass) {
    btnForgotPass.addEventListener('click', () => {
      document.getElementById('resetError').style.display = 'none';
      document.getElementById('resetSuccess').style.display = 'none';
      document.getElementById('resetMasterPin').value = '';
      document.getElementById('resetNewPass').value = '';
      openModal('modalResetPass');
    });
  }

  // Confirmar restablecimiento
  const btnConfirmReset = document.getElementById('btnConfirmReset');
  if (btnConfirmReset) {
    btnConfirmReset.addEventListener('click', async () => {
      const pin = document.getElementById('resetMasterPin').value;
      const newP = document.getElementById('resetNewPass').value;
      const resErr = document.getElementById('resetError');
      const resOk = document.getElementById('resetSuccess');
      resErr.style.display = 'none';
      resOk.style.display = 'none';

      const res = await resetPasswordWithPin(pin, newP);
      if (res.success) {
        resOk.innerText = res.message;
        resOk.style.display = 'block';
        setTimeout(() => {
          closeModal('modalResetPass');
        }, 2200);
      } else {
        resErr.innerText = res.message;
        resErr.style.display = 'block';
      }
    });
  }

  // Confirmar cambio de clave
  const btnConfirmChange = document.getElementById('btnConfirmChange');
  if (btnConfirmChange) {
    btnConfirmChange.addEventListener('click', async () => {
      const current = document.getElementById('changeCurrentPass').value;
      const newPass = document.getElementById('changeNewPass').value;
      const confirmP = document.getElementById('changeConfirmPass').value;
      const chErr = document.getElementById('changeError');
      const chOk = document.getElementById('changeSuccess');
      chErr.style.display = 'none';
      chOk.style.display = 'none';

      if (newPass !== confirmP) {
        chErr.innerText = 'Las nuevas contraseñas no coinciden.';
        chErr.style.display = 'block';
        return;
      }

      const res = await changePassword(current, newPass);
      if (res.success) {
        chOk.innerText = res.message;
        chOk.style.display = 'block';
        setTimeout(() => {
          closeModal('modalChangePass');
          document.getElementById('changeCurrentPass').value = '';
          document.getElementById('changeNewPass').value = '';
          document.getElementById('changeConfirmPass').value = '';
        }, 1800);
      } else {
        chErr.innerText = res.message;
        chErr.style.display = 'block';
      }
    });
  }
}

// ==========================================================================
// 3. MODELO DE DATOS Y PLANTILLAS OFICIALES
// ==========================================================================

const officialTemplates = {
  tiesto: {
    client: "Constructora Tiesto",
    location: "Valencia, Edo. Carabobo, Venezuela",
    attention: "Gerencia de Proyectos & Obras",
    subject: "Desmontaje, Playcem, Drywall, Pintura, Empastado, PVC y Wall Panel",
    number: "COT-2026-1027",
    date: "27/10/2026",
    notes: "Los servicios especificados \"Por m²\" corresponden a tarifas unitarias fijas de mano de obra especializada. La facturación final de estos conceptos se liquidará de acuerdo al área real ejecutada y medida en obra de común acuerdo entre las partes.",
    items: [
      { type: "fixed", qty: "26,00 m²", title: "Desmontaje de 35 vidrios de ventana comerciales", sub: "Retiro cuidadoso de cristalería, desmontaje técnico de perfiles y acopio seguro.", unit: "-", total: "$380,00" },
      { type: "fixed", qty: "25,34 m²", title: "Corte y montaje de 35 piezas de Playcem 8 mm en ventanas comerciales", sub: "Dimensionamiento, corte y fijación de láminas de fibrocemento para vanos de ventana.", unit: "-", total: "$280,00" },
      { type: "m2", qty: "Por m²", title: "Instalación de estructura, láminas, encamisado y lijado (Techo)", sub: "Armado de estructura metálica suspendida, emplacado de drywall en cielo raso y acabado fino.", unit: "$15,00", total: "Según medición" },
      { type: "m2", qty: "Por m²", title: "Instalación de estructura, láminas, encamisado y lijado (Pared)", sub: "Estructura portante galvanizada (parales y canales), emplacado de tabiquería drywall y juntas.", unit: "$18,00", total: "Según medición" },
      { type: "m2", qty: "Por m²", title: "Mano de obra de pintura (2 manos de pintura)", sub: "Aplicación profesional a 2 manos con acabado uniforme, recortes limpios y protección.", unit: "$5,00", total: "Según medición" },
      { type: "m2", qty: "Por m²", title: "Mano de obra de pasta en pared de cemento (Fondo Antialcalino + Lijado)", sub: "Sellado con fondo antialcalino, empastado profesional y lijado fino listo para pintar.", unit: "$6,00", total: "Según medición" },
      { type: "m2", qty: "Por m²", title: "Mano de obra cielo raso en PVC", sub: "Montaje de perimetrales y fijación de paneles machihembrados de PVC de alta durabilidad.", unit: "$9,00", total: "Según medición" },
      { type: "m2", qty: "Por m²", title: "Mano de obra Wall Panel (Revestimiento WPC)", sub: "Instalación y nivelación de paneles acanalados decorativos para muros arquitectónicos.", unit: "$9,00", total: "Según medición" }
    ]
  },
  ventanas: {
    client: "Refinería",
    location: "Instalaciones Industriales — Edo. Carabobo",
    attention: "Gerencia de Compras, Infraestructura & Procura",
    subject: "Fabricación e Instalación de 7 Ventanas Panorámicas (0,80 × 1,00 m)",
    number: "COT-2026-1022",
    date: "22/10/2026",
    notes: "Precios sujetos a confirmación de vanos. Incluye mano de obra calificada, sellado e instalación completa.",
    items: [
      { type: "fixed", qty: "7 u. (5,60 m²)", title: "Ventana Panorámica de Aluminio (Sistema 2 Canales)", sub: "0,80 m x 1,00 m con vidrio laminado 6 mm, canto pulido al diamante, ruedas y tranca tic-tac.", unit: "$160,00", total: "$1.120,00" },
      { type: "fixed", qty: "Opcional", title: "Mano de obra especializada (si el cliente suministra material)", sub: "Corte, manufactura, armado, acristalado e instalación en vanos a $50,00 c/u.", unit: "$50,00", total: "$350,00" }
    ]
  },
  blank: {
    client: "Nombre del Cliente / Empresa",
    location: "Valencia, Edo. Carabobo",
    attention: "Departamento de Obras / Proyectos",
    subject: "Descripción del Proyecto o Servicio",
    number: "COT-2026-" + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toLocaleDateString('es-ES'),
    notes: "Los servicios especificados \"Por m²\" se liquidarán según medición final en obra de común acuerdo entre las partes.",
    items: [
      { type: "fixed", qty: "1 u.", title: "Descripción del Servicio o Producto", sub: "Especificación técnica y alcance del trabajo.", unit: "$100,00", total: "$100,00" }
    ]
  }
};

// Estado reactivo en memoria
let currentBudget = JSON.parse(JSON.stringify(officialTemplates.tiesto));

// ==========================================================================
// 4. SINCRONIZACIÓN DUAL: VISTA MÓVIL (CARDS) Y VISTA OFICIAL (HOJA CARTA)
// ==========================================================================

// Parsear número monetario
function parseMoney(str) {
  if (!str) return 0;
  const cleaned = str.replace(/[^0-9,\.]/g, '');
  if (cleaned.includes(',')) {
    return parseFloat(cleaned.replace(/\./g, '').replace(',', '.')) || 0;
  }
  return parseFloat(cleaned) || 0;
}

// Formatear a moneda $ USD (ej: $660,00 USD)
function formatUSD(num) {
  return "$" + num.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " USD";
}

// Sincronizar datos del cliente desde los inputs de la vista móvil
function syncFromMobileInputs() {
  currentBudget.client = document.getElementById("mClientName").value;
  currentBudget.location = document.getElementById("mClientLocation").value;
  currentBudget.attention = document.getElementById("mClientAttention").value;
  currentBudget.subject = document.getElementById("mClientSubject").value;
  currentBudget.number = document.getElementById("mQuoteNumber").value;
  currentBudget.date = document.getElementById("mQuoteDate").value;

  // Actualizar vista Hoja Oficial
  document.getElementById("clientName").innerText = currentBudget.client;
  document.getElementById("clientLocation").innerText = currentBudget.location;
  document.getElementById("clientAttention").innerText = currentBudget.attention;
  document.getElementById("clientSubject").innerText = currentBudget.subject;
  document.getElementById("quoteNumber").innerText = currentBudget.number;
  document.getElementById("quoteDate").innerText = currentBudget.date;
}

// Sincronizar datos del cliente desde la hoja oficial (contenteditable)
function syncFromPaperInputs() {
  currentBudget.client = document.getElementById("clientName").innerText;
  currentBudget.location = document.getElementById("clientLocation").innerText;
  currentBudget.attention = document.getElementById("clientAttention").innerText;
  currentBudget.subject = document.getElementById("clientSubject").innerText;
  currentBudget.number = document.getElementById("quoteNumber").innerText;
  currentBudget.date = document.getElementById("quoteDate").innerText;

  // Actualizar vista móvil
  document.getElementById("mClientName").value = currentBudget.client;
  document.getElementById("mClientLocation").value = currentBudget.location;
  document.getElementById("mClientAttention").value = currentBudget.attention;
  document.getElementById("mClientSubject").value = currentBudget.subject;
  document.getElementById("mQuoteNumber").value = currentBudget.number;
  document.getElementById("mQuoteDate").value = currentBudget.date;
}

// Renderizar filas en ambas vistas
function renderAllItems() {
  renderMobileCards();
  renderPaperTable();
  calculateTotals();
}

// Renderizar Tarjetas Móviles
function renderMobileCards() {
  const container = document.getElementById("mobileCardsList");
  if (!container) return;
  container.innerHTML = "";

  document.getElementById("mItemsCount").innerText = currentBudget.items.length;

  currentBudget.items.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "partida-card";
    card.setAttribute("data-index", index);

    const isMeter = item.type === 'm2' || item.total.toLowerCase().includes('medici') || item.qty.toLowerCase().includes('m²');

    card.innerHTML = `
      <div class="partida-card-header">
        <span class="partida-num-badge">Partida #${index + 1} — ${isMeter ? 'Por m²' : 'Fija'}</span>
        <button type="button" class="btn-m-del-row" onclick="deleteRow(${index})" title="Eliminar partida">
          🗑️ Quitar
        </button>
      </div>

      <div class="partida-card-grid">
        <div class="m-field partida-card-full">
          <label>Concepto / Título del Servicio:</label>
          <input type="text" class="m-input" value="${escapeHtml(item.title)}" oninput="updateItemField(${index}, 'title', this.value)" placeholder="Título del trabajo" />
        </div>

        <div class="m-field partida-card-full">
          <label>Especificación Técnica / Alcance:</label>
          <input type="text" class="m-input" value="${escapeHtml(item.sub)}" oninput="updateItemField(${index}, 'sub', this.value)" placeholder="Detalle técnico" />
        </div>

        <div class="m-field">
          <label>Cantidad / Medida:</label>
          <input type="text" class="m-input" value="${escapeHtml(item.qty)}" oninput="updateItemField(${index}, 'qty', this.value)" placeholder="Ej: 26,00 m² o 7 u." />
        </div>

        <div class="m-field">
          <label>Precio Unitario ($):</label>
          <input type="text" class="m-input" value="${escapeHtml(item.unit)}" oninput="updateItemField(${index}, 'unit', this.value)" placeholder="Ej: $15,00" />
        </div>

        <div class="m-field">
          <label>Tipo de Partida:</label>
          <select class="m-input" onchange="toggleItemType(${index}, this.value)">
            <option value="fixed" ${!isMeter ? 'selected' : ''}>Monto Fijo / Piezas</option>
            <option value="m2" ${isMeter ? 'selected' : ''}>Por m² (Según medición)</option>
          </select>
        </div>

        <div class="m-field">
          <label>Total Partida ($):</label>
          <input type="text" class="m-input" value="${escapeHtml(item.total)}" oninput="updateItemField(${index}, 'total', this.value)" ${isMeter ? 'readonly' : ''} />
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// Renderizar Tabla Oficial de la Hoja
function renderPaperTable() {
  const tbody = document.getElementById("officialItemsBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  currentBudget.items.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="col-center">
        <span class="table-row-qty" contenteditable="true" oninput="updateItemFromPaper(${index}, 'qty', this.innerText)">${escapeHtml(item.qty)}</span>
      </td>
      <td>
        <div class="table-desc-title" contenteditable="true" oninput="updateItemFromPaper(${index}, 'title', this.innerText)">${escapeHtml(item.title)}</div>
        <div class="table-desc-sub" contenteditable="true" oninput="updateItemFromPaper(${index}, 'sub', this.innerText)">${escapeHtml(item.sub)}</div>
      </td>
      <td class="col-right">
        <div class="table-row-price" contenteditable="true" oninput="updateItemFromPaper(${index}, 'unit', this.innerText)">${escapeHtml(item.unit)}</div>
      </td>
      <td class="col-right">
        <div class="table-row-total" contenteditable="true" oninput="updateItemFromPaper(${index}, 'total', this.innerText)">${escapeHtml(item.total)}</div>
      </td>
      <td class="col-center no-print">
        <button type="button" class="btn-del-row" onclick="deleteRow(${index})" title="Quitar línea">
          🗑️
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Actualizar campo desde vista móvil
function updateItemField(index, field, value) {
  if (currentBudget.items[index]) {
    currentBudget.items[index][field] = value;
    // Si cambia cantidad o unitario en fija, calcular total automáticamente si es numérico
    if (currentBudget.items[index].type === 'fixed' && (field === 'qty' || field === 'unit')) {
      const q = parseMoney(currentBudget.items[index].qty);
      const u = parseMoney(currentBudget.items[index].unit);
      if (q > 0 && u > 0) {
        currentBudget.items[index].total = formatUSD(q * u).replace(' USD', '');
      }
    }
    renderPaperTable();
    calculateTotals();
  }
}

// Alternar tipo de partida
function toggleItemType(index, type) {
  if (currentBudget.items[index]) {
    currentBudget.items[index].type = type;
    if (type === 'm2') {
      currentBudget.items[index].qty = 'Por m²';
      currentBudget.items[index].total = 'Según medición';
    } else {
      if (currentBudget.items[index].qty === 'Por m²') currentBudget.items[index].qty = '1 u.';
      if (currentBudget.items[index].total === 'Según medición') currentBudget.items[index].total = '$0,00';
    }
    renderAllItems();
  }
}

// Actualizar campo desde la hoja oficial (contenteditable)
function updateItemFromPaper(index, field, value) {
  if (currentBudget.items[index]) {
    currentBudget.items[index][field] = value.trim();
    // Actualizar input correspondiente en vista móvil sin re-renderizar todo
    const mInput = document.querySelector(`.partida-card[data-index="${index}"] input[value]`);
    renderMobileCards();
    calculateTotals();
  }
}

// Agregar fila nueva
function addNewRow(type = 'm2') {
  if (type === 'fixed') {
    currentBudget.items.push({
      type: 'fixed',
      qty: '1 u.',
      title: 'Nuevo suministro o trabajo contratado',
      sub: 'Especifique aquí el alcance del trabajo o especificación técnica.',
      unit: '$0,00',
      total: '$0,00'
    });
  } else {
    currentBudget.items.push({
      type: 'm2',
      qty: 'Por m²',
      title: 'Nuevo servicio de mano de obra especializada',
      sub: 'Especifique aquí el alcance del trabajo o especificación técnica.',
      unit: '$0,00',
      total: 'Según medición'
    });
  }
  renderAllItems();

  // Scroll suave al último elemento
  setTimeout(() => {
    const cards = document.querySelectorAll('.partida-card');
    if (cards.length > 0) {
      cards[cards.length - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, 100);
}

// Eliminar fila
function deleteRow(index) {
  if (currentBudget.items.length <= 1) {
    alert('El presupuesto debe contener al menos una partida. Puedes editar su contenido libremente.');
    return;
  }
  currentBudget.items.splice(index, 1);
  renderAllItems();
}

// ==========================================================================
// 5. CÁLCULO FINANCIERO Y RESUMEN DE TOTALES
// ==========================================================================

function calculateTotals() {
  let fixedSum = 0;
  let hasMeterRows = false;

  currentBudget.items.forEach(it => {
    const t = (it.total || '').toLowerCase();
    if (t.includes('medici') || it.qty.toLowerCase().includes('m²') || it.type === 'm2') {
      hasMeterRows = true;
    } else {
      const num = parseMoney(it.total);
      if (num > 0) fixedSum += num;
    }
  });

  const fixedFormatted = formatUSD(fixedSum);
  const anticipo60 = formatUSD(fixedSum * 0.6);

  // Actualizar Hoja Oficial
  const valSubtotal = document.getElementById("valSubtotalFijo");
  const valAnt = document.getElementById("valAnticipo");
  const valTot = document.getElementById("valTotalFijo");
  const noteEl = document.getElementById("totalNote");

  if (valSubtotal) valSubtotal.innerText = fixedFormatted;
  if (valAnt) valAnt.innerText = anticipo60;
  if (valTot) valTot.innerText = fixedFormatted;

  // Actualizar Vista Móvil
  const mSub = document.getElementById("mValSubtotalFijo");
  const mAnt = document.getElementById("mValAnticipo");
  const mTot = document.getElementById("mValTotalFijo");
  const mNote = document.getElementById("mTotalNote");

  if (mSub) mSub.innerText = fixedFormatted;
  if (mAnt) mAnt.innerText = anticipo60;
  if (mTot) mTot.innerText = fixedFormatted;

  let noteText = "";
  if (hasMeterRows && fixedSum > 0) {
    noteText = "+ Partidas por m² según metraje final en obra";
  } else if (hasMeterRows && fixedSum === 0) {
    noteText = "Total a liquidar según medición final en obra";
  } else {
    noteText = "Monto Total Neto de Partidas Contratadas";
  }

  if (noteEl) noteEl.innerText = noteText;
  if (mNote) mNote.innerText = noteText;
}

// ==========================================================================
// 6. CARGAR PLANTILLAS, BORRADORES Y COMPARTIR A WHATSAPP
// ==========================================================================

function loadTemplate(key) {
  const tpl = officialTemplates[key] || officialTemplates.blank;
  currentBudget = JSON.parse(JSON.stringify(tpl));
  
  // Refrescar inputs
  document.getElementById("mClientName").value = currentBudget.client;
  document.getElementById("mClientLocation").value = currentBudget.location;
  document.getElementById("mClientAttention").value = currentBudget.attention;
  document.getElementById("mClientSubject").value = currentBudget.subject;
  document.getElementById("mQuoteNumber").value = currentBudget.number;
  document.getElementById("mQuoteDate").value = currentBudget.date;

  document.getElementById("clientName").innerText = currentBudget.client;
  document.getElementById("clientLocation").innerText = currentBudget.location;
  document.getElementById("clientAttention").innerText = currentBudget.attention;
  document.getElementById("clientSubject").innerText = currentBudget.subject;
  document.getElementById("quoteNumber").innerText = currentBudget.number;
  document.getElementById("quoteDate").innerText = currentBudget.date;
  if (currentBudget.notes) {
    document.getElementById("notesText").innerText = currentBudget.notes;
  }

  renderAllItems();
}

function clearTable() {
  loadTemplate('blank');
}

// Guardar borrador en LocalStorage
function saveToStorage() {
  syncFromMobileInputs();
  currentBudget.notes = document.getElementById("notesText").innerText;
  localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(currentBudget));
  alert('¡Presupuesto guardado exitosamente en este dispositivo! Puedes recuperarlo o continuar editándolo cuando gustes.');
}

// Cargar borrador previo si existe
function loadSavedDraft() {
  const saved = localStorage.getItem(STORAGE_KEY_DRAFT);
  if (saved) {
    try {
      const data = JSON.parse(saved);
      if (data && data.items && data.items.length > 0) {
        currentBudget = data;
        document.getElementById("mClientName").value = currentBudget.client || '';
        document.getElementById("mClientLocation").value = currentBudget.location || '';
        document.getElementById("mClientAttention").value = currentBudget.attention || '';
        document.getElementById("mClientSubject").value = currentBudget.subject || '';
        document.getElementById("mQuoteNumber").value = currentBudget.number || '';
        document.getElementById("mQuoteDate").value = currentBudget.date || '';

        document.getElementById("clientName").innerText = currentBudget.client || '';
        document.getElementById("clientLocation").innerText = currentBudget.location || '';
        document.getElementById("clientAttention").innerText = currentBudget.attention || '';
        document.getElementById("clientSubject").innerText = currentBudget.subject || '';
        document.getElementById("quoteNumber").innerText = currentBudget.number || '';
        document.getElementById("quoteDate").innerText = currentBudget.date || '';
        if (currentBudget.notes) document.getElementById("notesText").innerText = currentBudget.notes;

        renderAllItems();
        return;
      }
    } catch (e) {
      console.warn('Error cargando borrador previo:', e);
    }
  }
  loadTemplate('tiesto');
}

// Compartir resumen estructurado a WhatsApp
function shareViaWhatsApp() {
  syncFromMobileInputs();
  let msg = `*CRISTALERÍA ESTEBAN PALMA*\n`;
  msg += `*Presupuesto Oficial:* ${currentBudget.number}\n`;
  msg += `*Fecha:* ${currentBudget.date}\n`;
  msg += `*Cliente:* ${currentBudget.client}\n`;
  msg += `*Ubicación:* ${currentBudget.location}\n`;
  msg += `*Objeto:* ${currentBudget.subject}\n\n`;
  msg += `*DETALLE DE PARTIDAS Y SERVICIOS:*\n`;

  currentBudget.items.forEach((it, i) => {
    msg += `\n${i + 1}. *${it.title}*\n`;
    if (it.sub) msg += `   _${it.sub}_\n`;
    msg += `   • Cantidad: ${it.qty} | P.U: ${it.unit} | *Total: ${it.total}*\n`;
  });

  const subtotal = document.getElementById("valSubtotalFijo").innerText;
  const anticipo = document.getElementById("valAnticipo").innerText;
  const totalFijo = document.getElementById("valTotalFijo").innerText;
  const note = document.getElementById("totalNote").innerText;

  msg += `\n------------------------------\n`;
  msg += `*SUBTOTAL PARTIDAS FIJAS:* ${subtotal}\n`;
  msg += `*ANTICIPO REQUERIDO (60%):* ${anticipo}\n`;
  msg += `*TOTAL GENERAL FIJO:* ${totalFijo}\n`;
  msg += `_(${note})_\n\n`;
  msg += `*Condiciones:* Moneda Dólares ($ USD). Anticipo del 60% para inicio; saldo por valuaciones o culminación.\n`;
  msg += `*Atención:* Esteban Palma | 📲 0414-4354565 / 0412-8878391`;

  const waUrl = `https://wa.me/?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}

// Switch de vista en Móvil (Editor vs Paper)
function switchView(view) {
  const btnEd = document.getElementById("btnViewEditor");
  const btnPa = document.getElementById("btnViewPaper");
  const secEd = document.getElementById("mobileEditorView");
  const secPa = document.getElementById("paperPreviewView");

  if (view === 'paper') {
    btnPa.classList.add('active');
    btnEd.classList.remove('active');
    secEd.style.display = 'none';
    secPa.style.display = 'flex';
  } else {
    btnEd.classList.add('active');
    btnPa.classList.remove('active');
    secEd.style.display = 'flex';
    secPa.style.display = 'none';
  }
}

// Escuchar cambios en la Hoja Oficial para sincronizar
function initPaperListeners() {
  const editableIds = ["clientName", "clientLocation", "clientAttention", "clientSubject", "quoteNumber", "quoteDate"];
  editableIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', syncFromPaperInputs);
    }
  });
}

// ==========================================================================
// 7. INICIALIZACIÓN AL CARGAR LA PÁGINA
// ==========================================================================

document.addEventListener('DOMContentLoaded', async () => {
  await initSecurityCredentials();
  initAuthEvents();
  initPaperListeners();
  loadSavedDraft();
  checkSession();
});
