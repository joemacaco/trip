// 狀態管理
const state = {
  trips: [],
  selectedTrip: null,
  activeTab: 'itinerary', // overview, itinerary, stays, preparation
  filterType: 'all',
  selectedDayId: 1,
  checkedItems: {}, // 從 LocalStorage 載入
  showScrollTop: false
};

// 初始化：載入資料與設定事件
async function init() {
  try {
    const response = await fetch('./public/trips.json');
    if (!response.ok) throw new Error('讀取 trips.json 失敗');
    const data = await response.json();
    state.trips = data.trips;
    
    // 捲動監聽
    window.addEventListener('scroll', () => {
      const show = window.scrollY > 300;
      if (state.showScrollTop !== show) {
        state.showScrollTop = show;
        const btn = document.getElementById('scroll-top-btn');
        if (btn) {
          btn.style.opacity = show ? '1' : '0';
          btn.style.transform = show ? 'scale(1)' : 'scale(0)';
          btn.style.pointerEvents = show ? 'auto' : 'none';
        }
      }
    });

    render();
  } catch (err) {
    console.error(err);
    document.getElementById('app').innerHTML = `
      <div class="p-10 text-center bg-white min-h-screen flex flex-col items-center justify-center">
        <div class="text-red-500 text-5xl mb-4">⚠️</div>
        <h2 class="text-xl font-bold text-slate-800">資料載入錯誤</h2>
        <p class="text-slate-500 mt-2">${err.message}</p>
        <button onclick="location.reload()" class="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full">重試</button>
      </div>
    `;
  }
}

// 核心渲染函數
function render() {
  const app = document.getElementById('app');
  if (!state.selectedTrip) {
    app.innerHTML = renderTripList();
  } else {
    app.innerHTML = renderTripDetail();
  }
  if (window.lucide) lucide.createIcons();
}

