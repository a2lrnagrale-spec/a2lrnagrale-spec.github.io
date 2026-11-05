function dashboard() { const month = getMonth(new Date().getMonth() >= 3 ? new Date().getMonth() - 3 : 9); const attendance = totalAttendance(month); const rice = closing(month, 'rice'); return `<section class="hero"><div><div class="eyebrow">शैक्षणिक वर्ष ${state.profile.startYear} - ${Number(state.profile.startYear) + 1}</div><h1 class="page-title">नमस्कार, ${state.profile.schoolName || 'आपली शाळा'}</h1><p class="page-subtitle">शाळेची माहिती आणि आहार व्यवस्थापनाचा आढावा</p></div><div class="hero-actions"><button class="secondary" id="backupButton">↓ बॅकअप</button><button class="primary" data-view="month" data-month="${state.activeMonth}" data-class="primary">+ आजची नोंद</button></div></section><section class="class-switch"><div class="class-card primary"><div><h2>इयत्ता १ ते ५</h2><p>${state.profile.standard || 'प्राथमिक विभागाची स्वतंत्र नोंदवही'}</p></div><button class="primary" data-view="classes15" data-class="primary">पेज उघडा →</button></div><div class="class-card upper"><div><h2>इयत्ता ६ ते ८</h2><p>उच्च प्राथमिक विभागाची स्वतंत्र नोंदवही</p></div><button class="secondary" data-view="classes68" data-class="upper">पेज उघडा →</button></div></section><section class="metrics"><div class="metric-card"><div class="metric-top"><span>या महिन्याची उपस्थिती</span><span class="metric-icon">◉</span></div><div class="metric-value">${format(attendance)}</div><div class="metric-note good">ताटे नोंदवलेली</div></div><div class="metric-card"><div class="metric-top"><span>तांदूळ शिल्लक</span><span class="metric-icon orange">◒</span></div><div class="metric-value">${format(rice)} <small>कि.ग्रॅ.</small></div><div class="metric-note">उपलब्ध साठा</div></div><div class="metric-card"><div class="metric-top"><span>केंद्र</span><span class="metric-icon">⌂</span></div><div class="metric-value">${state.profile.centerName || '-'}</div><div class="metric-note">शाळेची माहिती</div></div><div class="metric-card"><div class="metric-top"><span>लाभार्थी पट</span><span class="metric-icon orange">♧</span></div><div class="metric-value">${format(Math.max(...month.days.map(day => Number(day.strength || 0)), 0))}</div><div class="metric-note">कमाल वर्गसंख्या</div></div></section><section class="panel table-panel"><div class="panel-heading"><div><h2 class="panel-title">शाळेची माहिती</h2><div class="panel-kicker">नोंदवहीचा मूलभूत तपशील</div></div><button class="secondary" id="editProfile">संपादन</button></div><div class="empty-note"><b>${state.profile.schoolName || 'शाळेचे नाव नमूद करा'}</b><br>${state.profile.centerName || 'केंद्राचे नाव नमूद करा'} · ${state.profile.standard || 'इयत्ता नमूद करा'}<br><br>मान्यताप्राप्त स्वयंपाकी / मदतनीस: <b>${state.profile.cooks}</b></div></section>`; }
const dashboardBase = dashboard;
function homeView() { const cards = ''; const schoolDetails = `<section class="panel school-details"><div class="panel-heading"><div><h2 class="panel-title">शाळेची माहिती</h2><div class="panel-kicker">मुख्याध्यापक आणि वर्गनिहाय पटसंख्या</div></div></div><div class="school-detail-grid"><div><span>मुख्याध्यापक</span><b>${state.profile.headmaster}</b></div><div><span>इयत्ता १ ते ५ पटसंख्या</span><b>${state.profile.primaryStrength} विद्यार्थी</b></div><div><span>इयत्ता ६ ते ८ पटसंख्या</span><b>${state.profile.upperStrength} विद्यार्थी</b></div></div></section>`; const schoolName = state.profile.schoolName || 'आपली शाळा'; return dashboardBase().replace('<section class="hero">', '<section class="hero home-hero">').replace('नमस्कार, ' + schoolName, 'नमस्कार,<br><span class="school-name">' + schoolName + '</span>').replace('<section class="class-switch">', schoolDetails + '<section class="class-switch">'); }
dashboard = homeView;
const originalDashboardHomeView = dashboard;
dashboard = function() {
  const primaryStrength = Number(state.profile.primaryStrength || 0);
  const upperStrength = Number(state.profile.upperStrength || 0);
  const totalStrength = primaryStrength + upperStrength;
  return originalDashboardHomeView()
    .replace('नमस्कार,<br>', '')
    .replace('शाळेची माहिती आणि आहार व्यवस्थापनाचा आढावा', `इयत्ता १ ते ५ : ${format(primaryStrength)} विद्यार्थी  ·  इयत्ता ६ ते ८ : ${format(upperStrength)} विद्यार्थी  ·  एकूण पटसंख्या : ${format(totalStrength)} विद्यार्थी`);
};
function classes15View() { state.activeClass = CLASS_GROUPS.primary; const output = classes68View(); state.activeClass = CLASS_GROUPS.primary; return output.replaceAll('इयत्ता ६ ते ८', 'इयत्ता १ ते ५').replaceAll('UPPER PRIMARY', 'PRIMARY').replaceAll('upper', 'primary').replaceAll('इयत्ता ६ वी ते ८ वी', 'इयत्ता १ ली ते ५ वी'); }
const MONTHS = [
  ['एप्रिल', 3], ['मे', 4], ['जून', 5], ['जुलै', 6], ['ऑगस्ट', 7], ['सप्टेंबर', 8],
  ['ऑक्टोबर', 9], ['नोव्हेंबर', 10], ['डिसेंबर', 11], ['जानेवारी', 0], ['फेब्रुवारी', 1], ['मार्च', 2]
];
const CLASS_GROUPS = { primary: '1-5', upper: '6-8' };
const ITEMS = [
  ['rice', 'तांदूळ'], ['moongDal', 'मूगडाळ'], ['toorDal', 'तूरडाळ'], ['masoorDal', 'मसूरडाळ'],
  ['matki', 'मटकी'], ['moong', 'मूग'], ['chavli', 'चवळी'], ['harbhara', 'हरभरा'],
  ['vatana', 'वाटाणा'], ['jeera', 'जिरे'], ['mohari', 'मोहरी'], ['haldi', 'हळद'],
  ['masala', 'गरम मसाला'], ['soybeanOil', 'सोयाबीन तेल'], ['salt', 'मीठ'],
  ['mirchiPowder', 'तिखट'], ['vegetables', 'भाजीपाला'], ['kandaLasunChatani', 'कांदा लसूण चटणी'], ['soybeanWadi', 'सोयाबीन वडी']
];
// Raw grams per student from the recipe tables; their note applies vegetables to all 12 recipes.
const COMMON_RECIPE_RATES_G = { soybeanOil: 5, salt: 2, haldi: .2, masala: .2, mirchiPowder: .9, mohari: .2, vegetables: 50 };
const RECIPE_INGREDIENTS_G = {
  'moong-dal-khichdi': { rice: 100, moongDal: 20, ...COMMON_RECIPE_RATES_G },
  'whole-moong-toor-varan': { rice: 100, moong: 10, toorDal: 10, ...COMMON_RECIPE_RATES_G },
  'matki-usal': { rice: 100, matki: 20, ...COMMON_RECIPE_RATES_G },
  'vatana-pulao': { rice: 100, vatana: 20, ...COMMON_RECIPE_RATES_G },
  'soybean-wadi-pulao': { rice: 100, soybeanWadi: 20, ...COMMON_RECIPE_RATES_G },
  'chana-pulao': { rice: 100, harbhara: 20, ...COMMON_RECIPE_RATES_G },
  'masoor-pulao': { rice: 100, masoorDal: 20, ...COMMON_RECIPE_RATES_G },
  'chavli-khichdi': { rice: 100, chavli: 20, ...COMMON_RECIPE_RATES_G }
};
const COST_PER_STUDENT = { primary: 2.59, upper: 3.88 };
function costRateForActiveClass() { return state.activeClass === CLASS_GROUPS.upper ? COST_PER_STUDENT.upper : COST_PER_STUDENT.primary; }
const CURRENT_MONTH_STOCK = {
  rice: [294, 213], moongDal: [9.5, 7], toorDal: [3, 2], masoorDal: [5, 3.5], matki: [5, 3.5],
  moong: [3, 2], chavli: [5, 3.5], harbhara: [5, 3.5], vatana: [18, 13], jeera: [0, 0],
  mohari: [.6, .4], haldi: [.6, .4], mirchiPowder: [2.5, 2], soybeanOil: [15, 11], salt: [6, 4],
  kandaLasunChatani: [0, 0], masala: [.6, .4], soybeanWadi: [6, 4.5]
};
const PRIMARY_AUGUST_OPENING_STOCK = {
  rice: 294, moongDal: 9.5, toorDal: 3, masoorDal: 5, matki: 5, moong: 3,
  chavli: 5, harbhara: 5, vatana: 18, jeera: 0, mohari: .6, haldi: .5,
  mirchiPowder: 2.5, soybeanOil: 5, salt: 6, kandaLasunChatani: 0, masala: .6, soybeanWadi: 6
};
const UPPER_AUGUST_OPENING_STOCK = {
  rice: 213, moongDal: 7, toorDal: 2, masoorDal: 3.5, matki: 3.5, moong: 2,
  chavli: 3.5, harbhara: 3.5, vatana: 13, jeera: 0, mohari: .4, haldi: .4,
  mirchiPowder: 2, soybeanOil: 11, salt: 4, kandaLasunChatani: 0, masala: .4, soybeanWadi: 4.5
};
const MENUS = [
  ['none', 'आजची पाककृती निवडा'],
  ['moong-khichdi', 'मूगडाळ खिचडी / भाजीपालायुक्त वरण-भात'],
  ['moong-shevga-varan-bhaat', 'अख्खा मूग व तूरडाळ शेवगा वरण-भात'],
  ['sprouts', 'मोड आलेली मटकी उसळ व भात'],
  ['vegetable-pulao', 'भाजीपालायुक्त वाटाणा पुलाव'],
  ['matar-pulao', 'मटार पुलाव / वाटाणा भाजी व भात'],
  ['soybean-pulao', 'सोयाबीन वडी पुलाव'],
  ['chana-pulao', 'हरभरा पुलाव'],
  ['masoor-pulao', 'मसूरडाळ पुलाव'],
  ['chavli-khichdi', 'चवळीची खिचडी / चवळी भाजी व भात'],
  ['masale-bhaat', 'मसाले भात / वाटाणा']
];
const MENU_RECIPES = {
  'moong-khichdi': 'moong-dal-khichdi',
  'moong-shevga-varan-bhaat': 'whole-moong-toor-varan',
  sprouts: 'matki-usal',
  'vegetable-pulao': 'vatana-pulao',
  'matar-pulao': 'vatana-pulao',
  'masale-bhaat': 'vatana-pulao',
  'soybean-pulao': 'soybean-wadi-pulao',
  'chana-pulao': 'chana-pulao',
  'masoor-pulao': 'masoor-pulao',
  'chavli-khichdi': 'chavli-khichdi'
};
const SAMPLE = { schoolName: 'जिल्हा परिषद उच्च प्राथमिक शाळा सिरोंजी', centerName: 'सिरोंजी', standard: '1 ली ते 5 वी', startYear: 2026, cooks: 2, helperCount: 2, helperRate: 2500, primaryStrength: 65, upperStrength: 40, headmaster: 'Mr. Atul Rameshrao Nagrale' };
const openingSample = { rice:131, moongDal:1.932, toorDal:1.072, masoorDal:1.34, matki:1.04, moong:1.018, chavli:.91, harbhara:1.44, vatana:21.088, jeera:0, mohari:.03, haldi:.355, masala:.03, soybeanOil:11.695, salt:4.518, mirchiPowder:3.878, soybeanWadi:0 };
const defaultState = { profile: SAMPLE, activeView: 'dashboard', activeMonth: 0, activeClass: CLASS_GROUPS.primary, months: {} };
let state;
try { state = JSON.parse(localStorage.getItem('mdm-state') || 'null') || defaultState; } catch { state = defaultState; localStorage.removeItem('mdm-state'); }
state.months = state.months && typeof state.months === 'object' ? state.months : {};
state.activeClass = state.activeClass || CLASS_GROUPS.primary;
state.profile = { ...SAMPLE, ...(state.profile || {}) };
Object.values(state.months).forEach(month => month.days?.forEach(day => { if (day.date) day.date = `${day.date.slice(0, 10)}T12:00:00`; }));
Object.entries(state.months).forEach(([key, month]) => {
  const defaultStrength = key.startsWith(`${CLASS_GROUPS.upper}-`) ? Number(state.profile.upperStrength || 40) : Number(state.profile.primaryStrength || 65);
  month.days?.forEach(day => { if (day.strength === undefined || day.strength === null) day.strength = defaultStrength; });
});
const app = document.getElementById('app');
const format = value => Number(value || 0).toLocaleString('en-IN', { maximumFractionDigits: 3 });
const WEEKDAYS_MR = ['रविवार', 'सोमवार', 'मंगळवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
function calendarDate(index, day) { return new Date(monthYear(index), MONTHS[index][1], day); }
const monthYear = index => index < 9 ? state.profile.startYear : state.profile.startYear + 1;
const daysInMonth = index => new Date(monthYear(index), MONTHS[index][1] + 1, 0).getDate();
function blankDay(index, day) { const date = calendarDate(index, day); const defaultStrength = state.activeClass === CLASS_GROUPS.upper ? Number(state.profile.upperStrength || 40) : Number(state.profile.primaryStrength || 65); return { date: `${monthYear(index)}-${String(MONTHS[index][1] + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T12:00:00`, strength: defaultStrength, attendance: 0, menu: 'none', dayStatus: 'working' }; }
function getMonth(index) {
  const key = `${state.activeClass}-${monthYear(index)}-${index}`;
  if (!state.months[key]) { state.months[key] = { days: Array.from({ length: daysInMonth(index) }, (_, i) => blankDay(index, i + 1)), opening: {}, receipt: {}, market: {}, reduction: {}, staff: [] }; if (index > 0) { const previous = getMonth(index - 1); ITEMS.forEach(([itemKey]) => { state.months[key].opening[itemKey] = closing(previous, itemKey); }); } }
  return state.months[key];
}
let cloudClient = null;
let cloudUser = null;
let cloudReady = false;
let cloudSaveTimer = null;
let cloudSaveInFlight = false;
let cloudSavePending = false;
let canEdit = false;
function seedCurrentMonthStock() { const currentIndex = new Date().getMonth() >= 3 ? new Date().getMonth() - 3 : new Date().getMonth() + 9; const previousClass = state.activeClass; [CLASS_GROUPS.primary, CLASS_GROUPS.upper].forEach(classGroup => { state.activeClass = classGroup; const month = getMonth(currentIndex); Object.entries(CURRENT_MONTH_STOCK).forEach(([key, [opening, receipt]]) => { if (month.opening[key] === undefined) month.opening[key] = opening; if (month.receipt[key] === undefined) month.receipt[key] = receipt; }); }); state.activeClass = previousClass; save(); }
function resetAllStockToZero() { Object.values(state.months).forEach(month => { ['opening', 'receipt', 'market', 'reduction'].forEach(type => { ITEMS.forEach(([key]) => { month[type][key] = 0; }); }); }); save(); }
function updatePrimaryAugustOpeningStock() { const previousClass = state.activeClass; state.activeClass = CLASS_GROUPS.primary; const august = getMonth(4); Object.assign(august.opening, PRIMARY_AUGUST_OPENING_STOCK); state.activeClass = previousClass; save(); }
updatePrimaryAugustOpeningStock();
function correctPrimaryRiceEntries() { const previousClass = state.activeClass; state.activeClass = CLASS_GROUPS.primary; const april = getMonth(0); const august = getMonth(4); april.opening.rice = 0; april.receipt.rice = 0; august.opening.rice = 294; august.receipt.rice = 0; state.activeClass = previousClass; save(); }
function updateUpperAugustOpeningStock() { const previousClass = state.activeClass; state.activeClass = CLASS_GROUPS.upper; const august = getMonth(4); Object.assign(august.opening, UPPER_AUGUST_OPENING_STOCK); state.activeClass = previousClass; save(); }
updateUpperAugustOpeningStock();
function correctUpperRiceEntries() { const previousClass = state.activeClass; state.activeClass = CLASS_GROUPS.upper; const april = getMonth(0); const august = getMonth(4); april.opening.rice = 0; april.receipt.rice = 0; august.opening.rice = 213; august.receipt.rice = 0; state.activeClass = previousClass; save(); }
if (!localStorage.getItem('mdm-stock-zeroed')) { resetAllStockToZero(); localStorage.setItem('mdm-stock-zeroed', 'true'); }

function setSyncStatus(message, mode = '') {
  const status = document.getElementById('syncStatus');
  const sidebarStatus = document.getElementById('sidebarStatus');
  if (status) {
    status.textContent = message;
    status.dataset.mode = mode;
  }
  if (sidebarStatus) sidebarStatus.textContent = message;
}

function scheduleCloudSave() {
  if (!canEdit || !cloudClient || !cloudReady) return;
  clearTimeout(cloudSaveTimer);
  setSyncStatus('बदल जतन होत आहेत…', 'saving');
  cloudSaveTimer = setTimeout(flushCloudSave, 450);
}

async function flushCloudSave() {
  if (!canEdit || !cloudClient || !cloudReady) return;
  if (cloudSaveInFlight) {
    cloudSavePending = true;
    return;
  }
  cloudSaveInFlight = true;
  const snapshot = JSON.parse(JSON.stringify(state));
  try {
    const { data, error } = await cloudClient
      .from('mdm_app_state')
      .update({ state: snapshot, updated_at: new Date().toISOString() })
      .eq('id', 'main')
      .select('id')
      .maybeSingle();
    if (error) throw error;
    if (!data) throw new Error('डेटाबेसने बदल स्वीकारले नाहीत. मालक UUID आणि RLS policy तपासा.');
    setSyncStatus('ऑनलाइन · जतन झाले', 'saved');
  } catch (error) {
    console.error('Cloud save failed:', error);
    setSyncStatus('ऑनलाइन जतन अयशस्वी', 'error');
    showToast(`ऑनलाइन जतन झाले नाही: ${error.message}`);
  } finally {
    cloudSaveInFlight = false;
    if (cloudSavePending) {
      cloudSavePending = false;
      scheduleCloudSave();
    }
  }
}

function save() {
  localStorage.setItem('mdm-state', JSON.stringify(state));
  scheduleCloudSave();
}

function loadCloudState(cloudState) {
  if (!cloudState || typeof cloudState !== 'object' || Array.isArray(cloudState)) {
    throw new Error('Supabase मधील dashboard data योग्य स्वरूपात नाही.');
  }
  state = { ...state, ...cloudState };
  state.months = state.months && typeof state.months === 'object' ? state.months : {};
  state.profile = { ...SAMPLE, ...(state.profile || {}) };
  state.activeClass = state.activeClass || CLASS_GROUPS.primary;
  Object.values(state.months).forEach(month => month.days?.forEach(day => {
    if (day.date) day.date = `${day.date.slice(0, 10)}T12:00:00`;
  }));
  localStorage.setItem('mdm-state', JSON.stringify(state));
}

function updateAccessUi() {
  canEdit = Boolean(
    cloudReady &&
    cloudUser &&
    window.MDM_SUPABASE_CONFIG?.ownerId &&
    cloudUser.id === window.MDM_SUPABASE_CONFIG.ownerId
  );
  const authButton = document.getElementById('authButton');
  const logoutButton = document.getElementById('logoutButton');
  if (authButton) {
    authButton.hidden = Boolean(cloudUser);
    authButton.textContent = cloudUser ? 'खाते' : 'लॉगिन';
    authButton.title = cloudUser?.email || 'लॉगिन';
  }
  if (logoutButton) logoutButton.hidden = !cloudUser;

  document.querySelectorAll('.day-input, .stock-input, .receipt-date, #profileForm input, #profileForm select, #profileForm button')
    .forEach(input => { input.disabled = !canEdit; });
  ['saveMonth', 'editProfile'].forEach(id => {
    const button = document.getElementById(id);
    if (button) button.hidden = !canEdit;
  });

  const notice = document.querySelector('.access-notice');
  if (!canEdit && !notice && document.getElementById('app')) {
    const banner = document.createElement('div');
    banner.className = 'access-notice';
    banner.textContent = !window.MDM_SUPABASE_CONFIG?.url || !window.MDM_SUPABASE_CONFIG?.anonKey || !window.MDM_SUPABASE_CONFIG?.ownerId
      ? 'ऑनलाइन database सेटअप पूर्ण झाल्यावर मालक लॉगिन करून बदल करू शकेल.'
      : cloudUser
      ? 'ही नोंद पाहण्यासाठी उपलब्ध आहे. बदल करण्यासाठी मालक खात्याने लॉगिन करा.'
      : 'फक्त-मालक संपादन सुरू करण्यासाठी मालक खात्याने लॉगिन करा.';
    document.getElementById('app').prepend(banner);
  } else if (canEdit && notice) {
    notice.remove();
  }
}

async function syncCloudSession(session) {
  cloudUser = session?.user || null;
  cloudReady = false;
  updateAccessUi();
  try {
    const { data, error } = await cloudClient
      .from('mdm_app_state')
      .select('state')
      .eq('id', 'main')
      .maybeSingle();
    if (error) throw error;

    if (data?.state) {
      loadCloudState(data.state);
    } else if (cloudUser?.id === window.MDM_SUPABASE_CONFIG.ownerId) {
      const { data: seededRow, error: seedError } = await cloudClient
        .from('mdm_app_state')
        .update({ state, updated_at: new Date().toISOString() })
        .eq('id', 'main')
        .select('id')
        .maybeSingle();
      if (seedError) throw seedError;
      if (!seededRow) throw new Error('प्रारंभिक data जतन झाले नाही. Supabase policy तपासा.');
    }

    cloudReady = true;
    updateAccessUi();
    render();
    if (data?.state) {
      setSyncStatus(canEdit ? 'ऑनलाइन · जतन झाले' : 'ऑनलाइन · फक्त वाचन', canEdit ? 'saved' : 'readonly');
    } else if (canEdit) {
      setSyncStatus('ऑनलाइन · पहिली नोंद जतन झाली', 'saved');
    } else {
      setSyncStatus('ऑनलाइन · मालकाची पहिली नोंद बाकी', 'readonly');
    }
  } catch (error) {
    console.error('Cloud sync failed:', error);
    cloudReady = false;
    updateAccessUi();
    render();
    setSyncStatus('ऑनलाइन जोडणी अयशस्वी', 'error');
    showToast(`डेटाबेस जोडता आला नाही: ${error.message}`);
  }
}

async function initializeCloud() {
  const config = window.MDM_SUPABASE_CONFIG;
  if (!config?.url || !config?.anonKey || !config?.ownerId) {
    setSyncStatus('Supabase सेटअप बाकी', 'error');
    render();
    return;
  }
  if (!window.supabase?.createClient) {
    setSyncStatus('Supabase library लोड झाली नाही', 'error');
    render();
    showToast('Supabase library लोड झाली नाही. इंटरनेट जोडणी तपासा.');
    return;
  }

  try {
    cloudClient = window.supabase.createClient(config.url, config.anonKey);
    const { data, error } = await cloudClient.auth.getSession();
    if (error) throw error;
    await syncCloudSession(data.session);
    cloudClient.auth.onAuthStateChange((event, session) => {
      if (event === 'INITIAL_SESSION') return;
      setTimeout(() => syncCloudSession(session), 0);
    });
  } catch (error) {
    console.error('Supabase initialization failed:', error);
    setSyncStatus('Supabase जोडणी अयशस्वी', 'error');
    render();
    showToast(`Supabase जोडता आले नाही: ${error.message}`);
  }
}
function carryForwardStock(index) {
  for (let nextIndex = index + 1; nextIndex < MONTHS.length; nextIndex += 1) {
    const current = getMonth(nextIndex - 1);
    const next = getMonth(nextIndex);
    ITEMS.forEach(([itemKey]) => { next.opening[itemKey] = closing(current, itemKey); });
  }
  save();
}
function totalAttendance(month) { return month.days.reduce((sum, day) => sum + Number(day.attendance || 0), 0); }
const PULSE_ITEM_KEYS = new Set(['moongDal', 'toorDal', 'masoorDal', 'matki', 'moong', 'chavli', 'harbhara', 'vatana', 'soybeanWadi']);
const LEGACY_MENU_LABELS = {
  'egg-pulao': 'अंडा पुलाव',
  'sweet-khichdi': 'गोड खिचडी',
  'nachni-satva': 'नाचणी सत्व'
};
const OTHER_RECIPE_ITEM_KEYS = new Set(['soybeanOil', 'salt', 'haldi', 'masala', 'mirchiPowder', 'mohari', 'vegetables']);
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]); }
function menuOptions(selectedMenu) {
  const options = MENUS.map(([value, label]) => `<option value="${value}" ${selectedMenu === value ? 'selected' : ''}>${label}</option>`);
  if (selectedMenu !== 'none' && !Object.hasOwn(MENU_RECIPES, selectedMenu)) {
    const label = LEGACY_MENU_LABELS[selectedMenu] || 'जुनी / अज्ञात पाककृती';
    options.push(`<option value="${escapeHtml(selectedMenu)}" selected>${label} — PDF प्रमाण उपलब्ध नाही</option>`);
  }
  return options.join('');
}
function ingredientUsage(cooked, keys) {
  return ITEMS.filter(([key]) => keys.has(key) && cooked[key] > 0)
    .map(([key, label]) => `${label} ${format(cooked[key])}`)
    .join(' · ') || '—';
}
function cookedForDay(day) {
  const cooked = Object.fromEntries(ITEMS.map(([key]) => [key, 0]));
  const plates = Number(day.dayStatus === 'working' || !day.dayStatus ? day.attendance || 0 : 0);
  const menu = day.menu || day.pulse || 'none';
  const recipeId = Object.hasOwn(MENU_RECIPES, menu) ? MENU_RECIPES[menu] : null;
  const recipe = recipeId ? RECIPE_INGREDIENTS_G[recipeId] : null;
  if (!plates || !recipe) return cooked;
  const classFactor = state.activeClass === CLASS_GROUPS.upper ? 1.5 : 1;
  Object.entries(recipe).forEach(([key, gramsPerStudent]) => {
    cooked[key] = plates * gramsPerStudent * classFactor / 1000;
  });
  return cooked;
}
function totalCooked(month, key) { return month.days.reduce((sum, day) => sum + cookedForDay(day)[key], 0); }
function stock(month, key) { return Number(month.opening[key] || 0) + Number(month.receipt[key] || 0) + Number(month.market[key] || 0) - Number(month.reduction[key] || 0); }
function closing(month, key) { return stock(month, key) - totalCooked(month, key); }
function showToast(message) { const toast = document.getElementById('toast'); toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2200); }
function navigate(view, month = state.activeMonth, classGroup = state.activeClass) { state.activeView = view; state.activeMonth = month; state.activeClass = classGroup; document.getElementById('sidebar').classList.remove('open'); save(); render(); }
function renderNav() { document.getElementById('monthNav').innerHTML = MONTHS.map(([name], i) => `<button class="month-link ${state.activeView === 'month' && i === state.activeMonth ? 'selected' : ''}" data-month="${i}">${name}</button>`).join(''); document.querySelectorAll('[data-view]').forEach(button => button.classList.toggle('active', button.dataset.view === state.activeView)); document.querySelectorAll('[data-month]').forEach(button => button.onclick = () => navigate('month', Number(button.dataset.month))); document.querySelectorAll('[data-view]').forEach(button => button.onclick = () => navigate(button.dataset.view)); }
function classes68View() { const month = getMonth(state.activeMonth); return `<section class="hero"><div><div class="eyebrow">स्वतंत्र विभाग / UPPER PRIMARY</div><h1 class="page-title">इयत्ता ६ ते ८</h1><p class="page-subtitle">या विभागासाठी स्वतंत्र मासिक नोंदी, साठा आणि अहवाल</p></div><div class="hero-actions"><button class="secondary" data-view="dashboard" data-class="primary">← इयत्ता १ ते ५</button><button class="primary" data-view="month" data-month="${state.activeMonth}" data-class="upper">+ आजची नोंद</button></div></section><section class="metrics"><div class="metric-card"><div class="metric-top"><span>या महिन्याची उपस्थिती</span><span class="metric-icon">◉</span></div><div class="metric-value">${format(totalAttendance(month))}</div><div class="metric-note">इयत्ता ६ ते ८</div></div><div class="metric-card"><div class="metric-top"><span>तांदूळ शिल्लक</span><span class="metric-icon orange">◒</span></div><div class="metric-value">${format(closing(month, 'rice'))} <small>कि.ग्रॅ.</small></div><div class="metric-note">स्वतंत्र विभागाचा साठा</div></div><div class="metric-card"><div class="metric-top"><span>मान्यताप्राप्त कर्मचारी</span><span class="metric-icon">♧</span></div><div class="metric-value">${state.profile.cooks}</div><div class="metric-note">शाळेच्या माहितीनुसार</div></div></section><section class="panel table-panel"><div class="panel-heading"><div><h2 class="panel-title">मासिक नोंदी</h2><div class="panel-kicker">इयत्ता ६ ते ८ साठी महिना निवडा</div></div></div><div class="table-scroll"><table class="data-table"><thead><tr><th>महिना</th><th>वर्ष</th><th>उपस्थिती</th><th>तांदूळ शिल्लक</th><th>प्रवेश</th></tr></thead><tbody>${MONTHS.map(([name], i) => { const m = getMonth(i); return `<tr><td>${name}</td><td>${monthYear(i)}</td><td>${format(totalAttendance(m))}</td><td class="calculated">${format(closing(m, 'rice'))} कि.ग्रॅ.</td><td><button class="secondary" data-view="month" data-month="${i}" data-class="upper">नोंद उघडा</button></td></tr>`; }).join('')}</tbody></table></div></section>`; }
function profileView() { return `<section class="hero"><div><div class="eyebrow">सेटिंग्ज / SCHOOL PROFILE</div><h1 class="page-title">शाळेची माहिती</h1><p class="page-subtitle">ही माहिती सर्व मासिक नोंदी आणि अहवालांमध्ये दिसेल.</p></div></section><section class="panel"><form class="setup-form" id="profileForm"><div class="field full"><label>शाळेचे नाव</label><input name="schoolName" value="${state.profile.schoolName || ''}" required></div><div class="field"><label>केंद्राचे नाव</label><input name="centerName" value="${state.profile.centerName || ''}"></div><div class="field"><label>इयत्ता</label><input name="standard" value="${state.profile.standard || ''}"></div><div class="field"><label>शैक्षणिक वर्ष सुरू</label><input type="number" name="startYear" value="${state.profile.startYear}" min="2020" max="2100"></div><div class="field"><label>मान्यताप्राप्त स्वयंपाकी / मदतनीस</label><input type="number" name="cooks" value="${state.profile.cooks}" min="1" max="20"></div><div class="form-actions"><button class="secondary" type="button" id="restoreButton">↑ बॅकअप पुनर्स्थापित करा</button><input type="file" id="restoreInput" accept="application/json" hidden><button class="primary">माहिती जतन करा</button></div></form></section>`; }
function monthView(index) {
  const month = getMonth(index);
  const year = monthYear(index);
  const standard = state.activeClass === CLASS_GROUPS.upper ? 'इयत्ता ६ वी ते ८ वी' : (state.profile.standard || 'इयत्ता १ ली ते ५ वी');
  const unmeasuredDays = month.days.filter(day => {
    const menu = day.menu || day.pulse || 'none';
    const plates = Number(day.dayStatus === 'working' || !day.dayStatus ? day.attendance || 0 : 0);
    return plates > 0 && menu !== 'none' && !Object.hasOwn(MENU_RECIPES, menu);
  }).length;
  const recipeWarning = unmeasuredDays
    ? `<div class="menu-rate-warning">${unmeasuredDays} जुन्या नोंदींचे पाककृती-प्रमाण PDF मध्ये नाही. त्या नोंदींचा साठा-वापर मोजलेला नाही; प्रमाण असलेली पाककृती निवडा.</div>`
    : '';
  const stockRows = ['opening', 'receipt', 'market', 'reduction'].map(type => {
    const labels = { opening: 'प्रारंभिक साठा', receipt: 'चालू प्राप्ती', market: 'बाजार खरेदी', reduction: 'कपात / नुकसान' };
    return `<tr><td>${labels[type]}</td>${ITEMS.map(([key]) => `<td><input class="stock-input" data-type="${type}" data-key="${key}" type="number" step="0.001" value="${month[type][key] ?? ''}"></td>`).join('')}</tr>`;
  }).join('');
  const ingredientHeaders = '<th>तांदूळ (कि.ग्रॅ.)</th><th>कडधान्य (कि.ग्रॅ.)</th><th>तेल, मसाले व भाजी (कि.ग्रॅ.)</th>';
  const dailyRows = month.days.map((day, i) => {
    const date = new Date(day.date);
    const cooked = cookedForDay(day);
    const pulseUse = [...PULSE_ITEM_KEYS].reduce((sum, key) => sum + cooked[key], 0);
    const selectedMenu = day.menu || day.pulse || 'none';
    return `<tr><td>${String(i + 1).padStart(2, '0')}-${MONTHS[index][0].slice(0, 3)}</td><td>${date.toLocaleDateString('mr-IN', { weekday: 'short' })}</td><td><input class="day-input" data-day="${i}" data-field="strength" type="number" min="0" value="${day.strength || ''}"></td><td><input class="day-input" data-day="${i}" data-field="attendance" type="number" min="0" max="${day.strength || 9999}" value="${day.attendance || ''}"></td><td><select class="day-input" data-day="${i}" data-field="dayStatus"><option value="working" ${(day.dayStatus || 'working') === 'working' ? 'selected' : ''}>कामकाजाचा दिवस</option><option value="sunday" ${day.dayStatus === 'sunday' ? 'selected' : ''}>रविवार</option><option value="holiday" ${day.dayStatus === 'holiday' ? 'selected' : ''}>सुट्टी</option></select></td><td><select class="day-input" data-day="${i}" data-field="menu">${menuOptions(selectedMenu)}</select></td><td class="calculated">${format(cooked.rice)}</td><td class="calculated" title="${ingredientUsage(cooked, PULSE_ITEM_KEYS)}">${format(pulseUse)}<small class="ingredient-detail">${ingredientUsage(cooked, PULSE_ITEM_KEYS)}</small></td><td class="ingredient-detail">${ingredientUsage(cooked, OTHER_RECIPE_ITEM_KEYS)}</td><td>${day.dayStatus === 'working' && day.attendance > 0 ? '<span class="pill">1</span>' : '0'}</td></tr>`;
  }).join('');
  return `<section class="hero"><div><div class="eyebrow">मासिक नोंद / ${year}</div><h1 class="page-title">${MONTHS[index][0]} <span class="pill">${year}</span></h1><p class="page-subtitle">${state.profile.schoolName || 'शाळेचे नाव'} · ${standard}</p></div><div class="hero-actions"><button class="secondary" id="printMonth">⎙ छापा</button><button class="primary" id="saveMonth">✓ नोंद जतन</button></div></section><section class="panel"><div class="panel-heading"><div><h2 class="panel-title">साठा सारांश</h2><div class="panel-kicker">सर्व प्रमाण कि.ग्रॅ. मध्ये</div></div></div><div class="table-scroll"><table class="data-table"><thead><tr><th>साठा प्रकार</th>${ITEMS.map(([, label]) => `<th>${label}</th>`).join('')}</tr></thead><tbody>${stockRows}<tr><td><b>एकूण उपलब्ध</b></td>${ITEMS.map(([key]) => `<td class="calculated">${format(stock(month, key))}</td>`).join('')}</tr></tbody></table></div></section><section class="panel table-panel"><div class="panel-heading"><div><h2 class="panel-title">दैनंदिन आहार नोंद</h2><div class="panel-kicker">PDF मधील प्रति-विद्यार्थी कच्च्या घटकांच्या प्रमाणानुसार वापर (कि.ग्रॅ.); इयत्ता ६ ते ८ साठी १.५ पट.</div></div><span class="pill">${totalAttendance(month)} ताटे</span></div>${recipeWarning}<div class="table-scroll"><table class="data-table"><thead><tr><th>दिनांक</th><th>वार</th><th>पट</th><th>ताटे</th><th>दिवसाचा प्रकार</th><th>आजची पाककृती</th>${ingredientHeaders}<th>दिवस</th></tr></thead><tbody>${dailyRows}</tbody></table></div></section>`;
}
function reportView(type) { const index = state.activeMonth; const month = getMonth(index); const label = type === 'annual' ? 'वार्षिक उपयोगिता' : type === 'stock' ? 'साठा नोंद' : type === 'rice' ? 'तांदूळ नोंद' : 'उपयोगिता अहवाल'; if (type === 'annual') return `<section class="hero"><div><div class="eyebrow">अहवाल / ANNUAL</div><h1 class="page-title">वार्षिक उपयोगिता</h1><p class="page-subtitle">एप्रिल ${state.profile.startYear} ते मार्च ${Number(state.profile.startYear) + 1}</p></div><div class="hero-actions"><button class="primary" onclick="window.print()">⎙ छापा</button></div></section>${annualTable()}`; return `<section class="hero"><div><div class="eyebrow">अहवाल / ${type === 'rice' ? 'RICE REGISTER' : 'MONTHLY SUMMARY'}</div><h1 class="page-title">${label}</h1><p class="page-subtitle">नोंदीतून तयार होणारा संक्षिप्त आढावा</p></div><div class="hero-actions"><select class="secondary" id="reportMonth">${MONTHS.map(([name], i) => `<option value="${i}" ${i === index ? 'selected' : ''}>${name} ${monthYear(i)}</option>`).join('')}</select><button class="primary" onclick="window.print()">⎙ छापा</button></div></section><section class="report-stat"><div><b>${format(totalAttendance(month))}</b><span>एकूण उपस्थिती / ताटे</span></div><div><b>${month.days.filter(d => d.attendance > 0).length}</b><span>अन्न शिजवलेले दिवस</span></div><div><b>${format(closing(month, 'rice'))}</b><span>तांदूळ शिल्लक कि.ग्रॅ.</span></div></section>${type === 'rice' ? riceTable(month) : summaryTable(month)}`; }
function summaryTable(month) { return `<section class="panel table-panel"><div class="panel-heading"><div><h2 class="panel-title">साठा हालचाल</h2><div class="panel-kicker">${MONTHS[state.activeMonth][0]} ${monthYear(state.activeMonth)}</div></div></div><div class="table-scroll"><table class="data-table"><thead><tr><th>वस्तू</th><th>प्रारंभिक</th><th>प्राप्ती</th><th>बाजार खरेदी</th><th>एकूण उपलब्ध</th><th>वापर</th><th>शिल्लक</th></tr></thead><tbody>${ITEMS.map(([key, name]) => `<tr><td>${name}</td><td>${format(month.opening[key])}</td><td>${format(month.receipt[key])}</td><td>${format(month.market[key])}</td><td class="calculated">${format(stock(month,key))}</td><td>${format(totalCooked(month,key))}</td><td class="calculated">${format(closing(month,key))}</td></tr>`).join('')}</tbody></table></div></section>`; }
function upyogitaPrintView() { const index = state.activeMonth; const month = getMonth(index); const rate = costRateForActiveClass(); const attendance = totalAttendance(month); const workingDays = month.days.filter(day => (day.dayStatus || 'working') === 'working').length; const cookedDays = month.days.filter(day => (day.dayStatus || 'working') === 'working' && day.attendance > 0).length; const helperCount = Number(state.profile.helperCount || 2); const helperRate = Number(state.profile.helperRate || 2500); const itemRows = ITEMS.filter(([key]) => key !== 'kandaLasunChatani').map(([key, name], itemIndex) => `<tr><td>${itemIndex + 1}</td><td>${name}</td><td>${format(month.opening[key])}</td><td>${format(month.receipt[key])}</td><td>${format(stock(month, key))}</td><td>${format(totalCooked(month, key))}</td><td>${format(closing(month, key))}</td><td></td><td></td></tr>`).join(''); return `<section class="upyogita-sheet"><div class="upyogita-toolbar"><div><div class="eyebrow">अहवाल / उपयोगिता</div><h1 class="page-title">मासिक उपयोगिता</h1></div><div class="hero-actions"><select class="secondary" id="reportMonth">${MONTHS.map(([name], i) => `<option value="${i}" ${i === index ? 'selected' : ''}>${name} ${monthYear(i)}</option>`).join('')}</select><button class="primary" onclick="window.print()">⎙ प्रिंट</button></div></div><div class="certificate-head"><h2>${state.profile.schoolName}</h2><div>केंद्र - <b>${state.profile.centerName}</b></div><div class="certificate-meta"><span>पट - <b>${state.activeClass === CLASS_GROUPS.upper ? state.profile.upperStrength : state.profile.primaryStrength}</b></span><span>महिना - <b>${MONTHS[index][0]}</b></span><span>वर्ष - <b>${monthYear(index)}</b></span></div></div><div class="upyogita-stats"><div>महिन्यातील एकूण उपस्थित विद्यार्थी<b>${format(attendance)}</b></div><div>एकूण कार्य दिवस<b>${workingDays}</b></div><div>अन्न शिजवून दिलेले दिवस<b>${cookedDays}</b></div></div><div class="table-scroll"><table class="upyogita-table"><thead><tr><th>अ.क्र.</th><th>वस्तूचे नाव</th><th>मागील शिल्लक वस्तू (कि.ग्रॅ.)</th><th>चालू महिन्यात प्राप्त वस्तू (कि.ग्रॅ.)</th><th>एकूण वस्तू (कि.ग्रॅ.)</th><th>रोजच्या वापरासाठी वाटप केलेल्या वस्तू (कि.ग्रॅ.)</th><th>शिल्लक वस्तू (कि.ग्रॅ.)</th><th>पुढील महिन्याची मागणी</th><th>शेरा</th></tr></thead><tbody>${itemRows}</tbody></table></div><div class="upyogita-bottom"><div>1) या महिन्यातील ताटांची संख्या - <b>${format(attendance)}</b></div><div>2) इंधन व भाजीपाल्यासाठी खर्च केलेले अनुदान - <b>₹${(attendance * rate).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</b> <small>(ताटांची संख्या × दर ₹${rate.toFixed(2)})</small></div><div>3) स्वयंपाकी तथा मदतनीस मानधन रुपये - <b>₹${(helperCount * helperRate).toLocaleString('en-IN')}</b> <small>(${helperCount} मदतनीस × ₹${helperRate.toLocaleString('en-IN')})</small></div></div><p class="certificate-text">प्रमाणित करण्यात येते की वरील नमूद केलेली माहिती दैनंदिन नोंदवहीतून घेतलेली आहे. ती तपासली असून बरोबर आहे.</p><div class="signature-row"><span>स्वयंपाकी / मदतनीस</span><span>मुख्याध्यापक<br>${state.profile.headmaster}</span></div></section>`; }
const reportViewBase = reportView;
reportView = function(type) { const output = reportViewBase(type); if (type !== 'report') return output; const rate = costRateForActiveClass(); const attendance = totalAttendance(getMonth(state.activeMonth)); const total = attendance * rate; const helperCount = Number(state.profile.helperCount || 2); const helperRate = Number(state.profile.helperRate || 2500); const helperTotal = helperCount * helperRate; const costPanel = `<section class="panel cost-panel"><div><span>प्रति विद्यार्थी खर्च</span><b>₹${rate.toFixed(2)}</b></div><div><span>एकूण उपस्थिती</span><b>${format(attendance)} विद्यार्थी</b></div><div><span>उपयोगिता खर्च</span><b>₹${total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></div><div><span>मदतनीस मानधन (${helperCount} × ₹${helperRate.toLocaleString('en-IN')})</span><b>₹${helperTotal.toLocaleString('en-IN')}</b></div></section>`; return output.replace('<section class="report-stat">', costPanel + '<section class="report-stat">'); };
function riceTable(month) { let running = Number(month.opening.rice || 0); return `<section class="panel table-panel"><div class="table-scroll"><table class="data-table"><thead><tr><th>दिनांक</th><th>पट</th><th>उपस्थिती</th><th>प्रारंभिक तांदूळ</th><th>प्राप्ती</th><th>तांदूळ वापर</th><th>शिल्लक</th></tr></thead><tbody>${month.days.map((day, i) => { const used = cookedForDay(day).rice; const opening = running; running += Number(month.receipt.rice || 0) / month.days.length - used; return `<tr><td>${i+1} ${MONTHS[state.activeMonth][0]}</td><td>${day.strength || 0}</td><td>${day.attendance || 0}</td><td>${format(opening)}</td><td>${format(Number(month.receipt.rice || 0) / month.days.length)}</td><td>${format(used)}</td><td class="calculated">${format(running)}</td></tr>`; }).join('')}</tbody></table></div></section>`; }
function annualTable() { const rows = MONTHS.map(([name], i) => { const m = getMonth(i); return `<tr><td>${name}</td><td>${monthYear(i)}</td><td>${format(totalAttendance(m))}</td><td>${format(Object.values(m.receipt).reduce((a,b)=>a+Number(b||0),0))}</td><td>${format(ITEMS.reduce((a,[key])=>a+totalCooked(m,key),0))}</td><td>${format(closing(m,'rice'))}</td></tr>`; }).join(''); return `<section class="panel table-panel"><div class="table-scroll"><table class="data-table"><thead><tr><th>महिना</th><th>वर्ष</th><th>लाभार्थी ताटे</th><th>एकूण प्राप्ती</th><th>एकूण वापर</th><th>तांदूळ शिल्लक</th></tr></thead><tbody>${rows}</tbody></table></div></section>`; }
function bind() { document.querySelectorAll('[data-view]').forEach(button => button.onclick = () => navigate(button.dataset.view, Number(button.dataset.month || state.activeMonth), button.dataset.class || state.activeClass)); const form = document.getElementById('profileForm'); if (form) form.onsubmit = event => { event.preventDefault(); const data = Object.fromEntries(new FormData(form)); state.profile = { ...state.profile, ...data, startYear: Number(data.startYear), cooks: Number(data.cooks) }; save(); showToast('शाळेची माहिती जतन झाली'); render(); }; const edit = document.getElementById('editProfile'); if (edit) edit.onclick = () => navigate('settings'); document.querySelectorAll('.day-input').forEach(input => input.onchange = event => { const month = getMonth(state.activeMonth); month.days[Number(input.dataset.day)][input.dataset.field] = input.type === 'number' ? Number(input.value) : input.value; if (input.dataset.field === 'attendance' && Number(input.value) > Number(month.days[Number(input.dataset.day)].strength || 0)) { input.value = month.days[Number(input.dataset.day)].strength; month.days[Number(input.dataset.day)].attendance = Number(input.value); showToast('ताटांची संख्या पटापेक्षा जास्त असू शकत नाही'); } save(); render(); }); document.querySelectorAll('.stock-input').forEach(input => input.onchange = () => { getMonth(state.activeMonth)[input.dataset.type][input.dataset.key] = input.value.trim() === '' ? 0 : Number(input.value); save(); render(); }); const profileBackup = document.getElementById('backupButton'); if (profileBackup) profileBackup.onclick = () => { const blob = new Blob([JSON.stringify(state, null, 2)], { type:'application/json' }); const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'mdm-backup.json'; link.click(); showToast('बॅकअप डाउनलोड झाला'); }; const restoreButton = document.getElementById('restoreButton'); const restoreInput = document.getElementById('restoreInput'); if (restoreButton && restoreInput) { restoreButton.onclick = () => restoreInput.click(); restoreInput.onchange = event => { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => { try { const imported = JSON.parse(reader.result); if (!imported.profile || !imported.months) throw new Error('Invalid backup'); state = { ...state, ...imported, activeClass: imported.activeClass || state.activeClass }; save(); render(); showToast('बॅकअप पुनर्स्थापित झाला'); } catch { showToast('बॅकअप फाइल योग्य नाही'); } }; reader.readAsText(file); }; } document.querySelectorAll('[data-month]').forEach(button => button.onclick = () => navigate('month', Number(button.dataset.month), button.dataset.class || state.activeClass)); const reportMonth = document.getElementById('reportMonth'); if (reportMonth) reportMonth.onchange = () => navigate(state.activeView, Number(reportMonth.value)); const saveMonth = document.getElementById('saveMonth'); if (saveMonth) saveMonth.onclick = () => { save(); showToast('मासिक नोंद जतन झाली'); }; const printMonth = document.getElementById('printMonth'); if (printMonth) printMonth.onclick = () => window.print(); }
function render() { const labels = { dashboard:'मुख्यपृष्ठ', classes15:'इयत्ता १ ते ५', classes68:'इयत्ता ६ ते ८', month: MONTHS[state.activeMonth][0], report:'उपयोगिता अहवाल', annual:'वार्षिक उपयोगिता', stock:'साठा नोंद', rice:'तांदूळ नोंद', settings:'सेटिंग्ज' }; document.getElementById('pageLabel').textContent = labels[state.activeView]; document.getElementById('today').textContent = new Date().toLocaleDateString('mr-IN', { day:'numeric', month:'long', year:'numeric' }); renderNav(); app.innerHTML = state.activeView === 'dashboard' ? dashboard() : state.activeView === 'classes15' ? classes15View() : state.activeView === 'classes68' ? (state.activeClass = CLASS_GROUPS.upper, classes68View()) : state.activeView === 'month' ? monthView(state.activeMonth) : state.activeView === 'settings' ? profileView() : reportView(state.activeView); bind(); }
document.addEventListener('change', event => { const input = event.target; if (input.matches('.day-input[data-field="dayStatus"]')) { const month = getMonth(state.activeMonth); const day = month.days[Number(input.dataset.day)]; if (day.dayStatus !== 'working') { day.attendance = 0; day.menu = 'none'; save(); render(); } } if (input.matches('.stock-input')) { carryForwardStock(state.activeMonth); save(); } });
document.addEventListener('change', event => { if (event.target.matches('.receipt-date')) { getMonth(state.activeMonth).receiptDate = event.target.value; save(); } });
document.addEventListener('click', event => { if (event.target.closest('#saveMonth')) { carryForwardStock(state.activeMonth); save(); showToast('मासिक नोंद जतन झाली'); } });
document.addEventListener('change', event => {
  if (!event.target.matches('#profileForm input') || !canEdit) return;
  const form = document.getElementById('profileForm');
  if (!form) return;
  const data = Object.fromEntries(new FormData(form));
  state.profile = { ...state.profile, ...data, startYear: Number(data.startYear), cooks: Number(data.cooks) };
  save();
  showToast('बदल आपोआप जतन झाला');
});

