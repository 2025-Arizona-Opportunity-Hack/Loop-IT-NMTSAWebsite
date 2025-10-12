"use client";

const ParticlesBackground = () => {
  // Create floating elements for visual effect
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-nmtsa-300/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
        />
      ))}

      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-nmtsa-200/10 rounded-full blur-xl animate-pulse-slow" />
      <div
        className="absolute bottom-20 right-10 w-48 h-48 bg-nmtsa-300/10 rounded-full blur-xl animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-nmtsa-200/20 rounded-full blur-2xl animate-float" />
    </div>
  );
};

export default ParticlesBackground;
