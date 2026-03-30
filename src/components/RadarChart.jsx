import React from 'react';

const RadarChart = ({ data, size = 300 }) => {
  const categories = Object.keys(data);
  const values = Object.values(data);
  const levels = 5;
  const padding = 50;
  const radius = (size - padding * 2) / 2;
  const center = size / 2;

  const points = categories.map((_, i) => {
    const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return { x, y, angle };
  });

  const levelPaths = Array.from({ length: levels }, (_, i) => {
    const r = (radius * (i + 1)) / levels;
    return points.map(p => {
      const x = center + r * Math.cos(p.angle);
      const y = center + r * Math.sin(p.angle);
      return `${x},${y}`;
    }).join(' ');
  });

  const dataPath = points.map((p, i) => {
    const r = (radius * values[i]) / 100;
    const x = center + r * Math.cos(p.angle);
    const y = center + r * Math.sin(p.angle);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {/* Background polygons */}
        {levelPaths.map((path, i) => (
          <polygon
            key={i}
            points={path}
            fill="none"
            stroke="rgba(212, 175, 55, 0.15)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {points.map((p, i) => (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={p.x}
            y2={p.y}
            stroke="rgba(212, 175, 55, 0.2)"
            strokeWidth="1"
          />
        ))}

        {/* Data polygon */}
        <polygon
          points={dataPath}
          fill="rgba(212, 175, 55, 0.3)"
          stroke="#D4AF37"
          strokeWidth="3"
          strokeLinejoin="round"
          className="animate-pulse"
        />

        {/* Labels */}
        {points.map((p, i) => {
          const r = radius + 25;
          const x = center + r * Math.cos(p.angle);
          const y = center + r * Math.sin(p.angle);
          return (
            <text
              key={i}
              x={x}
              y={y}
              fill="rgba(255,255,255,0.6)"
              fontSize="12"
              textAnchor="middle"
              className="uppercase font-mono tracking-widest font-bold"
              dominantBaseline="middle"
            >
              {categories[i]}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export default RadarChart;
