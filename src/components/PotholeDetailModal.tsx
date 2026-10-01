import React, { useState } from 'react';
import { PotholeReport } from '../types/pothole';
import {
  X,
  MapPin,
  Flame,
  CheckCircle2,
  Calendar,
  Share2,
  Copy,
  Check,
  Building2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Sliders,
} from 'lucide-react';

interface PotholeDetailModalProps {
  pothole: PotholeReport | null;
  onClose: () => void;
  onUpvote: (id: string) => void;
}

export const PotholeDetailModal: React.FC<PotholeDetailModalProps> = ({
  pothole,
  onClose,
  onUpvote,
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [copied, setCopied] = useState<boolean>(false);

  if (!pothole) return null;

  const isResolved = pothole.status === 'resolved';
  const hasBeforeAfter = isResolved && pothole.resolvedImageUrl;

  const handleCopyGrievance = () => {
    const text = `🚨 ROAD HAZARD ESCALATION [#${pothole.reportCode}]
Location: ${pothole.roadName}, ${pothole.location.city}
Landmark: ${pothole.nearbyLandmark}
Authority: ${pothole.wardInfo.municipalBody} (${pothole.wardInfo.wardName})
Impact: ${pothole.description}
Citizens Upvoted: ${pothole.upvotes}
Reported on Pothole.in: https://pothole.in/reports/${pothole.reportCode}

Urgent action required for commuter safety! #FixRoadsIndia #PotholeIn @${
      pothole.location.city === 'Bengaluru'
        ? 'BBMPCOMM'
        : pothole.location.city === 'Mumbai'
        ? 'mybmc'
        : pothole.location.city === 'Hyderabad'
        ? 'GHMCOnline'
        : 'PMCPune'
    }`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#F5ECE1] flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#F5ECE1] flex items-center justify-between bg-[#FDFBF8]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#F5ECE1] text-[#404040]">
              {pothole.reportCode}
            </span>
            <span className="text-xs text-zinc-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(pothole.createdAt).toLocaleDateString('en-IN', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyGrievance}
              className="px-3 py-1.5 rounded-xl border border-zinc-200 hover:border-zinc-300 text-xs font-semibold text-zinc-700 flex items-center gap-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied Tweet!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#C5A57F]" />
                  <span>Copy Grievance</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Visual: Before/After Slider or High-Res Photo */}
          <div>
            {hasBeforeAfter ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-600 font-semibold">
                  <span className="flex items-center gap-1 text-rose-600">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>BEFORE (Pothole Hazard)</span>
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600">
                    <span>AFTER (Resurfaced Road)</span>
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Repair Status Comparison in Plain Text */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-[#FDFBF8] border-4 border-[#F5ECE1]">
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-2 text-left">
                    <span className="bg-rose-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                      Initial Hazard State
                    </span>
                    <h4 className="font-bold text-sm text-rose-950">Deep Crater ({pothole.estimatedDepthCm}cm Depth)</h4>
                    <p className="text-xs text-rose-900 leading-relaxed">
                      Severe asphalt breakdown causing vehicle bottoming-out and urgent hazard to two-wheelers during monsoon showers.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2 text-left">
                    <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                      Verified Resurfacing
                    </span>
                    <h4 className="font-bold text-sm text-emerald-950">Cold Milled & DBM Restored</h4>
                    <p className="text-xs text-emerald-900 leading-relaxed">
                      {pothole.resolutionSummary || 'Dense Bituminous Macadam (DBM) layer applied. Full surface friction certified.'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl border-4 border-[#F5ECE1] bg-[#FDFBF8] text-left space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F5ECE1] pb-3">
                  <span className="bg-[#404040] text-white text-xs font-mono font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                    {pothole.reportCode} • Incident Assessment
                  </span>
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                    Depth: ~{pothole.estimatedDepthCm} cm Crater
                  </span>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Field Damage Report</span>
                  <p className="text-sm text-zinc-800 leading-relaxed font-medium bg-white p-3.5 rounded-xl border border-[#F5ECE1]">
                    "{pothole.description}"
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-[#F5ECE1]">
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Corridor Importance</span>
                    <span className="font-bold text-zinc-800">{pothole.trafficImportance} / 10 Traffic</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-[#F5ECE1]">
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Assigned Ward</span>
                    <span className="font-bold text-zinc-800 truncate block">{pothole.wardInfo.wardName}</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1 bg-white p-2.5 rounded-lg border border-[#F5ECE1]">
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Civic Reporter</span>
                    <span className="font-bold text-zinc-800 truncate block">{pothole.reporterName}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Title & Location */}
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#404040]">
              {pothole.roadName}
            </h1>
            <p className="text-sm text-zinc-600 flex items-center gap-1.5 mt-1">
              <MapPin className="w-4 h-4 text-[#C5A57F]" />
              <span>{pothole.nearbyLandmark}</span>
              <span className="text-zinc-400">·</span>
              <span className="font-semibold text-zinc-800">
                {pothole.location.city}, {pothole.location.state}
              </span>
            </p>
          </div>

          {/* Civic Resolution Progress Pipeline */}
          <div className="bg-[#FDFBF8] p-4 sm:p-5 rounded-2xl border border-[#F5ECE1] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                Civic Resolution Pipeline
              </h3>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                  isResolved
                    ? 'bg-emerald-100 text-emerald-800'
                    : pothole.status === 'assigned'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {isResolved
                  ? 'Resurfaced & Audited'
                  : pothole.status === 'assigned'
                  ? 'Contractor Deployed'
                  : 'Escalated to Municipal Ward'}
              </span>
            </div>

            {/* Stepper Steps */}
            <div className="grid grid-cols-4 gap-2 pt-2">
              <div className="text-center">
                <div className="w-7 h-7 rounded-full mx-auto mb-1 flex items-center justify-center text-xs font-bold bg-emerald-500 text-white">
                  ✓
                </div>
                <p className="text-[10px] font-semibold text-zinc-800">Citizen Report</p>
                <p className="text-[9px] text-zinc-500">Verified</p>
              </div>

              <div className="text-center">
                <div
                  className={`w-7 h-7 rounded-full mx-auto mb-1 flex items-center justify-center text-xs font-bold ${
                    pothole.upvotes >= 100
                      ? 'bg-emerald-500 text-white'
                      : 'bg-zinc-200 text-zinc-700'
                  }`}
                >
                  ✓
                </div>
                <p className="text-[10px] font-semibold text-zinc-800">Community Vote</p>
                <p className="text-[9px] text-zinc-500">{pothole.upvotes} Citizens</p>
              </div>

              <div className="text-center">
                <div
                  className={`w-7 h-7 rounded-full mx-auto mb-1 flex items-center justify-center text-xs font-bold ${
                    pothole.status === 'assigned' || isResolved
                      ? 'bg-emerald-500 text-white'
                      : pothole.status === 'escalated'
                      ? 'bg-amber-500 text-white'
                      : 'bg-zinc-200 text-zinc-500'
                  }`}
                >
                  {pothole.status === 'assigned' || isResolved ? '✓' : '3'}
                </div>
                <p className="text-[10px] font-semibold text-zinc-800">Ward Escalation</p>
                <p className="text-[9px] text-zinc-500">{pothole.wardInfo.municipalBody}</p>
              </div>

              <div className="text-center">
                <div
                  className={`w-7 h-7 rounded-full mx-auto mb-1 flex items-center justify-center text-xs font-bold ${
                    isResolved
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-200 text-zinc-500'
                  }`}
                >
                  {isResolved ? '✓' : '4'}
                </div>
                <p className="text-[10px] font-semibold text-zinc-800">Resurfacing</p>
                <p className="text-[9px] text-zinc-500">
                  {isResolved ? '5★ Rating' : 'Pending'}
                </p>
              </div>
            </div>
          </div>

          {/* Description & Ward Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                Ground Situation
              </h4>
              <p className="text-sm text-zinc-700 leading-relaxed bg-zinc-50 p-3.5 rounded-xl border border-zinc-200">
                {pothole.description}
              </p>
              {pothole.resolutionSummary && (
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-800">
                  <span className="font-bold block mb-1">Resolution Summary:</span>
                  {pothole.resolutionSummary}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                Municipal Authority Details
              </h4>
              <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-200 space-y-2 text-xs text-zinc-700">
                <div className="flex items-center justify-between pb-1.5 border-b border-zinc-200">
                  <span className="text-zinc-500">Civic Body:</span>
                  <span className="font-bold text-zinc-900 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-[#C5A57F]" />
                    {pothole.wardInfo.municipalBody}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-zinc-200">
                  <span className="text-zinc-500">Jurisdiction:</span>
                  <span className="font-semibold text-zinc-800">{pothole.wardInfo.wardName}</span>
                </div>
                {pothole.wardInfo.officerInCharge && (
                  <div className="flex items-center justify-between pb-1.5 border-b border-zinc-200">
                    <span className="text-zinc-500">Officer Contact:</span>
                    <span className="font-semibold text-zinc-800">{pothole.wardInfo.officerInCharge}</span>
                  </div>
                )}
                {pothole.wardInfo.contractorAssigned && (
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Contractor:</span>
                    <span className="font-semibold text-emerald-700">{pothole.wardInfo.contractorAssigned}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="pt-2 flex items-center justify-between border-t border-[#F5ECE1]">
            <div className="text-xs text-zinc-500">
              Reported by <span className="font-semibold text-zinc-800">{pothole.reporterName}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onUpvote(pothole.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all transform active:scale-95 ${
                  pothole.userUpvoted
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-[#F5ECE1] hover:bg-[#ebdccb] text-[#404040]'
                }`}
              >
                <span>▲ Upvote Urgency</span>
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-white/25 text-[11px]">
                  {pothole.upvotes}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
