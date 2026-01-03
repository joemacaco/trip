export type EventCategory = 'transport' | 'food' | 'spot' | 'shopping' | 'general' | 'flight' | 'stay';

export interface ChecklistItem {
  id: string;
  name: string;
  note?: string;
}

export interface ChecklistCategory {
  id: string;
  title: string;
  icon: string;
  items: ChecklistItem[];
}

export interface EventTag {
  label: string;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'gray';
}

export interface TransportDetails {
  mode: 'flight' | 'train' | 'subway' | 'bus' | 'taxi' | 'car' | 'walk';
  code?: string;      // e.g. IT216, Skyliner 25
  dep?: string;       // 出發地/航廈
  arr?: string;       // 目的地/航廈
  bookingId?: string; // 預約代號
  seat?: string;      // 座位資訊
}

export interface PlaceDetails {
  name: string;
  address?: string;
  mapUrl?: string;    // Google Maps Link
}

export interface WeatherInfo {
  condition: 'Sunny' | 'Cloudy' | 'Rain' | 'Snow' | 'Windy';
  tempHigh: number;
  tempLow: number;
  precipChance?: number; // 降雨機率 %
}

export interface ItineraryEvent {
  id: string;
  time: string;
  title: string;
  description?: string[]; 
  category: EventCategory;
  tags?: EventTag[];
  
  // New Granular Data
  transport?: TransportDetails;
  place?: PlaceDetails;
  cost?: string; // e.g. "¥1,500" or "已付款"
  link?: { label: string; url: string }; // External reference link
}

export interface DailyItinerary {
  dayNum: number;
  date: string;
  title: string;
  hotel?: string;
  weather: WeatherInfo; // Reverted to static weather object
  events: ItineraryEvent[];
}

export interface TripData {
  id: string;
  title: string;
  dates: string;
  coverImage?: string;
  summary: {
    label: string;
    text: string;
  }[];
  notices: {
    type: 'warning' | 'info';
    content: string;
  }[];
  preparation: ChecklistCategory[];
  itinerary: DailyItinerary[];
}