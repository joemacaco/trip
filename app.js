// 狀態管理
let state = {
  trips: [],
  selectedTrip: null,
  activeTab: 'itinerary', // overview, itinerary, stays, preparation
  filterType: 'all',
  selectedDayId: 1,
  checkedItems: {}
};

// 初始化
async function init() {
  try {
    const response = await fetch('./public/trips.json');
    if (!response.ok) throw new Error('無法讀取 JSON');
    const data = await response.json();
    state.trips = data.trips;
    render();
  } catch (err) {
    document.getElementById('app').innerHTML = `
      <div class="p-8 text-center">
        <h2 class="text-red-500 font-bold">載入失敗</h2>
        <p>${err.message}</p>
      </div>
    `;
  }
}

// 渲染引擎
function render() {
  const app = document.getElementById('app');
  
  if (!state.selectedTrip) {
    app.innerHTML = renderTripList();
  } else {
    app.innerHTML = renderTripDetail();
  }
  
  // 渲染完成後啟動圖標
  lucide.createIcons();
  
  // 綁定事件監聽
  bindEvents();
}

// --- 元件渲染函數 ---

function renderTripList() {
  return `
    <div class="max-w-4xl mx-auto px-4 py-12">
      <header class="text-center mb-16">
        <h1 class="text-4xl font-extrabold text-slate-800 mb-4">我的旅遊日誌</h1>
        <p class="text-gray-500">Vanilla JS 版本</p>
      </header>
      <div class="grid gap-8 md:grid-cols-2">
        ${state.trips.map(trip => `
          <div onclick="selectTrip('${trip.id}')" class="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition hover:-translate-y-1 group">
            <div class="h-48 bg-slate-200 relative">
              <img src="${trip.coverImage}" class="w-full h-full object-cover group-hover:scale-105 transition-transform">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-4 left-4 text-white"><h2 class="text-xl font-bold">${trip.title}</h2></div>
            </div>
            <div class="p-6">
              <div class="flex items-center text-gray-500 mb-4 text-sm">
                <i data-lucide="calendar" class="w-4 h-4 mr-2"></i> ${trip.dates}
              </div>
              <div class="flex justify-between items-center pt-4 border-t text-blue-600 font-medium">
                <span>查看行程</span><i data-lucide="chevron-right" class="w-5 h-5"></i>
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
      <header class="bg-white/90 backdrop-blur-md sticky top-0 z-30 px-4 py-3 shadow-sm flex items-center justify-between h-[60px]">
        <button onclick="backToList()" class="p-2 -ml-2 rounded-full hover:bg-gray-100"><i data-lucide="arrow-left" class="w-5 h-5"></i></button>
        <h1 class="font-bold text-slate-800 truncate">${trip.title}</h1>
        <div class="w-8"></div>
      </header>
      
      <main class="flex-1 max-w-2xl mx-auto w-full pb-24">
        ${state.activeTab === 'itinerary' ? renderItinerary() : ''}
        ${state.activeTab === 'overview' ? renderOverview() : ''}
        ${state.activeTab === 'stays' ? renderStays() : ''}
        ${state.activeTab === 'preparation' ? renderPreparation() : ''}
      </main>

      <nav class="fixed bottom-0 left-0 right-0 bg-white border-t p-2 z-40">
        <div class="max-w-md mx-auto flex justify-between">
          ${renderTabBtn('overview', 'info', '資訊')}
          ${renderTabBtn('itinerary', 'calendar-days', '行程')}
          ${renderTabBtn('stays', 'bed-double', '住宿')}
          ${renderTabBtn('preparation', 'check-square', '清單')}
        </div>
      </nav>
    </div>
  `;
}

function renderTabBtn(id, icon, label) {
  const active = state.activeTab === id;
  return `
    <button onclick="setTab('${id}')" class="flex flex-col items-center flex-1 p-2 ${active ? 'text-blue-600' : 'text-gray-400'}">
      <i data-lucide="${icon}" class="w-6 h-6 mb-1"></i>
      <span class="text-[10px] font-medium">${label}</span>
    </button>
  `;
}

function renderItinerary() {
  const trip = state.selectedTrip;
  return `
    <div class="sticky top-[60px] z-20 bg-[#f4f7f6]/95 backdrop-blur-md p-2 flex gap-2 overflow-x-auto no-scrollbar shadow-sm">
      ${trip.itinerary.map(day => `
        <button onclick="scrollToDay(${day.dayNum})" class="min-w-[48px] h-[48px] rounded-xl flex flex-col items-center justify-center border ${state.selectedDayId === day.dayNum ? 'bg-slate-800 text-white' : 'bg-white text-slate-500 border-slate-200'}">
          <span class="text-[10px] font-bold">D${day.dayNum}</span>
        </button>
      `).join('')}
    </div>
    <div class="px-4 mt-4 space-y-8">
      ${trip.itinerary.map(day => `
        <div id="day-${day.dayNum}" class="scroll-mt-offset">
          <div class="flex justify-between items-end border-b pb-2 mb-4">
             <div>
               <h3 class="text-xl font-black">Day ${day.dayNum}</h3>
               <span class="text-sm text-slate-500">${day.date}</span>
             </div>
             <span class="text-sm font-bold text-slate-700">${day.title}</span>
          </div>
          <div class="space-y-4">
            ${day.events.map(event => `
              <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <div class="flex gap-3">
                  <span class="text-xs font-bold bg-slate-100 px-2 py-1 rounded h-fit">${event.time}</span>
                  <div>
                    <h4 class="font-bold text-slate-800">${event.title}</h4>
                    <p class="text-sm text-slate-500 mt-1">${event.description ? event.description.join('<br>') : ''}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// 輔助功能
window.selectTrip = (id) => {
  state.selectedTrip = state.trips.find(t => t.id === id);
  // 載入該行程的檢查清單狀態
  const saved = localStorage.getItem(`trip_${id}_checklist`);
  state.checkedItems = saved ? JSON.parse(saved) : {};
  render();
};

window.backToList = () => {
  state.selectedTrip = null;
  render();
};

window.setTab = (tab) => {
  state.activeTab = tab;
  render();
};

window.scrollToDay = (num) => {
  state.selectedDayId = num;
  const el = document.getElementById(`day-${num}`);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
  render();
};

// 由於是原生 JS，我們可以直接在 window 上掛載這些函數，讓 HTML 裡的 onclick 找得到
function bindEvents() {
  // 可以在這裡加入更多的動態綁定
}

// 其他渲染區塊 (範例中先簡化)
function renderOverview() { return `<div class="p-6"><h2 class="text-xl font-bold">行程概覽</h2><p class="mt-4">${state.selectedTrip.dates}</p></div>`; }
function renderStays() { return `<div class="p-6"><h2 class="text-xl font-bold">住宿安排</h2></div>`; }
function renderPreparation() { return `<div class="p-6"><h2 class="text-xl font-bold">準備清單</h2><p class="text-slate-500">（實作邏輯同上）</p></div>`; }

init();