import React, { useState } from 'react';
import { PotholeReport, CityStat, PotholeSeverity, PotholeStatus } from '../types/pothole';
import { InteractiveMap } from './InteractiveMap';
import {
  Search,
  Filter,
  Flame,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  ThumbsUp,
  Camera,
  ArrowLeft,
  Building2,
  Clock,
  Sparkles,
  Sliders,
  TrendingUp,
  Award,
  Share2,
} from 'lucide-react';

interface CivicPlatformProps {
  potholes: PotholeReport[];
  cities: CityStat[];
  onBackToCarrd: () => void;
  onOpenReportModal: () => void;
  onSelectPothole: (pothole: PotholeReport) => void;
  onUpvote: (id: string) => void;
}

export const CivicPlatform: React.FC<CivicPlatformProps> = ({
  potholes,
  cities,
  onBackToCarrd,
  onOpenReportModal,
  onSelectPothole,
  onUpvote,
}) => {
  const [activeTab, setActiveTab] = useState<'feed' | 'resolved' | 'wards' | 'stats'>('feed');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter logic
  const filteredPotholes = potholes.filter((p) => {
    if (selectedCity !== 'All' && p.location.city.toLowerCase() !== selectedCity.toLowerCase()) {
      return false;
    }
    if (severityFilter !== 'all' && p.severity !== severityFilter) {
      return false;
    }
    if (statusFilter !== 'all' && p.status !== statusFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchRoad = p.roadName.toLowerCase().includes(q);
      const matchLandmark = p.nearbyLandmark.toLowerCase().includes(q);
      const matchCity = p.location.city.toLowerCase().includes(q);
      const matchCode = p.reportCode.toLowerCase().includes(q);
      if (!matchRoad && !matchLandmark && !matchCity && !matchCode) {
        return false;
      }
    }
    return true;
  });

  const resolvedPotholes = potholes.filter((p) => p.status === 'resolved');

  const totalUpvotes = potholes.reduce((acc, curr) => acc + curr.upvotes, 0);

  return (
    <div className="min-h-screen bg-[#FDFBF8] text-[#404040]">
      {/* Top Application Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#F5ECE1] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Version */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToCarrd}
              className="p-2 -ml-2 text-zinc-500 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Return to Carrd Landing View"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Landing Page</span>
            </button>

            <div className="h-5 w-px bg-zinc-200" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#C5A57F] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                P
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight text-[#404040]">
                    Pothole.in
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#F5ECE1] text-[#404040] font-semibold">
                    v0.6.2 Beta
                  </span>
                </div>
                <span className="text-[10px] text-zinc-500 font-medium hidden sm:block">
                  Civic Utility Ecosystem for Indian Roads
                </span>
              </div>
            </div>
          </div>

          {/* Right Header CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenReportModal}
              className="px-4 py-2 bg-[#C5A57F] hover:bg-[#b39169] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 shadow-md shadow-[#C5A57F]/20 transition-all active:scale-95"
            >
              <Camera className="w-4 h-4" />
              <span>Report Pothole</span>
            </button>
          </div>
        </div>
      </header>

      {/* Prototype Disclaimer Alert Strip */}
      <div className="bg-[#404040] text-zinc-200 border-b border-zinc-800 px-4 py-2 text-xs flex flex-wrap items-center justify-center gap-2">
        <span className="font-bold px-2 py-0.5 rounded bg-[#C5A57F] text-zinc-950 text-[10px] uppercase tracking-wider">
          Prototype Only
        </span>
        <span className="text-zinc-300">
          This system is an interactive demonstration & pilot prototype. Road reports, simulated vision AI scans, and municipal escalations are for prototype testing.
        </span>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Metric Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-[#F5ECE1] shadow-2xs">
            <div className="flex items-center justify-between text-zinc-500 mb-1">
              <span className="text-xs font-medium">Roads Tracked</span>
              <MapPin className="w-4 h-4 text-[#C5A57F]" />
            </div>
            <div className="text-2xl font-black text-[#404040]">1,685</div>
            <p className="text-[11px] text-zinc-500 mt-0.5">Across 7 metro clusters</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#F5ECE1] shadow-2xs">
            <div className="flex items-center justify-between text-zinc-500 mb-1">
              <span className="text-xs font-medium">Resurfaced & Fixed</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-700">819</div>
            <p className="text-[11px] text-emerald-600 mt-0.5">Citizen verified safe</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#F5ECE1] shadow-2xs">
            <div className="flex items-center justify-between text-zinc-500 mb-1">
              <span className="text-xs font-medium">Citizen Upvotes</span>
              <ThumbsUp className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-[#404040]">{totalUpvotes}</div>
            <p className="text-[11px] text-zinc-500 mt-0.5">Community pressure votes</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#F5ECE1] shadow-2xs">
            <div className="flex items-center justify-between text-zinc-500 mb-1">
              <span className="text-xs font-medium">Avg Ward Turnaround</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-[#404040]">4.2 Days</div>
            <p className="text-[11px] text-zinc-500 mt-0.5">Fast-track cold mix/mastic</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-[#F5ECE1] pb-3 gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('feed')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'feed'
                  ? 'bg-[#404040] text-white shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-[#F5ECE1]/60'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Map & Live Hotspots</span>
            </button>

            <button
              onClick={() => setActiveTab('resolved')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'resolved'
                  ? 'bg-[#404040] text-white shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-[#F5ECE1]/60'
              }`}
            >
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>Before & After Verifications ({resolvedPotholes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('wards')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'wards'
                  ? 'bg-[#404040] text-white shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-[#F5ECE1]/60'
              }`}
            >
              <Building2 className="w-4 h-4 text-[#C5A57F]" />
              <span>Municipal Wards</span>
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'stats'
                  ? 'bg-[#404040] text-white shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-[#F5ECE1]/60'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span>City Leaderboard</span>
            </button>
          </div>

          <button
            onClick={onOpenReportModal}
            className="text-xs font-semibold text-[#C5A57F] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>+ Add Hazard</span>
          </button>
        </div>

        {/* TAB 1: FEED & MAP */}
        {activeTab === 'feed' && (
          <div className="space-y-6">
            {/* Interactive Map Visualizer */}
            <InteractiveMap
              potholes={potholes}
              cities={cities}
              selectedCity={selectedCity}
              onSelectCity={setSelectedCity}
              onSelectPothole={onSelectPothole}
            />

            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-[#F5ECE1] shadow-2xs space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {/* Search */}
                <div className="sm:col-span-2 relative">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search road name, landmark, or code (e.g. ORR, Whitefield, BLR)..."
                    className="w-full pl-9 pr-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm text-[#404040] focus:outline-none focus:ring-2 focus:ring-[#C5A57F]"
                  />
                </div>

                {/* Severity Filter */}
                <div>
                  <select
                    value={severityFilter}
                    onChange={(e) => setSeverityFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm text-[#404040] focus:outline-none focus:ring-2 focus:ring-[#C5A57F]"
                  >
                    <option value="all">All Severities</option>
                    <option value="dangerous">Critical / Dangerous</option>
                    <option value="moderate">Moderate Cracks</option>
                    <option value="low">Low Surface Wear</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm text-[#404040] focus:outline-none focus:ring-2 focus:ring-[#C5A57F]"
                  >
                    <option value="all">All Statuses</option>
                    <option value="under_review">Under Community Review</option>
                    <option value="escalated">Escalated to Ward</option>
                    <option value="assigned">Contractor Assigned</option>
                    <option value="resolved">Fixed & Verified</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-500 pt-1">
                <span>
                  Showing <strong className="text-zinc-800">{filteredPotholes.length}</strong> reports in{' '}
                  <strong className="text-[#C5A57F]">{selectedCity}</strong>
                </span>
                {(selectedCity !== 'All' || severityFilter !== 'all' || statusFilter !== 'all' || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCity('All');
                      setSeverityFilter('all');
                      setStatusFilter('all');
                      setSearchQuery('');
                    }}
                    className="text-xs text-rose-600 hover:underline"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>

            {/* Pothole Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPotholes.map((pothole) => {
                const isDangerous = pothole.severity === 'dangerous';
                const isResolved = pothole.status === 'resolved';

                return (
                  <div
                    key={pothole.id}
                    className="bg-white rounded-2xl border border-[#F5ECE1] shadow-2xs overflow-hidden flex flex-col hover:border-[#C5A57F]/60 transition-all group"
                  >
                    {/* Card Incident Header - Plain & Nice Relevant Text (Replaces image) */}
                    <div
                      className="p-4 sm:p-5 bg-gradient-to-br from-[#FDFBF8] to-[#F5ECE1]/60 border-b border-[#F5ECE1] cursor-pointer hover:bg-[#F5ECE1]/40 transition-colors"
                      onClick={() => onSelectPothole(pothole)}
                    >
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="bg-[#404040] text-white text-[11px] font-mono font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-2xs">
                          {pothole.reportCode}
                        </span>

                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs ${
                            isResolved
                              ? 'bg-emerald-600 text-white'
                              : isDangerous
                              ? 'bg-rose-600 text-white'
                              : 'bg-amber-500 text-white'
                          }`}
                        >
                          {isResolved ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Fixed & Resurfaced</span>
                            </>
                          ) : isDangerous ? (
                            <>
                              <Flame className="w-3 h-3" />
                              <span>Critical Crater</span>
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-3 h-3" />
                              <span>Moderate Risk</span>
                            </>
                          )}
                        </span>
                      </div>

                      {/* Evidence Highlight in Plain Text */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-semibold text-[#404040]">
                          <span className="flex items-center gap-1 text-[#C5A57F]">
                            <span>Crater Depth:</span>
                            <span className="font-mono text-zinc-900 font-bold">~{pothole.estimatedDepthCm} cm</span>
                          </span>
                          <span className="text-zinc-500 text-[11px]">
                            Traffic Impact: {pothole.trafficImportance}/10
                          </span>
                        </div>
                        <p className="text-xs text-zinc-700 font-medium leading-relaxed line-clamp-2 bg-white/70 p-2 rounded-lg border border-[#F5ECE1]/80">
                          "{pothole.description}"
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-[#F5ECE1] flex items-center justify-between text-[10px] text-zinc-500 font-medium">
                        <span>Reported by {pothole.reporterName}</span>
                        <span className="text-[#C5A57F] font-bold group-hover:underline">View details →</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center gap-1 text-[11px] text-zinc-500 mb-1">
                          <MapPin className="w-3 h-3 text-[#C5A57F]" />
                          <span className="font-semibold text-zinc-700">{pothole.location.city}</span>
                          <span>·</span>
                          <span className="truncate">{pothole.nearbyLandmark}</span>
                        </div>

                        <h3
                          className="font-bold text-sm text-[#404040] hover:text-[#C5A57F] transition-colors cursor-pointer line-clamp-2"
                          onClick={() => onSelectPothole(pothole)}
                        >
                          {pothole.roadName}
                        </h3>

                        <p className="text-xs text-zinc-600 line-clamp-2 mt-1 leading-relaxed">
                          {pothole.description}
                        </p>
                      </div>

                      {/* Municipal Ward Tag */}
                      <div className="bg-[#FDFBF8] p-2 rounded-xl border border-[#F5ECE1] flex items-center justify-between text-[11px] text-zinc-600">
                        <span className="flex items-center gap-1 font-medium truncate">
                          <Building2 className="w-3 h-3 text-[#C5A57F]" />
                          <span>{pothole.wardInfo.municipalBody}</span>
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono">
                          {pothole.wardInfo.wardName}
                        </span>
                      </div>

                      {/* Bottom Action Footer */}
                      <div className="pt-2 border-t border-[#F5ECE1] flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => onUpvote(pothole.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                            pothole.userUpvoted
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#F5ECE1] hover:bg-[#ebdccb] text-[#404040]'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{pothole.upvotes}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onSelectPothole(pothole)}
                          className="text-xs font-semibold text-[#404040] hover:text-[#C5A57F] flex items-center gap-1"
                        >
                          <span>Track Ward</span>
                          <span>→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: RESOLVED BEFORE & AFTER */}
        {activeTab === 'resolved' && (
          <div className="space-y-6">
            <div className="bg-[#F5ECE1]/50 p-6 rounded-3xl border border-[#F5ECE1] text-center space-y-2">
              <h2 className="text-2xl font-black text-[#404040]">
                Verified Road Resurfacings
              </h2>
              <p className="text-sm text-zinc-600 max-w-xl mx-auto">
                Real evidence of citizen reporting driving civic action. These roads were flagged by the community and subsequently resurfaced by city authorities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resolvedPotholes.map((pothole) => (
                <div
                  key={pothole.id}
                  className="bg-white rounded-3xl border border-[#F5ECE1] p-5 shadow-2xs space-y-4 hover:border-[#C5A57F] transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#C5A57F] uppercase">
                        {pothole.reportCode}
                      </span>
                      <h3 className="text-lg font-bold text-[#404040]">
                        {pothole.roadName}
                      </h3>
                      <p className="text-xs text-zinc-500">{pothole.location.city}, {pothole.location.state}</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>5★ Verified Fix</span>
                    </span>
                  </div>

                  {/* Split Visual Status in Plain Text */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-white border-2 border-[#F5ECE1]">
                    <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                          Hazard State (Before)
                        </span>
                        <span className="text-rose-700 font-mono text-xs font-bold">~{pothole.estimatedDepthCm} cm depth</span>
                      </div>
                      <p className="text-xs text-rose-950 leading-relaxed pt-1">
                        Dangerous asphalt cavity with water accumulation, causing bottoming-out and two-wheeler skidding risks.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                          Resurfaced (After)
                        </span>
                        <span className="text-emerald-700 font-bold text-xs">5★ Verified Smooth</span>
                      </div>
                      <p className="text-xs text-emerald-950 leading-relaxed pt-1">
                        Dense Bituminous Macadam (DBM) applied, road friction restored, certified safe for monsoon traffic.
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-600 leading-relaxed bg-[#FDFBF8] p-3 rounded-xl border border-[#F5ECE1]">
                    {pothole.resolutionSummary}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-zinc-500">
                      Resurfaced by {pothole.wardInfo.contractorAssigned || pothole.wardInfo.municipalBody}
                    </span>
                    <button
                      onClick={() => onSelectPothole(pothole)}
                      className="px-4 py-2 bg-[#F5ECE1] hover:bg-[#eddcc9] text-xs font-bold rounded-xl text-[#404040] transition-colors"
                    >
                      Compare Interactive Slider →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MUNICIPAL WARDS & AUTHORITIES */}
        {activeTab === 'wards' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-[#F5ECE1] shadow-2xs space-y-4">
              <h2 className="text-xl font-bold text-[#404040]">
                Connected Civic Corporations & Wards
              </h2>
              <p className="text-xs text-zinc-600 max-w-2xl leading-relaxed">
                Pothole.in routes geo-tagged citizen grievances directly into the official portal channels of municipal road divisions across India.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl border border-[#F5ECE1] bg-[#FDFBF8] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-zinc-900">BBMP (Bengaluru)</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                      Active Portal
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500">Bruhat Bengaluru Mahanagara Palike Road Infrastructure Wing</p>
                  <div className="text-xs text-zinc-700 font-medium pt-2 border-t border-zinc-200">
                    <div>Ward Resolution Rate: <strong>68%</strong></div>
                    <div>Hotspot Focus: Outer Ring Road, Whitefield, Koramangala</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-[#F5ECE1] bg-[#FDFBF8] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-zinc-900">BMC (Mumbai)</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                      Active Portal
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500">Brihanmumbai Municipal Corporation Roads & Traffic Dept</p>
                  <div className="text-xs text-zinc-700 font-medium pt-2 border-t border-zinc-200">
                    <div>Ward Resolution Rate: <strong>72%</strong></div>
                    <div>Hotspot Focus: Western Express Highway, Andheri, BKC</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-[#F5ECE1] bg-[#FDFBF8] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-zinc-900">GHMC (Hyderabad)</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                      Active Portal
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500">Greater Hyderabad Municipal Corp IT Corridor Maintenance</p>
                  <div className="text-xs text-zinc-700 font-medium pt-2 border-t border-zinc-200">
                    <div>Ward Resolution Rate: <strong>64%</strong></div>
                    <div>Hotspot Focus: HITEC City, Madhapur, Gachibowli</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-[#F5ECE1] bg-[#FDFBF8] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-zinc-900">PMC (Pune)</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                      Active Portal
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500">Pune Municipal Corp & MIDC Infrastructure Cell</p>
                  <div className="text-xs text-zinc-700 font-medium pt-2 border-t border-zinc-200">
                    <div>Ward Resolution Rate: <strong>59%</strong></div>
                    <div>Hotspot Focus: Hinjewadi Phase 1-3, Baner, Viman Nagar</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-[#F5ECE1] bg-[#FDFBF8] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-zinc-900">Noida Authority / MCD</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                      Active Portal
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500">Delhi-NCR Public Works Department (PWD)</p>
                  <div className="text-xs text-zinc-700 font-medium pt-2 border-t border-zinc-200">
                    <div>Ward Resolution Rate: <strong>65%</strong></div>
                    <div>Hotspot Focus: Expressway Service Corridors, Ring Road</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-[#F5ECE1] bg-[#FDFBF8] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-zinc-900">GCC / TNRDC (Chennai)</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                      Active Portal
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500">Greater Chennai Corporation Special Projects Road Cell</p>
                  <div className="text-xs text-zinc-700 font-medium pt-2 border-t border-zinc-200">
                    <div>Ward Resolution Rate: <strong>62%</strong></div>
                    <div>Hotspot Focus: OMR IT Corridor, Sholinganallur, Guindy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CITY LEADERBOARD */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-[#F5ECE1] shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#404040]">Metro Civic Action Leaderboard</h2>
                  <p className="text-xs text-zinc-500">Ranking cities by active reports, citizen participation, and municipal fix velocity</p>
                </div>
                <Award className="w-8 h-8 text-[#C5A57F]" />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-zinc-700">
                  <thead className="bg-[#FDFBF8] text-zinc-500 uppercase tracking-wider text-[10px] border-b border-[#F5ECE1]">
                    <tr>
                      <th className="py-3 px-4">Rank / Metro</th>
                      <th className="py-3 px-4">State</th>
                      <th className="py-3 px-4">Active Reports</th>
                      <th className="py-3 px-4">Fixed & Verified</th>
                      <th className="py-3 px-4">Response Efficiency</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F5ECE1]">
                    {cities.map((city, idx) => (
                      <tr key={city.name} className="hover:bg-zinc-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-zinc-900 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#F5ECE1] text-[#404040] flex items-center justify-center text-[10px]">
                            {idx + 1}
                          </span>
                          <span>{city.name}</span>
                        </td>
                        <td className="py-3.5 px-4 text-zinc-500">{city.state}</td>
                        <td className="py-3.5 px-4 font-semibold text-rose-600">{city.activeReports}</td>
                        <td className="py-3.5 px-4 font-semibold text-emerald-600">{city.resolvedReports}</td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-zinc-200 h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-[#C5A57F] h-full rounded-full"
                                style={{ width: city.responseRate }}
                              />
                            </div>
                            <span className="font-bold text-zinc-800">{city.responseRate}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedCity(city.name);
                              setActiveTab('feed');
                            }}
                            className="px-3 py-1 rounded-lg bg-[#F5ECE1] hover:bg-[#eddcc9] text-xs font-semibold text-[#404040]"
                          >
                            View Hotspots
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
