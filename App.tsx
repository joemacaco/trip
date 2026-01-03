import React, { useState } from 'react';
import { trips } from './data';
import { TripData } from './types';
import TripList from './components/TripList';
import TripDetail from './components/TripDetail';

const App: React.FC = () => {
  const [selectedTrip, setSelectedTrip] = useState<TripData | null>(null);

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
