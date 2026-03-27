import { useState } from "react";

const buttons = [
  {
    id: "donation",
    label: "Данейшен",
    emoji: "💸",
    bg: "from-yellow-400 to-orange-500",
    shadow: "shadow-yellow-400/60",
    border: "border-yellow-300",
    rotate: "-rotate-2",
    hoverRotate: "hover:rotate-1",
    stars: ["⭐", "✨", "💫"],
    description: "Поддержи нас!",
  },
  {
    id: "dimokha",
    label: "Димоха Волшебник",
    emoji: "🧙‍♂️",
    bg: "from-purple-500 to-pink-500",
    shadow: "shadow-purple-500/60",
    border: "border-purple-300",
    rotate: "rotate-1",
    hoverRotate: "hover:-rotate-1",
    stars: ["🌟", "🔮", "✨"],
    description: "Магия и волшебство!",
  },
  {
    id: "kids",
    label: "Дети Тусят",
    emoji: "🎉",
    bg: "from-green-400 to-cyan-500",
    shadow: "shadow-green-400/60",
    border: "border-green-300",
    rotate: "rotate-2",
    hoverRotate: "hover:-rotate-2",
    stars: ["🎈", "🎊", "🎮"],
    description: "Тусим вместе!",
  },
];

const floatingEmojis = ["⭐", "🌈", "✨", "🎮", "🔮", "💥", "🎈", "🌟", "💫", "🎉", "🦄", "🚀"];

export default function Index() {
  const [clicked, setClicked] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setClicked(id);
    setTimeout(() => setClicked(null), 600);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-rubik"
      style={{
        background: "linear-gradient(135deg, #1a0533 0%, #0d1b4b 40%, #0a2a1a 100%)",
      }}
    >
      {/* Floating background emojis */}
      {floatingEmojis.map((emoji, i) => (
        <span
          key={i}
          className="absolute select-none pointer-events-none text-2xl opacity-20"
          style={{
            left: `${(i * 8.3) % 100}%`,
            top: `${(i * 13 + 5) % 90}%`,
            animation: `float ${3 + (i % 4)}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
            fontSize: `${1.2 + (i % 3) * 0.4}rem`,
          }}
        >
          {emoji}
        </span>
      ))}

      {/* Neon grid lines */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(150,80,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(150,80,255,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Header */}
      <div className="relative z-10 text-center mb-12 px-4">
        <h1
          className="font-caveat text-6xl md:text-8xl font-bold mb-3"
          style={{
            background: "linear-gradient(90deg, #ff6bff, #6bf3ff, #fff84a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "none",
            filter: "drop-shadow(0 0 20px rgba(255,107,255,0.5))",
          }}
        >
          Добро пожаловать! 🚀
        </h1>
        <p className="text-white/50 text-lg font-rubik tracking-widest uppercase text-sm">
          выбери раздел и поехали
        </p>
      </div>

      {/* Buttons */}
      <div className="relative z-10 flex flex-col md:flex-row gap-6 px-6 w-full max-w-4xl justify-center items-center">
        {buttons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => handleClick(btn.id)}
            className={`
              group relative w-full max-w-xs
              bg-gradient-to-br ${btn.bg}
              ${btn.rotate} ${btn.hoverRotate}
              border-4 ${btn.border}
              rounded-3xl p-6
              shadow-2xl ${btn.shadow}
              transition-all duration-300
              hover:scale-110 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]
              active:scale-95
              cursor-pointer
              ${clicked === btn.id ? "scale-95 brightness-150" : ""}
            `}
            style={{
              boxShadow: clicked === btn.id
                ? `0 0 60px rgba(255,255,255,0.6)`
                : undefined,
            }}
          >
            {/* Floating stars around button */}
            {btn.stars.map((star, si) => (
              <span
                key={si}
                className="absolute text-xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                style={{
                  top: si === 0 ? "-14px" : si === 1 ? "50%" : "auto",
                  bottom: si === 2 ? "-14px" : "auto",
                  left: si === 1 ? "-18px" : "50%",
                  right: si === 0 ? "10px" : si === 2 ? "10px" : "auto",
                  transform: si === 1 ? "translateY(-50%)" : "translateX(-50%)",
                  animation: `spin-slow ${2 + si}s linear infinite`,
                }}
              >
                {star}
              </span>
            ))}

            {/* Shine overlay */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-white" />
              <div
                className="absolute -top-full left-0 w-full h-full opacity-0 group-hover:opacity-30 transition-all duration-700 group-hover:top-full"
                style={{
                  background: "linear-gradient(transparent, rgba(255,255,255,0.4), transparent)",
                  transform: "skewY(-10deg)",
                }}
              />
            </div>

            <div className="relative flex flex-col items-center gap-3">
              <span
                className="text-6xl transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12"
                style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}
              >
                {btn.emoji}
              </span>
              <span className="font-rubik font-900 text-white text-2xl font-black tracking-tight drop-shadow-lg text-center leading-tight">
                {btn.label}
              </span>
              <span className="text-white/80 text-sm font-caveat text-xl">
                {btn.description}
              </span>
            </div>

            {/* Click burst */}
            {clicked === btn.id && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-4xl animate-ping">💥</div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Bottom decoration */}
      <div className="relative z-10 mt-12 text-white/30 text-sm font-caveat text-lg tracking-wide">
        ✨ жми на кнопку и веселись ✨
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg) translateX(4px); }
          to { transform: rotate(360deg) translateX(4px); }
        }
      `}</style>
    </div>
  );
}
