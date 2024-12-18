"use client";
import React, { useRef, useEffect } from 'react';

interface SnowflakeProps {
  x: number;
  y: number;
  radius: number;
  speed: number;
}

const Snowfall = ({
  snowflakeCount = 100,
  snowflakeColor = '#ffffff',
  snowflakeSize = 2,
  snowflakeSpeed = 0.001,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const snowflakes: SnowflakeProps[] = [];

    for (let i = 0; i < snowflakeCount; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * snowflakeSize + 1,
        speed: Math.random() * snowflakeSpeed + 1,
      });
    }

    function drawSnowflakes() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = snowflakeColor;

      snowflakes.forEach((snowflake) => {
        ctx.beginPath();
        ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
        ctx.fill();

        snowflake.y += snowflake.speed;
        snowflake.x += Math.sin(snowflake.y / 50) * 0.5;

        if (snowflake.y > canvas.height) {
          snowflake.y = 0;
          snowflake.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(drawSnowflakes);
    }

    drawSnowflakes();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [snowflakeCount, snowflakeColor, snowflakeSize, snowflakeSpeed]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
};

export default Snowfall;