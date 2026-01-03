import React, { useState, useEffect } from 'react';
import { TripData, EventCategory } from '../types';
import PreparationSection from './PreparationSection';
import Timeline from './Timeline';
import OverviewSection from './OverviewSection';
import { ArrowLeft, CalendarDays, CheckSquare, Info, Filter, Car, Utensils, MapPin, BedDouble, ExternalLink, ArrowUp } from 'lucide-react';

interface Props {
  trip: TripData;
  onBack: () => void;
}

type TabType = 'overview' | 'itinerary' | 'stays' | 'preparation';

const TripDetail: React.FC<Props> = ({ trip, onBack }) => {
  const [activeTab, setActiveTab] = useState<TabType>('itinerary');
  const [filterType, setFilterType] = useState<EventCategory | 'all'>('all');
  const [selectedDayId, setSelectedDayId] = useState<number>(1);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle Scroll to Top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToDay = (dayNum: number) => {
    setSelectedDayId(dayNum);
    const element = document.getElementById(`day-${dayNum}`);
    if (element) {
      // scrollIntoView with scroll-margin set in CSS (Tailwind scroll-mt)
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex flex-col relative">
      {/* Top Bar - Sticky */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-30 px-4 py-3 shadow-sm flex items-center justify-between border-b border-gray-200/50 h-[60px]">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-slate-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-bold text-slate-800 truncate max-w-[200px]">{trip.title}</h1>
        <div className="w-8"></div> {/* Spacer for balance */}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-2xl mx-auto w-full">
        
        {/* --- View 1: Overview --- */}
        {activeTab === 'overview' && (
          <div className="px-4 py-6">
            <OverviewSection trip={trip} />
          </div>
        )}

        {/* --- View 2: Itinerary --- */}
        {activeTab === 'itinerary' && (
          <div className="pb-24">
            
            {/* Day Navigator (Sticky below header) */}
            <div className="sticky top-[60px] z-20 bg-[#f4f7f6]/95 backdrop-blur-md border-b border-gray-200/50 px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar items-center shadow-sm">
              {trip.itinerary.map((day) => (
                <button
                  key={day.dayNum}
                  onClick={() => scrollToDay(day.dayNum)}
                  className={`flex flex-col items-center justify-center min-w-[48px] h-[48px] rounded-xl transition-all border ${
                    selectedDayId === day.dayNum
                      ? 'bg-slate-800 text-white border-slate-800 shadow-md scale-105'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase opacity-80">Day</span>
                  <span className="text-lg font-black leading-none">{day.dayNum}</span>
                </button>
              ))}
            </div>

            <div className="px-4 pt-4">
              {/* Filter Pills */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 py-1">
                {[
                  { id: 'all', label: '全部', icon: null },
                  { id: 'spot', label: '景點', icon: MapPin },
                  { id: 'food', label: '美食', icon: Utensils },
                  { id: 'transport', label: '交通', icon: Car },
                ].map((f) => {
                  const Icon = f.icon;
                  const isActive = filterType === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setFilterType(f.id as any)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                        isActive 
                          ? 'bg-blue-600 text-white shadow-md transform scale-105' 
                          : 'bg-white text-slate-500 border border-slate-200'
                      }`}
                    >
                      {Icon && <Icon className="w-3.5 h-3.5" />}
                      {f.label}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-2">
                {trip.itinerary.map((day) => (
                  <div 
                    key={day.dayNum} 
                    id={`day-${day.dayNum}`} 
                    className="scroll-mt-[130px]" // Important: Offset for scroll to account for sticky headers
                  >
                    <Timeline day={day} filterType={filterType} />
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-12 mb-6">
                  <p className="text-slate-400 text-sm">行程結束</p>
              </div>
            </div>
          </div>
        )}

        {/* --- View 3: Accommodation --- */}
        {activeTab === 'stays' && (
           <div className="px-4 py-6 pb-24 space-y-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <BedDouble className="w-6 h-6 text-indigo-600" />
                住宿安排
              </h2>

              {trip.itinerary.map((day) => {
                 // Try to find specific stay event details, otherwise fallback to day.hotel
                 const stayEvent = day.events.find(e => e.category === 'stay');
                 
                 if (!day.hotel && !stayEvent) return null;

                 return (
                   <div key={day.dayNum} className="bg-white rounded-xl shadow-sm border border-indigo-50 overflow-hidden">
                      <div className="bg-indigo-50 px-4 py-2 flex justify-between items-center text-indigo-900">
                        <span className="font-bold text-sm">Day {day.dayNum}</span>
                        <span className="text-xs font-semibold">{day.date}</span>
                      </div>
                      
                      <div className="p-5">
                         <div className="flex items-start gap-4">
                            <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                              <BedDouble className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                               <h3 className="font-bold text-lg text-slate-800 mb-1">
                                 {stayEvent?.place?.name || day.hotel}
                               </h3>
                               
                               {stayEvent?.place?.address && (
                                 <p className="text-sm text-slate-500 mb-2 flex items-start gap-1">
                                   <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" /> 
                                   {stayEvent.place.address}
                                 </p>
                               )}

                               <div className="flex flex-wrap gap-2 mt-3">
                                 {stayEvent?.place?.mapUrl && (
                                   <a 
                                      href={stayEvent.place.mapUrl} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-xs font-bold bg-indigo-600 text-white px-3 py-1.5 rounded-full hover:bg-indigo-700 transition-colors"
                                   >
                                     <MapPin className="w-3 h-3" />
                                     查看地圖
                                   </a>
                                 )}
                                 
                                 {stayEvent?.tags?.map((tag, i) => (
                                   <span key={i} className="inline-block text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1.5 rounded-full">
                                      {tag.label}
                                   </span>
                                 ))}
                               </div>
                               
                               {stayEvent?.description && (
                                  <div className="mt-3 pt-3 border-t border-indigo-50 text-sm text-slate-600">
                                     {stayEvent.description.map((d, i) => <p key={i}>• {d}</p>)}
                                  </div>
                               )}
                            </div>
                         </div>
                      </div>
                   </div>
                 );
              })}
           </div>
        )}

        {/* --- View 4: Preparation --- */}
        {activeTab === 'preparation' && (
           <div className="px-4 py-6">
             <PreparationSection tripId={trip.id} data={trip.preparation} />
           </div>
        )}

      </main>

      {/* Scroll To Top Button - Fixed Position */}
      {/* Increased z-index to 50 and bottom spacing to 6rem (96px) to clear the nav bar */}
      <button
        onClick={scrollToTop}
        className={`fixed right-4 bottom-24 z-50 p-3 bg-slate-800/90 backdrop-blur-sm text-white rounded-full shadow-lg border border-white/20 transition-all duration-300 transform hover:scale-110 active:scale-95 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Bottom Navigation Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe pt-2 px-4 z-40">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex flex-col items-center p-2 flex-1 transition-colors ${activeTab === 'overview' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <Info className={`w-6 h-6 mb-1 ${activeTab === 'overview' ? 'fill-blue-100' : ''}`} />
            <span className="text-[10px] font-medium">資訊</span>
          </button>

          <button 
            onClick={() => setActiveTab('itinerary')}
            className={`flex flex-col items-center p-2 flex-1 transition-colors ${activeTab === 'itinerary' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <CalendarDays className={`w-6 h-6 mb-1 ${activeTab === 'itinerary' ? 'fill-blue-100' : ''}`} />
            <span className="text-[10px] font-medium">行程</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('stays')}
            className={`flex flex-col items-center p-2 flex-1 transition-colors ${activeTab === 'stays' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <BedDouble className={`w-6 h-6 mb-1 ${activeTab === 'stays' ? 'fill-blue-100' : ''}`} />
            <span className="text-[10px] font-medium">住宿</span>
          </button>

          <button 
            onClick={() => setActiveTab('preparation')}
            className={`flex flex-col items-center p-2 flex-1 transition-colors ${activeTab === 'preparation' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <CheckSquare className={`w-6 h-6 mb-1 ${activeTab === 'preparation' ? 'fill-blue-100' : ''}`} />
            <span className="text-[10px] font-medium">清單</span>
          </button>
        </div>
        {/* Safe Area Spacer for iOS Home Bar */}
        <div className="h-5 w-full"></div> 
      </nav>
    </div>
  );
};

export default TripDetail;