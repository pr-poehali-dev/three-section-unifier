import { useState } from "react";

type Modal = "donation" | "dimokha" | "kids" | null;

const floatingEmojis = ["⭐", "🌈", "✨", "🎮", "🔮", "💥", "🎈", "🌟", "💫", "🎉", "🦄", "🚀"];
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=kxts2935&color=166534&bgcolor=ffffff`;

const buttons = [
  {
    id: "donation",
    modal: "donation" as Modal,
    label: "Данейшен",
    emoji: "💸",
    bg: "from-yellow-400 to-orange-500",
    borderColor: "#fde68a",
    shadow: "rgba(251,191,36,0.6)",
    rotate: "-2deg",
    description: "Поддержи нас!",
    stars: ["⭐", "✨", "💫"],
  },
  {
    id: "dimokha",
    modal: "dimokha" as Modal,
    label: "Димоха Волшебник",
    emoji: "🧙‍♂️",
    bg: "from-purple-500 to-pink-500",
    borderColor: "#d8b4fe",
    shadow: "rgba(168,85,247,0.6)",
    rotate: "1deg",
    description: "Магия и волшебство!",
    stars: ["🌟", "🔮", "✨"],
  },
  {
    id: "kids",
    modal: "kids" as Modal,
    label: "Дети Тусят",
    emoji: "🎉",
    bg: "from-green-400 to-cyan-500",
    borderColor: "#86efac",
    shadow: "rgba(74,222,128,0.6)",
    rotate: "2deg",
    description: "Тусим вместе!",
    stars: ["🎈", "🎊", "🎮"],
  },
];

export default function Index() {
  const [modal, setModal] = useState<Modal>(null);
  const [amount, setAmount] = useState("");
  const [clicked, setClicked] = useState<string | null>(null);

  const openModal = (id: string, target: Modal) => {
    setClicked(id);
    setTimeout(() => { setClicked(null); setModal(target); }, 250);
  };

  const handleDonate = () => {
    if (!amount || Number(amount) <= 0) return;
    window.open(`https://www.tinkoff.ru/cf/dimokha?amount=${amount}`, "_blank");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-rubik"
      style={{ background: "linear-gradient(135deg, #1a0533 0%, #0d1b4b 40%, #0a2a1a 100%)" }}
    >
      {/* Floating emojis */}
      {floatingEmojis.map((emoji, i) => (
        <span
          key={i}
          className="absolute select-none pointer-events-none opacity-20"
          style={{
            left: `${(i * 8.3) % 100}%`,
            top: `${(i * 13 + 5) % 90}%`,
            fontSize: `${1.2 + (i % 3) * 0.4}rem`,
            animation: `float ${3 + (i % 4)}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          {emoji}
        </span>
      ))}

      {/* Neon grid */}
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
            filter: "drop-shadow(0 0 20px rgba(255,107,255,0.5))",
          }}
        >
          Добро пожаловать! 🚀
        </h1>
        <p className="text-white/50 tracking-widest uppercase text-sm">
          выбери раздел и поехали
        </p>
      </div>

      {/* Main buttons */}
      <div className="relative z-10 flex flex-col md:flex-row gap-6 px-6 w-full max-w-4xl justify-center items-center">
        {buttons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => openModal(btn.id, btn.modal)}
            className={`group relative w-full max-w-xs rounded-3xl p-6 border-4 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer bg-gradient-to-br ${btn.bg}`}
            style={{
              borderColor: btn.borderColor,
              boxShadow: `0 8px 40px ${btn.shadow}`,
              transform: `rotate(${btn.rotate}) ${clicked === btn.id ? "scale(0.93)" : ""}`,
            }}
          >
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
                }}
              >
                {star}
              </span>
            ))}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-white" />
            </div>
            <div className="relative flex flex-col items-center gap-3">
              <span className="text-6xl transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12">
                {btn.emoji}
              </span>
              <span className="text-white text-2xl font-black tracking-tight drop-shadow-lg text-center leading-tight">
                {btn.label}
              </span>
              <span className="text-white/80 font-caveat text-xl">{btn.description}</span>
            </div>
            {clicked === btn.id && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-4xl animate-ping">💥</div>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="relative z-10 mt-12 text-white/30 font-caveat text-lg tracking-wide">
        ✨ жми на кнопку и веселись ✨
      </div>

      {/* ===== MODAL ===== */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(10,5,30,0.88)", backdropFilter: "blur(10px)" }}
          onClick={() => setModal(null)}
        >
          <div
            className="relative w-full max-w-md rounded-3xl p-8"
            style={{
              background: "linear-gradient(135deg, #1e0a3c, #0d1b4b)",
              border: "1px solid rgba(255,255,255,0.1)",
              animation: "popIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModal(null)}
              className="absolute top-4 right-5 text-white/40 hover:text-white text-2xl transition-colors leading-none"
            >
              ✕
            </button>

            {/* DONATION MODAL */}
            {modal === "donation" && (
              <div className="flex flex-col items-center gap-5 text-center">
                <span className="text-7xl">💸</span>
                <h2 className="font-caveat text-4xl font-bold text-yellow-300">Данейшен</h2>
                <p className="text-white/60 text-sm">Введи сумму и поддержи нас через Tinkoff!</p>

                <div className="w-full">
                  <div className="flex items-center gap-3 rounded-2xl px-4 py-3 border border-yellow-400/40" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <span className="text-yellow-300 text-xl font-bold">₽</span>
                    <input
                      type="number"
                      placeholder="Введи сумму"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="flex-1 bg-transparent text-white text-xl font-bold outline-none placeholder-white/30"
                      min="1"
                    />
                  </div>
                  <div className="flex gap-2 mt-3">
                    {["100", "300", "500", "1000"].map((v) => (
                      <button
                        key={v}
                        onClick={() => setAmount(v)}
                        className="flex-1 rounded-xl py-2 text-sm font-bold transition-all hover:scale-105"
                        style={{
                          background: amount === v ? "#f59e0b" : "rgba(255,255,255,0.1)",
                          color: amount === v ? "#1a0533" : "#fff",
                        }}
                      >
                        {v}₽
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleDonate}
                  disabled={!amount || Number(amount) <= 0}
                  className="w-full py-4 rounded-2xl font-black text-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white"
                  style={{
                    background: "linear-gradient(90deg, #f59e0b, #ef4444)",
                    boxShadow: "0 4px 24px rgba(245,158,11,0.4)",
                  }}
                >
                  Задонатить через Tinkoff 🚀
                </button>
              </div>
            )}

            {/* DIMOKHA MODAL */}
            {modal === "dimokha" && (
              <div className="flex flex-col items-center gap-5 text-center">
                <span className="text-7xl">🧙‍♂️</span>
                <h2 className="font-caveat text-4xl font-bold text-purple-300">Димоха Волшебник</h2>
                <p className="text-white/60 text-sm leading-relaxed">
                  Здесь скоро появится описание и портфолио Димохи.<br/>
                  Пришли материалы — оформлю красиво!
                </p>
                <div className="w-full grid grid-cols-2 gap-3 mt-2">
                  {["🎨 Работа 1", "🎯 Работа 2", "🌟 Работа 3", "💫 Работа 4"].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl p-4 text-white/40 text-sm font-bold border border-white/10"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <p className="font-caveat text-purple-400/70 text-xl">✨ Портфолио появится совсем скоро ✨</p>
              </div>
            )}

            {/* KIDS MODAL */}
            {modal === "kids" && (
              <div className="flex flex-col items-center gap-5 text-center">
                <span className="text-7xl">🎉</span>
                <h2 className="font-caveat text-4xl font-bold text-green-300">Дети Тусят</h2>
                <p className="text-white/60 text-sm">Отсканируй QR-код и присоединяйся!</p>
                <div
                  className="rounded-3xl p-4 border-4 border-green-400/40"
                  style={{ background: "rgba(255,255,255,0.96)" }}
                >
                  <img src={QR_URL} alt="QR kxts2935" className="w-52 h-52" />
                </div>
                <div
                  className="px-6 py-2 rounded-2xl font-black text-lg tracking-widest"
                  style={{
                    background: "linear-gradient(90deg, #4ade80, #22d3ee)",
                    color: "#0a2a1a",
                  }}
                >
                  kxts2935
                </div>
                <p className="text-white/40 text-xs">Покажи этот код другу 🤝</p>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes popIn {
          from { transform: scale(0.82); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
