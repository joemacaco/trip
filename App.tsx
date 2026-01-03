import React, { useState, useEffect } from 'react';
import { TripData } from './types';
import TripList from './components/TripList';
import TripDetail from './components/TripDetail';

const App: React.FC = () => {
  const [trips, setTrips] = useState<TripData[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<TripData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 讀取 JSON 資料
    const loadData = async () => {
      try {
        setLoading(true);
        // 在 GitHub Pages 或本地開發時，路徑通常是 /trips.json 或 ./trips.json
        const response = await fetch('./trips.json');
        if (!response.ok) throw new Error('無法讀取旅遊資料');
        const data = await response.json();
        setTrips(data.trips || []);
      } catch (err) {
        console.error(err);
        setError('資料載入失敗，請稍後再試。');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f7f6] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-500 font-medium">規劃行程中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f4f7f6] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center">
          <div className="text-red-500 mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">出錯了</h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold"
          >
            重新載入
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7f6]">
      {selectedTrip ? (
        <TripDetail 
          trip={selectedTrip} 
          onBack={() => setSelectedTrip(null)} 
        />
      ) : (
        <TripList 
          trips={trips} 
          onSelectTrip={setSelectedTrip} 
        />
      )}
    </div>
  );
};

export default App;