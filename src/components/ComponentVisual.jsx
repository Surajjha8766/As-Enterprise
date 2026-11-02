import React from "react";

export default function ComponentVisual({ product, className = "w-full h-48" }) {
  if (!product) return null;

  const { iconType, name, mpn, ledColor, category } = product;

  // Render high-fidelity, realistic vector rendering with lighting, metallic gradients, and component textures
  const renderVisual = () => {
    switch (iconType) {
      case "resistor":
        if (mpn && mpn.startsWith("WR04")) {
          // Photorealistic SMD 0402 Chip Resistor with tape pocket texture
          return (
            <svg viewBox="0 0 200 140" className="w-full h-full p-3 drop-shadow-sm" fill="none">
              <defs>
                <linearGradient id="smdCeramic" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="50%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#020617" />
                </linearGradient>
                <linearGradient id="silverElectrode" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f8fafc" />
                  <stop offset="30%" stopColor="#cbd5e1" />
                  <stop offset="70%" stopColor="#94a3b8" />
                  <stop offset="100%" stopColor="#64748b" />
                </linearGradient>
                <filter id="chipDropShadow" x="-10%" y="-10%" width="130%" height="130%">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0f172a" floodOpacity="0.15" />
                </filter>
              </defs>

              {/* Carrier Tape Pocket Impression */}
              <rect x="25" y="20" width="150" height="100" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1.5" />
              <circle cx="160" cy="35" r="4" fill="#cbd5e1" />
              <circle cx="160" cy="70" r="4" fill="#cbd5e1" />
              <circle cx="160" cy="105" r="4" fill="#cbd5e1" />

              {/* Chip Body with drop shadow */}
              <g filter="url(#chipDropShadow)">
                {/* Main Ceramic Body */}
                <rect x="52" y="45" width="96" height="50" rx="3" fill="url(#smdCeramic)" stroke="#334155" strokeWidth="1.5" />
                {/* Left Silver Terminal */}
                <rect x="44" y="45" width="20" height="50" rx="2" fill="url(#silverElectrode)" stroke="#64748b" strokeWidth="1" />
                {/* Right Silver Terminal */}
                <rect x="136" y="45" width="20" height="50" rx="2" fill="url(#silverElectrode)" stroke="#64748b" strokeWidth="1" />
                {/* Laser-Etched Text with glossy bevel */}
                <text x="100" y="76" fill="#e2e8f0" fontSize="16" fontFamily="monospace" fontWeight="bold" textAnchor="middle" letterSpacing="1">
                  {product.name.includes("1 kΩ") ? "102" : product.name.includes("2 kΩ") ? "2001" : product.name.includes("3.3") ? "332" : "7502"}
                </text>
              </g>

              <text x="100" y="114" fill="#64748b" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="500">
                Walsin SMD 0402 · {mpn}
              </text>
            </svg>
          );
        }
        // Through-hole axial resistor with glossy ceramic glaze and realistic bands
        return (
          <svg viewBox="0 0 200 140" className="w-full h-full p-3 drop-shadow-sm" fill="none">
            <defs>
              <linearGradient id="copperLead" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
              <linearGradient id="resistorBody" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="35%" stopColor="#fde68a" />
                <stop offset="80%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#92400e" />
              </linearGradient>
            </defs>

            {/* Tinned Copper Leads with metallic sheen */}
            <line x1="18" y1="70" x2="62" y2="70" stroke="url(#copperLead)" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="138" y1="70" x2="182" y2="70" stroke="url(#copperLead)" strokeWidth="4.5" strokeLinecap="round" />

            {/* Bone-shaped bulbous resistor body */}
            <path
              d="M 60,50 C 60,45 68,44 76,46 L 124,46 C 132,44 140,45 140,50 L 140,90 C 140,95 132,96 124,94 L 76,94 C 68,96 60,95 60,90 Z"
              fill="url(#resistorBody)"
              stroke="#b45309"
              strokeWidth="1.5"
            />
            {/* Specular Highlight along top */}
            <line x1="68" y1="48" x2="132" y2="48" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.6" strokeLinecap="round" />

            {/* Realistic Color Bands: 10 kΩ (Brown - Black - Orange - Gold) */}
            <rect x="74" y="46" width="7" height="48" fill="#78350f" />
            <rect x="89" y="46" width="7" height="48" fill="#0f172a" />
            <rect x="104" y="46" width="7" height="48" fill="#ea580c" />
            <rect x="122" y="46" width="8" height="48" fill="#fbbf24" stroke="#d97706" strokeWidth="0.5" />

            <text x="100" y="118" fill="#64748b" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="500">
              10 kΩ ±5% 0.25W Axial
            </text>
          </svg>
        );

      case "led":
        return (
          <svg viewBox="0 0 200 140" className="w-full h-full p-3 drop-shadow-sm" fill="none">
            <defs>
              <linearGradient id="ledGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="40%" stopColor={ledColor || "#ef4444"} stopOpacity="0.95" />
                <stop offset="100%" stopColor={ledColor || "#991b1b"} />
              </linearGradient>
              <linearGradient id="leadShine" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="60%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
            </defs>

            {/* Long Anode & Short Cathode leads */}
            <line x1="88" y1="90" x2="88" y2="132" stroke="url(#leadShine)" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="112" y1="90" x2="112" y2="120" stroke="url(#leadShine)" strokeWidth="3.5" strokeLinecap="round" />

            {/* Epoxy Dome Lens */}
            <path
              d="M 72,90 C 72,40 80,24 100,24 C 120,24 128,40 128,90 Z"
              fill="url(#ledGlow)"
              stroke={ledColor || "#ef4444"}
              strokeWidth="2"
            />
            {/* Flat Flange Base Rim */}
            <rect x="68" y="87" width="64" height="6" rx="2" fill={ledColor || "#ef4444"} stroke="#991b1b" strokeWidth="0.5" />
            
            {/* Realistic Internal Cup, Wire Bond & Die */}
            <path d="M 88,87 L 88,60 L 98,54" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.85" />
            <path d="M 112,87 L 112,64 L 102,64" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.85" />
            <rect x="96" y="52" width="6" height="4" fill="#ffffff" />

            {/* Curved Lens Reflection Glare */}
            <path d="M 80,45 C 82,32 92,28 98,28" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.75" />

            <text x="100" y="18" fill="#64748b" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="500">
              {product.name}
            </text>
          </svg>
        );

      case "microcontroller":
        return (
          <svg viewBox="0 0 200 140" className="w-full h-full p-2 drop-shadow-sm" fill="none">
            <defs>
              <linearGradient id="arduinoPcb" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00979D" />
                <stop offset="100%" stopColor="#005B60" />
              </linearGradient>
              <linearGradient id="metalShield" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
            </defs>

            {/* Board Substrate with rounded corners and mounting holes */}
            <rect x="25" y="16" width="150" height="108" rx="8" fill="url(#arduinoPcb)" stroke="#00474B" strokeWidth="2" />
            {/* Gold Plated Mounting Holes */}
            <circle cx="34" cy="25" r="4.5" fill="#f8fafc" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="34" cy="115" r="4.5" fill="#f8fafc" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="166" cy="45" r="4.5" fill="#f8fafc" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="166" cy="115" r="4.5" fill="#f8fafc" stroke="#d97706" strokeWidth="1.5" />

            {/* USB-B Metal Connector */}
            <rect x="30" y="24" width="28" height="26" rx="2" fill="url(#metalShield)" stroke="#475569" strokeWidth="1" />
            <rect x="34" y="28" width="20" height="18" rx="1" fill="#1e293b" />

            {/* DC Barrel Jack */}
            <rect x="30" y="86" width="34" height="30" rx="3" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
            <circle cx="60" cy="101" r="4" fill="#94a3b8" />

            {/* Reset Button (Red) */}
            <rect x="70" y="22" width="10" height="10" rx="2" fill="#ef4444" stroke="#991b1b" />

            {/* Crystal Oscillator (Silver Oval Canister) */}
            <rect x="68" y="55" width="16" height="8" rx="4" fill="url(#metalShield)" stroke="#64748b" />
            <text x="76" y="61" fill="#0f172a" fontSize="5" fontFamily="monospace" textAnchor="middle">16.0</text>

            {/* ATmega328P DIP-28 Socketed Chip */}
            <rect x="94" y="60" width="66" height="26" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <circle cx="99" cy="73" r="2" fill="#64748b" />
            <text x="128" y="74" fill="#f8fafc" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              ATMEGA328P-PU
            </text>

            {/* Top and Bottom Black Female Pin Header Sockets */}
            <rect x="68" y="18" width="94" height="6" fill="#0f172a" />
            <rect x="68" y="114" width="94" height="6" fill="#0f172a" />

            {/* Silkscreen text */}
            <text x="110" y="32" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
              UNO R3
            </text>
          </svg>
        );

      case "display":
        if (product.name.includes("TM1637")) {
          return (
            <svg viewBox="0 0 200 140" className="w-full h-full p-3 drop-shadow-sm" fill="none">
              <rect x="25" y="30" width="150" height="80" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
              {/* LED Bezel */}
              <rect x="36" y="40" width="128" height="60" rx="3" fill="#18181b" stroke="#27272a" />
              {/* Bright Red 7-Segment Digits */}
              <text x="60" y="84" fill="#ef4444" fontSize="32" fontFamily="monospace" fontWeight="bold">8</text>
              <text x="86" y="84" fill="#ef4444" fontSize="32" fontFamily="monospace" fontWeight="bold">8</text>
              {/* Colon */}
              <circle cx="109" cy="66" r="3" fill="#ef4444" />
              <circle cx="109" cy="80" r="3" fill="#ef4444" />
              <text x="118" y="84" fill="#ef4444" fontSize="32" fontFamily="monospace" fontWeight="bold">8</text>
              <text x="144" y="84" fill="#ef4444" fontSize="32" fontFamily="monospace" fontWeight="bold">8</text>
              <text x="100" y="125" fill="#64748b" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="500">
                TM1637 4-Digit Display
              </text>
            </svg>
          );
        }
        // LCD1602 Display with illuminated liquid crystal blue matrix
        return (
          <svg viewBox="0 0 200 140" className="w-full h-full p-2 drop-shadow-sm" fill="none">
            <defs>
              <linearGradient id="lcdBacklight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
            </defs>
            <rect x="20" y="25" width="160" height="85" rx="5" fill="#0284c7" stroke="#075985" strokeWidth="2" />
            {/* Screen Glass with Bezel */}
            <rect x="35" y="38" width="130" height="52" rx="2" fill="#082f49" stroke="#0f172a" strokeWidth="1.5" />
            <rect x="40" y="42" width="120" height="44" rx="1" fill="url(#lcdBacklight)" />
            {/* Dot Matrix Text Display */}
            <text x="46" y="58" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="1">
              ELECTROCHIP ENT
            </text>
            <text x="46" y="74" fill="#bae6fd" fontSize="9" fontFamily="monospace" letterSpacing="1">
              16x2 HD44780 OK
            </text>
            {/* 16 Gold-plated Header Pins */}
            <rect x="36" y="27" width="80" height="7" fill="#1e293b" />
            <text x="100" y="126" fill="#64748b" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="500">
              LCD1602A Character Module
            </text>
          </svg>
        );

      case "transistor":
        return (
          <svg viewBox="0 0 200 140" className="w-full h-full p-3 drop-shadow-sm" fill="none">
            <defs>
              <linearGradient id="transistorBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="50%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>

            {/* 3 Long Nickel Tinned Leads */}
            <line x1="82" y1="84" x2="82" y2="132" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="100" y1="84" x2="100" y2="136" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="118" y1="84" x2="118" y2="132" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />

            {/* TO-92 D-Profile Resin Capsule */}
            <path
              d="M 72,84 C 72,46 84,30 100,30 C 116,30 128,46 128,84 Z"
              fill="url(#transistorBody)"
              stroke="#0f172a"
              strokeWidth="2"
            />
            {/* Flat Molded Face */}
            <line x1="72" y1="84" x2="128" y2="84" stroke="#475569" strokeWidth="3" />
            {/* Laser-Etched Text */}
            <text x="100" y="60" fill="#f8fafc" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              2N2222A
            </text>
            <text x="100" y="73" fill="#94a3b8" fontSize="7" fontFamily="monospace" textAnchor="middle">
              E · B · C
            </text>
            <text x="100" y="20" fill="#64748b" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="500">
              P2N2222A NPN BJT (40V 600mA)
            </text>
          </svg>
        );

      case "sensor":
        return (
          <svg viewBox="0 0 200 140" className="w-full h-full p-3 drop-shadow-sm" fill="none">
            <rect x="35" y="24" width="130" height="88" rx="6" fill="#0369a1" stroke="#075985" strokeWidth="2" />
            {/* Metal Mesh Gas Sensor Chamber */}
            <circle cx="100" cy="65" r="26" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="100" cy="65" r="20" fill="#f8fafc" stroke="#cbd5e1" strokeDasharray="3 3" />
            <text x="100" y="70" fill="#0f172a" fontSize="12" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
              CO
            </text>
            {/* Connector Pins */}
            <rect x="45" y="106" width="30" height="6" fill="#1e293b" />
            <text x="100" y="126" fill="#64748b" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="500">
              Winsen ZE16B-CO Module
            </text>
          </svg>
        );

      case "breadboard":
        return (
          <svg viewBox="0 0 200 140" className="w-full h-full p-2 drop-shadow-sm" fill="none">
            <rect x="20" y="25" width="160" height="84" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            {/* Red & Blue Power Rails */}
            <line x1="26" y1="32" x2="174" y2="32" stroke="#ef4444" strokeWidth="2" />
            <line x1="26" y1="38" x2="174" y2="38" stroke="#3b82f6" strokeWidth="2" />
            <line x1="26" y1="96" x2="174" y2="96" stroke="#3b82f6" strokeWidth="2" />
            <line x1="26" y1="102" x2="174" y2="102" stroke="#ef4444" strokeWidth="2" />
            {/* Center Channel Trough */}
            <rect x="26" y="66" width="148" height="4" fill="#cbd5e1" />
            {/* Tie Point Array */}
            <g fill="#64748b">
              {[45, 65, 85, 105, 125, 145].map((x) => (
                <React.Fragment key={x}>
                  <circle cx={x} cy="46" r="1.8" />
                  <circle cx={x} cy="53" r="1.8" />
                  <circle cx={x} cy="60" r="1.8" />
                  <circle cx={x} cy="76" r="1.8" />
                  <circle cx={x} cy="83" r="1.8" />
                  <circle cx={x} cy="90" r="1.8" />
                </React.Fragment>
              ))}
            </g>
            <text x="100" y="124" fill="#64748b" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="500">
              MB-102 (830 Tie-Points)
            </text>
          </svg>
        );

      case "buzzer":
        return (
          <svg viewBox="0 0 200 140" className="w-full h-full p-3 drop-shadow-sm" fill="none">
            <line x1="88" y1="88" x2="88" y2="130" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="112" y1="88" x2="112" y2="130" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />
            <rect x="62" y="42" width="76" height="48" rx="8" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
            <circle cx="100" cy="54" r="8" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
            <text x="76" y="60" fill="#f8fafc" fontSize="14" fontWeight="bold">+</text>
            <text x="100" y="80" fill="#cbd5e1" fontSize="9" fontFamily="monospace" textAnchor="middle">
              {product.name.includes("12V") ? "12V DC" : "5V DC"}
            </text>
            <text x="100" y="24" fill="#64748b" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="500">
              Piezo Acoustic Generator
            </text>
          </svg>
        );

      case "solder":
        return (
          <svg viewBox="0 0 200 140" className="w-full h-full p-3 drop-shadow-sm" fill="none">
            <rect x="60" y="32" width="80" height="76" rx="40" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
            <circle cx="100" cy="70" r="28" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="100" cy="70" r="14" fill="#ffffff" />
            <text x="100" y="74" fill="#0f172a" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
              63/37
            </text>
            <text x="100" y="124" fill="#64748b" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="500">
              50g Rosin Core Solder Spool
            </text>
          </svg>
        );

      case "iron":
        return (
          <svg viewBox="0 0 200 140" className="w-full h-full p-3 drop-shadow-sm" fill="none">
            {/* Soldering tip */}
            <polygon points="175,70 145,64 145,76" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
            {/* Stainless steel barrel */}
            <rect x="110" y="65" width="35" height="10" fill="#e2e8f0" stroke="#94a3b8" />
            {/* Ergonomic handle grip */}
            <rect x="35" y="58" width="75" height="24" rx="4" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
            <circle cx="70" cy="70" r="5" fill="#f59e0b" />
            <text x="100" y="122" fill="#64748b" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="500">
              60W Adjustable Soldering Iron
            </text>
          </svg>
        );

      case "battery":
        return (
          <svg viewBox="0 0 200 140" className="w-full h-full p-3 drop-shadow-sm" fill="none">
            <rect x="150" y="62" width="6" height="16" rx="1" fill="#cbd5e1" />
            <rect x="44" y="44" width="106" height="52" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="2" />
            <rect x="44" y="44" width="30" height="52" fill="#d97706" />
            <text x="100" y="74" fill="#f8fafc" fontSize="12" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
              1.5V AA
            </text>
            <text x="100" y="122" fill="#64748b" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="500">
              Alkaline Cell (LR6)
            </text>
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 200 140" className="w-full h-full p-3 drop-shadow-sm" fill="none">
            <rect x="40" y="32" width="120" height="76" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <circle cx="100" cy="70" r="18" fill="#e2e8f0" />
            <text x="100" y="74" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              {category ? category.split(" ")[0].toUpperCase() : "PART"}
            </text>
            <text x="100" y="124" fill="#94a3b8" fontSize="10" fontFamily="sans-serif" textAnchor="middle">
              {name}
            </text>
          </svg>
        );
    }
  };

  return (
    <div className={`relative flex items-center justify-center bg-linear-to-b from-white/90 to-slate-50/70 border-b border-slate-100 overflow-hidden ${className}`}>
      {renderVisual()}
    </div>
  );
}
