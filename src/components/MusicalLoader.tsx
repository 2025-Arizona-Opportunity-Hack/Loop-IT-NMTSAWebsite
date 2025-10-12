"use client";

import { Music } from "lucide-react";
import { useEffect, useState } from "react";

export default function MusicalLoader() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-nmtsa-50 via-nmtsa-100 to-nmtsa-200 flex items-center justify-center z-50">
      {/* Animated background musical notes */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="musical-note note-1">♪</div>
        <div className="musical-note note-2">♫</div>
        <div className="musical-note note-3">♪</div>
        <div className="musical-note note-4">♫</div>
        <div className="musical-note note-5">♪</div>
      </div>

      {/* Main content */}
      <div className="relative text-center">
        {/* Animated music icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {/* Pulsing circles */}
            <div className="absolute inset-0 animate-ping opacity-20">
              <div className="w-24 h-24 bg-nmtsa-500 rounded-full"></div>
            </div>
            <div className="absolute inset-0 animate-pulse opacity-30 animation-delay-150">
              <div className="w-24 h-24 bg-nmtsa-600 rounded-full"></div>
            </div>
            
            {/* Music icon */}
            <div className="relative w-24 h-24 bg-gradient-to-br from-nmtsa-500 to-nmtsa-600 rounded-full flex items-center justify-center animate-bounce-slow shadow-2xl">
              <Music className="w-12 h-12 text-white" strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-4xl font-bold font-poppins text-gray-900 mb-4">
          <span className="gradient-text">NMTSA</span>
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          Neurologic Music Therapy Services of Arizona
        </p>
        <p className="text-sm text-nmtsa-600 font-medium">
          Loading{dots}
        </p>

        {/* Loading bar */}
        <div className="mt-8 w-64 h-1 bg-gray-200 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-nmtsa-500 to-nmtsa-600 rounded-full animate-loading-bar"></div>
        </div>
      </div>

      <style jsx>{`
        .musical-note {
          position: absolute;
          font-size: 4rem;
          color: #6366f1;
          animation: float 8s infinite ease-in-out;
        }

        .note-1 {
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .note-2 {
          top: 20%;
          right: 15%;
          animation-delay: 1s;
        }

        .note-3 {
          bottom: 20%;
          left: 20%;
          animation-delay: 2s;
        }

        .note-4 {
          bottom: 30%;
          right: 10%;
          animation-delay: 3s;
        }

        .note-5 {
          top: 50%;
          left: 50%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-30px) rotate(5deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-60px) rotate(-5deg);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-30px) rotate(3deg);
            opacity: 0.5;
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s infinite ease-in-out;
        }

        .animation-delay-150 {
          animation-delay: 150ms;
        }

        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-loading-bar {
          animation: loading-bar 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
