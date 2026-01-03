import React from 'react';
import { TripData } from '../types';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';

interface Props {
  trips: TripData[];
  onSelectTrip: (trip: TripData) => void;
}

const TripList: React.FC<Props> = ({ trips, onSelectTrip }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">我的旅遊日誌</h1>
        <p className="text-gray-500">點擊旅程查看詳細資訊</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {trips.map((trip) => (
          <div 
            key={trip.id}
            onClick={() => onSelectTrip(trip)}
            className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition hover:-translate-y-1 hover:shadow-2xl group"
          >
            <div className="h-48 bg-slate-200 relative overflow-hidden">
               <img src={trip.coverImage} alt={trip.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               <div className="absolute bottom-4 left-4 text-white">
                 <h2 className="text-xl font-bold shadow-black drop-shadow-md">{trip.title}</h2>
               </div>
            </div>
            <div className="p-6">
              <div className="flex items-center text-gray-500 mb-4 text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                {trip.dates}
              </div>
              <div className="space-y-2 mb-6">
                {trip.summary.map((s, idx) => (
                  <div key={idx} className="flex text-sm">
                    <span className="font-semibold text-slate-700 w-16 flex-shrink-0">{s.label}:</span>
                    <span className="text-gray-600 truncate">{s.text}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100 text-blue-600 font-medium group-hover:text-blue-800">
                <span>查看完整行程</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripList;