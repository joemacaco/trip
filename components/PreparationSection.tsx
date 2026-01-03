import React, { useState, useEffect } from 'react';
import { ChecklistCategory } from '../types';
import { CheckSquare, Info, Shirt, Zap, Pill, CheckCircle2, Circle } from 'lucide-react';

interface Props {
  tripId: string;
  data: ChecklistCategory[];
}

const PreparationSection: React.FC<Props> = ({ tripId, data }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [totalItems, setTotalItems] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem(`trip_${tripId}_checklist`);
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
  }, [tripId]);

  // Calculate Progress
  useEffect(() => {
    let total = 0;
    let completed = 0;
    data.forEach(cat => {
      cat.items.forEach(item => {
        total++;
        if (checkedItems[item.id]) completed++;
      });
    });
    setTotalItems(total);
    setCompletedCount(completed);
  }, [data, checkedItems]);

  // Save to LocalStorage
  const toggleItem = (itemId: string) => {
    const newState = { ...checkedItems, [itemId]: !checkedItems[itemId] };
    setCheckedItems(newState);
    localStorage.setItem(`trip_${tripId}_checklist`, JSON.stringify(newState));
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'passport': return <Info className="w-5 h-5" />;
      case 'shirt': return <Shirt className="w-5 h-5" />;
      case 'zap': return <Zap className="w-5 h-5" />;
      case 'medkit': return <Pill className="w-5 h-5" />;
      default: return <CheckSquare className="w-5 h-5" />;
    }
  };

  const progressPercentage = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  return (
    <div className="pb-24 space-y-6">
      {/* Progress Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-4 z-10 border border-slate-100">
        <div className="flex justify-between items-end mb-2">
          <h2 className="text-xl font-bold text-slate-800">行李準備清單</h2>
          <span className="text-sm font-semibold text-blue-600">{progressPercentage}% 完成</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-6">
        {data.map((category) => (
          <div key={category.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100">
            <div className="bg-slate-50 px-5 py-4 border-b border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm text-slate-700">
                {getIcon(category.icon)}
              </div>
              <h3 className="font-bold text-slate-800 text-lg">{category.title}</h3>
            </div>
            
            <div className="divide-y divide-slate-50">
              {category.items.map((item) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <div 
                    key={item.id} 
                    onClick={() => toggleItem(item.id)}
                    className={`p-4 flex items-start cursor-pointer transition-colors hover:bg-slate-50 ${isChecked ? 'bg-slate-50/50' : ''}`}
                  >
                    <div className={`mt-0.5 flex-shrink-0 ${isChecked ? 'text-green-500' : 'text-slate-300'}`}>
                      {isChecked ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <p className={`font-medium text-base ${isChecked ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                        {item.name}
                      </p>
                      {item.note && (
                        <p className={`text-sm mt-1 ${isChecked ? 'text-slate-300' : 'text-slate-500'}`}>
                          {item.note}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreparationSection;