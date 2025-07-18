// components/CountUp.tsx
import React, { useEffect, useState } from "react";

interface CountUpProps {
  value: number;
  duration?: number; // milliseconds
}

const CountUp: React.FC<CountUpProps> = ({ value, duration = 800 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const increment = end / (duration / 16); // 60fps approx every 16ms

    const step = () => {
      start += increment;
      if (start < end) {
        setDisplayValue(Math.floor(start));
        requestAnimationFrame(step);
      } else {
        setDisplayValue(end);
      }
    };

    step();

    // Reset on value change
    return () => {
      setDisplayValue(0);
    };
  }, [value, duration]);

  return <span>{displayValue}</span>;
};

export default CountUp;
