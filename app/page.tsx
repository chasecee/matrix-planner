"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [columnCount, setColumnCount] = useState(24); // Default to 24 columns
  const [lightCount, setLightCount] = useState(250); // Default to 250 lights
  const [lightStripLength, setLightStripLength] = useState(50); // Default length of each light strip
  const [lightStripsAmount, setLightStripsAmount] = useState(5); // Default amount of light strips
  const [isSerpentine, setIsSerpentine] = useState("serpentine"); // Use string value for initial state
  // Calculate lightCount based on lightStripLength and lightStripsAmount
  useEffect(() => {
    setLightCount(lightStripLength * lightStripsAmount);
  }, [lightStripLength, lightStripsAmount]);

  const generateColor = (index: number, total: number) => {
    const hue = (360 * index) / total;
    return `hsl(${hue}, 100%, 75%)`;
  };
  const lightStripColors = Array.from(
    { length: lightStripsAmount },
    (_, index) => generateColor(index, lightStripsAmount)
  );
  return (
    <main className="flex min-h-screen flex-col justify-start p-10">
      <div className="flex flex-row justify-between items-baseline">
        <h1 className="text-xl mb-3">LED Strip to Matrix Tool</h1>
        <p>by Chase Cee</p>
      </div>

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
      <div className="relative w-full h-full">
        <div
          className="grid gap-[1px]"
          style={{
            gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: lightCount }, (_, index) => {
            let adjustedIndex = index;
            const row = Math.floor(index / columnCount);
            const isRowEven = row % 2 === 0;

            switch (isSerpentine) {
              case "serpentine":
                if (!isRowEven) {
                  const startOfRow = row * columnCount;
                  const endOfRow = startOfRow + columnCount - 1;
                  adjustedIndex = endOfRow - (index - startOfRow);
                }
                break;
              case "parallel":
                // In parallel mode, the adjustedIndex remains the same as the original index
                break;
              case "wrap":
                if (row % lightStripsAmount === 0 && row !== 0) {
                  // When a new set of strips starts, wrap back to the start of the matrix
                  adjustedIndex = index % (columnCount * lightStripsAmount);
                }
                break;
              default:
                // Handle any other unexpected cases
                break;
            }

            const stripIndex =
              Math.floor(adjustedIndex / lightStripLength) % lightStripsAmount;
            const bgColor = lightStripColors[stripIndex];

            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center aspect-square rounded-sm"
                style={{ backgroundColor: bgColor }}
              >
                <span className="text-opacity-50 text-[10px] text-black">
                  {adjustedIndex + 1}
                </span>
              </div>
            );
          })}
        </div>
        <div
          className="grid relative z-10 hidden"
          style={{
            gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: 40 }, (_, index) => {
            index += 1; // Offset index to start at 1
            const bgColor = "bg-yellow-100/0";

            return (
              <div
                key={index}
                className={`flex flex-col items-center justify-center border aspect-[3/2] border-red-500 ${bgColor}`}
                style={{ gridColumn: "span 3", gridRow: "span 2" }}
              >
                <span className="text-opacity-100 text-[16px] text-red-500">
                  {index}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
