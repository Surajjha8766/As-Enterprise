import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Zap, ShieldCheck, CheckCircle2 } from "lucide-react";

/**
 * CyberCompanion ("VoltBot")
 * An interactive electronics-themed animated cyber robot companion.
 * On desktop: Tracks cursor movement with smooth spring/lerp physics, has glowing LED eyes
 * that aim towards the cursor, animated PCB thrusters, microchip chassis,
 * and reacts to clicks/hover with scanning HUD effects.
 * On mobile: Renders a sleek floating interactive micro-diagnostic pill with live inspection pulse.
 */
export default function CyberCompanion({ containerRef }) {
  const [position, setPosition] = useState({ x: 120, y: 120 });
  const [targetPos, setTargetPos] = useState({ x: 120, y: 120 });
  const [eyeAngle, setEyeAngle] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [statusMessage, setStatusMessage] = useState("⚡ SMT SCANNER READY");
  const [isHovered, setIsHovered] = useState(false);
  const [mobileMessageIndex, setMobileMessageIndex] = useState(0);
  
  const botRef = useRef(null);
  const animFrameRef = useRef(null);
  const currentPosRef = useRef({ x: 120, y: 120 });
  const targetPosRef = useRef({ x: 120, y: 120 });

  // Status messages that rotate
  const scanMessages = [
    "⚡ 30 MPNs Verified",
    "✓ SMT Feeder Ready",
    "🔍 0% Defect Tolerance",
    "🛡️ 100% Traceable",
    "⚡ Anti-Counterfeit OK",
    "📦 Reel Stock Confirmed"
  ];

  // Mouse move listener with relative bounds
  useEffect(() => {
    const handleMouseMove = (e) => {
      let heroRect = null;
      if (containerRef && containerRef.current) {
        heroRect = containerRef.current.getBoundingClientRect();
      }

      const clientX = e.clientX;
      const clientY = e.clientY;

      if (heroRect) {
        // Keep within hero boundaries with padding
        const boundedX = Math.max(30, Math.min(heroRect.width - 90, clientX - heroRect.left));
        const boundedY = Math.max(20, Math.min(heroRect.height - 90, clientY - heroRect.top));
        targetPosRef.current = { x: boundedX, y: boundedY };
      } else {
        targetPosRef.current = { x: clientX, y: clientY };
      }

      // Compute angle between bot and cursor for realistic eye tracking
      const botEl = botRef.current;
      if (botEl) {
        const rect = botEl.getBoundingClientRect();
        const botCenterX = rect.left + rect.width / 2;
        const botCenterY = rect.top + rect.height / 2;
        const deltaX = clientX - botCenterX;
        const deltaY = clientY - botCenterY;
        const angle = Math.atan2(deltaY, deltaX);
        setEyeAngle(angle);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Smooth Lerp loop for silky organic floating motion
    const animate = () => {
      const lerpSpeed = 0.065; // Soft natural following delay
      currentPosRef.current.x += (targetPosRef.current.x - currentPosRef.current.x) * lerpSpeed;
      currentPosRef.current.y += (targetPosRef.current.y - currentPosRef.current.y) * lerpSpeed;

      setPosition({
        x: Math.round(currentPosRef.current.x * 10) / 10,
        y: Math.round(currentPosRef.current.y * 10) / 10
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [containerRef]);

  // Click to trigger scan pulse
  const triggerScan = () => {
    setIsScanning(true);
    const nextIdx = (mobileMessageIndex + 1) % scanMessages.length;
    setMobileMessageIndex(nextIdx);
    const randomMsg = scanMessages[nextIdx];
    setStatusMessage(randomMsg);
    setTimeout(() => {
      setIsScanning(false);
    }, 1200);
  };

  // Calculate eye pupil offset based on angle (max 3.5px offset)
  const pupilX = Math.cos(eyeAngle) * 3.5;
  const pupilY = Math.sin(eyeAngle) * 3.5;

  return (
    <>
      {/* 1. Mobile & Tablet Micro HUD Pill (Visible on screens < md) */}
      <div className="md:hidden flex items-center justify-between gap-2 px-3 py-1.5 mb-3 rounded-lg bg-slate-900/90 text-white border border-sky-500/30 shadow-xs backdrop-blur-md">
        <button
          type="button"
          onClick={triggerScan}
          className="flex items-center gap-2 text-left w-full focus:outline-none"
        >
          <div className="relative w-6 h-6 rounded-md bg-slate-800 border border-cyan-400 flex items-center justify-center shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="absolute w-1 h-1 rounded-full bg-white"></span>
          </div>
          <div className="truncate text-[11px] font-mono">
            <span className="text-cyan-300 font-bold mr-1.5">VOLT-BOT:</span>
            <span className="text-slate-200">{scanMessages[mobileMessageIndex]}</span>
          </div>
          <span className="ml-auto text-[10px] text-cyan-400 font-semibold uppercase tracking-wider shrink-0">
            TAP TO SCAN
          </span>
        </button>
      </div>

      {/* 2. Desktop Floating Animated Robot Companion (Tracks cursor with Lerp physics) */}
      <div
        ref={botRef}
        style={{
          transform: `translate3d(${position.x - 38}px, ${position.y - 38}px, 0)`,
          transition: "transform 0.08s ease-out"
        }}
        className="absolute top-0 left-0 z-20 pointer-events-auto select-none hidden md:block cursor-pointer group"
        onClick={triggerScan}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title="VoltBot — Electronic Hardware Inspector (Click to scan)"
      >
        {/* Dynamic Status / Speech Bubble */}
        <div
          className={`absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full text-[10px] font-mono font-semibold transition-all duration-300 shadow-md border ${
            isScanning
              ? "bg-emerald-500 text-white border-emerald-300 scale-105 shadow-emerald-500/40"
              : isHovered
              ? "bg-sky-950 text-white border-sky-400 shadow-sky-500/40"
              : "bg-slate-950/85 backdrop-blur-md text-cyan-300 border-cyan-500/40 shadow-slate-950/30"
          }`}
        >
          {isScanning ? "⚡ SCANNING COMPONENT LINE..." : statusMessage}
        </div>

        {/* Robot Chassis: Microchip & Circuit Aesthetic */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          
          {/* Scanning Laser Beam (on click/active) */}
          {isScanning && (
            <div className="absolute -inset-10 rounded-full border-2 border-cyan-400/80 animate-ping pointer-events-none"></div>
          )}

          {/* Thruster Aura / Ambient Glow */}
          <div className="absolute inset-0 bg-sky-500/20 rounded-2xl blur-md group-hover:bg-sky-400/40 transition-all"></div>

          {/* Outer Microchip Gold Pins (QFP Package Styling) */}
          {/* Top/Bottom Pins */}
          <div className="absolute top-0 inset-x-2 flex justify-between px-1">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-xs shadow-xs"></span>
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-xs shadow-xs"></span>
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-xs shadow-xs"></span>
          </div>
          <div className="absolute bottom-0 inset-x-2 flex justify-between px-1">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-xs shadow-xs"></span>
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-xs shadow-xs"></span>
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-xs shadow-xs"></span>
          </div>
          {/* Left/Right Pins */}
          <div className="absolute left-0 inset-y-2 flex flex-col justify-between py-1">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-xs shadow-xs"></span>
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-xs shadow-xs"></span>
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-xs shadow-xs"></span>
          </div>
          <div className="absolute right-0 inset-y-2 flex flex-col justify-between py-1">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-xs shadow-xs"></span>
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-xs shadow-xs"></span>
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-xs shadow-xs"></span>
          </div>

          {/* Gold Wire Antenna on Top */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 border border-white shadow-xs animate-pulse"></div>
            <div className="w-0.5 h-2.5 bg-amber-400"></div>
          </div>

          {/* Main Body Chassis: Matte Dark Ceramic with Glassmorphic Bezel */}
          <div className="relative w-14 h-14 bg-linear-to-b from-slate-900 via-slate-800 to-slate-950 rounded-xl border border-sky-400/60 shadow-lg flex flex-col items-center justify-between p-1.5 overflow-hidden">
            
            {/* Subtle PCB Trace Lines */}
            <div className="absolute inset-0 opacity-25 pointer-events-none">
              <svg viewBox="0 0 50 50" className="w-full h-full stroke-cyan-300 fill-none" strokeWidth="1">
                <path d="M 5,10 L 15,10 L 25,20 L 45,20" />
                <path d="M 5,40 L 20,40 L 30,30 L 45,30" />
                <circle cx="25" cy="20" r="1.5" fill="#38bdf8" />
                <circle cx="30" cy="30" r="1.5" fill="#38bdf8" />
              </svg>
            </div>

            {/* Cyber Visor Screen */}
            <div className="relative z-10 w-full h-6 bg-slate-950/95 rounded-md border border-cyan-500/40 flex items-center justify-around px-1 shadow-inner">
              {/* Left Eye */}
              <div className="relative w-3.5 h-3.5 rounded-full bg-cyan-950 flex items-center justify-center border border-cyan-400/60 overflow-hidden">
                <div
                  style={{
                    transform: `translate3d(${pupilX}px, ${pupilY}px, 0)`
                  }}
                  className="w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-300 flex items-center justify-center"
                >
                  <div className="w-0.5 h-0.5 rounded-full bg-white"></div>
                </div>
              </div>

              {/* Micro HUD Center Divider */}
              <div className="w-0.5 h-2.5 bg-cyan-500/30"></div>

              {/* Right Eye */}
              <div className="relative w-3.5 h-3.5 rounded-full bg-cyan-950 flex items-center justify-center border border-cyan-400/60 overflow-hidden">
                <div
                  style={{
                    transform: `translate3d(${pupilX}px, ${pupilY}px, 0)`
                  }}
                  className="w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-300 flex items-center justify-center"
                >
                  <div className="w-0.5 h-0.5 rounded-full bg-white"></div>
                </div>
              </div>
            </div>

            {/* Chest Indicator: Pulsing Micro Heart / Silicon Crystal */}
            <div className="relative z-10 w-full flex items-center justify-between px-1">
              <span className="text-[7.5px] font-mono text-cyan-300 font-bold tracking-tighter">
                VOLT-01
              </span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </div>
            </div>
          </div>

          {/* Micro Jet Flame / Floating Particle Effect under Bot */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-2 bg-cyan-400/90 rounded-full blur-xs animate-pulse"></div>
        </div>
      </div>
    </>
  );
}