const authDialog = document.getElementById('authDialog');
const authForm = document.getElementById('authForm');
const authError = document.getElementById('authError');
document.getElementById('authButton').onclick = () => {
  authError.textContent = '';
  authDialog.showModal();
};
document.getElementById('closeAuthDialog').onclick = () => authDialog.close();
authForm.onsubmit = async event => {
  event.preventDefault();
  authError.textContent = '';
  const submitButton = document.getElementById('loginSubmit');
  submitButton.disabled = true;
  try {
    if (!cloudClient) throw new Error('प्रथम supabase-config.js मध्ये Supabase project माहिती भरा.');
    const formData = new FormData(authForm);
    const { error } = await cloudClient.auth.signInWithPassword({
      email: formData.get('email'),
      password: formData.get('password')
    });
    if (error) throw error;
    authDialog.close();
    authForm.reset();
  } catch (error) {
    console.error('Login failed:', error);
    authError.textContent = `लॉगिन झाले नाही: ${error.message}`;
  } finally {
    submitButton.disabled = false;
  }
};
document.getElementById('logoutButton').onclick = async () => {
  if (!cloudClient) return;
  const { error } = await cloudClient.auth.signOut();
  if (error) {
    console.error('Logout failed:', error);
    showToast(`लॉगआउट झाले नाही: ${error.message}`);
    return;
  }
  showToast('लॉगआउट झाले');
};

