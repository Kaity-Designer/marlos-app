import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marlos — Learn Your Way",
  description: "AI-powered personalised learning. Adaptive tutoring that understands how you think.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Marlos",
  },
  openGraph: {
    title: "Marlos",
    description: "AI-powered personalised learning",
    type: "website",
    url: "https://marlos.cloud",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0f0f10",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicon.ico" />
        <style>{`
          /* Mobile: full screen app */
          @media (max-width: 768px) {
            #desktop-shell { display: none !important; }
            #app-root { display: block !important; }
          }
          /* Desktop/Tablet: gradient bg + phone mockup */
          @media (min-width: 769px) {
            body { margin: 0; padding: 0; overflow: hidden; }
            #app-root { display: none !important; }
            #desktop-shell { display: flex !important; }
          }
        `}</style>
      </head>
      <body>
        {/* ── Mobile App (phones only) ── */}
        <div id="app-root">
          {children}
        </div>

        {/* ── Desktop / iPad shell ── */}
        <div
          id="desktop-shell"
          style={{
            display: "none",
            width: "100vw",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            background: "#0f0f10",
          }}
        >
          {/* Gradient blobs — matching the reference image */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(ellipse 60% 70% at 10% 85%, rgba(160, 40, 120, 0.75) 0%, transparent 60%),
              radial-gradient(ellipse 55% 65% at 85% 20%, rgba(100, 80, 200, 0.7) 0%, transparent 60%),
              radial-gradient(ellipse 50% 60% at 90% 80%, rgba(180, 180, 210, 0.45) 0%, transparent 55%),
              radial-gradient(ellipse 40% 50% at 50% 50%, rgba(80, 60, 160, 0.3) 0%, transparent 70%)
            `,
          }} />

          {/* Subtle noise overlay for depth */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
            opacity: 0.5,
          }} />

          {/* Left side copy */}
          <div style={{
            position: "relative",
            zIndex: 10,
            color: "white",
            maxWidth: "400px",
            padding: "0 48px",
            marginRight: "40px",
          }}>
            <div style={{
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "20px",
            }}>
              AI Learning for ages 10–15
            </div>
            <h1 style={{
              fontSize: "clamp(42px, 5vw, 72px)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              margin: "0 0 20px",
              background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Learn your<br />way with<br />
              <span style={{
                background: "linear-gradient(135deg, #a8d8f8 0%, #7ec8f5 50%, #b8a0f0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>marlos</span>
            </h1>
            <p style={{
              fontSize: "17px",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.6)",
              margin: "0 0 36px",
              maxWidth: "340px",
            }}>
              Adaptive AI tutoring that understands exactly how you think — personalised for every student.
            </p>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <div style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "12px",
                padding: "12px 20px",
                fontSize: "13px",
                color: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(12px)",
              }}>
                📱 Open on your phone to get started
              </div>
            </div>
            <div style={{ marginTop: "24px", display: "flex", gap: "24px" }}>
              {["Adaptive AI Tutor", "400+ Topics", "Instant Feedback"].map((f) => (
                <div key={f} style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>
                  <span style={{ color: "#a8d8f8", marginRight: "6px" }}>✓</span>{f}
                </div>
              ))}
            </div>
          </div>

          {/* iPhone mockup */}
          <div style={{
            position: "relative",
            zIndex: 10,
            filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.6)) drop-shadow(0 0 60px rgba(120,100,200,0.3))",
          }}>
            {/* Phone outer frame */}
            <div style={{
              width: "300px",
              height: "620px",
              background: "linear-gradient(145deg, #2a2a2e 0%, #1a1a1e 40%, #111114 100%)",
              borderRadius: "48px",
              padding: "14px",
              boxShadow: `
                inset 0 0 0 1px rgba(255,255,255,0.12),
                inset 0 1px 0 rgba(255,255,255,0.2),
                0 0 0 1px rgba(0,0,0,0.5)
              `,
              position: "relative",
            }}>
              {/* Side buttons */}
              <div style={{
                position: "absolute",
                left: "-3px",
                top: "110px",
                width: "3px",
                height: "36px",
                background: "#2a2a2e",
                borderRadius: "2px 0 0 2px",
              }} />
              <div style={{
                position: "absolute",
                left: "-3px",
                top: "158px",
                width: "3px",
                height: "64px",
                background: "#2a2a2e",
                borderRadius: "2px 0 0 2px",
              }} />
              <div style={{
                position: "absolute",
                left: "-3px",
                top: "234px",
                width: "3px",
                height: "64px",
                background: "#2a2a2e",
                borderRadius: "2px 0 0 2px",
              }} />
              <div style={{
                position: "absolute",
                right: "-3px",
                top: "168px",
                width: "3px",
                height: "90px",
                background: "#2a2a2e",
                borderRadius: "0 2px 2px 0",
              }} />

              {/* Screen */}
              <div style={{
                width: "100%",
                height: "100%",
                background: "#0f0f10",
                borderRadius: "36px",
                overflow: "hidden",
                position: "relative",
              }}>
                {/* Dynamic Island */}
                <div style={{
                  position: "absolute",
                  top: "14px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "100px",
                  height: "28px",
                  background: "#000",
                  borderRadius: "18px",
                  zIndex: 10,
                }} />

                {/* Static app preview — auth screen */}
                <div style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "36px",
                  background: "radial-gradient(ellipse at 50% 0%, #0d1a14 0%, #0f0f10 60%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "52px 20px 20px",
                  overflow: "hidden",
                  position: "relative",
                }}>
                  {/* Bubble character */}
                  <div style={{ marginBottom: "14px", position: "relative", width: "72px", height: "72px" }}>
                    <svg width="83" height="79" viewBox="0 0 83 79" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <radialGradient id="db" cx="38%" cy="32%" r="65%">
                          <stop offset="0%" stopColor="#a8d8f8" stopOpacity="0.55"/>
                          <stop offset="45%" stopColor="#6ab8f0" stopOpacity="0.45"/>
                          <stop offset="100%" stopColor="#3a8ed4" stopOpacity="0.35"/>
                        </radialGradient>
                        <radialGradient id="di" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#e0f4ff" stopOpacity="0.25"/>
                          <stop offset="100%" stopColor="#4aabf0" stopOpacity="0"/>
                        </radialGradient>
                        <radialGradient id="ds" cx="35%" cy="28%" r="40%">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75"/>
                          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.15"/>
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
                        </radialGradient>
                        <radialGradient id="dsat" cx="35%" cy="30%" r="60%">
                          <stop offset="0%" stopColor="#d0eeff" stopOpacity="0.85"/>
                          <stop offset="55%" stopColor="#7ec8f5" stopOpacity="0.5"/>
                          <stop offset="100%" stopColor="#4aabf0" stopOpacity="0.25"/>
                        </radialGradient>
                        <filter id="dshadow">
                          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#2a7cc7" floodOpacity="0.4"/>
                        </filter>
                      </defs>
                      {/* Satellites */}
                      <circle cx="59" cy="13" r="7" fill="url(#dsat)" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8"/>
                      <ellipse cx="57" cy="11" rx="2.1" ry="1.4" fill="rgba(255,255,255,0.65)"/>
                      <circle cx="76" cy="40" r="4.5" fill="url(#dsat)" stroke="rgba(255,255,255,0.35)" strokeWidth="0.6"/>
                      <circle cx="13" cy="59" r="6" fill="url(#dsat)" stroke="rgba(255,255,255,0.35)" strokeWidth="0.7"/>
                      <circle cx="45" cy="69" r="4" fill="url(#dsat)" stroke="rgba(255,255,255,0.35)" strokeWidth="0.6"/>
                      {/* Main body */}
                      <circle cx="33" cy="36" r="32" fill="url(#db)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.3" filter="url(#dshadow)"/>
                      <circle cx="33" cy="36" r="32" fill="url(#di)"/>
                      {/* Specular */}
                      <ellipse cx="24" cy="22" rx="13" ry="8" fill="url(#ds)" transform="rotate(-20 24 22)"/>
                      <ellipse cx="39" cy="16" rx="3.2" ry="2.2" fill="rgba(255,255,255,0.55)" transform="rotate(-15 39 16)"/>
                      {/* Eyes */}
                      <ellipse cx="26" cy="38" rx="5.2" ry="6.1" fill="#1a2a3a"/>
                      <ellipse cx="24.8" cy="36.4" rx="2" ry="1.6" fill="rgba(255,255,255,0.85)"/>
                      <ellipse cx="40" cy="38" rx="5.2" ry="6.1" fill="#1a2a3a"/>
                      <ellipse cx="38.8" cy="36.4" rx="2" ry="1.6" fill="rgba(255,255,255,0.85)"/>
                      {/* Rim */}
                      <path d="M 16 56 Q 33 69 50 56" stroke="rgba(255,255,255,0.18)" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
                    </svg>
                  </div>

                  {/* Heading */}
                  <div style={{ textAlign: "center", marginBottom: "16px" }}>
                    <div style={{ fontSize: "17px", fontWeight: 700, color: "#f5f5f7", letterSpacing: "-0.02em", marginBottom: "4px" }}>
                      Create your account
                    </div>
                    <div style={{ fontSize: "11px", color: "#9999a8" }}>Your learning journey starts here</div>
                  </div>

                  {/* Toggle */}
                  <div style={{
                    display: "flex",
                    width: "100%",
                    background: "#141416",
                    borderRadius: "14px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    padding: "4px",
                    marginBottom: "14px",
                  }}>
                    <div style={{ flex: 1, textAlign: "center", padding: "8px", borderRadius: "10px", background: "#00e5a0", fontSize: "11px", fontWeight: 600, color: "#0f0f10" }}>Sign up</div>
                    <div style={{ flex: 1, textAlign: "center", padding: "8px", fontSize: "11px", fontWeight: 600, color: "#7a7a88" }}>Sign in</div>
                  </div>

                  {/* Input fields */}
                  {["Your name", "Email", "Password"].map((label, i) => (
                    <div key={label} style={{ width: "100%", marginBottom: "10px" }}>
                      <div style={{ fontSize: "10px", color: "#9999a8", marginBottom: "5px", fontWeight: 500 }}>{label}</div>
                      <div style={{
                        width: "100%",
                        height: "38px",
                        background: "#1a1a1e",
                        borderRadius: "10px",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxSizing: "border-box",
                      }}/>
                    </div>
                  ))}

                  {/* CTA button */}
                  <div style={{
                    width: "100%",
                    height: "42px",
                    background: "#00e5a0",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#0f0f10",
                    marginTop: "4px",
                    boxShadow: "0 0 20px rgba(0,229,160,0.3)",
                  }}>
                    Create account
                  </div>

                  {/* Bottom nav hint */}
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "56px",
                    background: "rgba(15,15,16,0.95)",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    padding: "0 8px",
                    backdropFilter: "blur(12px)",
                  }}>
                    {["🏠", "💬", "📚", "👤"].map((icon, i) => (
                      <div key={i} style={{ fontSize: "18px", opacity: i === 0 ? 1 : 0.3 }}>{icon}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
