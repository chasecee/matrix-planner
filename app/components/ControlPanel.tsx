import React from "react";
interface ControlPanelProps {
  lightStripLength: number;
  setLightStripLength: (value: number) => void;
  lightStripsAmount: number;
  setLightStripsAmount: (value: number) => void;
  columnCount: number;
  setColumnCount: (value: number) => void;
  isSerpentine: string;
  setIsSerpentine: (value: string) => void;
  lightCount: number;
  setLightCount: (value: number) => void; // Corrected type here
}

export const ControlPanel = ({
  lightStripLength,
  setLightStripLength,
  lightStripsAmount,
  setLightStripsAmount,
  columnCount,
  setColumnCount,
  isSerpentine,
  setIsSerpentine,
  lightCount,
}: ControlPanelProps) => (
  <div className="flex flex-row gap-5 self-start text-sm mb-5">
    <div className="flex flex-row gap-2  max-w-1/2">
      <div className="flex flex-col gap-1">
        <label
          className="opacity-80 font-semibold"
          htmlFor="light_strip_length"
        >
          Light Strip Length
        </label>
        <input
          type="number"
          value={lightStripLength}
          id="light_strip_length"
          onChange={(e) => setLightStripLength(Number(e.target.value))}
          className=" text-white bg-transparent p-2 rounded ring-[1.5px] ring-white/50 max-w-[150px]"
        />
      </div>
      <div className="flex flex-row align-baseline">
        <span>x</span>
      </div>
      <div className="flex flex-col gap-1">
        <label
          className="opacity-80 font-semibold"
          htmlFor="light_strips_amount"
        >
          Number of Strips
        </label>
        <input
          type="number"
          value={lightStripsAmount}
          id="light_strips_amount"
          onChange={(e) => setLightStripsAmount(Number(e.target.value))}
          className=" text-white bg-transparent p-2 rounded ring-[1.5px] ring-white/50 max-w-[150px]"
        />
      </div>
      <div className="flex flex-row align-baseline">
        <span>=</span>
      </div>
      <div className="flex flex-col gap-1">
        <label className="opacity-80 font-semibold" htmlFor="lights_count">
          Pixel Total
        </label>
        <input
          type="number"
          value={lightCount}
          id="lights_count"
          disabled // Make the field disabled
          className=" text-white bg-transparent p-2 rounded ring-[1.5px] ring-white/50 max-w-[150px] opacity-50 cursor-not-allowed"
        />
      </div>
    </div>
    <div className="flex flex-row gap-5">
      <div className="flex flex-col gap-1">
        <label className="opacity-80 font-semibold" htmlFor="cols_wide">
          Matrix Columns
        </label>
        <input
          type="number"
          value={columnCount}
          id="cols_wide"
          onChange={(e) => setColumnCount(Number(e.target.value))}
          className=" text-white bg-transparent p-2 rounded ring-[1.5px] ring-white/50 max-w-[150px]"
        />
      </div>

      <div className="flex flex-col ">
        <label className="opacity-80 font-semibold">Layout</label>
        <div className="flex flex-col justify-center">
          <label className="flex flex-row gap-1 items-center">
            <input
              type="radio"
              name="layout"
              value="serpentine"
              checked={isSerpentine === "serpentine"} // Ensure this comparison is against a string
              onChange={() => setIsSerpentine("serpentine")}
              className="mb-0 "
            />
            <span>Serpentine</span>
          </label>
          <label className="flex flex-row gap-1 items-center">
            <input
              type="radio"
              name="layout"
              value="parallel"
              checked={isSerpentine === "parallel"} // Ensure this comparison is against a string
              onChange={() => setIsSerpentine("parallel")}
              className="mb-0"
            />
            <span>Parallel</span>
          </label>
        </div>
      </div>
    </div>
  </div>
);
