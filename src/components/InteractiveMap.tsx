import React, { useState } from 'react';
import { PotholeReport, CityStat } from '../types/pothole';
import { MapPin, AlertTriangle, CheckCircle2, Flame, Navigation } from 'lucide-react';

interface InteractiveMapProps {
  potholes: PotholeReport[];
  cities: CityStat[];
  selectedCity: string;
  onSelectCity: (cityName: string) => void;
  onSelectPothole: (pothole: PotholeReport) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  potholes,
  cities,
  selectedCity,
  onSelectCity,
  onSelectPothole,
}) => {
  const [hoveredPothole, setHoveredPothole] = useState<PotholeReport | null>(null);

  // Filter potholes if city selected
  const visiblePotholes = selectedCity === 'All'
    ? potholes
    : potholes.filter((p) => p.location.city.toLowerCase() === selectedCity.toLowerCase());

  // Simple coordinate projection for India region bounding box
  // Lat: 8 to 32, Lng: 68 to 90
  const getCoordinates = (lat: number, lng: number) => {
    const minLat = 10.0;
    const maxLat = 30.5;
    const minLng = 70.0;
    const maxLng = 89.0;

    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    // Invert Y for SVG coordinates
    const y = 100 - ((lat - minLat) / (maxLat - minLat)) * 100;

    return {
      x: Math.max(5, Math.min(95, x)),
      y: Math.max(5, Math.min(95, y)),
    };
  };

  return (
    <div className="relative w-full bg-[#1e232a] rounded-2xl overflow-hidden border border-[#2d3748] shadow-inner">
      {/* Map Header Overlay */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
        <div className="bg-[#12161c]/90 backdrop-blur-md border border-[#2d3748] px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-medium text-white shadow-sm">
          <Navigation className="w-3.5 h-3.5 text-[#C5A57F]" />
          <span>India Road Network Radar</span>
          <span className="text-[10px] text-zinc-400 font-mono">({visiblePotholes.length} hotspots)</span>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center gap-1 bg-[#12161c]/90 backdrop-blur-md border border-[#2d3748] p-1 rounded-lg">
          <button
            onClick={() => onSelectCity('All')}
            className={`px-2.5 py-1 text-xs rounded transition-colors ${
              selectedCity === 'All'
                ? 'bg-[#C5A57F] text-zinc-950 font-semibold'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            All Metros
          </button>
          {cities.map((c) => (
            <button
              key={c.name}
              onClick={() => onSelectCity(c.name)}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                selectedCity === c.name
                  ? 'bg-[#C5A57F] text-zinc-950 font-semibold'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 z-10 bg-[#12161c]/90 backdrop-blur-md border border-[#2d3748] px-3 py-2 rounded-lg text-[11px] text-zinc-300 flex items-center gap-3">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block -ml-4" />
          <span className="text-zinc-200">Critical / Dangerous</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
          <span className="text-zinc-200">Moderate</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
          <span className="text-zinc-200">Resurfaced / Verified</span>
        </span>
      </div>

      {/* SVG Canvas Map */}
      <div className="w-full h-80 sm:h-96 relative flex items-center justify-center p-4">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #C5A57F 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Abstract India Outline Graphic */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full max-w-2xl text-zinc-800/40 stroke-zinc-700/60"
          fill="currentColor"
          strokeWidth="0.4"
        >
          {/* Abstract India subcontinent geometric polygon */}
          <path
            d="M 38 12 L 48 10 L 58 14 L 63 20 L 78 24 L 88 28 L 84 38 L 74 38 L 68 45 L 64 54 L 62 65 L 56 78 L 48 94 L 44 86 L 38 72 L 32 60 L 26 50 L 24 38 L 32 26 Z"
            className="fill-zinc-800/30 hover:fill-zinc-800/40 transition-colors"
          />
          {/* Major highway arteries */}
          <path
            d="M 38 26 Q 48 50 48 78 M 26 50 Q 48 60 74 38 M 32 60 L 62 65"
            fill="none"
            stroke="#C5A57F"
            strokeWidth="0.3"
            strokeDasharray="1,1"
            className="opacity-40"
          />
        </svg>

        {/* City Anchor Rings */}
        {cities.map((city) => {
          const { x, y } = getCoordinates(city.center.lat, city.center.lng);
          const isSelected = selectedCity === city.name;
          return (
            <div
              key={city.name}
              style={{ left: `${x}%`, top: `${y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
              onClick={() => onSelectCity(city.name)}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-[#C5A57F]/30 ring-2 ring-[#C5A57F]'
                    : 'bg-zinc-700/40 group-hover:bg-zinc-700/80 ring-1 ring-zinc-500/40'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isSelected ? 'bg-[#C5A57F]' : 'bg-zinc-400 group-hover:bg-white'
                  }`}
                />
              </div>
              <span
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[10px] whitespace-nowrap px-1.5 py-0.5 rounded font-medium transition-all ${
                  isSelected
                    ? 'bg-[#C5A57F] text-zinc-950 font-bold'
                    : 'text-zinc-400 bg-zinc-900/80 group-hover:text-white'
                }`}
              >
                {city.name}
              </span>
            </div>
          );
        })}

        {/* Pothole Interactive Pins */}
        {visiblePotholes.map((pothole) => {
          const { x, y } = getCoordinates(pothole.location.lat, pothole.location.lng);
          const isDangerous = pothole.severity === 'dangerous';
          const isResolved = pothole.status === 'resolved';

          const pinColor = isResolved
            ? 'bg-emerald-500 ring-emerald-300'
            : isDangerous
            ? 'bg-rose-500 ring-rose-300'
            : 'bg-amber-400 ring-amber-200';

          return (
            <div
              key={pothole.id}
              style={{ left: `${x}%`, top: `${y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
              onMouseEnter={() => setHoveredPothole(pothole)}
              onMouseLeave={() => setHoveredPothole(null)}
              onClick={() => onSelectPothole(pothole)}
            >
              {/* Outer pulsing ring for dangerous unresolved */}
              {isDangerous && !isResolved && (
                <span className="absolute -inset-1.5 rounded-full bg-rose-500/50 animate-ping opacity-75" />
              )}

              <button
                type="button"
                className={`relative w-4 h-4 rounded-full flex items-center justify-center text-white ring-2 shadow-lg transition-transform group-hover:scale-125 ${pinColor}`}
                title={pothole.roadName}
              >
                {isResolved ? (
                  <CheckCircle2 className="w-2.5 h-2.5" />
                ) : isDangerous ? (
                  <Flame className="w-2.5 h-2.5" />
                ) : (
                  <AlertTriangle className="w-2.5 h-2.5 text-zinc-950" />
                )}
              </button>

              {/* Pin Hover Card */}
              {hoveredPothole?.id === pothole.id && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 p-2.5 bg-zinc-900/95 backdrop-blur-md rounded-xl border border-zinc-700 shadow-2xl text-left pointer-events-none z-30">
                  <div className="flex items-center gap-2 mb-1.5">
                    <img
                      src={pothole.imageUrl}
                      alt={pothole.roadName}
                      className="w-10 h-10 rounded-lg object-cover border border-zinc-700 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-[10px] font-mono text-[#C5A57F] uppercase tracking-wider">
                        {pothole.reportCode}
                      </p>
                      <p className="text-xs font-semibold text-white truncate">
                        {pothole.roadName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-zinc-400 border-t border-zinc-800 pt-1.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#C5A57F]" />
                      {pothole.location.city}
                    </span>
                    <span className="font-semibold text-zinc-200">
                      {pothole.upvotes} Upvotes
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