function correctDisplayedWeekdays() { if (state.activeView !== 'month') return; const rows = document.querySelectorAll('.table-panel .data-table tbody tr'); rows.forEach((row, index) => { const weekdayCell = row.cells[1]; if (weekdayCell) weekdayCell.textContent = WEEKDAYS_MR[calendarDate(state.activeMonth, index + 1).getDay()]; }); }
function bindReportClassSelector() { if (state.activeView !== 'report' || document.getElementById('reportClass')) return; const monthSelector = document.getElementById('reportMonth'); if (!monthSelector) return; const classSelector = document.createElement('select'); classSelector.id = 'reportClass'; classSelector.className = 'secondary'; classSelector.innerHTML = `<option value="primary" ${state.activeClass === CLASS_GROUPS.primary ? 'selected' : ''}>इयत्ता १ ते ५</option><option value="upper" ${state.activeClass === CLASS_GROUPS.upper ? 'selected' : ''}>इयत्ता ६ ते ८</option>`; classSelector.title = 'अहवालासाठी वर्ग निवडा'; classSelector.onchange = () => navigate('report', state.activeMonth, classSelector.value === 'upper' ? CLASS_GROUPS.upper : CLASS_GROUPS.primary); monthSelector.insertAdjacentElement('afterend', classSelector); }
function bindMonthClassSelector() { if (state.activeView !== 'month' || document.getElementById('monthClass')) return; const actions = document.querySelector('.hero-actions'); if (!actions) return; const classSelector = document.createElement('select'); classSelector.id = 'monthClass'; classSelector.className = 'secondary'; classSelector.innerHTML = `<option value="primary" ${state.activeClass === CLASS_GROUPS.primary ? 'selected' : ''}>इयत्ता १ ते ५</option><option value="upper" ${state.activeClass === CLASS_GROUPS.upper ? 'selected' : ''}>इयत्ता ६ ते ८</option>`; classSelector.title = 'मासिक नोंदीसाठी वर्ग निवडा'; classSelector.onchange = () => navigate('month', state.activeMonth, classSelector.value === 'upper' ? CLASS_GROUPS.upper : CLASS_GROUPS.primary); actions.insertBefore(classSelector, document.getElementById('printMonth')); }
const originalMonthView = monthView;
monthView = function(index) {
  const month = getMonth(index);
  return originalMonthView(index).replace(
    '<section class="panel"><div class="panel-heading">',
    `<section class="panel"><div class="field receipt-date-field"><label>नवीन stock प्राप्ती दिनांक</label><input class="receipt-date" type="date" value="${month.receiptDate || ''}"></div><div class="panel-heading">`
  );
};
const originalUpyogitaPrintView = upyogitaPrintView;
upyogitaPrintView = function() {
  const classLabel = state.activeClass === CLASS_GROUPS.upper ? 'इयत्ता ६ ते ८' : 'इयत्ता १ ते ५';
  const helperCount = Number(state.profile.helperCount || 2);
  const helperRate = Number(state.profile.helperRate || 2500);
  const helperTotal = helperCount * helperRate;
  const receiptDate = getMonth(state.activeMonth).receiptDate;
  const receiptDateLabel = receiptDate ? receiptDate.split('-').reverse().join('/') : '________';
  return originalUpyogitaPrintView()
    .replace('<div class="certificate-meta">', `<div class="certificate-meta"><span>विभाग - <b>${classLabel}</b></span><span>प्राप्ती दिनांक - <b>${receiptDateLabel}</b></span>`)
    .replace(/<div>3\).*?<\/div>/, `<div>3) स्वयंपाकी तथा मदतनीस मानधन रुपये - <b>₹${helperTotal.toLocaleString('en-IN')}</b></div>`)
    .replace(/<div class="signature-row">.*?<\/div>/, `<div class="signature-row"><span>मुख्याध्यापक<br>${state.profile.schoolName}</span></div>`);
};
const originalRender = render;
const reportFormatRender = render;
render = function() { originalRender(); if (state.activeView === 'report') { app.innerHTML = upyogitaPrintView(); bind(); } correctDisplayedWeekdays(); bindReportClassSelector(); bindMonthClassSelector(); updateAccessUi(); };
document.getElementById('menuToggle').onclick = event => { event.stopPropagation(); document.getElementById('sidebar').classList.toggle('open'); };
document.addEventListener('click', event => { const sidebar = document.getElementById('sidebar'); if (window.innerWidth <= 680 && sidebar.classList.contains('open') && !sidebar.contains(event.target)) sidebar.classList.remove('open'); });
document.getElementById('printButton').onclick = () => window.print();
initializeCloud();
