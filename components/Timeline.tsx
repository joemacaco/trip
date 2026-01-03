import React from 'react';
import { DailyItinerary, EventCategory, ItineraryEvent, WeatherInfo } from '../types';
import { MapPin, Utensils, Train, ShoppingBag, Moon, Plane, ArrowRight, ExternalLink, BedDouble, Sun, Cloud, CloudRain, Snowflake, Wind } from 'lucide-react';

interface Props {
  day: DailyItinerary;
  filterType: EventCategory | 'all';
}

const Timeline: React.FC<Props> = ({ day, filterType }) => {
  const visibleEvents = day.events.filter(e => filterType === 'all' || e.category === filterType);

  // Removed the empty state card block requested by user.
  // If no events match, we simply render the header and an empty list, 
  // keeping the day structure intact for navigation anchors.

  return (
    <div className="mb-8">
      {/* Day Header - Sticky */}
      {/* Updated top position: 60px (Main Header) + 65px (Day Nav Bar) = ~125px */}
      <div className="sticky top-[125px] z-10 bg-[#f4f7f6]/95 backdrop-blur-sm py-4 mb-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Day {day.dayNum}</h2>
            <span className="text-slate-500 text-sm font-medium">{day.date}</span>
          </div>
          
          {/* Weather Widget (Static) */}
          <div className="ml-2">
            {day.weather && <WeatherBadge weather={day.weather} />}
          </div>
        </div>
        
        <div className="text-right">
           <span className="text-sm font-bold text-slate-700 truncate block max-w-[120px] sm:max-w-[200px]">{day.title}</span>
           {day.hotel && <span className="text-xs text-slate-400 flex justify-end items-center gap-1"><Moon className="w-3 h-3" /> {day.hotel}</span>}
        </div>
      </div>

      <div className="space-y-4">
        {visibleEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

const WeatherBadge: React.FC<{ weather: WeatherInfo }> = ({ weather }) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'Sunny': return <Sun className="w-4 h-4 text-orange-500" />;
      case 'Cloudy': return <Cloud className="w-4 h-4 text-slate-500" />;
      case 'Rain': return <CloudRain className="w-4 h-4 text-blue-500" />;
      case 'Snow': return <Snowflake className="w-4 h-4 text-cyan-500" />;
      case 'Windy': return <Wind className="w-4 h-4 text-slate-400" />;
      default: return <Sun className="w-4 h-4 text-orange-500" />;
    }
  };

  return (
    <div className="flex flex-col items-center bg-white border border-slate-200 rounded-lg px-2 py-1 shadow-sm transition-all hover:scale-105">
      <div className="flex items-center gap-1.5">
         {getWeatherIcon(weather.condition)}
         <span className="text-xs font-bold text-slate-700">{weather.tempHigh}°</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-[9px] text-slate-400 font-mono">/ {weather.tempLow}°</span>
        {weather.precipChance !== undefined && weather.precipChance > 0 && (
           <span className="text-[9px] text-blue-400 font-bold">{weather.precipChance}%</span>
        )}
      </div>
    </div>
  );
};

/* --- Specific Card Components --- */

const EventCard: React.FC<{ event: ItineraryEvent }> = ({ event }) => {
  // Determine which card style to use based on category
  switch (event.category) {
    case 'transport':
    case 'flight':
      return <TransportCard event={event} />;
    case 'food':
      return <FoodCard event={event} />;
    case 'stay':
      return <StayCard event={event} />;
    default:
      return <SpotCard event={event} />;
  }
};

/* 1. Transport Ticket Style */
const TransportCard: React.FC<{ event: ItineraryEvent }> = ({ event }) => (
  <div className="bg-white rounded-xl shadow-sm border-l-4 border-red-500 overflow-hidden relative group">
    {/* Ticket notches decoration */}
    <div className="absolute -left-1.5 top-1/2 w-3 h-3 bg-[#f4f7f6] rounded-full z-10"></div>
    <div className="absolute -right-1.5 top-1/2 w-3 h-3 bg-[#f4f7f6] rounded-full z-10"></div>
    <div className="absolute left-0 right-0 top-1/2 h-px bg-dashed border-t border-dashed border-gray-200"></div>

    <div className="p-4 flex justify-between items-start pb-6">
      <div className="flex gap-3">
        <div className="bg-red-50 p-2 rounded-lg text-red-600 h-fit">
          {event.category === 'flight' ? <Plane className="w-5 h-5" /> : <Train className="w-5 h-5" />}
        </div>
        <div>
           <div className="flex items-center gap-2 mb-1">
             <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase">{event.time}</span>
             {event.tags?.map((tag, i) => (
               <span key={i} className={`text-[10px] font-bold px-1.5 py-0.5 rounded text-white ${tag.color === 'red' ? 'bg-red-500' : 'bg-slate-500'}`}>{tag.label}</span>
             ))}
           </div>
           <h3 className="font-bold text-slate-800 text-lg leading-tight">{event.title}</h3>
           {event.transport && (
             <div className="text-sm font-mono text-slate-500 mt-1 flex items-center gap-2">
               <span className="font-bold text-slate-700">{event.transport.code}</span>
               {event.transport.seat && <span className="text-xs bg-slate-100 px-1 rounded">座位: {event.transport.seat}</span>}
             </div>
           )}
        </div>
      </div>
    </div>

    <div className="bg-red-50/50 p-4 pt-4 flex flex-col gap-2 text-sm text-slate-700">
      {event.transport && (event.transport.dep || event.transport.arr) && (
        <div className="flex items-center justify-between font-semibold">
           <span className="w-1/3 truncate">{event.transport.dep || '出發地'}</span>
           <div className="flex-1 flex justify-center text-red-300"><ArrowRight className="w-4 h-4" /></div>
           <span className="w-1/3 truncate text-right">{event.transport.arr || '目的地'}</span>
        </div>
      )}
      {event.description && (
        <div className="mt-2 text-xs text-slate-500 leading-relaxed border-t border-red-100 pt-2">
           {event.description.map((d, i) => <p key={i}>• {d}</p>)}
        </div>
      )}
    </div>
  </div>
);

