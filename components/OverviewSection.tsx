import React from 'react';
import { TripData } from '../types';
import { AlertTriangle, Info, Calendar, Users, Map } from 'lucide-react';

interface Props {
  trip: TripData;
}

const OverviewSection: React.FC<Props> = ({ trip }) => {
  return (
    <div className="space-y-6 pb-24">
      {/* Hero Card */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="h-48 relative">
          <img 
            src={trip.coverImage} 
            alt={trip.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
            <h1 className="text-2xl font-bold mb-2">{trip.title}</h1>
            <div className="flex items-center gap-2 text-sm opacity-90">
              <Calendar className="w-4 h-4" />
              {trip.dates}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            成員資訊
          </h3>
          <div className="space-y-3">
            {trip.summary.map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-semibold text-slate-700 mb-1 sm:mb-0">{item.label}</span>
                <span className="text-slate-600 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notices */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          重要注意事項
        </h3>
        <div className="space-y-4">
          {trip.notices.map((notice, idx) => (
            <div 
              key={idx} 
              className={`p-4 rounded-xl border-l-4 ${
                notice.type === 'warning' 
                  ? 'bg-red-50 border-red-500 text-red-800' 
                  : 'bg-blue-50 border-blue-500 text-blue-800'
              }`}
            >
              <div className="flex gap-3">
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed font-medium">
                  {notice.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center text-gray-400 text-xs mt-8">
        旅程 ID: {trip.id}
      </div>
    </div>
  );
};

export default OverviewSection;