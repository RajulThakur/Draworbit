'use client';

import { useState } from 'react';

export default function Slider() {
  const min = 0;
  const max = 100;
  const step = 1;
  const [value, setValue] = useState(100);

  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full max-w-lg ">
      <div className="relative h-5">
        {/* Track + progress */}
        <div className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 rounded-lg bg-gray-200 overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-lg transition-all duration-200"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Input Slider (invisible but functional) */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer top-1/2 -translate-y-1/2"
          style={{ zIndex: 10 }}
        />

        {/* Custom Thumb Value Bubble */}
        <div
          className="absolute -bottom-6 text-sm font-semibold text-blue-700 transform -translate-x-3/4"
          style={{ left: `${percent}%` }}
        >
          {value}
        </div>
      </div>

      {/* Min, Max Labels */}
      <div className="mt-1 flex justify-between text-sm text-gray-600 font-medium">
        <span>{min}</span>
      </div>
    </div>
  );
}