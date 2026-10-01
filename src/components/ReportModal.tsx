import React, { useState } from 'react';
import { PotholeReport, PotholeSeverity } from '../types/pothole';
import {
  X,
  Upload,
  Camera,
  MapPin,
  Scan,
  AlertTriangle,
  Check,
  Sparkles,
  Loader2,
  Navigation,
} from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (report: PotholeReport) => void;
}

const SAMPLE_FIELD_PHOTOS = [
  { label: 'Monsoon Crater (BLR)', url: './assets/carrd/image01.jpg' },
  { label: 'Traffic Junction (HYD)', url: './assets/carrd/image02.jpg' },
  { label: 'Deep Subsidence (PUN)', url: './assets/carrd/image03.jpg' },
  { label: 'Highway Fracture (MUM)', url: './assets/carrd/image05.jpg' },
];

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(SAMPLE_FIELD_PHOTOS[0].url);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisDone, setAnalysisDone] = useState<boolean>(false);

  const [city, setCity] = useState<string>('Bengaluru');
  const [roadName, setRoadName] = useState<string>('Outer Ring Road, Kadubeesanahalli');
  const [nearbyLandmark, setNearbyLandmark] = useState<string>('Near Cisco Back Gate / Oracle Junction');
  const [severity, setSeverity] = useState<PotholeSeverity>('dangerous');
  const [description, setDescription] = useState<string>(
    'Severe road depression spanning over 1.2 meters. High risk of two-wheeler skid during night rain.'
  );
  const [depthCm, setDepthCm] = useState<number>(16);
  const [reporterName, setReporterName] = useState<string>('Citizen Warden');
  const [locating, setLocating] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
          triggerVisionAnalysis();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerVisionAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisDone(false);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisDone(true);
      setDepthCm(Math.floor(Math.random() * 12) + 10);
      setSeverity('dangerous');
    }, 1400);
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        // We set a friendly nearby landmark note
        setNearbyLandmark(`GPS Coordinates: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
      },
      () => {
        setLocating(false);
        setNearbyLandmark('Outer Ring Road Flyover Junction');
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roadName.trim()) return;

    const cityPrefix = city.slice(0, 3).toUpperCase();
    const randomCode = Math.floor(100 + Math.random() * 900);
    const reportCode = `${cityPrefix}-RD-${randomCode}`;

    const newReport: PotholeReport = {
      id: `pothole-${Date.now()}`,
      reportCode,
      imageUrl: selectedImage,
      location: {
        lat: city === 'Bengaluru' ? 12.9716 : city === 'Mumbai' ? 19.076 : city === 'Hyderabad' ? 17.385 : 18.5204,
        lng: city === 'Bengaluru' ? 77.5946 : city === 'Mumbai' ? 72.8777 : city === 'Hyderabad' ? 78.4867 : 73.8567,
        city,
        state: city === 'Bengaluru' ? 'Karnataka' : city === 'Mumbai' ? 'Maharashtra' : city === 'Hyderabad' ? 'Telangana' : 'India',
      },
      roadName,
      nearbyLandmark,
      severity,
      status: 'under_review',
      description,
      estimatedDepthCm: depthCm,
      trafficImportance: 9,
      upvotes: 1,
      userUpvoted: true,
      reporterName: reporterName || 'Anonymous Citizen',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      wardInfo: {
        wardName: `${city} Central Infrastructure Division`,
        municipalBody: city === 'Bengaluru' ? 'BBMP' : city === 'Mumbai' ? 'BMC' : city === 'Hyderabad' ? 'GHMC' : 'Municipal Corporation',
      },
    };

    onSubmit(newReport);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#F5ECE1] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#F5ECE1] flex items-center justify-between bg-[#FDFBF8]">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-[#F5ECE1] flex items-center justify-center text-[#C5A57F]">
              <Camera className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-[#404040]">
                Report Road Hazard
              </h2>
              <p className="text-xs text-zinc-500">
                AI Surface Vision Scanner & Municipal Escalation Pipeline
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
          {/* Prototype Notice Banner */}
          <div className="bg-[#F5ECE1]/70 border border-[#ebdccb] px-3.5 py-2.5 rounded-2xl flex items-center gap-2 text-xs text-[#404040]">
            <span className="font-bold text-[10px] px-1.5 py-0.5 rounded bg-[#C5A57F] text-zinc-950 uppercase tracking-wider shrink-0">
              Prototype Only
            </span>
            <span className="text-zinc-600">
              Submissions and computer vision scans are for prototype demonstration and stored in your browser.
            </span>
          </div>

          {/* Photo Scanner Section */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-2">
              1. Hazard Photo & Computer Vision
            </label>

            {/* Photo preview container with AI Scan Overlay */}
            <div className="relative w-full h-52 bg-zinc-950 rounded-2xl overflow-hidden border-4 border-[#F5ECE1] flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Selected Pothole"
                className="w-full h-full object-cover"
              />

              {/* Scanning Laser Animation */}
              {isAnalyzing && (
                <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none flex flex-col justify-between">
                  <div className="h-1 bg-emerald-400 shadow-[0_0_15px_#10b981] animate-bounce duration-1000" />
                  <div className="p-3 bg-black/75 backdrop-blur text-emerald-400 text-xs font-mono flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing crater geometry & bitumen breakdown...</span>
                  </div>
                </div>
              )}

              {/* Verified AI Badge */}
              {analysisDone && !isAnalyzing && (
                <div className="absolute top-3 right-3 bg-emerald-600/90 backdrop-blur text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>AI Scanned: {depthCm}cm Crater Depth</span>
                </div>
              )}

              {/* Re-scan Trigger Button */}
              <button
                type="button"
                onClick={triggerVisionAnalysis}
                disabled={isAnalyzing}
                className="absolute bottom-3 left-3 bg-black/75 hover:bg-black/90 text-white text-xs px-3 py-1.5 rounded-lg backdrop-blur flex items-center gap-1.5 transition-colors border border-white/20"
              >
                <Scan className="w-3.5 h-3.5 text-[#C5A57F]" />
                <span>Run Vision Scan</span>
              </button>
            </div>

            {/* Sample presets and custom file upload */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                <span className="text-[11px] text-zinc-500 font-medium">Presets:</span>
                {SAMPLE_FIELD_PHOTOS.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedImage(sample.url);
                      triggerVisionAnalysis();
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                      selectedImage === sample.url
                        ? 'bg-[#F5ECE1] border-[#C5A57F] text-[#404040] font-semibold'
                        : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300'
                    }`}
                  >
                    {sample.label}
                  </button>
                ))}
              </div>

              <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-semibold text-[#404040] bg-[#F5ECE1] hover:bg-[#ebdccb] px-3 py-1.5 rounded-xl transition-colors">
                <Upload className="w-3.5 h-3.5 text-[#C5A57F]" />
                <span>Upload My Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600">
                2. Exact Location
              </label>
              <button
                type="button"
                onClick={handleGetLocation}
                disabled={locating}
                className="text-xs text-[#C5A57F] hover:text-[#b08e64] flex items-center gap-1 font-medium transition-colors"
              >
                <Navigation className={`w-3.5 h-3.5 ${locating ? 'animate-spin' : ''}`} />
                <span>{locating ? 'Acquiring GPS...' : 'Detect GPS Location'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-zinc-500 mb-1">City Metro</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-[#404040] focus:outline-none focus:ring-2 focus:ring-[#C5A57F]"
                >
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Pune">Pune</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Kolkata">Kolkata</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs text-zinc-500 mb-1">Road / Corridor Name</label>
                <input
                  type="text"
                  required
                  value={roadName}
                  onChange={(e) => setRoadName(e.target.value)}
                  placeholder="e.g. Outer Ring Road, Marathahalli"
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-[#404040] focus:outline-none focus:ring-2 focus:ring-[#C5A57F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-zinc-500 mb-1">Nearby Landmark / Metro Pillar</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={nearbyLandmark}
                  onChange={(e) => setNearbyLandmark(e.target.value)}
                  placeholder="e.g. Opposite Metro Pillar 104 / Near Sony World Junction"
                  className="w-full pl-9 pr-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-[#404040] focus:outline-none focus:ring-2 focus:ring-[#C5A57F]"
                />
              </div>
            </div>
          </div>

          {/* Severity & Impact */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600">
              3. Hazard Severity Rating
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSeverity('dangerous')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  severity === 'dangerous'
                    ? 'border-rose-500 bg-rose-50 ring-2 ring-rose-300'
                    : 'border-zinc-200 hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center gap-1.5 text-rose-600 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Critical</span>
                </div>
                <p className="text-[11px] text-zinc-600 mt-1">
                  Deep crater, tire rim damage, two-wheeler crash risk.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setSeverity('moderate')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  severity === 'moderate'
                    ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-300'
                    : 'border-zinc-200 hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center gap-1.5 text-amber-700 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Moderate</span>
                </div>
                <p className="text-[11px] text-zinc-600 mt-1">
                  Cracking bitumen, rough uneven patch causing slow traffic.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setSeverity('low')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  severity === 'low'
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-300'
                    : 'border-zinc-200 hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center gap-1.5 text-blue-600 font-bold text-xs">
                  <Check className="w-4 h-4" />
                  <span>Low / Early</span>
                </div>
                <p className="text-[11px] text-zinc-600 mt-1">
                  Early wear and tear, preventative asphalt seal needed.
                </p>
              </button>
            </div>
          </div>

          {/* Description & Reporter */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs text-zinc-500 mb-1">Observation Details</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe road conditions, traffic impact, rain water pooling..."
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-[#404040] focus:outline-none focus:ring-2 focus:ring-[#C5A57F]"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-500 mb-1">Reporter Name / Handle</label>
              <input
                type="text"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                placeholder="e.g. Lepakshi or Anonymous"
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-[#404040] focus:outline-none focus:ring-2 focus:ring-[#C5A57F]"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#F5ECE1]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-zinc-600 hover:bg-zinc-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#C5A57F] hover:bg-[#b5936c] shadow-lg shadow-[#C5A57F]/20 flex items-center gap-2 transition-all transform active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Submit & Escalate to Ward</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