function renderTripList() {
  return `
    <div class="max-w-4xl mx-auto px-4 py-12">
      <header class="text-center mb-16">
        <h1 class="text-5xl font-black text-slate-900 mb-4 tracking-tight">我的旅遊日誌</h1>
        <div class="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
      </header>
      <div class="grid gap-8 md:grid-cols-2">
        ${state.trips.map(trip => `
          <div onclick="selectTrip('${trip.id}')" class="bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all group border border-slate-100">
            <div class="h-56 bg-slate-200 relative overflow-hidden">
              <img src="${trip.coverImage}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div class="absolute bottom-6 left-6 text-white">
                <h2 class="text-2xl font-bold drop-shadow-lg">${trip.title}</h2>
                <p class="text-sm opacity-90 mt-1 font-medium">${trip.dates}</p>
              </div>
            </div>
            <div class="p-8">
              <div class="space-y-3 mb-8">
                ${trip.summary.map(s => `
                  <div class="flex items-center text-sm">
                    <span class="font-bold text-slate-400 w-20 uppercase tracking-tighter text-[10px]">${s.label}</span>
                    <span class="text-slate-700 font-bold">${s.text}</span>
                  </div>
                `).join('')}
              </div>
              <div class="flex justify-between items-center text-blue-600 font-black text-sm uppercase tracking-widest">
                <span>Explore Trip</span><i data-lucide="chevron-right" class="w-5 h-5"></i>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderTripDetail() {
  const trip = state.selectedTrip;
  return `
    <div class="min-h-screen bg-[#f4f7f6] flex flex-col">
      <header class="bg-white/90 backdrop-blur-xl sticky top-0 z-30 px-6 py-4 shadow-sm flex items-center justify-between border-b border-slate-100">
        <button onclick="backToList()" class="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors">
          <i data-lucide="arrow-left" class="w-6 h-6 text-slate-700"></i>
        </button>
        <h1 class="font-black text-slate-800 truncate px-4 text-lg">${trip.title}</h1>
        <div class="w-10"></div>
      </header>
      
      <main class="flex-1 max-w-2xl mx-auto w-full pb-32">
        ${renderActiveTab()}
      </main>

      <button id="scroll-top-btn" onclick="window.scrollTo({top:0, behavior:'smooth'})" 
        class="fixed right-6 bottom-28 z-50 p-4 bg-slate-900 text-white rounded-full shadow-2xl opacity-0 scale-0 transition-all">
        <i data-lucide="arrow-up" class="w-6 h-6"></i>
      </button>

      <nav class="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 p-2 z-40 pb-safe">
        <div class="max-w-md mx-auto flex justify-between gap-1">
          ${navItem('overview', 'info', '資訊')}
          ${navItem('itinerary', 'map', '行程')}
          ${navItem('stays', 'home', '住宿')}
          ${navItem('preparation', 'check-square', '準備')}
        </div>
      </nav>
    </div>
  `;
}

function navItem(id, icon, label) {
  const active = state.activeTab === id;
  return `
    <button onclick="setTab('${id}')" class="flex flex-col items-center flex-1 py-3 px-2 rounded-2xl transition-all ${active ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:bg-slate-50'}">
      <i data-lucide="${icon}" class="w-6 h-6 mb-1 ${active ? 'fill-blue-100' : ''}"></i>
      <span class="text-[11px] font-black tracking-tighter uppercase">${label}</span>
    </button>
  `;
}

function renderActiveTab() {
  const trip = state.selectedTrip;
  if (state.activeTab === 'overview') {
    return `
      <div class="p-6 space-y-6">
        <div class="bg-white rounded-3xl shadow-sm p-8 border border-slate-100">
          <h3 class="text-xl font-black text-slate-800 mb-6 flex items-center gap-3"><i data-lucide="users" class="text-blue-600"></i> 成員分組</h3>
          <div class="grid gap-4">
            ${trip.summary.map(s => `
              <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">${s.label}</p>
                <p class="text-slate-800 font-bold">${s.text}</p>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="bg-orange-50 rounded-3xl p-8 border border-orange-100">
          <h3 class="text-xl font-black text-orange-800 mb-6 flex items-center gap-3"><i data-lucide="alert-triangle"></i> 行前提醒</h3>
          <div class="space-y-4">
            ${trip.notices.map(n => `
              <div class="flex gap-4 p-4 ${n.type === 'warning' ? 'bg-white/60 text-red-700' : 'bg-white/60 text-blue-700'} rounded-2xl">
                <div class="w-1 bg-current rounded-full"></div>
                <p class="text-sm font-bold leading-relaxed">${n.content}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  if (state.activeTab === 'itinerary') {
    return `
      <div class="sticky top-[68px] z-20 bg-[#f4f7f6]/90 backdrop-blur-md px-6 py-4 flex gap-3 overflow-x-auto no-scrollbar border-b border-slate-200">
        ${trip.itinerary.map(day => `
          <button onclick="scrollToDay(${day.dayNum})" class="min-w-[56px] h-[56px] rounded-2xl flex flex-col items-center justify-center border transition-all ${state.selectedDayId === day.dayNum ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-110' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-400'}">
            <span class="text-[10px] font-black uppercase tracking-tighter">D${day.dayNum}</span>
          </button>
        `).join('')}
      </div>
      <div class="p-6 space-y-12">
        ${trip.itinerary.map(day => `
          <div id="day-${day.dayNum}" class="scroll-mt-offset pt-4">
            <div class="flex items-end justify-between mb-8 border-b-2 border-slate-200 pb-4">
              <div>
                <h2 class="text-4xl font-black text-slate-900">Day ${day.dayNum}</h2>
                <p class="text-slate-500 font-bold mt-1">${day.date}</p>
              </div>
              <div class="text-right">
                <span class="text-sm font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full">${day.title}</span>
              </div>
            </div>
            <div class="space-y-6">
              ${day.events.map(event => `
                <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex gap-6 hover:shadow-md transition-all">
                  <div class="flex flex-col items-center min-w-[60px] border-r border-slate-50 pr-4">
                    <span class="text-sm font-black text-slate-800">${event.time}</span>
                    <div class="mt-3 p-3 rounded-2xl bg-slate-50 text-slate-400"><i data-lucide="map-pin" class="w-5 h-5"></i></div>
                  </div>
                  <div class="flex-1">
                    <h4 class="text-lg font-bold text-slate-900">${event.title}</h4>
                    ${event.description ? `
                      <div class="mt-3 space-y-2">
                        ${event.description.map(d => `<p class="text-sm text-slate-500 font-medium leading-relaxed">• ${d}</p>`).join('')}
                      </div>
                    ` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (state.activeTab === 'stays') {
    return `
      <div class="p-6 space-y-6">
        <h2 class="text-3xl font-black text-slate-900 mb-8">住宿清單</h2>
        ${trip.itinerary.filter(d => d.events.some(e => e.category === 'stay') || d.hotel).map(day => `
          <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div class="bg-slate-900 px-6 py-3 text-white flex justify-between items-center text-xs font-black uppercase tracking-widest">
              <span>Day ${day.dayNum}</span>
              <span>${day.date}</span>
            </div>
            <div class="p-8 flex gap-6">
              <div class="p-4 bg-blue-50 text-blue-600 rounded-3xl h-fit shadow-inner"><i data-lucide="home" class="w-8 h-8"></i></div>
              <div>
                <h4 class="text-xl font-bold text-slate-900">${day.hotel || '飯店確認中'}</h4>
                <p class="text-slate-400 font-medium mt-2 flex items-center gap-2"><i data-lucide="moon" class="w-4 h-4"></i> 晚安休息處</p>
                <div class="mt-6">
                   <button class="px-5 py-2 bg-slate-100 text-slate-600 rounded-full text-xs font-bold hover:bg-slate-200 transition-colors">查看詳細地址</button>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (state.activeTab === 'preparation') {
    const categories = [
      { id: 'docs', title: '重要文件', icon: 'file-text', items: ['護照', '日幣現金', 'VJW QR Code', '自駕譯本正本'] },
      { id: 'wear', title: '衣物準備', icon: 'shirt', items: ['發熱衣', '防寒外套', '防滑好走的鞋', '手套圍巾'] },
      { id: 'elec', title: '電子產品', icon: 'zap', items: ['行動電源', '充電線', '轉接頭 (備用)'] }
    ];

    return `
      <div class="p-6 space-y-8">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-black text-slate-900">行李清單</h2>
          <button onclick="clearChecks()" class="text-[10px] font-black text-red-500 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">Clear All</button>
        </div>
        ${categories.map(cat => `
          <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div class="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center gap-3">
              <i data-lucide="${cat.icon}" class="w-5 h-5 text-blue-600"></i>
              <span class="font-black text-slate-800 tracking-tight">${cat.title}</span>
            </div>
            <div class="divide-y divide-slate-50">
              ${cat.items.map(item => {
                const itemId = `${trip.id}-${item}`;
                const checked = !!state.checkedItems[itemId];
                return `
                  <div onclick="toggleCheck('${itemId}')" class="p-5 flex items-center cursor-pointer hover:bg-slate-50 transition-colors group">
                    <div class="w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all ${checked ? 'bg-green-500 border-green-500 text-white' : 'border-slate-200 group-hover:border-blue-400 text-transparent'}">
                      <i data-lucide="check" class="w-4 h-4"></i>
                    </div>
                    <span class="ml-4 font-bold text-slate-700 ${checked ? 'line-through text-slate-300' : ''}">${item}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
}

// 全域掛載函數
window.selectTrip = (id) => {
  state.selectedTrip = state.trips.find(t => t.id === id);
  state.activeTab = 'itinerary';
  state.selectedDayId = 1;
  const saved = localStorage.getItem(`trip_checklist_${id}`);
  state.checkedItems = saved ? JSON.parse(saved) : {};
  render();
  window.scrollTo(0, 0);
};

window.backToList = () => {
  state.selectedTrip = null;
  render();
  window.scrollTo(0, 0);
};

window.setTab = (tab) => {
  state.activeTab = tab;
  render();
  window.scrollTo(0, 0);
};

window.scrollToDay = (num) => {
  state.selectedDayId = num;
  const el = document.getElementById(`day-${num}`);
  if (el) {
    const headerOffset = 135;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }
  render();
};

window.toggleCheck = (id) => {
  state.checkedItems[id] = !state.checkedItems[id];
  localStorage.setItem(`trip_checklist_${state.selectedTrip.id}`, JSON.stringify(state.checkedItems));
  render();
};

window.clearChecks = () => {
  if (confirm('確定要清空所有勾選嗎？')) {
    state.checkedItems = {};
    localStorage.removeItem(`trip_checklist_${state.selectedTrip.id}`);
    render();
  }
};

init();