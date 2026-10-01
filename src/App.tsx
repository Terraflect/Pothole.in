import React, { useState, useEffect } from 'react';
import { CarrdLanding } from './components/CarrdLanding';
import { CivicPlatform } from './components/CivicPlatform';
import { ReportModal } from './components/ReportModal';
import { PotholeDetailModal } from './components/PotholeDetailModal';
import { INITIAL_POTHOLES, INITIAL_CITIES } from './data/potholes';
import { PotholeReport, CityStat } from './types/pothole';
import { CheckCircle2, LayoutTemplate, Compass } from 'lucide-react';

const STORAGE_KEY_POTHOLES = 'pothole_in_reports_v1';
const STORAGE_KEY_CITIES = 'pothole_in_cities_v1';

export default function App() {
  const [viewMode, setViewMode] = useState<'carrd' | 'platform'>('carrd');
  const [potholes, setPotholes] = useState<PotholeReport[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_POTHOLES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_POTHOLES;
  });

  const [cities, setCities] = useState<CityStat[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CITIES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_CITIES;
  });

  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [selectedPothole, setSelectedPothole] = useState<PotholeReport | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_POTHOLES, JSON.stringify(potholes));
    } catch (e) {
      console.error(e);
    }
  }, [potholes]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CITIES, JSON.stringify(cities));
    } catch (e) {
      console.error(e);
    }
  }, [cities]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleUpvote = (id: string) => {
    setPotholes((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const isUpvoted = !p.userUpvoted;
          const updated = {
            ...p,
            upvotes: isUpvoted ? p.upvotes + 1 : p.upvotes - 1,
            userUpvoted: isUpvoted,
          };
          if (selectedPothole && selectedPothole.id === id) {
            setSelectedPothole(updated);
          }
          return updated;
        }
        return p;
      })
    );
  };

  const handleAddReport = (newReport: PotholeReport) => {
    setPotholes((prev) => [newReport, ...prev]);

    // Update city active reports count
    setCities((prev) =>
      prev.map((c) => {
        if (c.name.toLowerCase() === newReport.location.city.toLowerCase()) {
          return {
            ...c,
            activeReports: c.activeReports + 1,
          };
        }
        return c;
      })
    );

    showToast(`Pothole #${newReport.reportCode} reported & escalated to ${newReport.wardInfo.municipalBody}!`);
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-zinc-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-zinc-700 flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-top-2 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main View Router */}
      {viewMode === 'carrd' ? (
        <CarrdLanding
          potholes={potholes}
          onOpenPrototype={() => setViewMode('platform')}
          onOpenReportModal={() => setIsReportModalOpen(true)}
          onSelectPothole={(p) => setSelectedPothole(p)}
          onUpvote={handleUpvote}
        />
      ) : (
        <CivicPlatform
          potholes={potholes}
          cities={cities}
          onBackToCarrd={() => setViewMode('carrd')}
          onOpenReportModal={() => setIsReportModalOpen(true)}
          onSelectPothole={(p) => setSelectedPothole(p)}
          onUpvote={handleUpvote}
        />
      )}

      {/* Persistent Floating Mode Switcher Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setViewMode((prev) => (prev === 'carrd' ? 'platform' : 'carrd'))}
          className="px-4 py-2.5 rounded-full bg-[#404040] hover:bg-[#2d2d2d] text-white shadow-xl hover:shadow-2xl flex items-center gap-2 text-xs font-bold transition-all transform active:scale-95 border border-white/20"
          title={viewMode === 'carrd' ? 'Switch to Live Civic Platform' : 'Switch to Carrd Landing Page'}
        >
          {viewMode === 'carrd' ? (
            <>
              <Compass className="w-4 h-4 text-[#C5A57F]" />
              <span>Launch Live Utility</span>
            </>
          ) : (
            <>
              <LayoutTemplate className="w-4 h-4 text-[#C5A57F]" />
              <span>Carrd Landing View</span>
            </>
          )}
        </button>
      </div>

      {/* Report Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleAddReport}
      />

      {/* Pothole Detail Modal */}
      <PotholeDetailModal
        pothole={selectedPothole}
        onClose={() => setSelectedPothole(null)}
        onUpvote={handleUpvote}
      />
    </div>
  );
}