/* 2. Food / Restaurant Card */
const FoodCard: React.FC<{ event: ItineraryEvent }> = ({ event }) => (
  <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden">
    <div className="bg-orange-50 p-4 flex justify-between items-center border-b border-orange-100">
      <div className="flex items-center gap-2">
        <Utensils className="w-4 h-4 text-orange-600" />
        <span className="font-bold text-orange-800 text-sm">餐廳</span>
      </div>
      <span className="font-mono text-orange-700 font-bold bg-white px-2 py-1 rounded text-xs shadow-sm">
        {event.time}
      </span>
    </div>
    
    <div className="p-5">
      <h3 className="text-xl font-bold text-slate-800 mb-2">{event.title}</h3>
      
      {event.cost && (
        <div className="inline-block bg-green-50 text-green-700 text-xs px-2 py-1 rounded-md font-bold mb-3 border border-green-100">
          預算: {event.cost}
        </div>
      )}

      {event.place && (
        <div className="flex flex-col gap-1 mb-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MapPin className="w-4 h-4 text-orange-400" />
            <span className="font-medium">{event.place.name}</span>
          </div>
          {event.place.mapUrl && (
             <a href={event.place.mapUrl} target="_blank" className="ml-6 text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1">
               <ExternalLink className="w-3 h-3" />
               在 Google 地圖查看
             </a>
          )}
        </div>
      )}

      {event.description && (
         <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-600 space-y-1">
            {event.description.map((line, i) => <p key={i}>{line}</p>)}
         </div>
      )}
    </div>
  </div>
);

/* 3. Spot / Shopping / General Card */
const SpotCard: React.FC<{ event: ItineraryEvent }> = ({ event }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex gap-4">
    {/* Time Column */}
    <div className="flex flex-col items-center min-w-[50px] border-r border-slate-100 pr-4">
       <span className="text-sm font-bold text-slate-800">{event.time}</span>
       <div className={`mt-2 p-2 rounded-full ${event.category === 'shopping' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
          {event.category === 'shopping' ? <ShoppingBag className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
       </div>
    </div>

    {/* Content */}
    <div className="flex-1">
       <div className="flex flex-wrap gap-2 mb-1">
         {event.tags?.map((tag, i) => (
            <span key={i} className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded">{tag.label}</span>
         ))}
       </div>
       
       <h3 className="font-bold text-lg text-slate-800 mb-1 flex items-center justify-between">
         {event.title}
         {event.place?.mapUrl && (
           <a href={event.place.mapUrl} target="_blank" className="text-slate-400 hover:text-blue-600">
             <ExternalLink className="w-4 h-4" />
           </a>
         )}
       </h3>
       
       {event.place && (
          <div className="text-sm text-slate-500 mb-2 flex flex-wrap items-center gap-1">
            <MapPin className="w-3 h-3" /> 
            {event.place.mapUrl ? (
               <a href={event.place.mapUrl} target="_blank" className="hover:underline hover:text-blue-600 transition-colors">
                 {event.place.name}
               </a>
            ) : (
               <span>{event.place.name}</span>
            )}
          </div>
       )}

       {event.description && (
         <div className="text-sm text-slate-600 leading-relaxed">
            {event.description.map((d, i) => <span key={i} className="block">• {d}</span>)}
         </div>
       )}
    </div>
  </div>
);

/* 4. Stay / Hotel Card */
const StayCard: React.FC<{ event: ItineraryEvent }> = ({ event }) => (
  <div className="bg-indigo-900 rounded-xl shadow-lg p-5 text-white relative overflow-hidden">
     <div className="absolute right-0 top-0 w-24 h-24 bg-white/5 rounded-full -mr-10 -mt-10 blur-xl"></div>
     
     <div className="flex items-center gap-3 mb-4 relative z-10">
       <div className="bg-indigo-800 p-2 rounded-lg">
         <BedDouble className="w-5 h-5 text-indigo-200" />
       </div>
       <div>
         <p className="text-xs text-indigo-300 font-bold uppercase tracking-wider">住宿</p>
         <p className="font-bold text-lg">{event.place?.name || event.title}</p>
       </div>
     </div>
     
     <div className="bg-indigo-950/50 rounded-lg p-3 text-sm text-indigo-200 space-y-2 border border-indigo-800 relative z-10">
        <div className="flex justify-between">
           <span>入住:</span>
           <span className="text-white font-mono">{event.time}</span>
        </div>
        {event.place?.address && (
          <div className="flex gap-2">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs leading-tight">{event.place.address}</span>
          </div>
        )}
        {event.place?.mapUrl && (
           <a href={event.place.mapUrl} target="_blank" className="flex items-center gap-1 text-xs text-blue-300 hover:text-white mt-1">
             <ExternalLink className="w-3 h-3" /> Google Maps
           </a>
        )}
     </div>

     {event.description && (
       <div className="mt-3 text-xs text-indigo-300 opacity-80">
         {event.description.join(' ')}
       </div>
     )}
  </div>
);

export default Timeline;