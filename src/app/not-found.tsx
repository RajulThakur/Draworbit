'use client';

import { useState } from 'react';

export default function Slider() {
  const min = 0;
  const max = 100;
  const step = 5;

  const [value, setValue] = useState(75);
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full max-w-md px-4 py-6">
      <div className="relative w-full h-8">
        {/* Slider track */}
        <div className="absolute top-1/2 w-full h-1.5 -translate-y-1/2 rounded-full bg-gray-300" />

        {/* Lower progress bar */}
        <div
          className="absolute top-[60%] left-0 h-1.5 rounded-full bg-blue-500 transition-all duration-200"
          style={{ width: `${percent}%` }}
        />

        {/* Input slider (functional layer) */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer top-1/2 -translate-y-1/2 z-10"
        />

        {/* Head (floating value above thumb) */}
        <div
          className="absolute -top-6 text-xs font-semibold text-blue-600 transform -translate-x-1/2"
          style={{ left: `${percent}%` }}
        >
          {value}
        </div>
      </div>

      {/* Min - Max Labels */}
      <div className="mt-3 flex justify-between text-xs text-gray-500 font-medium px-1">
        <span>{min}</span>
        <span>{(min + max) / 2}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}