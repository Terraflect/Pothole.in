import React, { useState } from 'react';
import { PotholeReport } from '../types/pothole';
import { Play, ArrowDown, MapPin, ThumbsUp, Camera, Sparkles, ExternalLink } from 'lucide-react';

interface CarrdLandingProps {
  onOpenPrototype: () => void;
  onOpenReportModal: () => void;
  onSelectPothole: (pothole: PotholeReport) => void;
  potholes: PotholeReport[];
  onUpvote: (id: string) => void;
}

export const CarrdLanding: React.FC<CarrdLandingProps> = ({
  onOpenPrototype,
  onOpenReportModal,
  onSelectPothole,
  potholes,
  onUpvote,
}) => {
  // Mapping the 10 carrd images to pothole data or gallery metadata
  const carrdImages = [
    {
      src: '/assets/carrd/image01.jpg',
      id: 'pothole-1',
      title: 'Outer Ring Road (ORR), Bengaluru',
      landmark: 'Near Bellandur - Marathahalli flyover',
      city: 'Bengaluru',
    },
    {
      src: '/assets/carrd/image02.jpg',
      id: 'pothole-2',
      title: 'HITEC City Main Road, Hyderabad',
      landmark: 'Near Cyber Towers Metro',
      city: 'Hyderabad',
    },
    {
      src: '/assets/carrd/image03.jpg',
      id: 'pothole-3',
      title: 'Hinjewadi Phase 1, Pune',
      landmark: 'Wipro Circle Junction',
      city: 'Pune',
    },
    {
      src: '/assets/carrd/image04.jpg',
      id: 'pothole-4',
      title: 'Whitefield Main Road, Bengaluru',
      landmark: 'Near ITPL Gate 3 (Resurfaced)',
      city: 'Bengaluru',
    },
    {
      src: '/assets/carrd/image05.jpg',
      id: 'pothole-5',
      title: 'Western Express Highway, Mumbai',
      landmark: 'Below Andheri Flyover',
      city: 'Mumbai',
    },
    {
      src: '/assets/carrd/image06.jpg',
      id: 'pothole-6',
      title: 'Koramangala 80 Feet Road, Bengaluru',
      landmark: 'Near Sony World Signal',
      city: 'Bengaluru',
    },
    {
      src: '/assets/carrd/image07.jpg',
      id: 'pothole-7',
      title: 'Noida Expressway Service Road, Delhi NCR',
      landmark: 'Opposite Sector 128',
      city: 'Delhi NCR',
    },
    {
      src: '/assets/carrd/image08.jpg',
      id: 'pothole-8',
      title: 'Old Mahabalipuram Road (OMR), Chennai',
      landmark: 'Near Sholinganallur Junction',
      city: 'Chennai',
    },
    {
      src: '/assets/carrd/image09.jpg',
      id: 'pothole-9',
      title: 'BKC Connector, Mumbai',
      landmark: 'Near Jio World Garden',
      city: 'Mumbai',
    },
    {
      src: '/assets/carrd/image10.jpg',
      id: 'pothole-10',
      title: 'Salt Lake Sector V, Kolkata',
      landmark: 'Near College More',
      city: 'Kolkata',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#404040] selection:bg-[#F5ECE1] selection:text-[#404040]">
      {/* Prototype Notice Banner */}
      <div className="bg-[#404040] text-zinc-200 px-4 py-2 text-center text-xs flex items-center justify-center gap-2 border-b border-zinc-800">
        <span className="bg-[#C5A57F] text-zinc-950 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
          Prototype Only
        </span>
        <span>
          Pothole.in is currently an experimental prototype & concept demonstration.
        </span>
      </div>

      {/* Top Dynamic Bar to highlight interactive capabilities */}
      <div className="sticky top-0 z-40 bg-[#F5ECE1]/95 backdrop-blur-md border-b border-[#ebdccb] px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-[#404040]">Pothole.in Live Network:</span>
          <span className="text-zinc-600 hidden sm:inline">1,482 community reports tracked across India</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenReportModal}
            className="px-3 py-1 bg-white hover:bg-zinc-50 border border-[#C5A57F]/40 text-[#404040] font-semibold rounded-full flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
          >
            <Camera className="w-3.5 h-3.5 text-[#C5A57F]" />
            <span>Report Road</span>
          </button>
          <button
            onClick={onOpenPrototype}
            className="px-3.5 py-1 bg-[#404040] hover:bg-[#2d2d2d] text-white font-semibold rounded-full flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
          >
            <Sparkles className="w-3 h-3 text-[#C5A57F]" />
            <span>Launch Live App</span>
          </button>
        </div>
      </div>

      {/* Main Carrd Container matching exact layout: max-w-[45rem], padding 6rem 4rem */}
      <main className="max-w-[45rem] mx-auto px-6 sm:px-12 py-16 sm:py-24 text-center">
        {/* ================= CONTAINER 05 (Hero) ================= */}
        <section className="space-y-8 flex flex-col items-center">
          {/* Text08: Uppercase Pothole.in */}
          <p className="text-sm tracking-[0.2rem] uppercase font-semibold text-[#C5A57F] select-none">
            Pothole.in
          </p>

          {/* Gallery01: Hero Thumbnail */}
          <div className="relative group cursor-pointer" onClick={onOpenPrototype}>
            <div className="overflow-hidden rounded-sm transition-transform duration-300 group-hover:scale-102">
              <img
                src="/assets/carrd/a0b0b722.jpg"
                alt="Pothole.in Hero Graphic"
                className="max-h-60 sm:max-h-72 w-auto mx-auto object-contain"
              />
            </div>
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-sm">
              <span className="bg-white/90 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md text-[#404040]">
                Click to explore prototype
              </span>
            </div>
          </div>

          {/* Buttons02: Play Demo/Prototype */}
          <div>
            <button
              onClick={onOpenPrototype}
              className="inline-flex items-center gap-3 h-16 px-8 rounded-full bg-[#F5ECE1] hover:bg-[#eddcc9] text-[#404040] font-semibold text-base transition-all duration-200 hover:scale-106 active:scale-95 shadow-sm group"
            >
              <span className="tracking-wide">Demo/Prototype</span>
              {/* Play SVG matching authentic carrd icon */}
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[#C5A57F] group-hover:translate-x-0.5 transition-transform">
                <Play className="w-4 h-4 fill-[#C5A57F]" />
              </div>
            </button>
          </div>

          {/* Text01: Giant Headline */}
          <h1 className="font-extrabold text-[#404040] text-4xl sm:text-6xl tracking-tight leading-[1.15] max-w-lg mx-auto">
            Fixing Roads
            <br />
            For a Better India
          </h1>

          {/* Icons01: Arrow Down */}
          <div className="pt-2">
            <a
              href="#start"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full text-[#C5A57F] hover:text-[#b4916a] transition-transform animate-bounce-subtle"
              aria-label="Scroll to details"
            >
              <ArrowDown className="w-7 h-7 stroke-[2.5]" />
            </a>
          </div>
        </section>

        {/* ================= CONTAINER 04 (Make an Impact) ================= */}
        <section id="start" className="pt-20 sm:pt-28 space-y-8 flex flex-col items-center">
          {/* Text24: Make an Impact */}
          <h2 className="font-extrabold text-[#404040] text-3xl sm:text-4xl tracking-tight">
            Make an Impact
          </h2>

          {/* Text25: Description */}
          <div className="space-y-4 text-base sm:text-lg text-[#404040]/80 font-medium leading-relaxed max-w-md mx-auto">
            <p>An open source, community driven project.</p>
            <p>
              Connect on Reddit
              <br />
              Message to discuss, collaborate, or support.
            </p>
            <p className="text-zinc-500 text-sm sm:text-base">(The site is currently under construction • Prototype Only)</p>
            <p className="font-semibold text-[#404040]">~ By Lepakshi</p>
            <div className="pt-1">
              <span className="inline-block text-[11px] text-zinc-500 bg-[#F5ECE1]/70 border border-[#ebdccb] px-3 py-1 rounded-full font-medium">
                ⚠️ Prototype Demonstration Only — Features and flows are simulated for pilot evaluation.
              </span>
            </div>
          </div>

          {/* Buttons01: Reddit */}
          <div>
            <a
              href="https://www.reddit.com/user/Radiantide/?utm_source=share&utm_medium=mweb3x&utm_name=mweb3xcss&utm_term=1&utm_content=share_button"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 h-16 px-8 rounded-full bg-[#F5ECE1] hover:bg-[#eddcc9] text-[#404040] font-semibold text-base transition-all duration-200 hover:scale-106 active:scale-95 shadow-sm group"
            >
              <span className="tracking-wide">Reddit</span>
              {/* Reddit SVG Icon */}
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-[#C5A57F] group-hover:scale-110 transition-transform"
              >
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.56 12 8 12.56 8 13.25c0 .69.56 1.25 1.25 1.25.69 0 1.25-.56 1.25-1.25C10.5 12.56 9.94 12 9.25 12zm5.5 0c-.69 0-1.25.56-1.25 1.25 0 .69.56 1.25 1.25 1.25.69 0 1.25-.56 1.25-1.25 0-.69-.56-1.25-1.25-1.25zm-5.465 4.577c-.15 0-.3.06-.41.17-.22.23-.21.59.02.81 1.05 1.01 2.45 1.34 3.105 1.34s2.055-.33 3.105-1.34c.23-.22.24-.58.02-.81-.22-.23-.58-.24-.81-.02-.8.77-1.87 1.02-2.315 1.02-.445 0-1.515-.25-2.315-1.02a.573.573 0 0 0-.4-.15z" />
              </svg>
            </a>
          </div>

          {/* Divider01 */}
          <div className="w-full pt-4">
            <hr className="border-t-2 border-[#F5ECE1] w-full" />
          </div>

          {/* Interactive Action Callout on Gallery */}
          <div className="w-full flex items-center justify-between text-xs text-zinc-500 pt-2 px-1">
            <span className="font-semibold uppercase tracking-wider text-[#C5A57F]">
              Pothole Evidence Gallery (10 Locations)
            </span>
            <span className="text-zinc-400">Click any image to inspect or vote</span>
          </div>

          {/* Image Stream: image01 to image10 with exact 10px #F5ECE1 border and rounded corners */}
          <div className="w-full space-y-12">
            {carrdImages.map((img, index) => {
              const matchedPothole = potholes.find((p) => p.id === img.id);
              const upvotes = matchedPothole?.upvotes || 120 + index * 34;

              return (
                <div
                  key={index}
                  className="relative group rounded-xl overflow-hidden cursor-pointer"
                  style={{
                    border: '10px solid #F5ECE1',
                    borderRadius: '0.75rem',
                  }}
                  onClick={() => {
                    if (matchedPothole) {
                      onSelectPothole(matchedPothole);
                    }
                  }}
                >
                  <div className="h-80 sm:h-96 w-full overflow-hidden bg-zinc-900">
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-full object-cover object-right transition-transform duration-500 group-hover:scale-103"
                    />
                  </div>

                  {/* Dynamic Floating Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 sm:p-6 text-left">
                    <div className="flex items-center justify-between">
                      <span className="bg-[#F5ECE1] text-[#404040] text-xs font-mono font-bold px-2.5 py-1 rounded-md uppercase">
                        Spot #{index + 1}
                      </span>
                      <span className="text-xs bg-black/60 text-white backdrop-blur px-2.5 py-1 rounded-full flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#C5A57F]" />
                        {img.city}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-white font-bold text-base sm:text-lg">
                        {img.title}
                      </h4>
                      <p className="text-zinc-300 text-xs flex items-center gap-1">
                        {img.landmark}
                      </p>
                      <div className="pt-2 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (matchedPothole) {
                              onUpvote(matchedPothole.id);
                            }
                          }}
                          className="px-3 py-1.5 bg-[#C5A57F] hover:bg-[#b08e64] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>Upvote ({upvotes})</span>
                        </button>
                        <span className="text-white text-xs underline underline-offset-4 font-semibold">
                          View Ward Status →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Dynamic CTA at bottom of gallery */}
          <div className="w-full bg-[#FDFBF8] border-2 border-dashed border-[#F5ECE1] rounded-2xl p-6 sm:p-8 text-center space-y-4">
            <h3 className="text-xl font-bold text-[#404040]">
              Encountered a bad pothole on your daily commute?
            </h3>
            <p className="text-sm text-zinc-600 max-w-md mx-auto">
              Snap a picture. Our civic engine flags it to municipal authorities and tracks resurfacing progress.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={onOpenReportModal}
                className="px-6 py-3 rounded-full bg-[#C5A57F] hover:bg-[#b5926b] text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all active:scale-95"
              >
                <Camera className="w-4 h-4" />
                <span>Report A Pothole Now</span>
              </button>
              <button
                onClick={onOpenPrototype}
                className="px-6 py-3 rounded-full bg-[#F5ECE1] hover:bg-[#eddcc9] text-[#404040] font-bold text-sm flex items-center gap-2 transition-all active:scale-95"
              >
                <span>Open Civic Dashboard</span>
              </button>
            </div>
          </div>
        </section>

        {/* Credits / Footer */}
        <footer className="pt-24 pb-8 space-y-4">
          <div className="text-xs text-zinc-500 flex flex-wrap items-center justify-center gap-2">
            <span>© 2026 Pothole.in</span>
            <span>•</span>
            <a
              href="https://carrd.com/build?ref=auto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#404040] hover:underline flex items-center gap-1 font-medium"
            >
              <span>Made with Carrd</span>
              <ExternalLink className="w-3 h-3 text-zinc-400" />
            </a>
            <span>•</span>
            <span>Created by Lepakshi</span>
            <span>•</span>
            <span className="font-semibold text-[#C5A57F]">Prototype Only</span>
          </div>
          <p className="text-[11px] text-zinc-400">
            Disclaimer: Pothole.in is a non-governmental civic concept prototype for testing road condition reporting workflows.
          </p>
        </footer>
      </main>
    </div>
  );
};
